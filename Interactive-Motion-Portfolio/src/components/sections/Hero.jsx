import React from 'react';
import { ChevronRight, Mail } from '../icons/Icons';

export default function Hero() {
  return (
    <section id="hero" className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 max-w-5xl mx-auto relative z-10">
      <div className="space-y-8 text-center sm:text-left">
        <div className="hero-status inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200/80 text-xs font-mono text-violet-700 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for Junior Roles & Internships</span>
        </div>

        <h1 className="hero-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-slate-900">
          Frontend Developer <br />
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            crafting responsive web UI.
          </span>
        </h1>

        <p className="hero-sub text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Hi, I'm <strong className="text-slate-900">Rahul</strong>. I build sleek, interactive, and high-performance web applications using <strong className="text-violet-600 font-semibold">React, JavaScript, Tailwind, and GSAP</strong>.
        </p>

        <div className="hero-actions flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
          <a href="#projects" className="px-7 py-3.5 rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-violet-500/20 hover:scale-[1.02]">
            <span>View My Work</span>
            <ChevronRight size={16} />
          </a>
          <a href="#contact" className="px-7 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 hover:bg-slate-50 shadow-sm">
            <Mail size={16} className="text-violet-600" />
            <span>Get In Touch</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 mt-16 border-t border-slate-200">
        <div className="bento-item p-4.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all">
          <div className="text-xs font-mono text-slate-500">Experience</div>
          <div className="text-2xl font-black text-violet-600 mt-1">Entry-Level</div>
          <div className="text-[11px] text-slate-500 mt-0.5">High motivation & quick learner</div>
        </div>
        <div className="bento-item p-4.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all">
          <div className="text-xs font-mono text-slate-500">Projects</div>
          <div className="text-2xl font-black text-slate-900 mt-1">5+ Built</div>
          <div className="text-[11px] text-slate-500 mt-0.5">React, JS & Responsive UI</div>
        </div>
        <div className="bento-item p-4.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all">
          <div className="text-xs font-mono text-slate-500">Primary Focus</div>
          <div className="text-2xl font-black text-cyan-600 mt-1">Frontend UI</div>
          <div className="text-[11px] text-slate-500 mt-0.5">React, Tailwind & JS</div>
        </div>
        <div className="bento-item p-4.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all">
          <div className="text-xs font-mono text-slate-500">Availability</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">Immediate</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Remote or On-site</div>
        </div>
      </div>
</section>
  );
}
