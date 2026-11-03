package com.videsh.naihatinights.ui

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.videsh.naihatinights.R

class InstallProgressFragmentViewBinding(
    private val root: View
) {
    val progressBar: android.widget.ProgressBar = root.findViewById(R.id.progress_bar)
    val tvStatusLabel: TextView = root.findViewById(R.id.tv_status_label)
    val btnCancelInstall: Button = root.findViewById(R.id.btn_cancel_install)

    companion object {
        fun inflate(
            inflater: LayoutInflater,
            parent: ViewGroup?,
            attachToParent: Boolean
        ): InstallProgressFragmentViewBinding {
            val view = inflater.inflate(R.layout.fragment_install_progress, parent, false)
            return InstallProgressFragmentViewBinding(view)
        }
    }
}
