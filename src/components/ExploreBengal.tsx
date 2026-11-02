import React, { useState } from 'react';
import { ArrowRight, ChevronRight, MapPin } from 'lucide-react';
import { EXPLORE_DESTINATIONS, APP_CONFIG } from '../data/config';
import { ExploreDestination } from '../types';
import { recordDownload } from '../lib/firebase';

export const ExploreBengal: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="explore"
      className="py-16 sm:py-24 bg-[#071A1A] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E1B18]" aria-hidden="true" />
              <span
                id="explore-eyebrow"
                className="text-xs font-semibold tracking-wider text-[#B7C1BE] uppercase"
              >
                EXPLORE
              </span>
            </div>

            <h2
              id="explore-main-heading"
              className="text-2xl sm:text-4xl font-bold text-[#F3F4EF] font-bengali-serif leading-tight tracking-tight mb-3"
            >
              Explore Bengal Through Puja
            </h2>

            <p
              id="explore-subheading"
              className="text-lg font-medium text-[#C89D4B] font-bengali-serif mb-2"
            >
              "Every pandal tells a story."
            </p>

            <p
              id="explore-description"
              className="text-sm sm:text-base text-[#B7C1BE] leading-relaxed"
            >
              From timeless traditions to spectacular modern creations, discover the places that
              make Durga Puja unforgettable.
            </p>
          </div>

          {/* Quick CTA to download app for complete maps */}
          <div className="flex-shrink-0">
            <a
              id="explore-section-download-link"
              href={APP_CONFIG.APP_DOWNLOAD_URL}
              download="Sharad-Bhromon.apk"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordDownload().catch(() => {})}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#F3F4EF] hover:text-[#C89D4B] group transition-colors"
            >
              <span>Explore all pandals in app</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C89D4B]" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Editorial Photo Cards Grid with Liquid Glass styling */}
        <div
          id="explore-destinations-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {EXPLORE_DESTINATIONS.map((dest: ExploreDestination, index: number) => {
            const isFeatured = index === 0;

            return (
              <div
                key={dest.id}
                id={dest.id}
                className={`group relative liquid-glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onMouseEnter={() => setActiveCategory(dest.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Photo container */}
                <div
                  className={`relative overflow-hidden bg-[#050707] ${
                    isFeatured ? 'h-64 sm:h-72' : 'h-52 sm:h-56'
                  }`}
                >
                  <img
                    src={dest.imageUrl}
                    alt={`${dest.title} - ${dest.description}`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-[0.92] contrast-[1.04]"
                    onError={(e) => {
                      // Graceful fallback to cached local image or hero
                      const target = e.currentTarget;
                      const localFallback = `/explore/${dest.id}.jpg`;
                      if (target.src !== localFallback && !target.src.endsWith(localFallback)) {
                        target.src = localFallback;
                      } else {
                        target.src = APP_CONFIG.HERO_IMAGE_URL;
                      }
                    }}
                  />
                  {/* Subtle photographic vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A1A] via-[#071A1A]/35 to-transparent pointer-events-none" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#F3F4EF] bg-[#050707]/85 backdrop-blur-sm rounded-md shadow-sm">
                      <MapPin className="w-3 h-3 text-[#C89D4B]" aria-hidden="true" />
                      {dest.category}
                    </span>
                  </div>

                  {/* Bottom title in photo for featured card */}
                  {isFeatured && (
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#F3F4EF] font-bengali-serif drop-shadow-sm">
                        {dest.title}
                      </h3>
                    </div>
                  )}
                </div>

                {/* Content details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {!isFeatured && (
                      <h3 className="text-lg font-bold text-[#F3F4EF] font-bengali-serif mb-1.5 group-hover:text-[#C89D4B] transition-colors">
                        {dest.title}
                      </h3>
                    )}
                    <p className="text-sm text-[#B7C1BE] leading-relaxed mb-4">
                      {dest.description}
                    </p>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {dest.highlights.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium text-[#B7C1BE] bg-[#050707]/70 px-2.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#7F8C89] group-hover:text-[#F3F4EF] transition-colors">
                      Discover in App
                    </span>
                    <a
                      href={APP_CONFIG.APP_DOWNLOAD_URL}
                      download="Sharad-Bhromon.apk"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => recordDownload().catch(() => {})}
                      className="w-7 h-7 rounded-full bg-[#0B2525] group-hover:bg-[#9E1B18] flex items-center justify-center text-[#B7C1BE] group-hover:text-white transition-colors duration-150 shadow-sm"
                      aria-label={`View ${dest.title} on the app`}
                    >
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
