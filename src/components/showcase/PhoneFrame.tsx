import React, { useState, useEffect } from 'react';

interface PhoneFrameProps {
  image: string;
  alt: string;
  isPrimary?: boolean;
  priority?: boolean;
  label?: string;
  code?: string;
  className?: string;
  children?: React.ReactNode;
}

const DEFAULT_FALLBACK_URL = 'https://cdn.phototourl.com/member/2026-09-16-3999ae00-20eb-4d66-b8e6-983eb349510e.jpg';

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  image,
  alt,
  isPrimary = false,
  priority = false,
  label,
  code,
  className = '',
  children,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(image);

  useEffect(() => {
    setCurrentSrc(image);
  }, [image]);

  const handleImageError = () => {
    if (currentSrc !== DEFAULT_FALLBACK_URL) {
      setCurrentSrc(DEFAULT_FALLBACK_URL);
    }
  };

  return (
    <div className={`relative select-none ${className}`}>
      {/* Physical Hardware Buttons */}
      <div className="absolute -left-[2.5px] top-14 w-[2.5px] h-6 bg-[#252830] rounded-l-xs pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-[2.5px] top-24 w-[2.5px] h-9 bg-[#252830] rounded-l-xs pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-[2.5px] top-36 w-[2.5px] h-9 bg-[#252830] rounded-l-xs pointer-events-none" aria-hidden="true" />
      <div className="absolute -right-[2.5px] top-22 w-[2.5px] h-12 bg-[#252830] rounded-r-xs pointer-events-none" aria-hidden="true" />

      {/* Outer Phone Shell */}
      <div
        className={`relative rounded-[32px] sm:rounded-[38px] p-2 transition-all duration-300 ${
          isPrimary
            ? 'bg-[#3E2723] border border-[#5D4037] shadow-xl'
            : 'bg-[#271916] border border-[#4E342E] shadow-md'
        }`}
      >
        {/* Screen Display Container */}
        <div className="relative rounded-[26px] sm:rounded-[32px] overflow-hidden bg-[#1A110E] aspect-[9/19.6]">
          {/* Dynamic Island Pill with camera lens */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-18 sm:w-22 h-4 bg-[#1A110E] border border-white/10 rounded-full z-20 flex items-center justify-between px-2 pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#271916]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#3E2723]" />
          </div>

          {/* Screenshot Image */}
          <img
            src={currentSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onError={handleImageError}
            className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
          />

          {/* Restrained Bottom Gradient for legibility */}
          <div
            className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {children}
        </div>

        {/* Quiet Screen Label Plate for Primary Mockup */}
        {isPrimary && label && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md bg-[#271916] border border-[#5D4037] shadow-sm flex items-center gap-1.5 whitespace-nowrap z-30">
            <span className="text-[10px] font-mono text-[#F0660A] font-bold">
              {code}
            </span>
            <span className="text-[10px] text-white/90 font-medium">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
