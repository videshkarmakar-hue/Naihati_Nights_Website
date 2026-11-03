package com.videsh.naihatinights.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.videsh.naihatinights.R
import com.videsh.naihatinights.install.InstallState
import com.videsh.naihatinights.install.InstallViewModel
import com.videsh.naihatinights.install.PermissionStateManager

/**
 * Installation progress screen.
 *
 * This fragment bridges the system PackageInstaller progress to the UI. The
 * progress value is reported by the system's installer; the app reflects it
 * on screen. On cancellation or failure, the system returns RESULT_CANCELED,
 * which the activity treats as "installation blocked" and surfaces on the
 * Result screen with actionable troubleshooting.
 */
class InstallProgressFragment : Fragment() {

    private var _binding: InstallProgressFragmentViewBinding? = null
    private val binding get() = _binding!!

    private val viewModel: InstallViewModel by lazy {
        requireActivity().application as InstallViewModel
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = InstallProgressFragmentViewBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        bindViews()
        setupListeners()
    }

    private fun bindViews() {
        binding.progressBar.visibility = View.VISIBLE
        binding.tvStatusLabel.text = getString(R.string.progress_preparing)
    }

    private fun setupListeners() {
        binding.btnCancelInstall.setOnClickListener {
            // PackageInstaller listens for a cancel; on API 24+ the system
            // shows the user a dialog and returns RESULT_CANCELED.
            viewModel.onAction(InstallViewModel.Action.ResumeInstall)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
