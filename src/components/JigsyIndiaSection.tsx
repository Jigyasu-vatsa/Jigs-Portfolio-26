/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Developer Maintenance Note:
 * JigsyIndiaSection.tsx is the dedicated corporate showcase for JIGSY INDIA
 * (Jigyasu Integrated Global Services Private Limited), founded and led by Mr. Jigyasu Vatsa.
 * Structured across official verticals: JIGSY R&D, JIGSY DigiTech, JIGSY Consult,
 * JIGSY Tech, JIGSY Youth, and JIGSY EduTech.
 */

import React, { useState } from 'react';
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
  BookOpen,
  Film,
  Briefcase,
  FileText,
  Clock,
  Layers,
  Check,
} from 'lucide-react';
import { PERSONAL_INFO, AUTHORED_BOOK, RESEARCH_PAPERS } from '../data/portfolioData';

export const JigsyIndiaSection: React.FC = () => {
  const [selectedVertical, setSelectedVertical] = useState<string>('all');

  // Corporate Divisions / Sectors under JIGSY INDIA
  const corporateVerticals = [
    {
      id: 'rnd',
      brand: 'JIGSY R&D',
      title: "Jigsy's Research & Development Cell",
      subtitle: 'Foundational Research & Algorithmic Systems',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      tag: 'Core R&D Cell',
      badgeColor: 'border-cyan-500/40 bg-cyan-950/60 text-cyan-300',
      description:
        "Jigsy's dedicated R&D cell focused on core scientific discovery, algorithm design, distributed architectures, circular economy resource allocation, and AI-assisted optimization frameworks.",
      capabilities: [
        'Priority-Based Decay Allocation Heuristics (Springer Nature published)',
        'Sustainable Circular Economy Resource Redistribution Architectures',
        'Cryptographic Supply Verification & Anti-Tampering Protocols',
        'High-Concurrency Database Isolation & Tatkal Engine Simulations',
      ],
      deliverables: 'Research Papers, Algorithmic Blueprints & Academic Patents',
    },
    {
      id: 'digitech',
      brand: 'JIGSY DigiTech',
      title: 'Digital Media & Content Publishing',
      subtitle: 'Books, Papers, Posters & Multimedia Creation',
      icon: <Film className="w-5 h-5 text-purple-400" />,
      tag: 'Publishing & Media',
      badgeColor: 'border-purple-500/40 bg-purple-950/60 text-purple-300',
      description:
        'The specialized publishing and multimedia production arm responsible for authoring and distributing textbooks, research papers, educational reels, scientific posters, institutional branding, and digital media campaigns.',
      capabilities: [
        'Textbook Authoring & Global ISBN Publishing ("Mastering DSA Without Fear" on Amazon)',
        'Conference Abstract & ISBN Proceeding Typesetting and Distribution',
        'Technical Reels, Short-Form Engineering Explainers & Video Media',
        'Corporate & Academic Advertisements, Infographics & Digital Posters',
      ],
      deliverables: 'Textbooks, Research Publications, Digital Reels & Brand Assets',
    },
    {
      id: 'consult',
      brand: 'JIGSY Consult',
      title: 'Corporate, Legal & Advisory Services',
      subtitle: 'Company Formations, GST, DSC & Academic Admissions',
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      tag: 'Corporate & Legal',
      badgeColor: 'border-amber-500/40 bg-amber-950/60 text-amber-300',
      description:
        'Comprehensive business incorporation, regulatory taxation, and institutional consulting. Supporting entrepreneurs, educational institutions, and professionals with legal compliance, registrations, and strategic administration.',
      capabilities: [
        'Company Registrations (Private Limited, LLP, OPC & Section 8 Formations)',
        'GST Registration, Monthly Return Filing & Tax Compliance Structuring',
        'Digital Signature Certificates (Class 3 DSC Issuance & Token Setup)',
        'Academic Admissions Advisory & Institutional Affiliation Consulting',
        'Legal Drafting, Corporate Bylaws & Intellectual Property Filings',
        'Strategic Enterprise Management & Governance Advisory',
      ],
      deliverables: 'Legal Certifications, GST Filings, DSC Tokens & Advisory Reports',
    },
    {
      id: 'tech',
      brand: 'JIGSY Tech',
      title: 'IT Services & Software Engineering',
      subtitle: 'Enterprise Platforms, Portals & Real-Time Messengers',
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      tag: 'IT & Cloud Services',
      badgeColor: 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300',
      description:
        'Delivering production-grade bespoke enterprise web applications, real-time collaboration engines, candidate applicant pipelines, and cloud database optimization for institutional and commercial clients.',
      capabilities: [
        'Proprietary Enterprise Applicant Tracking Systems (ATS)',
        'Real-Time WebSocket Personalized Messenger & Collaborative Channels',
        'High-Performance MySQL/PostgreSQL Schema Normalization & Query Tuning',
        'Cloud Infrastructure Deployment, REST/FastAPI Microservices & Security',
      ],
      deliverables: 'Cloud SaaS Workstations, Web Applications & High-Load APIs',
    },
    {
      id: 'youth',
      brand: 'JIGSY Youth',
      title: 'Internships, Mentorship & Industrial Training',
      subtitle: 'Empowering Next-Generation Tech Leaders',
      icon: <Users className="w-5 h-5 text-blue-400" />,
      tag: 'Youth Empowerment',
      badgeColor: 'border-blue-500/40 bg-blue-950/60 text-blue-300',
      description:
        'Youth-centric engineering development hub offering practical industrial apprenticeships, student developer internships, and capstone project co-guidance for ambitious undergraduate scholars.',
      capabilities: [
        'Hands-On Developer Internships in Full-Stack Web & Python Systems',
        'Co-Guide Mentorship for Final-Year B.Tech Major Capstone Projects',
        'Industrial Simulation Sprints: Git Workflows, Code Auditing & CI/CD',
        'Resume Architecture, Technical Interview Coaching & Career Advisory',
      ],
      deliverables: 'Verified Internship Certifications, Live Project Code & Career Portfolios',
    },
    {
      id: 'edutech',
      brand: 'JIGSY EduTech',
      title: 'Educational Technology & Courses',
      subtitle: 'Structured Computing & Algorithm Curriculums',
      icon: <GraduationCap className="w-5 h-5 text-rose-400" />,
      tag: 'Upcoming Sector',
      badgeColor: 'border-rose-500/40 bg-rose-950/60 text-rose-300',
      description:
        'The emerging academic learning platform designed to host structured online coursework in Data Structures, Advanced Algorithms, and AI architectures.',
      capabilities: [
        'Interactive Browser-Based Code Sandboxes',
        'Modular DAA (Design & Analysis of Algorithms) Course Tracks',
        'Pre-recorded & Live Hybrid Masterclasses by Jigyasu Vatsa',
      ],
      deliverables: 'Currently No Available Courses (Under Active Development)',
      isUpcoming: true,
    },
  ];

  const filteredVerticals =
    selectedVertical === 'all'
      ? corporateVerticals
      : corporateVerticals.filter((v) => v.id === selectedVertical);

  return (
    <section className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Navigation Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
          <Building2 className="w-4 h-4" />
          <span>Founded Enterprise Ecosystem</span>
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
                <span>DPIIT Recognised Startup • CIN: U62099BR2025PTC078592</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Jigyasu Integrated Global Services Private Limited
              </h1>

              <div className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                JIGSY INDIA • Adaptive Innovation &amp; Ethical Technology
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Founded and directed by <strong className="text-white">Mr. Jigyasu Vatsa</strong>, JIGSY INDIA operates as a multi-sector technology and advisory enterprise structured across specialized brand divisions: <strong>JIGSY R&amp;D</strong>, <strong>JIGSY DigiTech</strong>, <strong>JIGSY Consult</strong>, <strong>JIGSY Tech</strong>, <strong>JIGSY Youth</strong>, and <strong>JIGSY EduTech</strong>.
              </p>

              {/* Corporate Registration Numbers Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">DPIIT Startup</span>
                  <span className="text-cyan-300 font-bold text-xs mt-0.5 block">{PERSONAL_INFO.dpiit}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">GSTIN Registration</span>
                  <span className="text-emerald-300 font-bold text-xs mt-0.5 block">{PERSONAL_INFO.gstin}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">MSME Udyam</span>
                  <span className="text-amber-300 font-bold text-xs mt-0.5 block">UDYAM-BR-34-0051280</span>
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
                  <span>Corporate Inquiry &amp; Consultation</span>
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

        {/* Showcase Spotlight: JIGSY R&D & JIGSY DigiTech Publications */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-800/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span>Flagship Intellectual Property</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                JIGSY R&amp;D &amp; JIGSY DigiTech Showcase
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Showcasing published textbooks and scientific research papers developed under JIGSY&apos;s R&amp;D cell and published via JIGSY DigiTech.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Authored Book Card */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-28 shrink-0 rounded-xl overflow-hidden border border-amber-500/40 shadow-lg shadow-amber-500/10">
                <img
                  src={AUTHORED_BOOK.coverImage}
                  alt={AUTHORED_BOOK.title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 inline-block">
                  JIGSY DigiTech Publishing
                </span>
                <h3 className="text-base font-bold text-white">{AUTHORED_BOOK.title}</h3>
                <p className="text-xs text-slate-400">{AUTHORED_BOOK.subtitle}</p>
                <div className="text-[11px] font-mono text-slate-400 pt-1">
                  ISBN: <span className="text-slate-200">{AUTHORED_BOOK.isbn13}</span>
                </div>
                <div className="pt-2">
                  <a
                    href={AUTHORED_BOOK.amazonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-white font-semibold"
                  >
                    <span>View on Amazon.com &rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Research Papers Summary: Highlighted JIGSY R&D Publications */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                RESEARCH_PAPERS.find((p) => p.id === 'paper-1') || RESEARCH_PAPERS[0],
                RESEARCH_PAPERS.find((p) => p.id === 'paper-4') || RESEARCH_PAPERS[3],
              ]
                .filter(Boolean)
                .map((paper) => (
                  <div
                    key={paper.id}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                          JIGSY R&amp;D
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{paper.year}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-2">{paper.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{paper.publication}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-emerald-400 text-[10px]">{paper.indexingStatus}</span>
                      {(paper.doiUrl || paper.driveUrl || paper.paperUrl) && (
                        <a
                          href={paper.doiUrl || paper.driveUrl || paper.paperUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>{paper.doiUrl ? 'DOI' : 'Paper'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 6 Specialized Corporate Brand Divisions */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                <Layers className="w-4 h-4" />
                <span>Specialized Brand Verticals</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                The JIGSY INDIA Corporate Ecosystem
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore our distinct operating divisions spanning foundational research, digital media publishing, business consultancy, IT engineering, and youth development.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setSelectedVertical('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  selectedVertical === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All 6 Verticals
              </button>
              {corporateVerticals.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVertical(v.id)}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors font-medium ${
                    selectedVertical === v.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {v.brand}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVerticals.map((vert) => (
              <div
                key={vert.id}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {vert.icon}
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border font-semibold ${vert.badgeColor}`}>
                      {vert.brand}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {vert.title}
                  </h3>
                  <div className="text-xs text-cyan-400 font-mono mt-0.5">
                    {vert.subtitle}
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    {vert.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                      Core Operations:
                    </div>
                    {vert.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 mb-2">
                    <span className="text-slate-500">Deliverables:</span> {vert.deliverables}
                  </div>
                  <a
                    href="https://jigsy.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-cyan-400 hover:text-white flex items-center justify-between font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    <span>Connect with {vert.brand}</span>
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
