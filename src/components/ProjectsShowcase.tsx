import React, { useState } from 'react';
import { ProjectItem } from '../types';
import {
  Code2,
  ExternalLink,
  Layers,
  Sparkles,
  Train,
  Bot,
  Globe,
  Filter,
} from 'lucide-react';

interface ProjectsShowcaseProps {
  projects: ProjectItem[];
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-16 scroll-mt-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
              <Code2 className="w-3.5 h-3.5" />
              <span>Full-Stack &amp; Systems Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Production Projects &amp; Implementations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              High-concurrency transit booking integrations, AI voice chatbots, and multi-tenant enterprise platforms.
            </p>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 font-mono self-start md:self-auto bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
            Total Projects: <span className="text-cyan-700 dark:text-cyan-400 font-bold">{projects.length}</span>
          </div>
        </div>

        {/* Category Filters (Functional segmented buttons per §1.A) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1 font-mono">
            <Filter className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            Domain:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-200 border border-slate-200 dark:text-slate-400 dark:hover:text-white dark:bg-slate-950/60 dark:hover:bg-slate-800 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm hover:shadow-cyan-500/5"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                  <span className="text-cyan-700 dark:text-cyan-400 font-medium">{project.associatedWith}</span>
                  {project.featured && (
                    <span className="text-[10px] text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-800/40 flex items-center gap-1 font-semibold">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Impact Statement */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400">
                  <span className="text-slate-500 dark:text-slate-500 font-mono block text-[10px] uppercase font-semibold">Outcome &amp; Impact:</span>
                  <span className="text-slate-800 dark:text-slate-200 mt-0.5 block">{project.impact}</span>
                </div>
              </div>

              {/* Tech Stack & Links */}
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                {project.webLinks && project.webLinks.length > 0 ? (
                  <div className="mb-3 space-y-1.5">
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      <span>Web Presence &amp; Prototypes:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.webLinks.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={link.note}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                            link.status === 'active'
                              ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-500/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-950/80 dark:border-slate-800 dark:text-slate-300 dark:hover:text-cyan-300'
                          }`}
                        >
                          <span className="font-semibold">{link.label}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-sans uppercase font-bold tracking-wider ${
                              link.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                                : 'bg-cyan-100 text-cyan-800 border border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20'
                            }`}
                          >
                            {link.badge}
                          </span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-850"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{project.category}</span>
                  <a
                    href={project.docUrl || "pdfiles/IRCTCinternshipReportSubmission.PDF"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium"
                  >
                    <span>{project.docLabel || "Technical Doc"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
