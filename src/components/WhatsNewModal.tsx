import React, { useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Zap,
  TrainTrack,
  Train,
  Compass,
  LifeBuoy,
  MapPin,
  BatteryCharging,
} from 'lucide-react';
import { LATEST_UPDATE_INFO, APP_CONFIG } from '../data/config';
import { UpdateFeatureItem } from '../types';
import { AestheticDownloadButton } from './AestheticDownloadButton';

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<UpdateFeatureItem['iconName'], React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Zap,
  TrainTrack,
  Train,
  Compass,
  LifeBuoy,
  MapPin,
  BatteryCharging,
};

export const WhatsNewModal: React.FC<WhatsNewModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const continueBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      continueBtnRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="whats-new-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="whats-new-modal-heading"
      aria-describedby="whats-new-modal-desc"
    >
      <div
        ref={modalRef}
        id="whats-new-modal-card"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#3E2723] border border-[#5D4037] shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.08] flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-xs text-[#A1887F] font-mono">
                <img
                  src={APP_CONFIG.APP_ICON_URL}
                  alt={`${APP_CONFIG.nameBn} App Icon`}
                  className="w-4 h-4 rounded-xs object-contain"
                />
                <span>Release Notes</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#F0660A] font-semibold">{LATEST_UPDATE_INFO.version}</span>
              </div>

              <h2
                id="whats-new-modal-heading"
                className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight"
              >
                {LATEST_UPDATE_INFO.heading}
              </h2>
            </div>

            <button
              id="whats-new-close-btn"
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg text-[#D7CCC8] hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A] cursor-pointer flex items-center justify-center flex-shrink-0"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <p
            id="whats-new-modal-desc"
            className="text-xs sm:text-sm text-[#D7CCC8] leading-relaxed mt-2 max-w-xl font-sans"
          >
            {LATEST_UPDATE_INFO.supportingText}
          </p>
        </div>

        {/* Feature List */}
        <div
          id="whats-new-features-scroll"
          className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 space-y-2.5 custom-scrollbar"
        >
          {LATEST_UPDATE_INFO.features.map((feature) => {
            const Icon = iconMap[feature.iconName] || Sparkles;
            return (
              <div
                key={feature.id}
                id={`update-${feature.id}`}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-colors duration-150"
              >
                <div
                  className="w-9 h-9 rounded-lg bg-[#271916] border border-white/10 flex items-center justify-center text-[#F0660A] shrink-0"
                  aria-hidden="true"
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#A1887F]">
                      {feature.featureNumber}
                    </span>
                    <h3 className="text-sm font-semibold text-white tracking-tight font-sans">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#D7CCC8] leading-relaxed mt-0.5 font-sans">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 bg-[#271916] border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#A1887F]">
            <span className="text-white font-medium">Hotfix verified</span> · Ready for installation
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <AestheticDownloadButton
              id="whats-new-download-apk-btn"
              label="Download Direct APK"
              activeLabel="Preparing..."
              completedLabel="Starting..."
              href={APP_CONFIG.APP_DIRECT_APK_URL}
              ariaLabel="Download updated Android APK directly"
            />

            <button
              ref={continueBtnRef}
              id="whats-new-continue-btn"
              type="button"
              onClick={onClose}
              className="min-h-[36px] px-4 py-1.5 text-xs font-medium text-[#D7CCC8] hover:text-white bg-transparent hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A]"
              aria-label="Close notes and return to site"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
