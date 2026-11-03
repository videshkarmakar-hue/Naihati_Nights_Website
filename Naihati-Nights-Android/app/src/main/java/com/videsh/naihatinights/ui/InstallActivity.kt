package com.videsh.naihatinights.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.videsh.naihatinights.R
import com.videsh.naihatinights.install.InstallState
import com.videsh.naihatinights.install.InstallViewModel
import com.videsh.naihatinights.install.PermissionStateManager
import kotlinx.coroutines.launch

/**
 * Main installation activity.
 *
 * The UI is a stack of four fragments, one per major state:
 * 1. Download
 * 2. Preparing
 * 3. Permission Required
 * 4. Install Progress
 * Plus a Result screen (success / failure) shown at the end.
 */
class InstallActivity : AppCompatActivity() {

    private val viewModel: InstallViewModel by lazy {
        InstallViewModel(this.application)
    }

    private var currentFragment: Fragment = DownloadFragment()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_install)

        supportFragmentManager.beginTransaction()
            .replace(R.id.container, currentFragment)
            .commit()

        bindViewModels()
    }

    override fun onResume() {
        super.onResume()
        // Re-check the permission gate whenever the user returns from Settings.
        viewModel.onResume()
    }

    override fun onDestroy() {
        super.onDestroy()
        viewModel.onAction(InstallViewModel.Action.Destroy)
    }

    private fun bindViewModels() {
        viewLifecycleOwner.lifecycleScope.launch {
            viewModel.state.collect { state ->
                when (state) {
                    is InstallState.Initial -> {
                        currentFragment = DownloadFragment()
                        replaceFragment(currentFragment)
                    }
                    is InstallState.Prepared -> {
                        currentFragment = DownloadFragment()
                        replaceFragment(currentFragment)
                    }
                    is InstallState.PermissionRequired -> {
                        currentFragment = PermissionFragment()
                        replaceFragment(currentFragment)
                    }
                    is InstallState.Downloading -> {
                        currentFragment = PreparingFragment(state.progress)
                        replaceFragment(currentFragment)
                    }
                    is InstallState.DownloadComplete -> {
                        currentFragment = PreparingFragment()
                        replaceFragment(currentFragment)
                    }
                    is InstallState.Verifying -> {
                        // Mount the same progress screen; Phase = verify.
                    }
                    is InstallState.Installing -> {
                        currentFragment = InstallProgressFragment()
                        replaceFragment(currentFragment)
                    }
                    is InstallState.Result -> {
                        currentFragment = ResultFragment(state.success, state.error, state.message)
                        replaceFragment(currentFragment)
                    }
                }
            }
        }
    }

    private fun replaceFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.container, fragment)
            .commit()
        currentFragment = fragment
    }

    /**
     * Expose a small DSL for each screen to wire its button to the ViewModel.
     */
    fun execute(action: InstallViewModel.Action) {
        viewModel.onAction(action)
    }
}
