import React from 'react';
import { GraduationCap, Briefcase, Award, CheckCircle2, ShieldCheck, BookOpen, Layers } from 'lucide-react';

export const DualMastersCard: React.FC = () => {
  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-2 border-cyan-500/30 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                Higher Education Portfolio
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Simultaneous Dual Master&apos;s Degrees
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>UGC Dual Degree Compliant</span>
          </div>
        </div>

        {/* Legal / UGC Exemption Note Banner */}
        <p className="text-xs text-slate-300 leading-relaxed mb-6 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
          <strong className="text-cyan-400 font-semibold">Regulatory Framework:</strong> Pursuing simultaneous
          higher education under official <strong className="text-slate-100">University Grants Commission (UGC) Guidelines</strong>{' '}
          notifying that a candidate can enroll in <span className="underline decoration-cyan-500">one full-time regular degree programme</span>{' '}
          along with <span className="underline decoration-blue-500">one programme in Open and Distance Learning (ODL) / Online mode</span>{' '}
          concurrently.
        </p>

        {/* Dual Master Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Degree 1: M.Tech Regular */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/90 relative group hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-cyan-400 font-bold uppercase">Program 01: Regular Full-Time</span>
              <span>2025 — 2027</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              Master of Technology (M.Tech)
            </h4>
            <div className="text-xs font-semibold text-cyan-300 mt-0.5">
              Computer Science & Engineering
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Sandip University, Madhubani, Bihar
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Specialization: Distributed Systems, High-Concurrency DBs, and Advanced DAA.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Concurrent Role: Faculty Teaching Assistant for B.Tech CSE engineering batches.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Status: In Progress / Pursuing (Regular Mode).</span>
              </div>
            </div>
          </div>

          {/* Degree 2: MBA Distance / ODL */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/90 relative group hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-blue-400 font-bold uppercase">Program 02: Open & Distance (ODL)</span>
              <span>2026 — 2028</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              Master of Business Administration (MBA)
            </h4>
            <div className="text-xs font-semibold text-blue-300 mt-0.5">
              Strategic Enterprise Management & Technology Governance
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Indira Gandhi National Open University (IGNOU)
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Synergy: Corporate executive strategy as Chairperson of JIGSY INDIA.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Curriculum: Technology commercialization, fiscal management, human capital strategy.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Status: In Progress / Pursuing (Distance / ODL Mode).</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
