package com.videsh.naihatinights.ui

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.videsh.naihatinights.R

class ResultFragmentViewBinding(
    private val root: View
) {
    val ivIcon: ImageView = root.findViewById(R.id.iv_icon)
    val tvHeading: TextView = root.findViewById(R.id.tv_heading)
    val tvMessage: TextView = root.findViewById(R.id.tv_message)
    val btnAction: Button = root.findViewById(R.id.btn_action)
    val btnRetry: Button = root.findViewById(R.id.btn_retry)
    val btnClose: Button = root.findViewById(R.id.btn_close)

    companion object {
        fun inflate(
            inflater: LayoutInflater,
            parent: ViewGroup?,
            attachToParent: Boolean
        ): ResultFragmentViewBinding {
            val view = inflater.inflate(R.layout.fragment_result, parent, false)
            return ResultFragmentViewBinding(view)
        }
    }
}
