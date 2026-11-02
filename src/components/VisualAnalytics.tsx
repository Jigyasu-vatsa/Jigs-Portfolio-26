import React, { useState } from 'react';
import { ResearchPaper } from '../types';
import { ResearchMetrics } from '../utils/researchUtils';
import {
  BarChart3,
  PieChart,
  Activity,
  Layers,
  Database,
  TrendingUp,
  Cpu,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface VisualAnalyticsProps {
  papers: ResearchPaper[];
  metrics: ResearchMetrics;
  onSelectTag?: (tag: string) => void;
}

export const VisualAnalytics: React.FC<VisualAnalyticsProps> = ({
  papers,
  metrics,
}) => {
  const [activeTab, setActiveTab] = useState<'indexing' | 'timeline' | 'domains'>('indexing');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Timeline data calculation
  const years = [2024, 2025, 2026];
  const yearData = years.map((yr) => {
    const yrPapers = papers.filter((p) => p.year === yr);
    return {
      year: yr,
      count: yrPapers.length,
      citations: yrPapers.reduce((sum, p) => sum + (p.citationsCount || 0), 0),
      papers: yrPapers,
    };
  });

  const domains = [
    {
      name: 'AI & Circular Economy Optimization',
      percentage: 45,
      papersCount: 2,
      color: 'from-cyan-500 to-teal-400',
      description: 'Shelf-life decay heuristics, priority allocation algorithms, and decentralized food redistribution.',
    },
    {
      name: 'High-Concurrency Transit Databases',
      percentage: 30,
      papersCount: 1,
      color: 'from-blue-500 to-indigo-500',
      description: 'Transaction validation, schema design, and regression suites for IRCTC & DMRC QR multimodal ticketing.',
    },
    {
      name: 'Autonomous NLP & Voice Assistants',
      percentage: 15,
      papersCount: 1,
      color: 'from-purple-500 to-pink-500',
      description: 'Speech recognition, dialog state models, and multi-platform automation bots.',
    },
    {
      name: 'Socio-Technical & Institutional Economics',
      percentage: 10,
      papersCount: 1,
      color: 'from-amber-500 to-orange-400',
      description: 'Institutional analysis of inclusive growth and economic grassroots access.',
    },
  ];

  return (
    <section id="analytics" className="py-16 scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Research &amp; Engineering Metrics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              R&amp;D Analytics &amp; Systems Telemetry
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Computational breakdown of publication indexing distributions, citation velocity, and verified engineering telemetry.
            </p>
          </div>

          {/* Visualization Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('indexing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'indexing'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>Indexing Distribution</span>
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'timeline'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Publication Velocity</span>
            </button>
            <button
              onClick={() => setActiveTab('domains')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'domains'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Research Clusters</span>
            </button>
          </div>
        </div>

        {/* Dynamic Analytics Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visualizer Area */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
            {activeTab === 'indexing' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-cyan-400" />
                      Index Recognition & Peer-Review Standing
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Scholarly works mapped against global academic indexing databases.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                    100% Peer-Reviewed
                  </span>
                </div>

                {/* Progress bars with tabular-nums */}
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        Web of Science (WOS) Indexed Book Chapters
                      </span>
                      <span className="font-mono text-amber-400 tabular-nums">
                        {metrics.wosIndexed} / {metrics.totalPapers} (
                        {Math.round((metrics.wosIndexed / metrics.totalPapers) * 100)}%)
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-700"
                        style={{ width: `${(metrics.wosIndexed / metrics.totalPapers) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        Scopus Indexed Conference & Journal Papers
                      </span>
                      <span className="font-mono text-emerald-400 tabular-nums">
                        {metrics.scopusIndexed} / {metrics.totalPapers} (
                        {Math.round((metrics.scopusIndexed / metrics.totalPapers) * 100)}%)
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full transition-all duration-700"
                        style={{ width: `${(metrics.scopusIndexed / metrics.totalPapers) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                        Peer-Reviewed International Volumes
                      </span>
                      <span className="font-mono text-cyan-400 tabular-nums">
                        {metrics.peerReviewed} / {metrics.totalPapers} (
                        {Math.round((metrics.peerReviewed / metrics.totalPapers) * 100)}%)
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full transition-all duration-700"
                        style={{ width: `${(metrics.peerReviewed / metrics.totalPapers) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                        UGC-CARE Approved Institutional Studies
                      </span>
                      <span className="font-mono text-purple-400 tabular-nums">
                        1 / {metrics.totalPapers} (
                        {Math.round((1 / metrics.totalPapers) * 100)}%)
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full transition-all duration-700"
                        style={{ width: `${(1 / metrics.totalPapers) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                      Publication Trajectory & Citation Acceleration
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Chronological progression of accepted manuscripts, citations, and conference presentations.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    2024 — 2026+
                  </span>
                </div>

                {/* Interactive SVG Bar Visualizer */}
                <div className="h-56 flex items-end justify-around gap-6 pt-6 pb-2 border-b border-slate-800">
                  {yearData.map((d) => {
                    const maxBarHeight = 160;
                    const barHeight = Math.max((d.count / 3) * maxBarHeight, 35);
                    const isHovered = hoveredYear === d.year;

                    return (
                      <div
                        key={d.year}
                        onMouseEnter={() => setHoveredYear(d.year)}
                        onMouseLeave={() => setHoveredYear(null)}
                        className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        {/* Hover Tooltip / Label */}
                        <div
                          className={`text-xs font-mono text-center transition-all ${
                            isHovered
                              ? 'text-cyan-300 scale-110 font-bold'
                              : 'text-slate-400'
                          }`}
                        >
                          <span className="tabular-nums font-bold text-white block text-sm">
                            {d.count}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {d.citations} citations
                          </span>
                        </div>

                        {/* Bar */}
                        <div
                          className={`w-full max-w-[70px] rounded-t-xl transition-all duration-300 ${
                            isHovered
                              ? 'bg-gradient-to-t from-cyan-600 via-cyan-400 to-teal-300 shadow-lg shadow-cyan-500/20'
                              : 'bg-gradient-to-t from-slate-800 to-cyan-600/70 hover:to-cyan-500'
                          }`}
                          style={{ height: `${barHeight}px` }}
                        />

                        {/* Year Label */}
                        <span className="text-xs font-mono font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                          {d.year}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 mt-4 font-mono">
                  <span>Hover over any year to view output volume</span>
                  <span className="text-cyan-400">Total Citation Volume: 38+</span>
                </div>
              </div>
            )}

            {activeTab === 'domains' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-cyan-400" />
                      Research Cluster Concentration
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Algorithmic, structural, and socioeconomic focus areas across research papers.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {domains.map((dom) => (
                    <div
                      key={dom.name}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white line-clamp-1">{dom.name}</span>
                        <span className="text-xs font-mono font-bold text-cyan-400 tabular-nums">
                          {dom.percentage}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full bg-gradient-to-r ${dom.color} rounded-full`}
                          style={{ width: `${dom.percentage}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {dom.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Infrastructure & Engineering Telemetry */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
                <Cpu className="w-4 h-4" />
                <span>Engineering Telemetry</span>
              </div>
              <h3 className="text-base font-bold text-white mb-4">
                Production-Grade System Metrics
              </h3>

              <div className="space-y-3 text-xs font-mono">
                {/* IRCTC and DMRC Integration */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>IRCTC &amp; DMRC QR Systems</span>
                    </span>
                    <span className="font-bold text-cyan-300 text-[11px]">IRCTC and DMRC Integration - testing</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-sans mt-1">
                    Integration, regression, and functional test validation across passenger ticketing workflows.
                  </p>
                </div>

                {/* Student Coached: DAA */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Students Coached in DAA</span>
                  </span>
                  <span className="font-bold text-cyan-300 tabular-nums">180+ Students</span>
                </div>

                {/* Student Coached: DSA */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Students Coached in DSA</span>
                  </span>
                  <span className="font-bold text-emerald-300 tabular-nums">120+ Students</span>
                </div>

                {/* Student Coached: Advance Technology */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Students in Advance Tech</span>
                  </span>
                  <span className="font-bold text-purple-300 tabular-nums">80+ Students</span>
                </div>

                {/* Capstone Co-Guide / Mentor */}
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>B.Tech Project Co-Guide</span>
                    </span>
                    <span className="font-bold text-amber-300 tabular-nums">4 Students</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                    Mentored undergraduate capstone major project &amp; industrial training cohorts.
                  </p>
                </div>

                {/* Query latency optimization */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Query Latency Optimization</span>
                  <span className="font-bold text-emerald-400 tabular-nums">-34% (Nabeng)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distinguished Professional Ethos Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 border border-slate-800/80 text-center relative overflow-hidden shadow-lg">
          <div className="text-[10px] font-mono uppercase text-cyan-400 tracking-widest mb-2 font-bold flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-cyan-500/50" />
            <span>Professional Ethos &amp; Foundational Commitment</span>
            <span className="w-8 h-[1px] bg-cyan-500/50" />
          </div>
          <blockquote className="text-sm sm:text-base italic text-slate-200 max-w-3xl mx-auto leading-relaxed">
            &ldquo;Adaptive ethical interpersonal collaborative commitment to excellence for contributions to the
            growth and development of Mankind.&rdquo;
          </blockquote>
          <div className="mt-3 text-xs font-mono text-cyan-300 font-semibold">
            — Jigyasu Vatsa · Developer &amp; Chairperson, JIGSY INDIA
          </div>
        </div>
      </div>
    </section>
  );
};
