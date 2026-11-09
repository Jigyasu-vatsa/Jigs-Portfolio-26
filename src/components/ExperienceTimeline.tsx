import React, { useState } from 'react';
import { ExperienceItem } from '../types';
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Building,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
  const [filterType, setFilterType] = useState<'default' | 'all' | 'industrial' | 'internship' | 'teaching'>('default');
  const [expandedId, setExpandedId] = useState<string | null>('exp-1');

  const filteredExperiences = experiences.filter((exp) => {
    if (filterType === 'all') return true;
    if (filterType === 'default') return exp.category === 'industrial' || exp.category === 'internship';
    return exp.category === filterType;
  });

  const filterOptions: { label: string; value: typeof filterType }[] = [
    { label: 'Industry & Internships', value: 'default' },
    { label: 'All Experiences', value: 'all' },
    { label: 'Industrial & Enterprise', value: 'industrial' },
    { label: 'Enterprise Internships', value: 'internship' },
    { label: 'Academic Pedagogy', value: 'teaching' },
  ];

  return (
    <section id="experience" className="py-16 scroll-mt-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Professional &amp; Academic Experience
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              From enterprise full-stack leadership at JIGSY INDIA to high-load railway systems engineering at IRCTC
              and university algorithm pedagogy.
            </p>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 font-mono self-start md:self-auto bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
            Showing: <span className="text-cyan-600 dark:text-cyan-400 font-bold">{filteredExperiences.length}</span> positions
          </div>
        </div>

        {/* Experience Category Filter Buttons (Functional segmented buttons per sector) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterType(opt.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterType === opt.value
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6">
          {filteredExperiences.map((exp) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left: Role & Company */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5">
                      {exp.category === 'industrial' ? (
                        <Building className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      ) : exp.category === 'teaching' ? (
                        <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      ) : (
                        <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </div>

                    <div>
                      {/* Meta Topline (Unboxed metadata with separators) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold uppercase">{exp.category}</span>
                        <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                        <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                          {exp.duration}
                        </span>
                        <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {exp.designation}
                      </h3>

                      <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                        {exp.company}
                      </div>

                      <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                        {exp.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2.5 shrink-0">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>{isExpanded ? 'Less Details' : 'Know More'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex flex-wrap items-center gap-2">
                      {exp.certificateUrl && (
                        <a
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 border border-cyan-200 dark:border-cyan-800/50 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Certificate &darr;</span>
                        </a>
                      )}

                      {exp.reportUrl && (
                        <a
                          href={exp.reportUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/50 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Report &darr;</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 animate-fadeIn text-xs text-slate-600 dark:text-slate-300 space-y-4">
                    <p className="leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
                      {exp.fullDescription}
                    </p>

                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-2 font-mono uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        Key Accomplishments &amp; Delivered Modules
                      </h4>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300 pl-1">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        <span className="text-slate-500 font-mono text-[11px]">Applied Skills:</span>
                        {exp.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
