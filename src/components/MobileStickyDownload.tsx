import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import { AestheticDownloadButton } from './AestheticDownloadButton';

export const MobileStickyDownload: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <aside
      id="mobile-sticky-download-bar"
      aria-label="Mobile quick download app bar"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#1A110E]/95 border-t border-[#4E342E] backdrop-blur-md p-2.5 shadow-md"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={APP_CONFIG.APP_ICON_URL}
            alt={APP_CONFIG.nameBn}
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-md object-contain flex-shrink-0 border border-white/10"
          />
          <div className="truncate flex flex-col justify-center">
            <span className="text-xs font-semibold text-white font-bengali-serif leading-tight">
              {APP_CONFIG.nameBn}
            </span>
            <span className="text-[10px] text-[#D7CCC8] font-mono">
              v5.1 Official
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <AestheticDownloadButton
            id="mobile-sticky-download-btn"
            variant="bottom-bar"
            label="APK"
            activeLabel="..."
            completedLabel="Done"
            href={APP_CONFIG.APP_DOWNLOAD_URL}
            ariaLabel="Download Sharod Bhraman Android App"
          />

          <button
            id="mobile-sticky-dismiss-btn"
            type="button"
            onClick={() => setIsDismissed(true)}
            className="w-8 h-8 min-w-[32px] min-h-[32px] text-[#D7CCC8] hover:text-white rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A]"
            aria-label="Dismiss quick download bar"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};
