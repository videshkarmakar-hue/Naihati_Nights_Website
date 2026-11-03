package com.videsh.naihatinights.install

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import com.videsh.naihatinights.R

/**
 * InstallWizard is the single orchestrator for the APK installation flow.
 *
 * It owns:
 * - Download progress and completion
 * - Permission state evaluation and Settings redirection
 * - PackageInstaller invocation with the system-managed MIME type and flags
 * - Error/success/cancel reporting to the UI
 *
 * The wizard does not attempt to bypass Android security; every APK installation
 * ends in PackageInstaller, which is the official system mechanism.
 */
class InstallWizard internal constructor(
    private val context: Context,
    private val activity: Activity
) {
    private val logTag = "InstallWizard"

    // Activity Result contract for the "Allow from this source" runtime grant.
    private val permissionLauncher: ActivityResultLauncher<Intent> =
        activity.registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result: ActivityResult ->
            // The "Install unknown apps" dialog returns RESULT_OK only when the
            // user granted the grant. RESULT_CANCELED means the user dismissed
            // it, so we show the manual Settings screen again.
            val granted = result.resultCode == Activity.RESULT_OK
            if (granted) {
                setCurrentState(InstallState.PermissionRequired)
                // After returning, resume the install.
                resumeInstall()
            }
        }

    // Internal state for the UI to bind to.
    var currentState: InstallState = InstallState.Initial
        private set

    private var downloadFile: File? = null

    init {
        val rootState = if (!PermissionStateManager.isReady(context)) {
            InstallState.PermissionRequired
        } else {
            InstallState.Prepared
        }
        setCurrentState(rootState)
    }

    /**
     * Called by the UI when the user taps "Download & Install".
     */
    fun onStart() {
        val allowed = PermissionStateManager.isReady(context)
        if (!allowed) {
            setCurrentState(InstallState.PermissionRequired)
            return
        }
        setCurrentState(InstallState.Prepared)
    }

    /**
     * Begin the download. This is the public entry point from the "Download" screen.
     */
    fun onBeginDownload(progressListener: ((Float) -> Unit)? = null) {
        if (!PermissionStateManager.isReady(context)) {
            setCurrentState(InstallState.PermissionRequired)
            return
        }
        setCurrentState(InstallState.Downloading(0f))

        // Use the app's private cache as the staging directory. FileProvider
        // exposes this directory via a content:// URI so PackageInstaller can
        // read the file without a file:// URI (which Android forbids on API 24+).
        downloadFile = try {
            File(context.cacheDir, InstallerConfig.APK_FILENAME)
        } catch (e: Exception) {
            setCurrentState(InstallState.Result(false, error = "Cannot create download dir"))
            return
        }

        ApkDownloader.downloadApk(
            context = context,
            downloadListener = { progress, total ->
                val pct = if (total > 0) (progress.toFloat() / total) else 0f
                progressListener?.invoke(pct.coerceIn(0f, 1f))
                setCurrentState(InstallState.Downloading(pct.coerceIn(0f, 1f)))
            },
            targetDir = context.cacheDir
        ).onSuccess { file ->
            downloadFile = file
            // Validate local integrity before handing to the system.
            ApkDownloader.validateFile(file)
                .onSuccess {
                    // Supplementary signature verification.
                    ApkDownloader.isKnownValidApk(file, context).onSuccess {
                        setCurrentState(InstallState.DownloadComplete)
                    }.onFailure { error ->
                        setCurrentState(InstallState.Result(false, error = "Signature check failed: $error"))
                    }
                }
                .onFailure { error ->
                    setCurrentState(InstallState.Result(false, error = "Download validation failed: $error"))
                }
        }.onFailure { error ->
            setCurrentState(InstallState.Result(false, error = "Download failed: $error"))
        }
    }

    /**
     * Resume permission-aware install: grant check, then hand to the system
     * package installer.
     */
    fun resumeInstall() {
        val hasDownload = downloadFile != null && downloadFile!!.exists()
        if (PermissionStateManager.isReady(context) && hasDownload) {
            setCurrentState(InstallState.Installing)
            startPackageInstall()
            return
        }

        // If the download isn't present, we may need to re-launch the download.
        val hasDownloadState = downloadFile != null && downloadFile!!.exists()
        if (!hasDownloadState) {
            setCurrentState(InstallState.Prepared)
        } else if (!PermissionStateManager.isReady(context)) {
            setCurrentState(InstallState.PermissionRequired)
        }
    }

    /**
     * Request the runtime "Allow from this source" permission. The Activity
     * Result API delivers the outcome here. The UI calls this from the
     * PermissionRequired screen's "Open Settings" action.
     */
    fun requestPermission() {
        if (PermissionStateManager.isReady(context)) {
            // Already granted; resume install.
            resumeInstall()
            return
        }
        val intent = Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES).apply {
            data = android.net.Uri.parse("package:${activity.packageName}")
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        try {
            permissionLauncher.launch(intent)
        } catch (e: Exception) {
            setCurrentState(InstallState.Result(false, error = "Cannot request permission"))
        }
    }

    /**
     * Kill the wizard cleanly when the activity is finishing. Clears in-memory
     * artifacts so a subsequent flow starts fresh.
     */
    fun onDestroy() {
        downloadFile?.delete()
        downloadFile = null
    }

    // ---------------------------------------------------------------
    // Internal: state mutation and system install.
    // ---------------------------------------------------------------

    private fun setCurrentState(newState: InstallState) {
        this.currentState = newState
        Log.d(logTag, "State -> ${newState::class.java.simpleName}")
    }

    private fun startPackageInstall() {
        val apkFile = downloadFile ?: File(context.cacheDir, InstallerConfig.APK_FILENAME)
        if (!apkFile.exists()) {
            setCurrentState(InstallState.Result(false, error = "APK not found for installation"))
            return
        }

        // Sanity: the system must be able to read it.
        if (!apkFile.canRead()) {
            setCurrentState(InstallState.Result(false, error = "APK is not readable"))
            return
        }

        // PackageInstaller (and the OEM frontend behind it) requires a content://
        // URI on Android 11+ (API 30+). FileProvider exposes the cache APK
        // without leaking a file:// scheme.
        val contentUri = android.support.v4.content.FileProvider.getUriForFile(
            context.applicationContext,
            "${context.applicationContext.packageName}.fileprovider",
            apkFile
        )

        try {
            val intent = Intent(Intent.ACTION_INSTALL_PACKAGE).apply {
                setDataAndType(contentUri, "application/vnd.android.package-archive")
                putExtra(Intent.EXTRA_INSTALLER_PACKAGE_NAME, context.packageName)
                // On Android 12+ the system requires the explicit auto-verify flag.
                if (android.os.Build.VERSION.SDK_INT >= 31) {
                    putExtra(
                        "android.intent.extra.INSTALL_AUTO_VERIFY",
                        true
                    )
                }
            }
            permissionLauncher.launch(intent)
        } catch (e: Exception) {
            setCurrentState(InstallState.Result(false, error = "Cannot launch installation"))
        }
    }
}
