import React from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { Trophy, Award, Crown, CheckCircle2, Star } from 'lucide-react';

export const AchievementsHonor: React.FC = () => {
  return (
    <section id="achievements" className="py-16 scroll-mt-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Leadership & Honors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Recognitions, Awards & Leadership
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              From founding a private limited enterprise to state-level science symposium victories and school captaincy.
            </p>
          </div>
        </div>

        {/* Bento Grid for Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((ach, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm hover:shadow-cyan-500/5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                    {idx === 0 ? (
                      <Crown className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                    ) : idx === 1 ? (
                      <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                    {ach.year}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                  {ach.highlight}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                  {ach.title}
                </h3>

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                  {ach.organization}
                </p>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Distinction</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
