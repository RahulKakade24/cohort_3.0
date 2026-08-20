import React from 'react';
import { CheckCircle2, ExternalLink, X } from '../icons/Icons';


export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200">
          <X size={18} />
        </button>

        <div className="space-y-2">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono border ${project.badgeColor}`}>{project.categoryLabel}</span>
          <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{project.description}</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase font-mono">Key Highlights</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-violet-600 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase font-mono">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]">{t}</span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span>Launch Live Project</span><ExternalLink size={14} />
          </a>
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200">Close Details</button>
        </div>
      </div>
    </div>
  );
}
