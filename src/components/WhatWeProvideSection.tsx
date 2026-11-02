import React from 'react';
import {
  Database,
  Cpu,
  Layers,
  Compass,
  Train,
  Shield,
  Palette,
  Terminal,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const WhatWeProvideSection: React.FC = () => {
  return (
    <section
      id="features"
      className="py-24 sm:py-32 bg-[#140D0B] text-white relative overflow-hidden border-t border-[#4E342E]/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal direction="up" distance={16} duration={500}>
          {/* Centered Pill Badge matching Reference */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271916] border border-[#5D4037] text-[#F0660A] text-[11px] font-mono tracking-widest uppercase mb-4 select-none">
            <span className="w-1 h-1 rounded-full bg-[#F0660A]" />
            <span>VERIFIED CULTURAL ARCHITECTURE</span>
          </div>

          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans mb-4">
            What we provide?
          </h2>

          {/* Centered Subtitle */}
          <p className="text-xs sm:text-sm text-[#D7CCC8] max-w-2xl mx-auto mb-14 font-sans leading-relaxed">
            Sharod Bhraman combines localized offline computation, modular corridor indexing, and exact station exit paths in one human-crafted Android application:
          </p>

          {/* 3 Bento Cards matching Reference */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Card 1: SQLite Kernel (Keyboard / Nodes Mockup) */}
            <div className="rounded-2xl bg-[#3E2723] border border-[#5D4037] p-6 flex flex-col justify-between hover:border-[#F0660A]/50 transition-all duration-200 group">
              {/* Top Visual Mockup matching Reference Keyboard / Matrix */}
              <div className="w-full h-44 rounded-xl bg-[#271916] border border-[#5D4037] p-4 flex flex-col justify-between mb-6 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#A1887F]">
                  <span>SQLite Kernel</span>
                  <span className="text-[#F0660A]">v5.1 ACTIVE</span>
                </div>

                {/* Matrix of node buttons / keys */}
                <div className="grid grid-cols-4 gap-2 my-auto">
                  <div className="p-2 rounded-lg bg-[#3E2723] border border-[#5D4037] flex items-center justify-center text-xs font-mono text-white">
                    MAP
                  </div>
                  <div className="p-2 rounded-lg bg-[#3E2723] border border-[#5D4037] flex items-center justify-center text-xs font-mono text-[#F0660A]">
                    GATE
                  </div>
                  <div className="p-2 rounded-lg bg-[#3E2723] border border-[#5D4037] flex items-center justify-center text-xs font-mono text-white">
                    ZONE
                  </div>
                  <div className="p-2 rounded-lg bg-[#3E2723] border border-[#5D4037] flex items-center justify-center text-xs font-mono text-white">
                    SQL
                  </div>
                  <div className="p-2 rounded-lg bg-[#3E2723] border border-[#5D4037] flex items-center justify-center text-xs font-mono text-white">
                    INDEX
                  </div>
                  <div className="p-2 rounded-lg bg-[#F0660A] text-white flex items-center justify-center text-xs font-mono font-bold shadow-md">
                    FAST
                  </div>
                  <div className="p-2 rounded-lg bg-[#3E2723] border border-[#5D4037] flex items-center justify-center text-xs font-mono text-white">
                    TIME
                  </div>
                  <div className="p-2 rounded-lg bg-[#3E2723] border border-[#5D4037] flex items-center justify-center text-xs font-mono text-white">
                    SYNC
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#A1887F]">
                  <span>Latency: 0ms (Local)</span>
                  <span className="text-emerald-400">Memory: 4.8MB</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-sans tracking-tight mb-2">
                  SQLite Database Kernel
                </h3>
                <p className="text-xs text-[#D7CCC8] leading-relaxed">
                  Persistent local memory with instant pandal indexing, async category filters, and lightning query response without network latency.
                </p>
              </div>
            </div>

            {/* Card 2: Edge-Synced Gate Execution (Control Deck Mockup) */}
            <div className="rounded-2xl bg-[#3E2723] border border-[#5D4037] p-6 flex flex-col justify-between hover:border-[#F0660A]/50 transition-all duration-200 group">
              {/* Top Visual Mockup matching Reference List Deck */}
              <div className="w-full h-44 rounded-xl bg-[#271916] border border-[#5D4037] p-4 flex flex-col justify-between mb-6 text-xs font-mono">
                <div className="flex items-center justify-between text-[11px] text-[#A1887F] pb-1 border-b border-white/[0.06]">
                  <span>Metro Gate Dispatcher</span>
                  <span className="text-emerald-400">Connected</span>
                </div>

                <div className="space-y-1.5 my-auto">
                  <div className="p-1.5 rounded-md bg-[#3E2723] border border-[#5D4037] flex items-center justify-between">
                    <span className="text-white">Central Station Gate 3</span>
                    <span className="text-[10px] text-[#F0660A]">Exit A</span>
                  </div>
                  <div className="p-1.5 rounded-md bg-[#3E2723] border border-[#5D4037] flex items-center justify-between">
                    <span className="text-white">Shyambazar Five Point</span>
                    <span className="text-[10px] text-white/80">Exit 1</span>
                  </div>
                  <div className="p-1.5 rounded-md bg-[#3E2723] border border-[#5D4037] flex items-center justify-between">
                    <span className="text-white">Kalighat Temple Gate</span>
                    <span className="text-[10px] text-white/80">Exit 4</span>
                  </div>
                </div>

                <div className="text-[10px] text-[#A1887F]">
                  Corridor sync across all 4 Metro Lines
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-sans tracking-tight mb-2">
                  Edge-Synced Gate Routing
                </h3>
                <p className="text-xs text-[#D7CCC8] leading-relaxed">
                  Exact station exit gates and police barricade walking channels mapped seamlessly for smooth, unblocked pedestrian entry.
                </p>
              </div>
            </div>

            {/* Card 3: Artisan & Heritage Tools (Icon Deck Mockup) */}
            <div className="rounded-2xl bg-[#3E2723] border border-[#5D4037] p-6 flex flex-col justify-between hover:border-[#F0660A]/50 transition-all duration-200 group">
              {/* Top Visual Mockup matching Reference Logo/Tools Box */}
              <div className="w-full h-44 rounded-xl bg-[#271916] border border-[#5D4037] p-4 flex flex-col justify-between mb-6">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#A1887F]">
                  <span>Heritage Monograph</span>
                  <span className="text-white font-bold">140+ Sculptors</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 my-auto">
                  <div className="p-3 rounded-lg bg-[#3E2723] border border-[#5D4037] flex flex-col items-center justify-center gap-1 text-[#F0660A]">
                    <Palette className="w-4 h-4" />
                    <span className="text-[9px] font-mono text-white">Kumartuli</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#3E2723] border border-[#5D4037] flex flex-col items-center justify-center gap-1 text-[#F0660A]">
                    <Layers className="w-4 h-4" />
                    <span className="text-[9px] font-mono text-white">Bonedi</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#3E2723] border border-[#5D4037] flex flex-col items-center justify-center gap-1 text-[#F0660A]">
                    <Compass className="w-4 h-4" />
                    <span className="text-[9px] font-mono text-white">Corridors</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-[#A1887F]">
                  Curated with Kolkata heritage historians
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-sans tracking-tight mb-2">
                  Artisan &amp; Heritage Directory
                </h3>
                <p className="text-xs text-[#D7CCC8] leading-relaxed">
                  In-depth spotlight profiles on Kumartuli clay artisans, theme concepts, and centuries-old aristocratic household traditions.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
