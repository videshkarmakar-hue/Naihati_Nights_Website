import React, { useState, useEffect } from 'react';
import { APP_CONFIG, APP_SCREENSHOT_ITEMS, LATEST_UPDATE_INFO } from '../data/config';
import { PhoneFrame } from './showcase/PhoneFrame';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { AestheticDownloadButton } from './AestheticDownloadButton';

export const AppScreenshots: React.FC = () => {
  const [activeScreenIndex, setActiveScreenIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalScreens = APP_SCREENSHOT_ITEMS.length;
  const centerItem = APP_SCREENSHOT_ITEMS[activeScreenIndex];
  const leftItem = APP_SCREENSHOT_ITEMS[(activeScreenIndex - 1 + totalScreens) % totalScreens];
  const rightItem = APP_SCREENSHOT_ITEMS[(activeScreenIndex + 1) % totalScreens];

  const handleNext = () => {
    setActiveScreenIndex((prev) => (prev + 1) % totalScreens);
  };

  const handlePrev = () => {
    setActiveScreenIndex((prev) => (prev - 1 + totalScreens) % totalScreens);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
  };

  return (
    <section
      id="app-experience"
      className="py-24 sm:py-32 bg-[#120B09] text-white relative overflow-hidden border-t border-[#4E342E]/50"
      aria-label="Application Interface Showcase"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Reference layout */}
        <ScrollReveal direction="up" distance={16} duration={500}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 relative">
            {/* Left Header info */}
            <div className="max-w-xl">
              {/* Reference Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271916] border border-[#5D4037] text-[#F0660A] text-[11px] font-mono tracking-widest uppercase mb-4 select-none">
                <span className="w-1 h-1 rounded-full bg-[#F0660A]" />
                <span>PRODUCTION INTERFACE SHOWCASE</span>
              </div>

              {/* Reference Headline with signature orange dot */}
              <h2
                id="screenshots-main-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sans tracking-tight"
              >
                Interactive Screens<span className="text-[#F0660A] font-black">.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#D7CCC8] mt-3 leading-relaxed">
                Experience real production views from pandal discovery to route planning and offline guidance.
              </p>
            </div>

            {/* Right Controls + Reference Diagonal Hashes + Ghost Numeral */}
            <div className="flex items-center gap-6 relative">
              {/* Reference decorative diagonal hash ticks */}
              <div className="hidden sm:flex items-center gap-1 opacity-30" aria-hidden="true">
                <span className="w-0.5 h-6 bg-white rotate-[25deg] inline-block" />
                <span className="w-0.5 h-6 bg-white rotate-[25deg] inline-block" />
                <span className="w-0.5 h-6 bg-white rotate-[25deg] inline-block" />
                <span className="w-0.5 h-6 bg-white rotate-[25deg] inline-block" />
              </div>

              {/* Reference PREV / NEXT Buttons */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-[#D7CCC8] hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  PREV
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-full border border-[#F0660A]/40 hover:border-[#F0660A] text-[#F0660A] hover:text-white hover:bg-[#F0660A]/10 transition-colors font-semibold cursor-pointer"
                  aria-label="Next screenshot"
                >
                  NEXT
                </button>
              </div>

              {/* Ghost Watermark Numeral */}
              <div
                className="absolute -top-12 -right-4 text-7xl sm:text-8xl font-black text-white/[0.03] select-none pointer-events-none font-sans"
                aria-hidden="true"
              >
                03.
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Showcase Container */}
        <ScrollReveal delay={80} direction="up" distance={20} duration={600}>
          <div
            id="liquid-glass-showcase-environment"
            className="rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 bg-[#3E2723] border border-[#5D4037] shadow-2xl relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Active Screen Tag */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F0660A]" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  {centerItem.label} · {centerItem.tag}
                </span>
              </div>

              <span className="text-xs font-mono text-[#A1887F]">
                {activeScreenIndex + 1} / {totalScreens}
              </span>
            </div>

            {/* 3 Staged Phone Mockups */}
            <div
              className="relative py-6 sm:py-8"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 sm:gap-6 lg:gap-10 px-2">
                {/* Left Phone Mockup */}
                <div
                  onClick={handlePrev}
                  className="group flex-1 max-w-[150px] sm:max-w-[210px] lg:max-w-[240px] transition-all duration-300 ease-out cursor-pointer select-none opacity-50 hover:opacity-85 hover:scale-[1.01]"
                  title={`Previous: ${leftItem.label}`}
                >
                  <PhoneFrame
                    image={leftItem.url}
                    alt={`Preview screen - ${leftItem.label}`}
                    label={leftItem.label}
                    code={leftItem.code}
                    priority={false}
                  />
                </div>

                {/* Center Focal Phone Mockup */}
                <div className="flex-1 max-w-[200px] sm:max-w-[270px] lg:max-w-[300px] transition-all duration-300 ease-out select-none scale-105 z-20">
                  <PhoneFrame
                    image={centerItem.url}
                    alt={`Active screen - ${centerItem.label}`}
                    isPrimary={true}
                    priority={true}
                    label={centerItem.label}
                    code={centerItem.code}
                  />
                </div>

                {/* Right Phone Mockup */}
                <div
                  onClick={handleNext}
                  className="group flex-1 max-w-[150px] sm:max-w-[210px] lg:max-w-[240px] transition-all duration-300 ease-out cursor-pointer select-none opacity-50 hover:opacity-85 hover:scale-[1.01]"
                  title={`Next: ${rightItem.label}`}
                >
                  <PhoneFrame
                    image={rightItem.url}
                    alt={`Preview screen - ${rightItem.label}`}
                    label={rightItem.label}
                    code={rightItem.code}
                    priority={false}
                  />
                </div>
              </div>
            </div>

            {/* Quick Download Action Footer */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-[#D7CCC8] max-w-md">
                {centerItem.description}
              </p>

              <div className="flex items-center gap-3">
                <AestheticDownloadButton
                  id="screenshots-showcase-primary-btn"
                  label={`Download APK (${LATEST_UPDATE_INFO.version})`}
                  ariaLabel="Download Sharod Bhraman APK"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
