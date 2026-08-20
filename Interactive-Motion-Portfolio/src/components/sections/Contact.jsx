import React, { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail } from '../icons/Icons';

export default function Contact() {
 

  return (
    <section id="contact" className="py-20 px-4 md:px-8 max-w-4xl mx-auto border-t border-slate-200 relative z-10">
      <div className="p-8 md:p-12 rounded-3xl bg-linear-to-b from-slate-100/80 to-white border border-slate-200 text-center space-y-6 shadow-lg">
       
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Let's Connect & Work Together</h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">I am currently open for entry-level developer positions, internships, or freelance frontend projects. Feel free to reach out directly!</p>

         


        <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-200 text-slate-500">
          <a href="https://github.com/RahulKakade24" target="_blank" rel="noreferrer" className="hover:text-violet-600 transition-colors flex items-center gap-1.5 text-xs font-medium"><Github size={16} /> GitHub</a>
          <a href="https://www.linkedin.com/in/rahul-kakade7777/" target="_blank" rel="noreferrer" className="hover:text-violet-600 transition-colors flex items-center gap-1.5 text-xs font-medium"><Linkedin size={16} /> LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
