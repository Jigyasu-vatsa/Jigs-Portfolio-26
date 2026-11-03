import React, { useState } from 'react';
import {
  Gamepad2,
  Sparkles,
  Trophy,
  CheckCircle2,
  RotateCcw,
  Download,
  FileText,
  BookOpen,
  Award,
  Layers,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Eye,
  X,
  FileCheck,
} from 'lucide-react';
import { AUTHORED_BOOK } from '../data/portfolioData';

interface PuzzleStep {
  id: string;
  order: number;
  label: string;
  desc: string;
}

const CORRECT_STEPS: PuzzleStep[] = [
  { id: 'step-1', order: 1, label: '01. Surplus Ingestion', desc: 'Harvest real-time surplus inventory from donor portals' },
  { id: 'step-2', order: 2, label: '02. Decay Index Computation', desc: 'Compute logarithmic shelf-life decay & perishability scores' },
  { id: 'step-3', order: 3, label: '03. Priority Queue Optimization', desc: 'Execute heuristic priority allocation across recipient tiers' },
  { id: 'step-4', order: 4, label: '04. Smart Dispatch Routing', desc: 'Dispatch optimized geographical route to civil welfare units' },
];

export const InteractivePlayground: React.FC = () => {
  // Puzzle state: scrambled order
  const [userSequence, setUserSequence] = useState<PuzzleStep[]>([
    CORRECT_STEPS[2],
    CORRECT_STEPS[0],
    CORRECT_STEPS[3],
    CORRECT_STEPS[1],
  ]);
  const [isSolved, setIsSolved] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [previewModal, setPreviewModal] = useState<{
    title: string;
    url: string;
    type: 'image' | 'pdf' | 'link';
  } | null>(null);

  // Drag to explore state
  const [activeDraggableIndex, setActiveDraggableIndex] = useState(0);

  // Directly features authentic attached papers, published book, and ISBN proceedings
  const attachedPublications = [
    {
      id: 'pub-gtisd',
      title: 'Zero Waste Food Management: A Web-Based Circular Economy Framework',
      venue: 'GTISD-2026 Conference (Sandip University Madhubani)',
      badge: 'Scopus Indexed Proceeding',
      stat: 'ISBN: 978-81-685333-4-9',
      desc: 'Pioneering web engineering heuristics and client-server queue synchronization for urban food surplus redistribution.',
      driveUrl: 'https://drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view',
      certificateUrl: '/assets/aistudio/GTISD_Certificate_5305ebbb.jpeg',
      color: 'from-emerald-600 via-teal-600 to-cyan-700',
    },
    {
      id: 'pub-vedanjali',
      title: 'उद्यमशीलता के राजनीतिक परिदृश्य एवं दलितों का साथ : समावेशी आर्थिक विकास का एक संस्थागत विश्लेषण',
      venue: 'वेदाञ्जलि (Vedanjali UGC-CARE Listed Journal)',
      badge: 'UGC-CARE Approved Journal',
      stat: 'ISSN: 2349-364X',
      desc: 'In-depth institutional economic analysis of technology accessibility and socioeconomic self-reliance for marginalized communities.',
      driveUrl: 'https://drive.google.com/file/d/11vEgJhOBTcCGlTU7WsO1KHsqDBz3XYaj/view',
      color: 'from-amber-600 via-rose-600 to-red-700',
    },
    {
      id: 'pub-book',
      title: 'Mastering DSA Without Fear: Data Structures & Algorithms Made Intuitive',
      venue: 'Published on Amazon.com',
      badge: 'Authored Book (109 Pages)',
      stat: 'ASIN: B0H5QK7MF2 | ISBN: 979-8181718425',
      desc: 'Intuitive conceptual guide authored by Jigyasu Vatsa bridging abstract mathematical algorithms with real-world system architecture.',
      amazonUrl: AUTHORED_BOOK.amazonUrl,
      coverUrl: AUTHORED_BOOK.coverImage,
      color: 'from-cyan-600 via-blue-600 to-indigo-700',
    },
    {
      id: 'pub-lnmi',
      title: 'Futuristic Automation in Robotics with AI for Strategizing Mankind\'s Ethical Growth',
      venue: 'LNMI International Conference (Govt of Bihar & C-DAC)',
      badge: 'ISBN Proceeding Abstract (Page 129)',
      stat: 'ISBN: 978-93-94599-97-0',
      desc: 'Strategic robotic automation policy framework and HRS-X human-robot symbiosis model presented alongside C-DAC scientists.',
      proceedingUrl: '/assets/aistudio/Screenshot_20261101_205425_Editor_Lite_a7dc580f.jpg',
      certificateUrl: '/assets/aistudio/IxoraConference_Certificate_c3c0a774.jpg',
      color: 'from-purple-600 via-indigo-600 to-blue-700',
    },
    {
      id: 'pub-icipai',
      title: 'AI-Assisted Smart Food Redistribution System with Priority-Based Optimization',
      venue: 'ICIPAI-2026 / Springer Nature & Atlantis Press',
      badge: 'Published in Springer Nature (Accepted for WoS Indexing)',
      stat: 'DOI: 10.2991/978-94-6239-789-7_18',
      desc: 'Priority queue algorithm using mathematical decay indices for perishable surplus logistics within circular economy networks.',
      doiUrl: 'https://doi.org/10.2991/978-94-6239-789-7_18',
      certificateUrl: '/assets/aistudio/ICIPAI_Certificate_29406d59.jpg',
      color: 'from-blue-600 via-cyan-600 to-teal-700',
    },
    {
      id: 'pub-ictti',
      title: 'Cyber-Resilient AI-Assisted Smart Food Redistribution for Industry 5.0',
      venue: 'ICTTI-2026 / Taylor & Francis Group',
      badge: 'Accepted for Scopus Indexing (In Press)',
      stat: 'Noida International University (NIU)',
      desc: 'Cryptographically secured priority queue architecture preventing adversarial tampering in circular welfare distribution.',
      certificateUrl: '/assets/aistudio/241_Jigyasu_Vatsa_b3005cd7.pdf',
      color: 'from-teal-600 via-emerald-600 to-cyan-700',
    },
  ];

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (isSolved) return;
    const newSeq = [...userSequence];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSeq.length) return;

    const temp = newSeq[index];
    newSeq[index] = newSeq[targetIdx];
    newSeq[targetIdx] = temp;
    setUserSequence(newSeq);

    // Check if correctly ordered
    const solved = newSeq.every((s, idx) => s.order === idx + 1);
    if (solved) {
      setIsSolved(true);
    }
  };

  const handleResetPuzzle = () => {
    setUserSequence([
      CORRECT_STEPS[2],
      CORRECT_STEPS[0],
      CORRECT_STEPS[3],
      CORRECT_STEPS[1],
    ]);
    setIsSolved(false);
  };

  const downloadOptions = [
    { label: 'GTISD-2026 Paper (Google Drive)', url: 'https://drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view', ext: 'DRIVE' },
    { label: 'Vedanjali UGC-CARE Paper (Google Drive)', url: 'https://drive.google.com/file/d/11vEgJhOBTcCGlTU7WsO1KHsqDBz3XYaj/view', ext: 'DRIVE' },
    { label: 'Mastering DSA Without Fear (Amazon Book)', url: AUTHORED_BOOK.amazonUrl, ext: 'AMAZON' },
    { label: 'LNMI Conference ISBN Proceeding (Page 129)', url: '/assets/aistudio/Screenshot_20261101_205425_Editor_Lite_a7dc580f.jpg', ext: 'JPG' },
    { label: 'UGC-NET June 2026 NTA Scorecard (Qualified)', url: '/assets/aistudio/20261101_205005_42ec6ef9.jpg', ext: 'JPG' },
    { label: 'Bihar STET 2025 BSEB Result Card (Qualified)', url: '/assets/aistudio/20261101_204904_b108c1e9.jpg', ext: 'JPG' },
    { label: 'C-DAC Patna MeitY FDP Certificate', url: '/assets/aistudio/20261101_204836_073a4be3.jpg', ext: 'JPG' },
    { label: 'ICIPAI Springer Nature Certificate', url: '/assets/aistudio/ICIPAI_Certificate_29406d59.jpg', ext: 'JPG' },
    { label: 'GTISD-2026 Presentation Certificate', url: '/assets/aistudio/GTISD_Certificate_5305ebbb.jpeg', ext: 'JPEG' },
    { label: 'Ardent Cyber Security FDP Certificate', url: '/assets/aistudio/FDP_JIGYASU_0248fc13.pdf', ext: 'PDF' },
    { label: 'AICTE-VAANI Workshop Certificate', url: '/assets/aistudio/certificate_9efb442c.pdf', ext: 'PDF' },
  ];

  const currentPub = attachedPublications[activeDraggableIndex];

  return (
    <section id="interactive" className="py-16 scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Interactive Innovation Laboratory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Interactive Research & Paper Explorer
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Directly explore Jigyasu&apos;s attached peer-reviewed papers on Google Drive, inspect published book on Amazon,
              view ISBN proceedings, and solve the algorithm puzzle.
            </p>
          </div>

          {/* Dropdown to Download Component */}
          <div className="relative self-start md:self-auto">
            <button
              onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Documents & Papers</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>

            {downloadDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden z-30 p-2 text-xs space-y-1 animate-fadeIn max-h-96 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Official Papers, Credentials & Book
                </div>
                {downloadOptions.map((opt) => (
                  <a
                    key={opt.label}
                    href={opt.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setDownloadDropdownOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="line-clamp-1">{opt.label}</span>
                    <span className="font-mono text-[10px] bg-slate-950 text-cyan-400 px-1.5 py-0.5 rounded border border-slate-800 shrink-0 ml-2">
                      {opt.ext}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dual Interaction Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Feature 1: Drag to Explore Authentic Attached Papers */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Explore Attached Papers, Book & ISBN Proceedings
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tap or cycle through authentic research documents with direct Google Drive and certificate links.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {activeDraggableIndex + 1} / {attachedPublications.length}
                </span>
              </div>

              {/* Interactive Publication Card Stage */}
              <div
                className={`preserve-card-text p-6 rounded-2xl bg-gradient-to-br ${currentPub.color} text-white shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[260px]`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold bg-black/30 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {currentPub.badge}
                    </span>
                    <span className="text-xs font-mono text-white/90 font-bold">
                      {currentPub.stat}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-black tracking-tight leading-snug drop-shadow-sm">
                    {currentPub.title}
                  </h4>

                  <div className="text-xs font-semibold text-white/80 mt-1">
                    {currentPub.venue}
                  </div>

                  <p className="text-xs font-medium leading-relaxed text-white/90 mt-3 drop-shadow-sm">
                    {currentPub.desc}
                  </p>
                </div>

                {/* Direct Action Links on the Card */}
                <div className="mt-5 pt-3 border-t border-white/20 flex flex-wrap items-center gap-2">
                  {currentPub.driveUrl && (
                    <a
                      href={currentPub.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-white text-slate-950 hover:bg-cyan-100 font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Open on Google Drive</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 text-slate-500" />
                    </a>
                  )}

                  {currentPub.amazonUrl && (
                    <a
                      href={currentPub.amazonUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-950" />
                      <span>View on Amazon.com</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 text-slate-700" />
                    </a>
                  )}

                  {currentPub.coverUrl && (
                    <button
                      onClick={() =>
                        setPreviewModal({
                          title: currentPub.title,
                          url: currentPub.coverUrl!,
                          type: 'image',
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white font-medium text-xs flex items-center gap-1.5 transition-colors border border-white/20"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-300" />
                      <span>View Book Cover</span>
                    </button>
                  )}

                  {currentPub.proceedingUrl && (
                    <button
                      onClick={() =>
                        setPreviewModal({
                          title: 'LNMI Conference ISBN Proceeding (Page 129)',
                          url: currentPub.proceedingUrl!,
                          type: 'image',
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-white text-slate-950 hover:bg-cyan-100 font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>View ISBN Proceeding Scan</span>
                    </button>
                  )}

                  {currentPub.certificateUrl && (
                    <button
                      onClick={() =>
                        setPreviewModal({
                          title: `${currentPub.title} - Certificate`,
                          url: currentPub.certificateUrl!,
                          type: currentPub.certificateUrl!.endsWith('.pdf') ? 'pdf' : 'image',
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white font-medium text-xs flex items-center gap-1.5 transition-colors border border-white/20"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-300" />
                      <span>View Official Certificate</span>
                    </button>
                  )}

                  {currentPub.doiUrl && (
                    <a
                      href={currentPub.doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium text-xs flex items-center gap-1.5 transition-colors border border-white/20"
                    >
                      <span>DOI Link</span>
                      <ExternalLink className="w-3 h-3 text-cyan-200" />
                    </a>
                  )}
                </div>
              </div>

              {/* Slider Dots & Navigation Controls */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  {attachedPublications.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveDraggableIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeDraggableIndex === idx ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                      }`}
                      aria-label={`Go to publication slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveDraggableIndex((prev) => (prev > 0 ? prev - 1 : attachedPublications.length - 1))
                    }
                    className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveDraggableIndex((prev) => (prev < attachedPublications.length - 1 ? prev + 1 : 0))
                    }
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
                  >
                    Next Document
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Solve Puzzle to Know More */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Solve Algorithm Pipeline Puzzle
                  </h3>
                  <p className="text-xs text-slate-400">
                    Arrange the 4 steps of Jigyasu&apos;s Circular Food Redistribution algorithm in correct sequence.
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetPuzzle}
                title="Reset puzzle order"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Steps Container */}
            <div className="space-y-2.5 text-xs">
              {userSequence.map((step, idx) => (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isSolved
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/60 text-emerald-900 dark:text-emerald-200'
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isSolved
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-cyan-100 dark:bg-slate-800 text-cyan-800 dark:text-cyan-400 font-semibold'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold">{step.label}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</div>
                    </div>
                  </div>

                  {!isSolved && (
                    <div className="flex flex-col gap-1 shrink-0 ml-2">
                      <button
                        onClick={() => moveStep(idx, 'up')}
                        disabled={idx === 0}
                        className="px-2 py-0.5 text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-700 disabled:opacity-30 rounded text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-transparent"
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveStep(idx, 'down')}
                        disabled={idx === userSequence.length - 1}
                        className="px-2 py-0.5 text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-700 disabled:opacity-30 rounded text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-transparent"
                        title="Move Down"
                      >
                        ▼
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Solved Banner */}
            {isSolved ? (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500 text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-3 animate-fadeIn">
                <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">Pipeline Assembled Successfully!</h5>
                  <p className="mt-1 text-slate-700 dark:text-slate-300 leading-relaxed">
                    You have unlocked the core logic behind the <strong>Springer Nature ICIPAI-2026</strong> publication.
                    Priority coefficient <em>λ = (100 / (t + 1)) × (1 + δ)</em> ensures food with highest spoilage risk
                    is prioritized first for immediate civil delivery.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between font-medium">
                <span>Use the arrows to place step 01 to 04 in order</span>
                <span className="font-mono text-cyan-700 dark:text-cyan-400 font-bold">Step 1 of 4</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Previewing Attached Certificates & Proceedings */}
      {previewModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
        >
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative animate-fadeIn flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>{previewModal.title}</span>
              </h3>
              <button
                onClick={() => setPreviewModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto my-4 flex items-center justify-center bg-slate-950 rounded-xl p-3 border border-slate-850">
              {previewModal.type === 'pdf' ? (
                <iframe
                  src={previewModal.url}
                  title={previewModal.title}
                  className="w-full h-[65vh] rounded-lg border-0"
                />
              ) : (
                <img
                  src={previewModal.url}
                  alt={previewModal.title}
                  className="max-h-[68vh] max-w-full object-contain rounded-lg shadow-lg"
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={previewModal.url}
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
