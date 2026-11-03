package com.videsh.naihatinights.ui

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.core.content.FileProvider
import androidx.fragment.app.Fragment
import com.videsh.naihatinights.R
import com.videsh.naihatinights.install.InstallState
import com.videsh.naihatinights.install.InstallViewModel

/**
 * Success / failure result screen.
 *
 * Shows an outcome and includes actions to retry, reopen the app (on success),
 * or navigate to Settings / Help (on failure). The app never hides the system
 * error; it maps the system's message into the troubleshooting copy.
 */
class ResultFragment(
    private val success: Boolean,
    private val error: String?,
    private val message: String?
) : Fragment() {

    private var _binding: ResultFragmentViewBinding? = null
    private val binding get() = _binding!!

    private val viewModel: InstallViewModel by lazy {
        requireActivity().application as InstallViewModel
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = ResultFragmentViewBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        bindViews()
        setupListeners()
    }

    private fun bindViews() {
        binding.tvHeading.text = if (success) {
            getString(R.string.progress_complete)
        } else {
            getString(R.string.progress_failed)
        }

        // Map the system's failure message into the user-facing troubleshooting string.
        val detail = when {
            success -> null
            error?.contains("HTTP", ignoreCase = true) == true -> getString(R.string.fail_error_delivery)
            error?.contains("install", ignoreCase = true) == true || error?.contains("Permission", true) == true ->
                getString(R.string.fail_error_install_blocked)
            error?.contains("space", ignoreCase = true) == true || error?.contains("storage", ignoreCase = true) == true ->
                getString(R.string.fail_error_insufficient_space)
            error?.contains("corrupt", ignoreCase = true) == true || error?.contains("Invalid", true) == true || error?.contains("validate", true) == true ->
                getString(R.string.fail_error_corrupt)
            error?.contains("signature", ignoreCase = true) == true ->
                getString(R.string.fail_error_signature)
            error?.contains("not found", ignoreCase = true) == true ->
                getString(R.string.fail_error_not_found)
            error?.contains("cancelled", ignoreCase = true) == true ->
                getString(R.string.fail_error_user_cancelled)
            else -> getString(R.string.fail_error_generic)
        }

        binding.tvMessage.text = detail?.let {
            String.format(it, error)
        } ?: message

        binding.ivIcon.setImageResource(
            if (success) R.drawable.ic_check_circle else R.drawable.ic_error
        )

        // Highlight the right buttons depending on outcome.
        binding.btnAction.visibility = if (success) View.VISIBLE else View.GONE
        binding.btnRetry.visibility = View.VISIBLE
        binding.btnClose.visibility = View.VISIBLE
    }

    private fun setupListeners() {
        binding.btnAction.setOnClickListener {
            // On success, open the app's main launcher. The app is installed
            // and the package manager handles the launch.
            try {
                val mainIntent = Intent(Intent.ACTION_MAIN).apply {
                    addCategory(Intent.CATEGORY_LAUNCHER)
                    setPackage(requireContext().packageName)
                }
                startActivity(mainIntent)
            } catch (e: Exception) {
                // Fall back to opening the app's deep link.
            }
        }

        binding.btnRetry.setOnClickListener {
            viewModel.onAction(InstallViewModel.Action.Start)
        }

        binding.btnClose.setOnClickListener {
            val finish = Activity::class.java.getMethod("finish")
            finish.invoke(requireActivity())
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
