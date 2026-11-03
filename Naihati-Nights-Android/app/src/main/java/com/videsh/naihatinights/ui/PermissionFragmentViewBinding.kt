package com.videsh.naihatinights.ui

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.videsh.naihatinights.R

class PermissionFragmentViewBinding(
    private val root: View
) {
    val btnOpenSettings: Button = root.findViewById(R.id.btn_open_settings)
    val tvStatusHint: TextView = root.findViewById(R.id.tv_status_hint)
    val btnBackDownload: Button = root.findViewById(R.id.btn_back_download)

    companion object {
        fun inflate(
            inflater: LayoutInflater,
            parent: ViewGroup?,
            attachToParent: Boolean
        ): PermissionFragmentViewBinding {
            val view = inflater.inflate(R.layout.fragment_permission_required, parent, false)
            return PermissionFragmentViewBinding(view)
        }
    }
}
