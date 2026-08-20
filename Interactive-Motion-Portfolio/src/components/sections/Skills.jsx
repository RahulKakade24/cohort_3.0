import React, { useState } from 'react';
import { Cpu } from '../icons/Icons';
import { skillsData } from '../../data/skills';

export default function Skills() {
  const [skillCategory, setSkillCategory] = useState('all');
  const filteredSkills = skillCategory === 'all' ? skillsData : skillsData.filter(s => s.category === skillCategory);

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend Core' },
    { id: 'styling', label: 'Styling & Motion' },
    { id: 'tools', label: 'Tools & APIs' }
  ];

  return (
    <section id="skills" className="py-20 px-4 md:px-8 max-w-6xl mx-auto border-t border-slate-200 relative z-10">
      <div className="gsap-header text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-mono mb-3 border border-violet-200">
          <Cpu size={14} /><span>TECH STACK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Skills & Capabilities</h2>
        <p className="text-slate-600 text-xs sm:text-sm">Technologies and tools I use to build modern web interfaces.</p>
      </div>

      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSkillCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              skillCategory === cat.id
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm'
            }`}
          >{cat.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSkills.map((skill, idx) => {
          const IconComponent = skill.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 group-hover:scale-105 transition-transform">
                    <IconComponent size={18} />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono border border-slate-200">{skill.level}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-600 transition-colors">{skill.name}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{skill.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
