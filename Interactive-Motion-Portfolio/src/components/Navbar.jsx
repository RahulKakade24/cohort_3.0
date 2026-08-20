import React from 'react';
import { Download } from './icons/Icons';


export default function Navbar({ onResume }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 md:px-8 py-3.5 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white text-sm shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
            RK
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-violet-600 transition-colors">Rahul Kakade</span>
            <p className="text-[10px] text-slate-500 font-mono hidden sm:block">Frontend Web Developer</p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
          <a href="#about" className="hover:text-violet-600 transition-colors">About</a>
          <a href="#skills" className="hover:text-violet-600 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-violet-600 transition-colors">Projects</a>
          
          <a href="#contact" className="hover:text-violet-600 transition-colors">Contact</a>
        </nav>

        
      </div>
    </header>
  );
}
