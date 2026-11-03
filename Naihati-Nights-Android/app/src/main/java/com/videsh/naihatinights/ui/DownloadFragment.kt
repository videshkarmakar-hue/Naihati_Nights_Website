package com.videsh.naihatinights.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.videsh.naihatinights.R

/**
 * Download screen: lets the user initiate the APK download from the trusted
 * GitHub release URL, with a progress indicator and a manual-open fallback.
 */
class DownloadFragment : Fragment() {

    private var _binding: DownloadFragmentViewBinding? = null
    private val binding get() = _binding!!

    private val viewModel: InstallViewModel by lazy {
        requireActivity().application as InstallViewModel
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = DownloadFragmentViewBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        bindViews()
        observeViewModel()
        setupListeners()
    }

    private fun bindViews() {
        binding.tvStatusBadge.text = getString(R.string.download_waiting)
        binding.progressBar.visibility = View.GONE
        binding.tvProgressLabel.text = "0%"
    }

    private fun observeViewModel() {
        viewModel.state.observe(requireActivity(), { state ->
            when (state) {
                is InstallState.Downloading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.tvProgressLabel.text = "${(state.progress * 100).toInt()}%"
                }
                InstallState.DownloadComplete -> {
                    binding.progressBar.visibility = View.GONE
                    binding.tvProgressLabel.text = "Ready"
                    // Re-trigger install flow when the download completes.
                    viewModel.onAction(InstallViewModel.Action.ResumeInstall)
                }
                is InstallState.Result -> {
                    if (state.success) {
                        // Success state is handled by the main activity.
                    }
                }
                else -> {}
            }
        })
    }

    private fun setupListeners() {
        binding.btnDownload.setOnClickListener {
            viewModel.onAction(InstallViewModel.Action.BeginDownload { progress ->
                binding.tvProgressLabel.text = "${(progress * 100).toInt()}%"
            })
        }

        binding.tvOpenManual.setOnClickListener {
            // Fallback: the user can manually open the APK URL from the
            // website. This never bypasses system security.
            val url = getString(R.string.apk_download_url)
            try {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                startActivity(intent)
            } catch (e: Exception) {
                // If they cannot open it, show a message to manually open the URL.
                // The app's README documents this.
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
