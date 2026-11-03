package com.videsh.naihatinights.ui

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.videsh.naihatinights.R

class PreparingFragmentViewBinding(
    private val root: View
) {
    val progressBar: android.widget.ProgressBar = root.findViewById(R.id.progress_bar)
    val tvProgressText: TextView = root.findViewById(R.id.tv_progress_text)
    val tvSubtitle: TextView = root.findViewById(R.id.tv_subtitle)
    val btnCancel: Button = root.findViewById(R.id.btn_cancel)

    companion object {
        fun inflate(
            inflater: LayoutInflater,
            parent: ViewGroup?,
            attachToParent: Boolean
        ): PreparingFragmentViewBinding {
            val view = inflater.inflate(R.layout.fragment_preparing, parent, false)
            return PreparingFragmentViewBinding(view)
        }
    }
}
