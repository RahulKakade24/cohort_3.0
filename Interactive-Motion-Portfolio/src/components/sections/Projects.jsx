import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight, ExternalLink, Github, Layers, Maximize2 } from '../icons/Icons';
import { projectsData } from '../../data/projects';
import ProjectModal from '../modals/ProjectModal';

export default function Projects() {
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const filteredProjects = projectFilter === 'all' ? projectsData : projectsData.filter(p => p.category === projectFilter);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'motion', label: 'React & Motion' },
    { id: 'webapp', label: 'Web Apps' },
    { id: 'api', label: 'APIs & Data' }
  ];

  return (
    <>
      <section id="projects" className="py-20 px-4 md:px-8 max-w-6xl mx-auto border-t border-slate-200 relative z-10">
        <div className="gsap-header text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-mono mb-3 border border-violet-200">
            <Layers size={14} /><span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Featured Projects</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Hand-picked web applications highlighting motion, clean state, and dynamic API fetching.</p>
        </div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setProjectFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                projectFilter === filter.id
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >{filter.label}</button>
          ))}
        </div>

        <div className="gsap-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="gsap-card group p-5.5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div className="space-y-4">
                <div className={`h-40 rounded-2xl bg-linear-to-br ${project.color} p-4 flex flex-col justify-between border border-slate-200/80 relative overflow-hidden`}>
                  <div className="flex items-center justify-between z-10">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border shadow-sm ${project.badgeColor}`}>{project.categoryLabel}</span>
                    <button onClick={() => setSelectedProject(project)} className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 transition-colors shadow-sm" title="Inspect Details">
                      <Maximize2 size={14} />
                    </button>
                  </div>
                  <div className="z-10 flex items-center justify-between text-slate-900">
                    <span className="text-xs font-mono font-bold tracking-wider">{project.title}</span>
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="p-1 rounded-lg hover:bg-white/60 transition-colors" title="Live Demo">
                      <ArrowUpRight size={16} className="text-slate-600 group-hover:text-violet-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-600 transition-colors">{project.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{project.summary}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[10px]">{t}</span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <button onClick={() => setSelectedProject(project)} className="text-xs font-bold text-violet-600 hover:text-violet-800 flex items-center gap-1">
                  <span>Project Details</span><ChevronRight size={14} />
                </button>
                <div className="flex items-center gap-2">
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-violet-600 transition-colors" title="Live Demo">
                    <ExternalLink size={15} />
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors" title="Source Code">
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
