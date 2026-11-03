import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ResearchMetrics } from '../utils/researchUtils';
import {
  FileText,
  Sparkles,
  Award,
  ExternalLink,
  BookOpen,
  Users,
  Briefcase,
  Layers,
  GraduationCap,
  Gamepad2,
  ShieldCheck,
} from 'lucide-react';

interface HeroDashboardProps {
  metrics: ResearchMetrics;
  onExplorePapers: () => void;
  onExploreConferences: () => void;
  onExploreFdp: () => void;
  onExploreInteractive: () => void;
  onExploreJigsy?: () => void;
}

export const HeroDashboard: React.FC<HeroDashboardProps> = ({
  metrics,
  onExplorePapers,
  onExploreConferences,
  onExploreFdp,
  onExploreInteractive,
  onExploreJigsy,
}) => {
  return (
    <section id="overview" className="relative pt-8 pb-12 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Computer Science Researcher · Founder · Systems Engineer</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              Transforming Academic Research into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                High-Impact Distributed Systems.
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Developer &amp; Chairperson at <span className="text-white font-medium">JIGSY INDIA</span> (DPIIT Recognised Startup), pursuing{' '}
              <span className="text-cyan-300 font-semibold">Simultaneous Dual Masters</span> (Regular M.Tech CSE @ Sandip University + Distance MBA @ IGNOU under UGC guidelines), Assistant Examination Coordinator at <span className="text-white font-medium">SOCSE</span>, and Former Developer Intern at{' '}
              <span className="text-white font-medium">IRCTC</span>. Based in <span className="text-slate-100 font-medium">Darbhanga, Bihar</span>.
            </p>

            {/* Quick Interactive Tags - Unboxed text with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-4 font-mono">
              <span className="text-emerald-300 font-semibold">Startup (DPIIT Recognised)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-300 font-semibold">Entrepreneur</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-300">4 International Conferences</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-300">UGC-NET Qualified (Ph.D.)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-300">Bihar STET Qualified</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-300">Amazon Author (&quot;Mastering DSA Without Fear&quot;)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-purple-300">Springer Nature &amp; WoS</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mt-7">
              <button
                onClick={onExplorePapers}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>{metrics.totalPapers} Research Publications</span>
              </button>

              <button
                onClick={onExploreConferences}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-750 rounded-xl transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-cyan-400" />
                <span>4 International Conferences</span>
              </button>

              {onExploreJigsy && (
                <button
                  onClick={onExploreJigsy}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/80 rounded-xl transition-all flex items-center gap-2 shadow-sm"
                >
                  <img
                    src="/assets/aistudio/image_bdd66c74.png"
                    alt="JIGSY logo"
                    className="w-4 h-4 rounded-full"
                  />
                  <span>JIGSY INDIA Startup</span>
                </button>
              )}

              <button
                onClick={onExploreFdp}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-750 rounded-xl transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-emerald-400" />
                <span>3 FDPs &amp; Workshops</span>
              </button>

              <button
                onClick={onExploreInteractive}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Gamepad2 className="w-4 h-4 text-purple-400" />
                <span>Interactive Lab</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Portrait & Research Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950 border border-slate-750 p-6 shadow-2xl backdrop-blur-xl">
              {/* Profile image with executive styling */}
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative shrink-0">
                  {/* Subtle backlight glow */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-teal-400/20 to-blue-600/30 blur-md opacity-75" />
                  
                  {/* Active Status Beacon - Placed cleanly above photo on top right */}
                  <div className="absolute -top-4 -right-3 z-20 flex items-center gap-1.5 bg-slate-900/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-emerald-500/60 shadow-lg shadow-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-emerald-300">ACTIVE</span>
                  </div>

                  {/* Executive double-ring luxury frame */}
                  <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-cyan-400 via-teal-300 to-indigo-500 shadow-xl shadow-cyan-500/20">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[14px] overflow-hidden bg-slate-950 relative">
                      <div
                        className="w-full h-full hover:scale-105 transition-transform duration-500"
                        style={{
                          backgroundImage: 'url(/assets/aistudio/image_1d924a9e.png)',
                          backgroundPosition: '1.2% 52%',
                          backgroundSize: '950%',
                          backgroundRepeat: 'no-repeat',
                        }}
                        role="img"
                        aria-label="Jigyasu Vatsa - Founder & Systems Researcher"
                      />
                    </div>
                  </div>

                  {/* Clean, unique photo tag without dual clutter */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 text-slate-950 text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                    <ShieldCheck className="w-3 h-3 text-slate-950" />
                    <span>FOUNDER &amp; RESEARCHER</span>
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5 font-medium">
                    Chairperson @ JIGSY INDIA (DPIIT Recognised)
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Asst. Exam Coordinator (SOCSE) · Dual Masters: M.Tech CSE &amp; MBA
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-300 font-mono">
                    <a
                      href={PERSONAL_INFO.orcidId}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-emerald-400 text-emerald-300 transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      ORCID Profile
                    </a>
                    <span>·</span>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Research Focus Matrix mini-grid inside card */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-800/80 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Dual Masters</span>
                  <span className="font-semibold text-slate-100 mt-0.5 block">Regular M.Tech + ODL MBA</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Primary Domain</span>
                  <span className="font-semibold text-slate-100 mt-0.5 block">CSE in AI &amp; Cyber Security</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Corporate Status</span>
                  <span className="font-semibold text-emerald-300 mt-0.5 block">Developer</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Academic Roles</span>
                  <span className="font-semibold text-cyan-300 mt-0.5 block">Asst. Exam Coor. &amp; Faculty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip in full-width row below hero split */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                5
              </div>
              <div className="text-xs text-slate-400">
                Research Publications
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                4
              </div>
              <div className="text-xs text-slate-400">
                International Conferences
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                3
              </div>
              <div className="text-xs text-slate-400">
                FDPs &amp; Workshops
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                2
              </div>
              <div className="text-xs text-slate-400">
                Dual Masters Degrees (UGC)
              </div>
            </div>
          </div>
        </div>

        {/* What's Uniqueness in Jigyasu Vatsa: Synthesized R&D, Enterprise & Academics */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-cyan-950/30 to-slate-900/90 border border-cyan-800/40 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Executive Architectural Synthesis</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                What&apos;s Uniqueness in Jigyasu Vatsa: Synthesizing R&amp;D, Enterprise Systems &amp; Academic Pedagogy
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
                A rare, multidimensional synergy across four core pillars: <strong>Dual Masters</strong> (Regular M.Tech CSE @ Sandip University + Distance MBA @ IGNOU under UGC dual-degree guidelines), <strong>DPIIT Recognised Startup Founder</strong> (JIGSY INDIA), <strong>Academic Leadership</strong> (Assistant Examination Coordinator @ SOCSE, FDP Coordinator, Training Placement Committee Member), and <strong>Production Systems Engineering</strong> (IRCTC DMRC QR Ticketing Integration, Amazon Published Author).
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap lg:flex-col gap-2 font-mono text-xs">
              <div className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>UGC-NET Qualified (Ph.D.)</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Bihar STET Qualified</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-700/60 text-purple-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>DPIIT: DIPP228528</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
