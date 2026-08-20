import React, { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';

import Contact from './components/sections/Contact';
import Footer from './components/Footer';

import { useGsap } from './hooks/useGsap';
import { useCustomCursor } from './hooks/useCustomCursor';

export default function App() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const mainContainerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useGsap();
  useCustomCursor(cursorRef, cursorDotRef);

  return (
    <div ref={mainContainerRef} className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-violet-500 selection:text-white relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-150 max-h-150 bg-violet-200/40 blur-[140px] rounded-full" />
        <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] max-w-125 max-h-125 bg-indigo-200/30 blur-[130px] rounded-full" />
        <div className="absolute bottom-[10%] left-[20%] w-[40vw] h-[40vw] max-w-100 max-h-100 bg-sky-200/30 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [bg-size:24px_24px] opacity-40" />
      </div>

      <div ref={cursorRef} className="hidden md:block pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border border-violet-500/50 bg-violet-500/10 z-50 transition-transform duration-75 ease-out backdrop-blur-[1px] shadow-[0_0_15px_rgba(139,92,246,0.2)]" />
      <div ref={cursorDotRef} className="hidden md:block pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-violet-600 z-50" />

      <Navbar  />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
