import React, { useState, useRef, useCallback } from 'react';
import { Download, Check, Loader2, CloudDownload, ArrowRight, Zap } from 'lucide-react';
import { APP_CONFIG, LATEST_UPDATE_INFO } from '../data/config';
import { recordDownload } from '../lib/firebase';

export type DownloadAnimationVariant =
  | 'hero-beam'
  | 'circular-action'
  | 'capsule-sheen'
  | 'telemetry-radar'
  | 'magnetic-sheen'
  | 'bottom-bar'
  | 'minimal-link'
  | 'google-drive-glass'
  | 'pill-arrow';

export interface AestheticDownloadButtonProps {
  id: string;
  variant?: DownloadAnimationVariant;
  label?: string;
  sublabel?: string;
  badge?: string;
  activeLabel?: string;
  completedLabel?: string;
  href?: string;
  className?: string;
  iconClassName?: string;
  showVersion?: boolean;
  versionText?: string;
  ariaLabel?: string;
  onDownloadTriggered?: () => void;
  children?: React.ReactNode;
}

type DownloadState = 'idle' | 'initiating' | 'progressing' | 'completed';

export const AestheticDownloadButton: React.FC<AestheticDownloadButtonProps> = ({
  id,
  variant = 'hero-beam',
  label,
  sublabel,
  badge,
  activeLabel,
  completedLabel,
  href,
  className = '',
  iconClassName = '',
  showVersion = false,
  versionText = LATEST_UPDATE_INFO.version,
  ariaLabel,
  onDownloadTriggered,
  children,
}) => {
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMirror = variant === 'google-drive-glass';

  // Direct stable hosting binary URL ensures mobile browsers download the raw .apk file directly
  // without navigating to GitHub's web interface or hitting a 404.
  const effectiveHref =
    href ||
    (isMirror
      ? APP_CONFIG.APP_DOWNLOAD_MIRROR_URL
      : APP_CONFIG.APP_DIRECT_APK_URL);

  const defaultLabel =
    label ||
    (isMirror
      ? 'Mirror Link'
      : showVersion
      ? `Download App (${versionText})`
      : 'Download App');
  const defaultActiveLabel = activeLabel || 'Downloading...';
  const defaultCompletedLabel = completedLabel || 'Download Started';
  const downloadFileName = APP_CONFIG.apkFileName;

  const handleClick = useCallback(() => {
    // Record download analytics in Firestore
    recordDownload().catch(() => {});

    setDownloadState('initiating');

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setDownloadState('progressing');

      timerRef.current = setTimeout(() => {
        setDownloadState('completed');

        timerRef.current = setTimeout(() => {
          setDownloadState('idle');
        }, 2200);
      }, 500);
    }, 250);

    if (onDownloadTriggered) {
      onDownloadTriggered();
    }
  }, [onDownloadTriggered]);

  const currentLabelText =
    downloadState === 'initiating'
      ? defaultActiveLabel
      : downloadState === 'progressing'
      ? 'Starting Download...'
      : downloadState === 'completed'
      ? defaultCompletedLabel
      : children || defaultLabel;

  // Reference Circular Action Button (matching Goodev style action pill)
  if (variant === 'circular-action') {
    return (
      <div className="relative inline-flex select-none">
        <a
          id={id}
          href={effectiveHref}
          download={downloadFileName}
          onClick={handleClick}
          aria-label={ariaLabel || `Download ${APP_CONFIG.nameBn} APK`}
          className={`group inline-flex items-center gap-3.5 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A] ${className}`}
        >
          {/* Action Badge */}
          <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F0660A] text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#F0660A]/20 transition-all duration-200 group-hover:scale-105 group-hover:bg-[#D65505] group-active:scale-95">
            {downloadState === 'initiating' || downloadState === 'progressing' ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
            ) : downloadState === 'completed' ? (
              <Check className="w-4 h-4 text-white stroke-[2.5]" aria-hidden="true" />
            ) : (
              <Zap className="w-4 h-4 text-white fill-white transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
            )}
          </span>

          {/* Adjacent Label Typography */}
          <div className="flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#F0660A] font-semibold leading-none mb-1">
              {sublabel || 'OFFICIAL APK'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight group-hover:text-[#F0660A] transition-colors">
              {currentLabelText}
            </span>
          </div>
        </a>
      </div>
    );
  }

  // Mirror Link: Clean high-contrast dark button with subtle border using #3E2723
  if (isMirror) {
    return (
      <div className="relative inline-flex select-none">
        <a
          id={id}
          href={effectiveHref}
          download={downloadFileName}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          aria-label={ariaLabel || `Download APK from Mirror Link`}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium tracking-tight cursor-pointer transition-all duration-150 bg-[#3E2723] hover:bg-[#4E342E] active:bg-[#2B1B18] text-[#D7CCC8] hover:text-white border border-[#5D4037] hover:border-[#F0660A]/50 shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A] ${className}`}
        >
          {downloadState === 'initiating' || downloadState === 'progressing' ? (
            <Loader2 className="w-4 h-4 animate-spin text-white/80 shrink-0" aria-hidden="true" />
          ) : downloadState === 'completed' ? (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          ) : (
            <CloudDownload className={`w-4 h-4 text-[#F0660A] shrink-0 ${iconClassName}`} aria-hidden="true" />
          )}

          <span>{currentLabelText}</span>

          {badge && (
            <span className="text-[10px] font-mono text-[#A1887F] ml-1">
              ({badge})
            </span>
          )}
        </a>
      </div>
    );
  }

  // Primary Action Button: Goodev style "Get Started ⚡" pill button with #F0660A
  const isPillArrow = variant === 'hero-beam' || variant === 'pill-arrow' || variant === 'capsule-sheen';

  if (isPillArrow) {
    return (
      <div className="relative inline-flex select-none">
        <a
          id={id}
          href={effectiveHref}
          download={downloadFileName}
          onClick={handleClick}
          aria-label={ariaLabel || `Download ${APP_CONFIG.nameBn} APK`}
          className={`group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-tight cursor-pointer transition-all duration-150 bg-[#F0660A] hover:bg-[#D65505] active:bg-[#BF4A03] text-white border border-[#FF7B29]/30 shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A] ${className}`}
        >
          <span>{currentLabelText}</span>

          {downloadState === 'initiating' || downloadState === 'progressing' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" aria-hidden="true" />
          ) : downloadState === 'completed' ? (
            <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" aria-hidden="true" />
          ) : (
            <Zap className="w-3.5 h-3.5 text-white fill-white transition-transform duration-150 group-hover:scale-110" aria-hidden="true" />
          )}
        </a>
      </div>
    );
  }

  // Compact / Header button (Goodev style Get Started pill)
  return (
    <div className="relative inline-flex select-none">
      <a
        id={id}
        href={effectiveHref}
        download={downloadFileName}
        onClick={handleClick}
        aria-label={ariaLabel || `Download APK`}
        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-tight cursor-pointer transition-all duration-150 bg-[#F0660A] hover:bg-[#D65505] active:bg-[#BF4A03] text-white border border-[#FF7B29]/30 shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A] ${className}`}
      >
        {downloadState === 'initiating' || downloadState === 'progressing' ? (
          <Loader2 className="w-3 h-3 animate-spin text-white" aria-hidden="true" />
        ) : downloadState === 'completed' ? (
          <Check className="w-3 h-3 text-white" aria-hidden="true" />
        ) : (
          <Zap className="w-3 h-3 text-white fill-white" aria-hidden="true" />
        )}
        <span>{currentLabelText}</span>
      </a>
    </div>
  );
};
