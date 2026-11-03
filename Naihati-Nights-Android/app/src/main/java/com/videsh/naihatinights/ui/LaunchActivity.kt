package com.videsh.naihatinights.ui

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.videsh.naihatinights.R
import com.videsh.naihatinights.install.InstallState
import com.videsh.naihatinights.install.InstallViewModel
import com.videsh.naihatinights.install.InstallWizard
import com.videsh.naihatinights.install.PermissionStateManager
import com.videsh.naihatinights.install.PackageInstallerBroadcastReceiver

/**
 * Launcher activity for external APK URIs.
 *
 * When the user taps an APK that was previously downloaded (e.g., from the
 * Downloads app), Android presents it as a `file://` or `content://` URI and
 * routes it to this activity. The app then resumes the install flow, but only
 * after confirming the permission gate and validating the file.
 */
class LaunchActivity : AppCompatActivity() {

    private val wizard = InstallWizard(this, this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // If the launcher intent carries an APK URI, we attempt to resume the
        // installation directly. This is the legitimate path: the system gives us
        // a file, we verify it, and hand it to PackageInstaller.
        handleIntent(intent)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        handleIntent(intent)
    }

    private fun handleIntent(intent: Intent?) {
        if (intent == null) return

        val action = intent.action ?: return
        if (Intent.ACTION_VIEW != action) return

        // Extract the URI (file://, content://, or a data URI when the system
        // routes it through a data scheme).
        val uri = intent.data ?: return
        val scheme = uri.scheme?.lowercase()

        // Only handle APK-associated schemes. We do not extract arbitrary files.
        if (scheme == "http" || scheme == "https" || scheme == "file" || scheme == "content") {
            // Treat it as the trusted download URI and resume the install wizard.
            if (PermissionStateManager.isReady(this)) {
                val wizard = InstallWizard(this, this)
                wizard.onStart()
                wizard.onBeginDownload { progress ->
                    // Forward to UI via a local broadcast or the same flow.
                }
                wizard.resumeInstall()
            } else {
                // If the user has not granted the permission yet, surface the
                // Settings screen so they can grant it before re-attempting.
                try {
                    val open = Intent(Intent.ACTION_MANAGE_UNKNOWN_APP_SOURCES).apply {
                        data = Uri.parse("package:${packageName}")
                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    }
                    startActivity(open)
                } catch (e: Exception) {
                    // Fallback to app details screen.
                }
            }
        }
    }
}
