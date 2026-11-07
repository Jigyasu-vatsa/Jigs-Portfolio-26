import React, { useState } from 'react';
import { ConferenceItem } from '../types';
import {
  Users,
  Calendar,
  MapPin,
  Award,
  FileCheck,
  ExternalLink,
  Presentation,
  Filter,
  Globe,
} from 'lucide-react';

interface ConferencesSectionProps {
  conferences: ConferenceItem[];
}

export const ConferencesSection: React.FC<ConferencesSectionProps> = ({ conferences }) => {
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [modeFilter, setModeFilter] = useState<string>('All');

  const filteredConferences = conferences.filter((conf) => {
    if (roleFilter !== 'All' && conf.role !== roleFilter) return false;
    if (modeFilter !== 'All' && conf.mode !== modeFilter) return false;
    return true;
  });

  const roles = ['All', 'Presenter', 'Author', 'Invited Delegate', 'Attendee'];
  const modes = ['All', 'In-Person', 'Hybrid', 'Virtual'];

  return (
    <section id="conferences" className="py-16 scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <Presentation className="w-3.5 h-3.5" />
              <span>Academic Summits & Symposia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Conferences Attended & Presented
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Engaging with the international research community, presenting peer-reviewed discoveries in sustainable
              circular computing, and participating in expert transit engineering symposiums.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono self-start md:self-auto bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Total Conferences: <span className="text-cyan-400 font-bold">{conferences.length}</span>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-8 bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          {/* Role Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Role:</span>
            </span>
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  roleFilter === r
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-200 border border-slate-200 dark:text-slate-400 dark:hover:text-white dark:bg-slate-950/60 dark:hover:bg-slate-800 dark:border-slate-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Mode Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Format:</span>
            {modes.map((m) => (
              <button
                key={m}
                onClick={() => setModeFilter(m)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  modeFilter === m
                    ? 'bg-blue-600 dark:bg-blue-500 text-white font-bold'
                    : 'text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-200 border border-slate-200 dark:text-slate-400 dark:hover:text-white dark:bg-slate-950/60 dark:hover:bg-slate-800 dark:border-slate-800'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Conference Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredConferences.map((conf) => (
            <div
              key={conf.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm hover:shadow-cyan-500/5"
            >
              <div>
                {/* Meta Topline (Unboxed metadata with separators) */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">{conf.acronym}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{conf.year}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-emerald-400">{conf.role}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {conf.mode}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {conf.conferenceName}
                </h3>

                {/* Logistics */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400 mt-2 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {conf.dates}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {conf.location}
                  </span>
                </div>

                {/* Presented Paper Callout if applicable */}
                {conf.paperTitle && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                    <span className="text-slate-500 font-mono block text-[11px]">Presented Paper:</span>
                    <span className="text-cyan-200 font-medium mt-0.5 block italic">
                      &ldquo;{conf.paperTitle}&rdquo;
                    </span>
                  </div>
                )}

                {/* Live Prototype Callout if defined */}
                {conf.prototypeUrl && (
                  <div className={`mt-3 p-3 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                    conf.prototypeStatus === 'active'
                      ? 'bg-emerald-950/50 border-emerald-500/40'
                      : 'bg-cyan-950/50 border-cyan-500/40'
                  }`}>
                    <div>
                      <div className={`flex items-center gap-1.5 font-semibold text-xs ${
                        conf.prototypeStatus === 'active' ? 'text-emerald-300' : 'text-cyan-300'
                      }`}>
                        <Globe className={`w-3.5 h-3.5 ${
                          conf.prototypeStatus === 'active' ? 'text-emerald-400' : 'text-cyan-400'
                        }`} />
                        <span>{conf.prototypeLabel || 'Prototype'}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-sans uppercase font-bold tracking-wider ${
                          conf.prototypeStatus === 'active'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        }`}>
                          {conf.prototypeBadge || (conf.prototypeStatus === 'active' ? 'Active Prototype' : 'Next Soon')}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        {conf.prototypeNote || 'Interactive prototype platform showing how food redistribution works.'}
                      </div>
                    </div>
                    <a
                      href={conf.prototypeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg text-slate-950 transition-colors shrink-0 ${
                        conf.prototypeStatus === 'active'
                          ? 'bg-emerald-500 hover:bg-emerald-400'
                          : 'bg-cyan-400 hover:bg-cyan-300'
                      }`}
                    >
                      <span>Open {conf.prototypeLabel ? conf.prototypeLabel.split(' ')[0] : 'Prototype'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {conf.description}
                </p>

                {/* Topics */}
                {conf.topics && conf.topics.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/60">
                    {conf.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-850"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Organizer: <strong className="text-slate-300 font-medium">{conf.organizer}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {conf.prototypeUrl && (
                    <a
                      href={conf.prototypeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-medium transition-all ${
                        conf.prototypeStatus === 'active'
                          ? 'text-emerald-300 hover:text-white bg-emerald-950/80 border-emerald-500/40'
                          : 'text-cyan-300 hover:text-white bg-cyan-950/80 border-cyan-500/40'
                      }`}
                      title={conf.prototypeNote || conf.prototypeLabel}
                    >
                      <Globe className={`w-3 h-3 ${conf.prototypeStatus === 'active' ? 'text-emerald-400' : 'text-cyan-400'}`} />
                      <span>{conf.prototypeLabel ? conf.prototypeLabel.split(' ')[0] : 'Prototype'}</span>
                      <span className={`text-[9px] px-1 py-0.2 rounded font-sans uppercase font-bold tracking-wider ${
                        conf.prototypeStatus === 'active'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-cyan-500/10 text-cyan-400'
                      }`}>
                        {conf.prototypeBadge || (conf.prototypeStatus === 'active' ? 'Active' : 'Next Soon')}
                      </span>
                      <ExternalLink className={`w-3 h-3 ${conf.prototypeStatus === 'active' ? 'text-emerald-400' : 'text-cyan-400'}`} />
                    </a>
                  )}

                  {conf.driveUrl && (
                    <a
                      href={conf.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-950 border border-slate-800 font-medium"
                    >
                      <span>Google Drive</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400" />
                    </a>
                  )}

                  {conf.certificateUrl && (
                    <a
                      href={conf.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>View Proceedings</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
