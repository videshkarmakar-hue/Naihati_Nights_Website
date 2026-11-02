import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { LATEST_UPDATE_INFO } from '../data/config';

interface UpdateConfirmationSectionProps {
  onOpenModal: () => void;
}

export const UpdateConfirmationSection: React.FC<UpdateConfirmationSectionProps> = ({
  onOpenModal,
}) => {
  return (
    <div
      id="whats-new"
      className="w-full mt-7 sm:mt-9"
      aria-label={`What's New in ${LATEST_UPDATE_INFO.version} Updates`}
    >
      {/* Clean Touchable POPUP Card - No Fake Glow */}
      <div
        id="whats-new-dropdown-card"
        className="w-full bg-[#081213] hover:bg-[#0C191B] border border-[#16292B] hover:border-[#223E41] rounded-xl sm:rounded-2xl transition-all duration-200 group"
      >
        {/* Full-width touchable popup trigger button */}
        <button
          id="whats-new-touchable-popup-btn"
          type="button"
          onClick={onOpenModal}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenModal();
            }
          }}
          className="w-full min-h-[48px] flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FA49F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081213] rounded-xl sm:rounded-2xl transition-transform active:scale-[0.995]"
          aria-label={`Open What's New in ${LATEST_UPDATE_INFO.version} Updates popup modal`}
        >
          {/* Left: Indicator, Version Pill & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Clean Solid Status Dot - No Ping Glow */}
            <span className="flex h-2 w-2 rounded-full bg-[#1FAF7D] flex-shrink-0" aria-hidden="true" />

            {/* Version Badge */}
            <span className="px-2 py-0.5 text-[10px] sm:text-xs font-mono font-medium text-[#B7C1BE] bg-[#0E1F21] border border-[#183538] rounded-md flex-shrink-0">
              {LATEST_UPDATE_INFO.version}
            </span>

            {/* Primary Headline & Context */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs sm:text-sm font-semibold text-[#F3F4EF] group-hover:text-white transition-colors truncate">
                What's New in {LATEST_UPDATE_INFO.version} Updates
              </span>

              <span className="hidden md:inline text-[11px] text-[#7F8C89] truncate">
                • 8 Enhancements & North/South Station Mapping
              </span>
            </div>
          </div>

          {/* Right: Clean Tactile Popup Action Badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:inline text-[11px] text-[#7F8C89] group-hover:text-[#B7C1BE] transition-colors">
              Touch to view
            </span>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#F3F4EF] bg-[#0E2224] group-hover:bg-[#132E31] active:bg-[#0A1A1C] border border-[#1B3E42] group-hover:border-[#27565C] rounded-lg transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-[#B7C1BE] group-hover:text-white transition-colors" aria-hidden="true" />
              <span>POPUP</span>
              <ExternalLink className="w-3 h-3 text-[#7F8C89] group-hover:text-[#B7C1BE] transition-colors" aria-hidden="true" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
