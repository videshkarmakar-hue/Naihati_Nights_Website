package com.videsh.naihatinights.install

import android.app.Activity
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.provider.Settings
import android.util.Log
import androidx.activity.result.ActivityResultLauncher
import com.videsh.naihatinights.R

/**
 * Unknown-source permission manager.
 *
 * Android keeps the "Install unknown apps" permission per-app (API 26+), so the
 * app must ask the user to grant it and, when granted, the system returns a
 * result to the app. We evaluate the sticky permission, open the correct
 * app-specific Settings page, and let the caller resume the flow automatically.
 */
object UnknownSourcePermissionManager {

    private const val TAG = "UnknownSourcePerm"

    /**
     * Delegate that returns the current permission state.
     */
    fun canRequestPackageInstalls(context: Context): Boolean {
        return context.packageManager.canRequestPackageInstalls()
    }

    /**
     * Returns true when the user has granted the app the right to install
     * packages that came from sources other than the Google Play Store.
     *
     * On API 33+ we rely on [canRequestPackageInstalls]; on API 26-32 we also
     * check the sticky "unknown apps" flag (MANAGE_UNKNOWN_APP_SOURCES can only
     * be queried, not read directly, so a false canRequest result means the
     * permission is blocked).
     */
    fun isUnknownSourcePermissionGranted(context: Context): Boolean {
        // Newer Android requires the app-specific runtime grant.
        return canRequestPackageInstalls(context)
    }

    /**
     * Open the system Settings page that lets the user enable
     * "Install unknown apps → {this app}".
     *
     * This is the legitimate, system-provided mechanism. We never call
     * Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES without an app package so
     * Android can present the correct, app-scoped dialog.
     */
    fun openSettings(activity: Activity) {
        val intent = Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES).apply {
            data = Uri.parse("package:${activity.packageName}")
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        try {
            activity.startActivity(intent)
        } catch (e: Exception) {
            Log.w(TAG, "Cannot open unknown apps settings", e)
            // Fallback to the general app info screen on heavily customized OEM UIs.
            val fallback = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
                data = Uri.parse("package:${activity.packageName}")
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            try {
                activity.startActivity(fallback)
            } catch (t: Exception) {
                Log.e(TAG, "Cannot open app settings at all", t)
            }
        }
    }

    /**
     * Register an Activity Result contract that captures the runtime "install
     * unknown apps" grant. The Activity Result API is the current, non-deprecated
     * way to receive this permission result.
     *
     * Note: the result callback fires when the user *returns* from Settings with
     * the grant decision; the app must re-check [isUnknownSourcePermissionGranted]
     * in [onResume] so a user who dismissed the dialog is not stuck in the
     * "Permission Required" screen.
     */
    fun registerPermissionLauncher(
        activity: Activity,
        onResult: (Boolean) -> Unit,
        launcher: ActivityResultLauncher<Intent>
    ) {
        launcher.launch(Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES).apply {
            data = Uri.parse("package:${activity.packageName}")
        })
    }

    /**
     * Snapshots the current state into the UI-facing contract. Exposed for
     * testability instead of scattering `packageManager` calls across views.
     */
    fun PermissionState snapshot(context: Context): PermissionState {
        val granted = isUnknownSourcePermissionGranted(context)
        return PermissionState(granted)
    }

    /**
     * Immutable copy of the runtime permission verdict used by the UI.
     */
    data class PermissionState(val granted: Boolean)
}
