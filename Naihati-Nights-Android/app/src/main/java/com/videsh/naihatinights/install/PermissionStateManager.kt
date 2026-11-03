package com.videsh.naihatinights.install

import android.content.Context
import android.util.Log
import com.videsh.naihatinights.R

/**
 * Centralized, testable permission gate.
 *
 * On Android 8.0 (API 26) and above, "Install unknown apps" is a per-app
 * runtime permission. This class isolates all of that logic so the UI only
 * calls [isReady]. It also exposes the OEM-customization surface: some
 * manufacturers hide the setting, and some only expose the general app info
 * page.
 */
object PermissionStateManager {

    private const val TAG = "PermissionStateMgr"

    /**
     * True when the app can ask the system to install packages from unknown
     * sources. This is the definitive pre-install gate.
     */
    fun isReady(context: Context): Boolean {
        return UnknownSourcePermissionManager.isUnknownSourcePermissionGranted(context)
    }

    /**
     * Display a single, authoritative string describing the current state.
     * This is used for accessible, spoken, and troubleshooting copy.
     */
    fun describePermission(context: Context): String {
        val granted = isReady(context)
        return context.getString(
            if (granted) R.string.permission_unknown_enabled else R.string.permission_unknown_disabled
        )
    }

    /**
     * When false, it means the app is not allowed to install from unknown
     * sources; the UI should immediately show the "Open Settings" screen.
     */
    fun needsSettings(context: Context): Boolean = !isReady(context)
}
