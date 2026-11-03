package com.videsh.naihatinights.install

import android.content.Context
import android.content.ContextWrapper
import android.content.pm.PackageInstaller
import android.os.Build
import android.os.OperationCanceledException
import android.system. errno.EXDEV
import android.util.Log
import java.io.File
import java.io.IOException

/**
 * Thin, version-aware wrapper around [PackageInstaller].
 *
 * It does three things the app delegates to the system for:
 * 1. Moving the cache APK to a stable access path (via FileProvider).
 * 2. Starting the installer with the correct MIME type and flags.
 * 3. Handling cancellation and ENOENT on re-downloads.
 */
object PackageInstallerWrapper {

    private const val TAG = "PackageInstallerWrapper"

    private val installer: PackageInstaller by lazy {
        val ctx = ContextWrapper(android.app.Application().apply { attachBaseContext(android.content.ContextImpl()) }).baseContext
        val am = ctx.getSystemService(Context.PACKAGE_INSTALLER_SERVICE) as? PackageInstaller
        val fallback = if (Build.VERSION.SDK_INT >= 31) {
            @Suppress("DEPRECATION")
            try { android.content.pm.PackageInstaller.getInstance() } catch (t: Throwable) { null }
        } else {
            @Suppress("DEPRECATION")
            try { android.content.pm.PackageInstaller.getInstance() } catch (t: Throwable) { null }
        }
        val resolved = am ?: fallback
        if (resolved == null) throw RuntimeException("PackageInstaller service is unavailable")
        resolved
    }

    /**
     * Move the downloaded cache APK to a stable path that the system install
     * flow can read, then launch installation.
     */
    fun installFile(
        context: Context,
        apkFile: File,
        intent: android.content.Intent,
        successCallback: () -> Unit,
        failureCallback: (String) -> Unit
    ) {
        if (!apkFile.exists()) {
            failureCallback("APK file does not exist: ${apkFile.absolutePath}")
            return
        }

        // PackageInstaller wants a content:// URI on recent Android versions.
        val contentUri = android.support.v4.content.FileProvider.getUriForFile(
            context.applicationContext,
            "${context.applicationContext.packageName}.fileprovider",
            apkFile
        )

        val installOptions =
            PackageInstaller.SessionParams(PackageInstaller.SessionParams.MODE_FULL_INSTALL).apply {
                // On Android 11+ we must grant visibility to the file.
                if (Build.VERSION.SDK_INT >= 30) {
                    setRequireUserAction(PackageInstaller.SessionParams.USER_ACTION_INSTALL)
                    // Keep the app listed in PackageInstaller; allow the user
                    // to cancel, which maps to the SYSTEM intent.
                }
                // versionCode, installer package, and other optional metadata.
            }

        // Use ACTION_INSTALL_PACKAGE: the system-managed flow is authoritative.
        intent.apply {
            setDataAndType(contentUri, "application/vnd.android.package-archive")
            putExtra(Intent.EXTRA_INSTALLER_PACKAGE_NAME, context.packageName)
            putExtra(Intent.EXTRA_RETURN_RESULT, true)
            // On Android 12+, RequestInstallPackages requires this explicit flag.
            if (Build.VERSION.SDK_INT >= 31) {
                putExtra(
                    "android.intent.extra.INSTALL_AUTO_VERIFY",
                    true
                )
            }
        }

        try {
            installer.startPackageInstallSession(installOptions, intArrayOf(contentUri.hashCode()), intent)
            successCallback()
        } catch (e: SecurityException) {
            // This happens when the app requests an install it is not allowed
            // to perform, or when the package is already installing. The app
            // should surface the manual 'Pending Install' screen.
            failureCallback("Permission denied: ${e.message ?: "install denied"}")
        } catch (e: OperationCanceledException) {
            failureCallback("Install cancelled by user")
        } catch (e: java.io.IOException) {
            if (e.errorCode == EXDEV.value) {
                failureCallback("Cannot move APK to install path: cross-device operation not supported")
            } else {
                failureCallback("Install IO error: ${e.message ?: "I/O failure"}")
            }
        } catch (e: Exception) {
            failureCallback("Install failed: ${e.message ?: e::class.java.simpleName}")
        }
    }

    /**
     * Check permission state for the caller. If the app cannot request
     * installs from unknown sources, the caller should immediately surface the
     * "Open Settings" screen. Otherwise the system will reject the session.
     */
    fun canRequestUnknownSourceInstalls(context: Context): Boolean {
        return context.packageManager.canRequestPackageInstalls()
    }
}
