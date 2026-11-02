import { APP_CONFIG } from '../data/config';

// Exact APK release URL requested by user
export const PRIMARY_APK_URL =
  'https://github.com/videshkarmakar-hue/Naihati-Nights/releases/download/v3.0.39/NaihatiNights-3.0.39.apk';

/**
 * Triggers APK download directly for the specified release URL and filename.
 * Opens clean download stream with download="NaihatiNights-3.0.39.apk" and target="_blank".
 */
export function triggerDirectApkDownload(
  url = APP_CONFIG.APP_DOWNLOAD_URL,
  filename = APP_CONFIG.apkFileName
): void {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.style.position = 'fixed';
    link.style.top = '-9999px';
    link.style.left = '-9999px';
    link.style.opacity = '0';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      try {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      } catch {}
    }, 1500);
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// Export alias for backward compatibility
export const triggerSafeDownload = triggerDirectApkDownload;
