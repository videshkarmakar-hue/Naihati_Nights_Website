import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-lg py-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo & Credits */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <a
            className="font-display font-black text-xl tracking-[0.25em] text-white hover:text-cyanAccent transition-colors"
            href="#home"
          >
            NAIHATI<span className="text-cyanAccent">NIGHTS</span>
          </a>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="text-xs text-slate-400">
            Crafted with reactive excellence by{' '}
            <strong className="text-white hover:text-cyanAccent transition-colors cursor-pointer">
              VIDESH KARMAKAR
            </strong>
          </span>
        </div>

        {/* Rights */}
        <div className="text-xs font-mono text-white/40 text-center md:text-right">
          Naihati Nights 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
