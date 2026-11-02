import React from 'react';
import { APP_CONFIG, LATEST_UPDATE_INFO } from '../data/config';
import { ScrollReveal } from './ScrollReveal';
import { AestheticDownloadButton } from './AestheticDownloadButton';

export const FinalCTA: React.FC = () => {

  return (
    <section
      id="final-cta"
      className="py-24 sm:py-32 bg-[#120B09] text-white border-t border-[#4E342E]/60 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal direction="up" distance={18} duration={500}>
          {/* Reference Kicker with badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271916] border border-[#5D4037] text-[#F0660A] text-[11px] font-mono tracking-widest uppercase mb-4 select-none">
            <span className="w-1 h-1 rounded-full bg-[#F0660A]" />
            <span>05. GET STARTED</span>
          </div>

          {/* Reference Headline */}
          <h2
            id="final-cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-sans leading-[1.15]"
          >
            Ready For Bengal's <br />
            Grand Journey<span className="text-[#F0660A] font-black">.</span>
          </h2>

          {/* Official Bengali Wordmark Emblem - High Visibility & Prominence */}
          <div className="flex justify-center my-8">
            <img
              src={APP_CONFIG.APP_LOGO_WORDMARK_URL}
              alt="শারদ ভ্রমণ"
              className="h-32 sm:h-44 md:h-52 lg:h-60 max-w-full w-auto object-contain brightness-110 drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
              loading="lazy"
            />
          </div>

          {/* Download Action: Reference Pill Action */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
            <AestheticDownloadButton
              id="final-cta-download-btn-1"
              variant="capsule-sheen"
              label={`Download Direct APK (v${LATEST_UPDATE_INFO.version})`}
              sublabel={`DIRECT APK v${LATEST_UPDATE_INFO.version}`}
              ariaLabel="Download Sharod Bhraman APK directly"
              className="!px-8 !py-3.5 !rounded-full !bg-white !text-black !font-bold hover:!bg-[#F0660A] hover:!text-white !border-white transition-all shadow-xl text-xs sm:text-sm"
            />
          </div>

          {/* Clean Unboxed Metadata */}
          <div className="text-xs text-[#A1887F] flex flex-wrap items-center justify-center gap-2 font-mono">
            <span>Direct APK v{LATEST_UPDATE_INFO.version}</span>
            <span aria-hidden="true">·</span>
            <span>Zero Tracking</span>
            <span aria-hidden="true">·</span>
            <span>GPL-3.0 Open Source</span>
          </div>
        </ScrollReveal>

        {/* Ghost Watermark Numeral */}
        <div
          className="absolute -bottom-10 right-10 text-9xl font-black text-white/[0.02] select-none pointer-events-none font-sans"
          aria-hidden="true"
        >
          05.
        </div>
      </div>
    </section>
  );
};
