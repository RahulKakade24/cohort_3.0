import React from 'react';
import { Code, Heart, Rocket, User } from '../icons/Icons';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-6xl mx-auto border-t border-slate-200 relative z-10">
      <div className="gsap-header max-w-3xl mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-mono mb-3 border border-violet-200">
          <User size={14} />
          <span>ABOUT ME</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Passionate about clean code, UI design & modern web tech
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
          <p>I am an entry-level Frontend Developer dedicated to creating responsive, high-quality digital experiences. I focus on writing maintainable React components, crafting sleek CSS layouts, and adding engaging micro-interactions.</p>
          <p>My goal is to join an engineering team where I can contribute to real-world products, learn best practices from senior engineers, and continuously sharpen my skill set.</p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 shrink-0 border border-violet-100"><Rocket size={18} /></div>
            <div><h3 className="font-bold text-sm text-slate-900">Fast Learner</h3><p className="text-xs text-slate-500 mt-0.5">Quickly adopt new frameworks, APIs, and libraries through project-based coding.</p></div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 shrink-0 border border-cyan-100"><Code size={18} /></div>
            <div><h3 className="font-bold text-sm text-slate-900">UI Detail Oriented</h3><p className="text-xs text-slate-500 mt-0.5">Focused on clean typography, responsive layouts, and modern white-mode UI.</p></div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100"><Heart size={18} /></div>
            <div><h3 className="font-bold text-sm text-slate-900">Consistent & Driven</h3><p className="text-xs text-slate-500 mt-0.5">Building and solving logic challenges daily with genuine enthusiasm.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
