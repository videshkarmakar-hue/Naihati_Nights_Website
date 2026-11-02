import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { APP_CONFIG, NAVIGATION_ITEMS } from '../data/config';
import { triggerDirectApkDownload } from '../utils/downloadManager';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = Math.max(0, elementPosition - navHeight);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        try {
          window.history.pushState(null, '', href);
        } catch {}
      }
    }
  };

  const handleDownload = () => {
    setMobileMenuOpen(false);
    triggerDirectApkDownload(APP_CONFIG.APP_DOWNLOAD_URL, APP_CONFIG.apkFileName);
  };

  return (
    <header
      id="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled
          ? 'bg-obsidian/85 border-b border-white/10 shadow-lg shadow-black/40'
          : 'bg-obsidian/70 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-3 group"
          aria-label="Naihati Nights - Home"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-cyanAccent shadow-[0_0_12px_#23A9BD] group-hover:scale-125 transition-transform duration-300" />
          <span className="font-display font-black text-xl tracking-[0.25em] text-white group-hover:text-cyanAccent transition-colors">
            NAIHATI<span className="text-white/40">NIGHTS</span>
          </span>
        </a>

        {/* Center Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-slate-300 uppercase font-sans"
          aria-label="Primary Navigation"
        >
          {NAVIGATION_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="hover:text-cyanAccent transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Pill Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={APP_CONFIG.APP_DOWNLOAD_URL}
            download={APP_CONFIG.apkFileName}
            onClick={handleDownload}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-semibold tracking-wider transition-all duration-300 border border-white/20 hover:border-white shadow-[0_0_20px_rgba(35,169,189,0.2)] active:scale-95 cursor-pointer"
          >
            <span>START DOWNLOAD</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
              />
            </svg>
          </a>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={APP_CONFIG.APP_DOWNLOAD_URL}
            download={APP_CONFIG.apkFileName}
            onClick={handleDownload}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden px-3.5 py-1.5 rounded-full bg-cyanAccent text-black text-[11px] font-bold tracking-wider uppercase shadow-[0_0_12px_#23A9BD] cursor-pointer"
          >
            APK
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyanAccent" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian/95 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold tracking-wider uppercase font-sans">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="py-2 text-slate-300 hover:text-cyanAccent border-b border-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-2">
            <a
              href={APP_CONFIG.APP_DOWNLOAD_URL}
              download={APP_CONFIG.apkFileName}
              onClick={handleDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cyanAccent text-black text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(35,169,189,0.3)] transition-transform active:scale-95 cursor-pointer"
            >
              <span>DOWNLOAD APK v{APP_CONFIG.version} (~14.8 MB)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
