package com.videsh.naihatinights.ui

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.videsh.naihatinights.R

/**
 * Placeholder ViewBinding for DownloadFragment.
 *
 * This is auto-generated-ish; since we use a static layout file, we write the
 * minimal bind class that the fragment expects.
 */
class DownloadFragmentViewBinding(
    private val root: View
) {
    val tvStatusBadge: TextView = root.findViewById(R.id.tv_status_badge)
    val progressBar: android.widget.ProgressBar = root.findViewById(R.id.progress_bar)
    val tvProgressLabel: TextView = root.findViewById(R.id.tv_progress_label)
    val btnDownload: Button = root.findViewById(R.id.btn_download)
    val tvOpenManual: TextView = root.findViewById(R.id.tv_open_manual)

    companion object {
        fun inflate(
            inflater: LayoutInflater,
            parent: ViewGroup?,
            attachToParent: Boolean
        ): DownloadFragmentViewBinding {
            val view = inflater.inflate(R.layout.fragment_download, parent, false)
            return DownloadFragmentViewBinding(view)
        }
    }
}
