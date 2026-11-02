/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Developer Maintenance Note:
 * JigsyIndiaSection.tsx is the dedicated corporate showcase for JIGSY INDIA
 * (Jigyasu Integrated Global Services Private Limited), founded and led by Mr. Jigyasu Vatsa.
 * Update corporate divisions, contact links, or services directly in this file.
 */

import React from 'react';
import {
  Building2,
  Code2,
  ShieldCheck,
  Cpu,
  GraduationCap,
  ExternalLink,
  Award,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  FileCheck,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const JigsyIndiaSection: React.FC = () => {
  const corporateServices = [
    {
      title: 'IT Services & Full-Stack Engineering',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      tag: 'Core Enterprise Service',
      description:
        'Architecting high-availability enterprise web suites, real-time communication networks, recruitment pipelines, and cloud database architectures with microsecond latency tuning.',
      capabilities: [
        'Proprietary Applicant Tracking & Assessment Systems',
        'Real-Time WebSocket Enterprise Messengers',
        'ACID-Compliant Relational Database Modeling & Normalization',
        'API Gateway & Microservices Infrastructure',
      ],
    },
    {
      title: 'Industrial Training & Academic Pedagogy',
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
      tag: 'Workforce Upskilling',
      description:
        'Conducting certified training programs in Design & Analysis of Algorithms (DAA), Data Structures (DSA), and Advanced Technologies for university engineering cohorts and industry professionals.',
      capabilities: [
        '180+ Students Coached in Algorithm Design (DAA)',
        '120+ Students Mentored in Data Structures & Algorithms',
        '80+ Scholars Trained in Advanced Cloud Technologies',
        'Co-Guide Mentorship for Undergraduate Capstone Projects',
      ],
    },
    {
      title: 'AI & Cyber Security Research Consultancy',
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      tag: 'Advanced R&D',
      description:
        'Pioneering intelligent algorithms for Industry 5.0, circular economy resource optimization, cryptographic verification, and educator threat modeling in collaboration with national research bodies.',
      capabilities: [
        'Priority-Based Decay Allocation Heuristics',
        'Cryptographic Validation in Perishable Supply Chains',
        'Educator Cyber Defense & Pedagogical Security Frameworks',
        'Peer-Reviewed Academic & Industry Publication Pipelines',
      ],
    },
    {
      title: 'Digitalization & Public Sector Infrastructure',
      icon: <Globe2 className="w-5 h-5 text-amber-400" />,
      tag: 'Civic Transformation',
      description:
        'Placing verified computational intelligence and digital accessibility at every citizen’s fingertips through ethical, human-centric software implementations.',
      capabilities: [
        'Citizen-Centric Information & Public Service Portals',
        'Native Language Localization (e.g. AICTE-VAANI Maithili Systems)',
        'Sustainable Circular Economy Waste Reduction Frameworks',
        'Multi-Modal Transit & Ticketing Verification Standards',
      ],
    },
  ];

  return (
    <section className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Navigation Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
          <Building2 className="w-4 h-4" />
          <span>Founded Enterprise Showcase</span>
        </div>

        {/* Corporate Header Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-2 border-cyan-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden mb-12">
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 justify-between">
            {/* Left Column: Corporate Brand & Profile */}
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Legally Registered Private Limited Enterprise</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Jigyasu Integrated Global Services Private Limited
              </h1>

              <div className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                JIGSY INDIA • Adaptive Innovation &amp; Ethical Technology
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Founded and directed by <strong className="text-white">Mr. Jigyasu Vatsa</strong>, JIGSY INDIA operates at the intersection of enterprise software engineering, academic excellence, industrial training, and artificial intelligence consultancy. We empower organizations and scholars to transform theoretical computer science into scalable, production-grade solutions.
              </p>

              {/* Founder Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Founder &amp; Status</span>
                  <span className="text-cyan-300 font-bold text-xs mt-0.5 block">Developer &amp; Chairperson</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Primary Domain</span>
                  <span className="text-white font-bold text-xs mt-0.5 block">CSE in AI &amp; Cyber Sec</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Registered Base</span>
                  <span className="text-emerald-300 font-bold text-xs mt-0.5 block">Darbhanga, Bihar</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Official Portal</span>
                  <a
                    href="https://jigsy.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 font-bold text-xs mt-0.5 hover:underline flex items-center gap-1"
                  >
                    <span>jigsy.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                <a
                  href="https://jigsy.in"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Globe2 className="w-4 h-4" />
                  <span>Launch Official jigsy.in Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#contact"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Partner with JIGSY INDIA</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-Res Official Corporate Emblem */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="relative group">
                <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-cyan-500 via-blue-500 to-amber-400 shadow-2xl shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center p-1">
                    <img
                      src="/assets/aistudio/image_bdd66c74.png"
                      alt="JIGSY INDIA - Jigyasu Integrated Global Services Private Limited Official Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="text-center mt-3">
                  <span className="text-[11px] font-mono text-cyan-400 tracking-wider font-semibold block">
                    Official Corporate Seal
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Jigyasu Ikshan Granthi Samriddhi Yukti
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Motto & Ethos Spotlight */}
        <div className="mb-12 p-6 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            Corporate Ethos &amp; Mission Statement
          </span>
          <blockquote className="text-base sm:text-lg italic text-slate-200 max-w-3xl mx-auto leading-relaxed">
            &ldquo;Adaptive ethical interpersonal collaborative commitment to excellence for contributions to the growth and development of Mankind.&rdquo;
          </blockquote>
          <div className="mt-3 text-xs font-mono text-slate-400">
            — <strong className="text-white">Mr. Jigyasu Vatsa</strong>, Founder, Developer &amp; Chairperson, JIGSY INDIA
          </div>
        </div>

        {/* 4 Core Corporate Pillars */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Enterprise Verticals &amp; Service Pillars
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Comprehensive technological solutions provided to enterprise clients, academic institutions, and students.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corporateServices.map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {service.icon}
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                    {service.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">JIGSY Enterprise Standard</span>
                  <a
                    href="https://jigsy.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-cyan-400 hover:text-white flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inquire via jigsy.in</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
