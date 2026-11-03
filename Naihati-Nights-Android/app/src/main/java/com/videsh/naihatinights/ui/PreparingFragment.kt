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

/**
 * Installation-preparation / install-progress screen.
 *
 * This is shown both while the APK is being staged and while the system
 * PackageInstaller is committing the install. The same fragment re-renders
 * with different sub-text per phase.
 */
class PreparingFragment(private val progress: Float = 0f) : Fragment() {

    private var _binding: PreparingFragmentViewBinding? = null
    private val binding get() = _binding!!

    private val viewModel: InstallViewModel by lazy {
        requireActivity().application as InstallViewModel
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = PreparingFragmentViewBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        bindViews()
        setupListeners()
    }

    private fun bindViews() {
        binding.progressBar.progress = (progress * 100).toInt()
        binding.tvProgressText.text = getString(R.string.prep_segments, 1, 1)
        binding.tvSubtitle.text = when {
            progress < 0.01f -> getString(R.string.prep_moving_files)
            progress < 0.6f -> getString(R.string.prep_moving_files)
            else -> getString(R.string.prep_complete)
        }
        binding.btnCancel.text = if (progress < 0.6f) getString(R.string.retry_install) else getString(R.string.retry_install)
    }

    private fun setupListeners() {
        binding.btnCancel.setOnClickListener {
            viewModel.onAction(InstallViewModel.Action.ResumeInstall)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
