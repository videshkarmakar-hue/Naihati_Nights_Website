import React, { useEffect, useState } from 'react';
import { APP_CONFIG } from '../data/config';

interface SplashScreenProps {
  onFinish?: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  durationMs = 1400,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsDone(true);
        if (onFinish) onFinish();
      }, 500);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onFinish]);

  const handleDismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsDone(true);
      if (onFinish) onFinish();
    }, 250);
  };

  if (isDone) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Naihati Nights"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex flex-col justify-between items-center bg-[#010310] text-slate-300 py-12 px-6 select-none cursor-pointer transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Header: Understated Status & Skip */}
      <div className="w-full max-w-sm flex items-center justify-between text-[11px] tracking-wider uppercase text-slate-500 font-mono">
        <span className="text-slate-400">Naihati, West Bengal</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="hover:text-white transition-colors cursor-pointer py-1 px-2 focus:outline-none"
        >
          Enter ➔
        </button>
      </div>

      {/* Centerpiece: Pure Dignified Editorial Lockup */}
      <div className="flex flex-col items-center text-center max-w-xs w-full my-auto">
        {/* Emblem: Restrained, sharp, no fake glowing rings */}
        <div className="w-16 h-16 rounded-2xl bg-[#06101c] border border-white/10 p-2.5 mb-6 shadow-xl flex items-center justify-center">
          <img
            src="https://cdn.phototourl.com/member/2026-10-07-3560ff11-c4ca-4914-ada1-bb03390ea789.png"
            alt="Naihati Nights Emblem"
            className="w-full h-full object-contain filter brightness-95"
          />
        </div>

        {/* Wordmark */}
        <h1
          className="text-white text-xl sm:text-2xl font-black tracking-[0.25em] uppercase leading-none mb-3"
          style={{ fontFamily: 'Montserrat, "Plus Jakarta Sans", sans-serif' }}
        >
          NAIHATI NIGHTS
        </h1>

        {/* Quiet Subtitle */}
        <p className="text-slate-400 text-xs tracking-wide leading-relaxed font-normal">
          Kali Puja Festival Guide
        </p>

        {/* Minimalist 1px Hairline Loading Stroke */}
        <div className="w-28 h-[1px] bg-white/10 rounded-full overflow-hidden relative mt-8">
          <div
            className="absolute inset-y-0 left-0 bg-[#23A9BD] rounded-full animate-[progressSweep_1.3s_cubic-bezier(0.4,0,0.2,1)_infinite]"
            style={{ width: '40%' }}
          />
        </div>
      </div>

      {/* Footer: Quiet Craft Attribution */}
      <div className="w-full max-w-sm flex items-center justify-between text-[11px] tracking-wider text-slate-400 font-mono border-t border-white/5 pt-4">
        <span>v{APP_CONFIG.version}</span>
        <span>By Videsh Karmakar</span>
      </div>
    </div>
  );
};
