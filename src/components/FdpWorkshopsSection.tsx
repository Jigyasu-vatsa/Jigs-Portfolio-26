import React, { useState } from 'react';
import { FdpWorkshopItem } from '../types';
import {
  GraduationCap,
  Calendar,
  Building,
  ShieldCheck,
  ExternalLink,
  Award,
  BookOpen,
  FileText,
  X,
  Sparkles,
} from 'lucide-react';

interface FdpWorkshopsSectionProps {
  items: FdpWorkshopItem[];
}

export const FdpWorkshopsSection: React.FC<FdpWorkshopsSectionProps> = ({ items }) => {
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string;
    url: string;
    type: string;
  } | null>(null);

  return (
    <section id="fdp" className="py-16 scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Pedagogy & National Research Summits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Faculty Development Programs (FDPs) & Workshops
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Completed certified educator programs with Ardent Computech, high-level AI presentations alongside C-DAC,
              and AICTE-VAANI regional computational workshops.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono self-start md:self-auto bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Total Completed: <span className="text-cyan-400 font-bold">{items.length} Programs</span>
          </div>
        </div>

        {/* 3-Column FDP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm hover:shadow-cyan-500/5"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="text-cyan-400 font-bold">{item.type}</span>
                  <span>{item.year}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <div className="text-xs font-semibold text-slate-300 mt-2 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.organizer}</span>
                </div>

                {item.collaboration && (
                  <div className="text-[11px] text-slate-400 mt-1 italic">
                    In collaboration with: {item.collaboration}
                  </div>
                )}

                {item.sponsorOrPartner && (
                  <div className="text-[11px] font-mono text-cyan-300/90 bg-cyan-950/40 p-2 rounded-lg border border-cyan-800/40 mt-2.5">
                    {item.sponsorOrPartner}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-slate-400 mt-3 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.dates}</span>
                </div>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {item.certificateId && (
                  <div className="mt-3 text-[11px] font-mono text-slate-400">
                    Certificate ID: <strong className="text-slate-200">{item.certificateId}</strong>
                  </div>
                )}
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                {item.certificateUrl && (
                  <button
                    onClick={() =>
                      setSelectedCertificate({
                        title: item.title,
                        url: item.certificateUrl!,
                        type: item.certificateUrl!.endsWith('.pdf') ? 'pdf' : 'image',
                      })
                    }
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Official Certificate</span>
                  </button>
                )}

                {item.verificationLink && (
                  <a
                    href={item.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>Verify Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white line-clamp-1">
                {selectedCertificate.title} — Official Verification Document
              </h3>
              <button
                onClick={() => setSelectedCertificate(null)}
                aria-label="Close Certificate modal"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 max-h-[70vh] overflow-y-auto flex items-center justify-center bg-slate-950 rounded-xl p-2 border border-slate-800">
              {selectedCertificate.type === 'pdf' ? (
                <iframe
                  src={selectedCertificate.url}
                  title="PDF Certificate"
                  className="w-full h-[60vh] rounded-lg border-0"
                />
              ) : (
                <img
                  src={selectedCertificate.url}
                  alt={selectedCertificate.title}
                  className="max-h-[60vh] object-contain rounded-lg shadow-md"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800 font-mono">
              <span>Authentic scanned document from user records</span>
              <a
                href={selectedCertificate.url}
                target="_blank"
                rel="noreferrer"
                download
                className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Raw Document</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
