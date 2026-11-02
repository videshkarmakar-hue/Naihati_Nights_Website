import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Train,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Database,
  Layers,
  Search,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const HowItWorksSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('North Kolkata');

  return (
    <section
      id="how-it-works"
      className="py-24 sm:py-32 bg-[#120B09] text-white relative overflow-hidden border-t border-[#4E342E]/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal direction="up" distance={16} duration={500}>
          {/* Centered Pill Badge matching Reference < CHOOSE · CACHE · NAVIGATE · EXPLORE > */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271916] border border-[#5D4037] text-[#F0660A] text-[11px] font-mono tracking-widest uppercase mb-4 select-none">
            <span className="w-1 h-1 rounded-full bg-[#F0660A]" />
            <span>CHOOSE · CACHE · NAVIGATE · EXPLORE</span>
          </div>

          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans mb-4">
            How it Works
          </h2>

          {/* Centered Subtitle */}
          <p className="text-xs sm:text-sm text-[#D7CCC8] max-w-2xl mx-auto mb-14 font-sans leading-relaxed">
            Select from verified corridors, mount offline SQLite storage, and navigate on foot with gate-level accuracy:
          </p>

          {/* 4 Column Cards Grid directly matching Reference layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
            {/* Card 1: Choose Zone (Concentric Circles Mockup) */}
            <div className="rounded-2xl bg-[#3E2723] border border-[#5D4037] p-6 flex flex-col justify-between hover:border-[#F0660A]/50 transition-all duration-200 group">
              <div>
                <h3 className="text-base font-bold text-white font-sans tracking-tight mb-2">
                  Choose Zone
                </h3>
                <p className="text-xs text-[#D7CCC8] leading-relaxed mb-6">
                  Select a pandal cluster from North, South, Central Kolkata, or district circuits.
                </p>
              </div>

              {/* Concentric Circles Visual Mockup directly matching Reference */}
              <div className="relative w-full aspect-square rounded-xl bg-[#271916] border border-[#5D4037] flex items-center justify-center overflow-hidden p-4">
                {/* Concentric Rings */}
                <div className="absolute w-44 h-44 rounded-full border border-white/[0.05]" />
                <div className="absolute w-32 h-32 rounded-full border border-white/[0.08]" />
                <div className="absolute w-20 h-20 rounded-full border border-[#F0660A]/30" />
                
                {/* Center Core Button */}
                <div className="w-12 h-12 rounded-full bg-[#3E2723] border border-[#5D4037] shadow-lg flex items-center justify-center text-[#F0660A] z-10 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>

                <div className="absolute bottom-2 inset-x-0 text-center">
                  <span className="text-[10px] font-mono text-[#A1887F]">
                    {selectedZone} · 400+ Pujas
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Deploy to Cache (List Items Mockup) */}
            <div className="rounded-2xl bg-[#3E2723] border border-[#5D4037] p-6 flex flex-col justify-between hover:border-[#F0660A]/50 transition-all duration-200 group">
              <div>
                <h3 className="text-base font-bold text-white font-sans tracking-tight mb-2">
                  Deploy to Cache
                </h3>
                <p className="text-xs text-[#D7CCC8] leading-relaxed mb-6">
                  Mount verified station gates, pandal entries, and walking routes into SQLite.
                </p>
              </div>

              {/* Server List Items Mockup directly matching Reference */}
              <div className="w-full rounded-xl bg-[#271916] border border-[#5D4037] p-3 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#3E2723]/60 border border-[#5D4037]/50">
                  <span className="flex items-center gap-2 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F0660A]" />
                    <span>Metro Exit Gate</span>
                  </span>
                  <span className="text-[10px] text-[#A1887F]">SYNCED</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#3E2723]/60 border border-[#5D4037]/50">
                  <span className="flex items-center gap-2 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>North Corridor</span>
                  </span>
                  <span className="text-[10px] text-[#A1887F]">READY</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#3E2723]/60 border border-[#5D4037]/50">
                  <span className="flex items-center gap-2 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>South Aristocrats</span>
                  </span>
                  <span className="text-[10px] text-[#A1887F]">OFFLINE</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#3E2723]/60 border border-[#5D4037]/50">
                  <span className="flex items-center gap-2 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F0660A]" />
                    <span>SQLite FOSS v5.1</span>
                  </span>
                  <span className="text-[10px] text-[#F0660A]">100% OK</span>
                </div>
              </div>
            </div>

            {/* Card 3: Register & Navigate (3D Isometric Cube & Search Prompt Mockup) */}
            <div className="rounded-2xl bg-[#3E2723] border border-[#5D4037] p-6 flex flex-col justify-between hover:border-[#F0660A]/50 transition-all duration-200 group">
              <div>
                <h3 className="text-base font-bold text-white font-sans tracking-tight mb-2">
                  Radar &amp; Compass
                </h3>
                <p className="text-xs text-[#D7CCC8] leading-relaxed mb-6">
                  Follow bearing guidance straight through packed alleys without cell reception.
                </p>
              </div>

              {/* 3D Wireframe Cube with Search Bar Mockup matching Reference */}
              <div className="w-full rounded-xl bg-[#271916] border border-[#5D4037] p-3 flex flex-col justify-between aspect-square">
                {/* 3D Isometric Architectural Structure Visual */}
                <div className="flex-1 flex items-center justify-center relative">
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                    {/* Isometric Cube Wireframe */}
                    <polygon
                      points="50,15 85,35 50,55 15,35"
                      stroke="#F0660A"
                      strokeWidth="1.5"
                      fill="#3E2723"
                      fillOpacity="0.5"
                    />
                    <polygon
                      points="15,35 50,55 50,90 15,70"
                      stroke="#5D4037"
                      strokeWidth="1.5"
                      fill="#271916"
                    />
                    <polygon
                      points="85,35 50,55 50,90 85,70"
                      stroke="#5D4037"
                      strokeWidth="1.5"
                      fill="#1E1210"
                    />
                    <circle cx="50" cy="55" r="3" fill="#F0660A" />
                  </svg>
                </div>

                {/* Search / Command Prompt matching "Give any command... ↑" */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#3E2723] border border-[#5D4037] text-xs">
                  <span className="text-[11px] text-[#D7CCC8]/70 truncate font-mono">
                    Find Sovabazar Rajbari...
                  </span>
                  <span className="w-5 h-5 rounded-md bg-[#F0660A] text-white flex items-center justify-center shrink-0">
                    ↑
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Playground & Notes (Code Editor / Terminal Mockup) */}
            <div className="rounded-2xl bg-[#3E2723] border border-[#5D4037] p-6 flex flex-col justify-between hover:border-[#F0660A]/50 transition-all duration-200 group">
              <div>
                <h3 className="text-base font-bold text-white font-sans tracking-tight mb-2">
                  Playground Mode
                </h3>
                <p className="text-xs text-[#D7CCC8] leading-relaxed mb-6">
                  Build custom hopping itineraries and simulate travel time before stepping out.
                </p>
              </div>

              {/* Code Terminal Visual matching Reference */}
              <div className="w-full rounded-xl bg-[#271916] border border-[#5D4037] p-3 font-mono text-[10px] text-[#D7CCC8] leading-relaxed">
                <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/[0.06]">
                  <span className="w-2 h-2 rounded-full bg-[#F0660A]" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="text-[9px] text-[#A1887F] ml-auto">route.json</span>
                </div>
                <div className="text-white font-semibold">{"{"}</div>
                <div className="pl-2">
                  <span className="text-[#F0660A]">"cluster"</span>: <span className="text-white">"Central Kolkata"</span>,
                </div>
                <div className="pl-2">
                  <span className="text-[#F0660A]">"metro_gate"</span>: <span className="text-white">"Gate 4 - MG Road"</span>,
                </div>
                <div className="pl-2">
                  <span className="text-[#F0660A]">"walk_time"</span>: <span className="text-emerald-400">"4 mins"</span>,
                </div>
                <div className="pl-2">
                  <span className="text-[#F0660A]">"offline_verified"</span>: <span className="text-white">true</span>
                </div>
                <div className="text-white font-semibold">{"}"}</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
