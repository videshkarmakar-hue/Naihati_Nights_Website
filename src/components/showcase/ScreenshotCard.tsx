import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { AppScreenshotItem } from '../../types';

interface ScreenshotCardProps {
  item: AppScreenshotItem;
  level?: 2 | 3;
  tiltDegree?: number;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * ScreenshotCard
 * Supporting screenshot container for the product showcase wall.
 * Encapsulated in liquid smoked glass with subtle micro-perspective, depth, and hover responsiveness.
 */
export const ScreenshotCard: React.FC<ScreenshotCardProps> = ({
  item,
  level = 2,
  tiltDegree = 0,
  isSelected = false,
  onClick,
  className = '',
}) => {
  // Depth Level styling
  const isLevel3 = level === 3;
  const [currentSrc, setCurrentSrc] = useState<string>(item.url);

  useEffect(() => {
    setCurrentSrc(item.url);
  }, [item.url]);

  const handleImageError = () => {
    const fallback = 'https://cdn.phototourl.com/member/2026-09-16-3999ae00-20eb-4d66-b8e6-983eb349510e.jpg';
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View screenshot ${item.code}: ${item.label} - ${item.tag}`}
      className={`group relative text-left block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6664] rounded-[22px] transition-all duration-300 ease-out cursor-pointer ${
        isLevel3
          ? 'opacity-80 hover:opacity-100 hover:scale-[1.03] z-10 hover:z-30'
          : 'opacity-95 hover:opacity-100 hover:scale-[1.03] z-20 hover:z-30'
      } ${isSelected ? 'scale-[1.03] shadow-[0_16px_40px_rgba(0,0,0,0.7)]' : ''} ${className}`}
      style={{
        transform: tiltDegree ? `rotate(${tiltDegree}deg)` : undefined,
      }}
    >
      {/* Liquid Glass Card Shell */}
      <div className="relative rounded-[22px] p-1.5 sm:p-2 bg-[#081212]/85 backdrop-blur-md group-hover:bg-[#0C1B1B]/95 shadow-[0_10px_32px_rgba(0,0,0,0.55)] transition-colors duration-200">
        {/* Device screen area */}
        <div className="relative rounded-[16px] overflow-hidden bg-[#030505] aspect-[9/19.5]">
          {/* Micro Notch */}
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-[#030505] rounded-full z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Screenshot Image */}
          <img
            src={currentSrc}
            alt={`শারদ ভ্রমণ app - Screen ${item.code}: ${item.label}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            className="w-full h-full object-cover object-top filter brightness-[0.96] group-hover:brightness-[1.02] transition-all duration-300"
          />

          {/* Subtle smoked glass gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#050A0A]/70 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* On-screen subtle bottom label */}
          <div className="absolute bottom-2 inset-x-2 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-[#050A0A]/90 backdrop-blur-sm text-[10px] font-mono font-medium text-[#F3F4EF] shadow-sm">
              {item.code} — {item.label}
            </span>
            <span className="text-[9px] font-medium text-[#C89D4B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:inline-flex items-center gap-1">
              Focus <ArrowRight className="w-2.5 h-2.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      {/* Tiny External Tag */}
      <div className="mt-2 px-1 flex items-center justify-between text-[11px]">
        <span className="text-[#B7C1BE] font-medium truncate max-w-[120px]">
          {item.tag}
        </span>
        <span className="text-[#7F8C89] font-mono text-[10px]">
          {item.code}/09
        </span>
      </div>
    </button>
  );
};
