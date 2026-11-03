package com.videsh.naihatinights.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.videsh.naihatinights.install.InstallState
import com.videsh.naihatinights.install.InstallWizard
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * UI ViewModel for the installation flow.
 *
 * Holds a single [InstallState] that every screen reads, and exposes the
 * small set of actions the user can trigger. The underlying work is performed
 * on the ViewModel's coroutine scope to keep the UI thread free.
 */
class InstallViewModel(application: Application) : AndroidViewModel(application) {
    private val wizard = InstallWizard(application, getApplication() as android.app.Activity)

    private val _state = MutableStateFlow<InstallState>(wizard.currentState)
    val state: StateFlow<InstallState> = _state.asStateFlow()

    init {
        viewModelScope.launch {
            // Mirror the wizard's current state into the UI.
            _state.value = wizard.currentState
        }
    }

    fun onAction(action: Action) {
        when (action) {
            is Action.Start -> wizard.onStart()
            is Action.BeginDownload -> wizard.onBeginDownload(action.progressListener)
            is Action.RequestPermission -> wizard.requestPermission()
            is Action.ResumeInstall -> wizard.resumeInstall()
            is Action.Destroy -> wizard.onDestroy()
        }
    }

    fun onResume() {
        wizard.resumeInstall()
        _state.value = wizard.currentState
    }

    enum class Action {
        Start,
        BeginDownload,
        RequestPermission,
        ResumeInstall,
        Destroy
    }
}
