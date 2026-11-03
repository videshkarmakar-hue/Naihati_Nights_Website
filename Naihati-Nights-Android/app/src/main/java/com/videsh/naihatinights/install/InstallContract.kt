package com.videsh.naihatinights.install

/**
 * Small contract used across the wizard and UI so the state machine only
 * depends on the shared types, not on Android framework details.
 */
object InstallContract {
    const val EXTRA_STATE = "extra_install_state"
    const val EXTRA_ERROR = "extra_install_error"
    const val EXTRA_MESSAGE = "extra_install_message"
    const val RESULT_SUCCESS = "install_success"
}
