package com.videsh.naihatinights.install

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

/**
 * BroadcastReceiver that detects when the installed package changes
 * (added, replaced, or removed).
 *
 * This lets the app automatically resume a workflow when the user returns from
 * system Settings with the unknown-source permission granted, or when the app
 * is reinstalled on older Android versions.
 */
class PackageInstallerBroadcastReceiver : BroadcastReceiver() {
    private val logTag = "PackageInstallerRx"

    override fun onReceive(context: Context, intent: Intent) {
        val action = intent.action ?: return
        val pkg = intent.data?.schemeSpecificPart ?: return

        Log.d(logTag, "Package broadcast $action $pkg")

        // Not every broadcast warrants UI work; the InstallWizard re-reads
        // permission state in resumeInstall(), so we only surface a lightweight
        // hint here. The UI must re-check PermissionStateManager.isReady()
        // onResume to avoid a stale PermissionRequired screen.
        if (action == "android.intent.action.PACKAGE_ADDED" ||
            action == "android.intent.action.PACKAGE_REPLACED" ||
            action == "android.intent.action.PACKAGE_REMOVED"
        ) {
            // Optional: dispatch a local broadcast to refresh the UI.
        }
    }
}
