package com.videsh.naihatinights.install

/**
 * Single source of truth for the APK installation flow state.
 *
 * Every screen reads from this sealed class so the UI has one source of truth
 * and clients only need to handle the five states: prepared, permission, download,
 * installing, and result.
 */
sealed class InstallState {
    object Initial : InstallState()
    object Prepared : InstallState()
    object PermissionRequired : InstallState()
    data class Downloading(val progress: Float = 0f) : InstallState()
    object DownloadComplete : InstallState()
    object Verifying : InstallState()
    object Installing : InstallState()
    data class Result(
        val success: Boolean,
        val error: String? = null,
        val message: String? = null
    ) : InstallState()
}
