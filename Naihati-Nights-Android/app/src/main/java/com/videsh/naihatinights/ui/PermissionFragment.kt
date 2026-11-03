package com.videsh.naihatinights.ui

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.videsh.naihatinights.R
import com.videsh.naihatinights.install.InstallState
import com.videsh.naihatinights.install.InstallViewModel
import com.videsh.naihatinights.install.PermissionStateManager

/**
 * Unknown-source permission screen.
 *
 * This screen explains the Android permission model, detects whether the
 * permission is granted, and opens the correct settings screen when the user
 * needs to grant it. It never attempts to bypass the security restriction.
 */
class PermissionFragment : Fragment() {

    private var _binding: PermissionFragmentViewBinding? = null
    private val binding get() = _binding!!

    private val viewModel: InstallViewModel by lazy {
        requireActivity().application as InstallViewModel
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = PermissionFragmentViewBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        bindViews()
        setupListeners()
    }

    private fun bindViews() {
        val granted = PermissionStateManager.isReady(requireContext())
        binding.tvStatusHint.text = if (granted) {
            getString(R.string.permission_unknown_enabled)
        } else {
            getString(R.string.permission_unknown_disabled)
        }
    }

    private fun setupListeners() {
        binding.btnOpenSettings.setOnClickListener {
            // Show the generic "unknown sources" screen for the app.
            val intent = Intent(Intent.ACTION_MANAGE_UNKNOWN_APP_SOURCES).apply {
                data = Uri.parse("package:${requireContext().packageName}")
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            startActivity(intent)
        }

        binding.btnBackDownload.setOnClickListener {
            viewModel.onAction(InstallViewModel.Action.Start)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
