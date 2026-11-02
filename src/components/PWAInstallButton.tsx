import React, { useState } from 'react';
import { Smartphone, Download, X, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'navbar' | 'compact' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (!isInstallable && !isIOS) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      <button
        id="pwa-install-app-btn"
        onClick={handleInstallClick}
        type="button"
        aria-label="Install শারদ ভ্রমণ Web App"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0660A] ${
          variant === 'navbar'
            ? 'bg-white/[0.04] hover:bg-white/[0.08] text-[#D7CCC8] hover:text-white border border-white/10'
            : 'bg-white/[0.04] hover:bg-white/[0.08] text-[#D7CCC8] hover:text-white border border-white/10'
        } ${className}`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install Web App</span>
      </button>

      {/* iOS Safari Installation Guide Modal */}
      {showIOSGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-pwa-install-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-sm rounded-2xl bg-[#3E2723] border border-[#5D4037] p-6 shadow-2xl text-white">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close guide"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#271916] border border-white/10 flex items-center justify-center text-[#F0660A]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 id="ios-pwa-install-title" className="text-sm font-bold text-white">
                  Install on iOS
                </h3>
                <p className="text-xs text-[#D7CCC8]">Add to Home Screen</p>
              </div>
            </div>

            <ol className="space-y-3 text-xs text-[#D7CCC8] mb-6">
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-white">
                  1
                </span>
                <span>
                  Tap the <strong className="text-white">Share</strong> button <Share className="inline w-3.5 h-3.5 mx-1 text-[#F0660A]" /> in Safari toolbar.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-white">
                  2
                </span>
                <span>
                  Select <strong className="text-white">"Add to Home Screen"</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-white">
                  3
                </span>
                <span>
                  Tap <strong className="text-white">"Add"</strong> in the top right corner.
                </span>
              </li>
            </ol>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2 px-4 rounded-lg bg-[#F0660A] hover:bg-[#D65505] text-white text-xs font-semibold transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
