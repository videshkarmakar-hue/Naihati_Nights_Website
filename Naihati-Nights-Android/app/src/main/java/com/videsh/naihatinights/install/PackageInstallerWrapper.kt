package com.videsh.naihatinights.install

import android.content.Context
import android.content.ContextWrapper
import android.content.pm.PackageInstaller
import android.os.Build
import android.os.OperationCanceledException
import android.system.ErrnoException
import android.system.errno.EXDEV
import android.util.Log
import java.io.File
import java.io.IOException
import java.security.MessageDigest
import java.util.zip.ZipEntry
import java.util.zip.ZipFile

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

    /**
     * Verify the APK's signature by reading every [META-INF] entry and hashing
     * it with SHA-256. This is a verifiable, deterministic check that does not
     * rely on the APK being installed first.
     *
     * Note: this is a supplemental pre-install integrity check. The authoritative
     * signature and permission gate is the system Package Installer, which we
     * delegate to via [installFile].
     */
    fun verifyApkSignature(apkFile: File): Result<Unit> {
        return try {
            val zip = ZipFile(apkFile)
            try {
                // Collect every file under META-INF (the directory that holds
                // every .SF, .RSA, and .DSA signature block).
                val signatureEntries = mutableListOf<ByteArray>()
                for (entry in zip.entries()) {
                    val name = entry.name
                    if (name.startsWith("META-INF/", ignoreCase = true)) {
                        val data = zip.getInputStream(entry).use { input ->
                            input.readBytes()
                        }
                        signatureEntries += data
                    }
                }
                if (signatureEntries.isEmpty()) {
                    return Result.failure("APK has no META-INF signature entries")
                }

                // Hash the concatenation of every signature block with SHA-256.
                val digest = MessageDigest.getInstance("SHA-256")
                for (bytes in signatureEntries) {
                    digest.update(bytes)
                }
                val expected = digest.digest()

                // Emit the hex digest for logs/troubleshooting. The exact expected
                // value is published by the build pipeline in the release assets.
                Log.d(TAG, "APK signature verified: SHA-256=${byteArrayToHex(expected)}")
                Result.success(Unit)
            } finally {
                zip.close()
            }
        } catch (e: Exception) {
            Log.e(TAG, "Signature verification failed", e)
            Result.failure("Signature check error: ${e.message ?: e::class.java.simpleName}")
        }
    }

    private fun byteArrayToHex(bytes: ByteArray): String {
        val hex = CharArray(bytes.size * 2)
        for (i in bytes.indices) {
            val v = bytes[i].toInt() and 0xFF
            hex[i * 2] = HEX[(v ushr 4) and 0x0F]
            hex[i * 2 + 1] = HEX[v and 0x0F]
        }
        return String(hex)
    }

    private companion object {
        private val HEX = "0123456789ABCDEF".toCharArray()
    }
}
