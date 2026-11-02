import React, { useState } from 'react';
import {
  EDUCATION_LIST,
  CERTIFICATIONS,
  NATIONAL_QUALIFICATIONS,
  AUTHORED_BOOK,
} from '../data/portfolioData';
import {
  GraduationCap,
  Award,
  ExternalLink,
  BookCheck,
  Calendar,
  Building2,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  FileText,
  X,
  Eye,
  Download,
  Sparkles,
} from 'lucide-react';

export const EducationCertifications: React.FC = () => {
  const [activePreview, setActivePreview] = useState<{
    title: string;
    url: string;
    type: 'image' | 'pdf';
  } | null>(null);

  return (
    <section id="education" className="py-16 scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>National Qualifications & Academic Pedigree</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              National Qualifications, Book & Education
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              UGC-NET & Bihar STET qualified computer scientist, authored textbook on Amazon, dual masters scholar,
              and verified certifications.
            </p>
          </div>
        </div>

        {/* Highlight 1: National Qualifications & Published Book Banner */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* National Qualifications (UGC-NET & STET) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-cyan-800/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>National & State Eligibility Examinations</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-700/50">
                      Fully Qualified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Official eligibility credentials for University Ph.D. and Senior Secondary Computer Science Faculty.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NATIONAL_QUALIFICATIONS.map((qual) => (
                <div
                  key={qual.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span className="text-cyan-400 font-bold">{qual.year}</span>
                      <span className="text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">
                        {qual.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {qual.examName}
                    </h4>

                    <div className="text-xs font-semibold text-slate-300 mt-1">
                      {qual.subject}
                    </div>

                    <div className="mt-2 text-[11px] font-mono text-slate-400 space-y-0.5">
                      <div>Roll No: <strong className="text-slate-200">{qual.rollNumber}</strong></div>
                      <div>Score: <strong className="text-cyan-300">{qual.scoreOrMarks}</strong></div>
                    </div>

                    <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
                      {qual.description}
                    </p>
                  </div>

                  {qual.certificateUrl && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setActivePreview({
                            title: `${qual.examName} - Official Scorecard`,
                            url: qual.certificateUrl!,
                            type: 'image',
                          })
                        }
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Official Scorecard</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Published Book Spotlight (Mastering DSA Without Fear) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950 border border-slate-750 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5 bg-amber-950/50 px-2.5 py-1 rounded-md border border-amber-800/40">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Authored Book on Amazon</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  109 Pages • June 2026
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Dual Cover Thumbnails: Front & Back */}
                <div className="flex items-center gap-2.5 shrink-0 self-center sm:self-start">
                  {/* Front Cover */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() =>
                        setActivePreview({
                          title: 'Mastering DSA Without Fear - Front Cover',
                          url: AUTHORED_BOOK.coverImage || '/assets/aistudio/image_8a0e4c1d.png',
                          type: 'image',
                        })
                      }
                      className="w-18 h-26 sm:w-20 sm:h-28 rounded-lg overflow-hidden border border-slate-700 shadow-md hover:scale-105 transition-transform group relative bg-black"
                    >
                      <img
                        src={AUTHORED_BOOK.coverImage || '/assets/aistudio/image_8a0e4c1d.png'}
                        alt="Mastering DSA Without Fear Front Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye className="w-4 h-4 text-cyan-300" />
                      </div>
                    </button>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">Front</span>
                  </div>

                  {/* Back Cover */}
                  {AUTHORED_BOOK.backCoverImage && (
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() =>
                          setActivePreview({
                            title: 'Mastering DSA Without Fear - Back Cover (with JIGSY Seal & Author Profile)',
                            url: AUTHORED_BOOK.backCoverImage!,
                            type: 'image',
                          })
                        }
                        className="w-18 h-26 sm:w-20 sm:h-28 rounded-lg overflow-hidden border border-slate-700 shadow-md hover:scale-105 transition-transform group relative bg-black"
                      >
                        <img
                          src={AUTHORED_BOOK.backCoverImage}
                          alt="Mastering DSA Without Fear Back Cover"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye className="w-4 h-4 text-cyan-300" />
                        </div>
                      </button>
                      <span className="text-[10px] font-mono text-amber-400 font-semibold">Back</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    {AUTHORED_BOOK.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400 mt-0.5">
                    {AUTHORED_BOOK.subtitle}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1 space-y-0.5">
                    <div>Author: <strong className="text-slate-200">Jigyasu Vatsa</strong></div>
                    <div>ASIN: <strong className="text-slate-200">{AUTHORED_BOOK.asin}</strong></div>
                    <div>ISBN-13: <strong className="text-slate-200">{AUTHORED_BOOK.isbn13}</strong></div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                {AUTHORED_BOOK.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setActivePreview({
                      title: 'Mastering DSA Without Fear - Front Cover',
                      url: AUTHORED_BOOK.coverImage || '/assets/aistudio/image_8a0e4c1d.png',
                      type: 'image',
                    })
                  }
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Front Cover</span>
                </button>
                {AUTHORED_BOOK.backCoverImage && (
                  <button
                    onClick={() =>
                      setActivePreview({
                        title: 'Mastering DSA Without Fear - Back Cover',
                        url: AUTHORED_BOOK.backCoverImage!,
                        type: 'image',
                      })
                    }
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Back Cover</span>
                  </button>
                )}
              </div>

              <a
                href={AUTHORED_BOOK.amazonUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
              >
                <span>View on Amazon.com</span>
                <ExternalLink className="w-3 h-3 text-slate-800" />
              </a>
            </div>
          </div>
        </div>

        {/* Dual Grid: Degree Programs & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Formal Education & Dual Masters */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Degree Programs & Schooling</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION_LIST.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {edu.year}
                    </span>
                    {edu.grade && (
                      <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">
                    {edu.degree}
                  </h4>

                  <div className="text-xs font-semibold text-slate-300 mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {edu.institute}
                  </div>

                  <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
                    {edu.details}
                  </p>

                  {edu.ugcNote && (
                    <div className="mt-3 text-[11px] font-mono text-cyan-300/90 bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-800/40">
                      {edu.ugcNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications & Trainings Attended */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Verified Certifications & Technical Trainings</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                      <span>{cert.category}</span>
                      <span className="text-cyan-400 font-semibold">{cert.issuer}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                      {cert.title}
                    </h4>
                  </div>

                  {cert.url && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                      >
                        <BookCheck className="w-3 h-3" />
                        <span>Verify Certificate</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-auto text-slate-500" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Scorecards and Book Preview */}
      {activePreview && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
        >
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative animate-fadeIn flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>{activePreview.title}</span>
              </h3>
              <button
                onClick={() => setActivePreview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto my-4 flex items-center justify-center bg-slate-950 rounded-xl p-3 border border-slate-850">
              <img
                src={activePreview.url}
                alt={activePreview.title}
                className="max-h-[68vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={activePreview.url}
                download
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Document</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
