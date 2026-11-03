package com.videsh.naihatinights.install

/**
 * Centralized download configuration derived from the website [APP_CONFIG].
 *
 * Keep the GitHub release URL in sync between `src/data/config.ts` and here.
 */
object InstallerConfig {
    /** Official download URL served over HTTPS from GitHub Releases. */
    const val APK_URL =
        "https://github.com/videshkarmakar-hue/Naihati-Nights/releases/download/v3.0.47/NaihatiNights-3.0.47.apk"

    /** Exact filename used for the Content-Disposition header. */
    const val APK_FILENAME = "NaihatiNights-3.0.47.apk"

    /** Expected version label shown on the success screen. */
    const val APK_VERSION = "3.0.47"

    /** Minimum usable storage (bytes) before we abort the download. */
    const val MIN_FREE_STORAGE_BYTES = 1024L * 1024L * 1024L * 256L // 256 MB
}
