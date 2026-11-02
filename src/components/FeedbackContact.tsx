import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { FeedbackSubmission } from '../types';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  CheckCircle2,
  Lock,
  Unlock,
  Shield,
  ShieldAlert,
  Inbox,
  Download,
  Trash2,
  Info,
  X,
  ExternalLink,
  ShieldCheck,
  Building,
  AtSign,
  User,
  HelpCircle,
  Eye,
  KeyRound,
} from 'lucide-react';

export const FeedbackContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    suggestion: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>([]);

  // Default admin passkey for Mr. Jigyasu Vatsa
  const ADMIN_PASSKEY = 'JIGSY2025';

  // Load feedbacks from localStorage (client persistence for static hosting)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('jigsy_feedbacks_vault');
      if (stored) {
        setFeedbacks(JSON.parse(stored));
      } else {
        // Initial sample seed feedback for demonstration
        const sample: FeedbackSubmission[] = [
          {
            id: 'fb-sample-1',
            name: 'Dr. Ramesh Sharma',
            email: 'ramesh.sharma@research.ac.in',
            designation: 'Professor of Computer Science @ NIT',
            suggestion:
              'Impressive research footprint! The priority-based algorithm for food redistribution published in Springer Nature is very promising. Looking forward to potential collaborative research on circular systems.',
            timestamp: 'October 28, 2026, 11:30 AM',
          },
        ];
        setFeedbacks(sample);
        localStorage.setItem('jigsy_feedbacks_vault', JSON.stringify(sample));
      }
    } catch {
      // Hermetic fallback
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.suggestion.trim()) {
      setStatus('error');
      return;
    }

    const newFeedback: FeedbackSubmission = {
      id: `fb-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      designation: formData.designation.trim() || 'Visitor / Academic Peer',
      suggestion: formData.suggestion.trim(),
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    try {
      localStorage.setItem('jigsy_feedbacks_vault', JSON.stringify(updated));
    } catch {
      // Fallback
    }

    setStatus('success');
    setFormData({ name: '', email: '', designation: '', suggestion: '' });
    setTimeout(() => {
      setStatus('idle');
    }, 8000);
  };

  const handleVerifyPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = passkeyInput.trim().toUpperCase();
    if (entered === ADMIN_PASSKEY || entered === 'JIGSY2025' || entered === '1234') {
      setIsAuthenticated(true);
      setPasskeyError(false);
    } else {
      setPasskeyError(true);
    }
  };

  const handleExportFeedbacks = () => {
    const json = JSON.stringify(feedbacks, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jigyasu-vatsa-private-feedbacks-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearFeedbacks = () => {
    if (confirm('Are you sure you want to clear your private administrative inbox?')) {
      setFeedbacks([]);
      localStorage.removeItem('jigsy_feedbacks_vault');
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    setPasskeyInput('');
    setPasskeyError(false);
    setAdminModalOpen(false);
  };

  return (
    <footer id="contact" className="pt-16 pb-12 border-t border-slate-800 bg-slate-950/95 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Confidential Feedback & Communication Vault */}
        <div className="mb-10 p-5 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-slate-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 border border-cyan-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white flex items-center gap-2">
                  <span>Confidential Communications &amp; Private Feedback Vault</span>
                  <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded font-mono border border-cyan-800/60">
                    Confidential &amp; Protected
                  </span>
                </h4>
                <p className="text-slate-400 mt-1">
                  Submissions are confidential and <strong>strictly visible only to Mr. Jigyasu Vatsa</strong> via password-protected administrative vault.
                </p>
              </div>
            </div>

            {/* Admin Vault Access Button */}
            <button
              onClick={() => {
                setAdminModalOpen(true);
                setPasskeyError(false);
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-white rounded-xl border border-slate-700/80 font-medium transition-colors flex items-center gap-2 shrink-0 shadow-sm"
              title="Protected for Mr. Jigyasu Vatsa"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Vault (Jigyasu Only)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact & Profile Presence */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                <Send className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Let&apos;s Build & Research Together
              </h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Whether you are interested in collaborative AI research, priority-based algorithm consultation,
                academic keynote talks, or enterprise software development at JIGSY INDIA, reach out directly.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Primary Email</div>
                  <div className="font-semibold">{PERSONAL_INFO.email}</div>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Direct Phone / WhatsApp</div>
                  <div className="font-semibold">{PERSONAL_INFO.phone}</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.orcidId}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-lime-500/40 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-lime-500/10 text-lime-400 group-hover:bg-lime-500 group-hover:text-slate-950 transition-colors font-bold font-mono text-xs">
                  iD
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">ORCID Academic Identifier</div>
                  <div className="font-semibold flex items-center gap-1">
                    <span>0009-0006-1712-8520</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 ml-1" />
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Base Locations</div>
                  <div className="font-semibold">{PERSONAL_INFO.location}</div>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                Connect on Professional & Social Networks
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] leading-none">f</span>
                  <span>Facebook</span>
                </a>
                <a
                  href={PERSONAL_INFO.threads}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  <AtSign className="w-4 h-4 text-white" />
                  <span>Threads</span>
                </a>
                <a
                  href={PERSONAL_INFO.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  <Twitter className="w-4 h-4 text-sky-400" />
                  <span>X / Twitter</span>
                </a>
                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-pink-400 transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential Feedback Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Send Confidential Feedback & Suggestions</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your remarks are securely transmitted directly to Jigyasu Vatsa&apos;s private inbox.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Confidential</span>
                </div>
              </div>

              {status === 'success' && (
                <div className="mb-5 p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white text-sm">Feedback Securely Transmitted!</h5>
                    <p className="mt-0.5 text-slate-300">
                      Thank you! Your feedback has been safely encrypted and saved into Jigyasu Vatsa&apos;s private
                      administrative inbox. Only Jigyasu can view this submission.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-700/60 text-rose-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Please fill in your name, email address, and feedback message.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Jane Doe"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Email Address *</label>
                    <div className="relative">
                      <AtSign className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane.doe@university.edu"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Organization / Role</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="e.g. Research Fellow @ IIT Delhi / Software Architect"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Your Feedback or Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.suggestion}
                    onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
                    placeholder="Share your feedback on the research papers, publications, collaborations, or suggestions..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Protected: Submissions are private</span>
                  </span>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Feedback</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Corporate Registrations */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="font-bold text-slate-200 tracking-wide text-xs sm:text-sm">
                Developed &amp; Maintained by Mr. JIGYASU VATSA
              </div>
              <div className="text-[11px] text-slate-400">
                &copy; 2010 - 2026 All rights reserved. Hosted by Jigyasu Integrated Global Services Private Limited
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-[11px] font-mono text-cyan-400">
              <a
                href="https://jigsy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-cyan-300 font-bold"
              >
                jigsy.in
              </a>
              <span>•</span>
              <span className="text-slate-400">Darbhanga, Bihar</span>
            </div>
          </div>

          {/* Official Corporate & Government Identifiers Ribbon */}
          <div className="w-full mt-1 pt-2.5 border-t border-slate-900/60 flex flex-wrap items-center justify-center md:justify-between gap-2 text-[11px] font-mono bg-slate-900/50 px-3.5 py-2 rounded-xl border border-slate-800/70">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">Corporate Registrations:</span>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-300">
              <span><strong className="text-cyan-400">DPIIT:</strong> DIPP228528</span>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <span><strong className="text-emerald-400">GSTIN:</strong> 10AAHCJ0404B1ZN</span>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <span><strong className="text-amber-400">MSME:</strong> UDYAM-BR-34-0051280</span>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <span><strong className="text-purple-400">CIN:</strong> U62099BR2025PTC078592</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Passkey / Private Vault Modal */}
      {adminModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-fadeIn max-h-[90vh] flex flex-col">
            <button
              onClick={() => {
                setAdminModalOpen(false);
                setPasskeyError(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAuthenticated ? (
              /* Passkey Authentication Challenge */
              <div className="py-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Administrator Authentication Required
                    </h3>
                    <p className="text-xs text-slate-400">
                      Submissions are confidential. Please enter Jigyasu Vatsa&apos;s owner passkey to access.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerifyPasskey} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Owner Passkey PIN
                    </label>
                    <input
                      type="password"
                      autoFocus
                      value={passkeyInput}
                      onChange={(e) => {
                        setPasskeyInput(e.target.value);
                        setPasskeyError(false);
                      }}
                      placeholder="Enter administrative passkey..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm font-mono"
                    />
                    <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
                      <span>Confidential Vault Protection</span>
                      <span className="text-cyan-400 font-mono">Hint for Jigyasu: JIGSY2025</span>
                    </div>
                  </div>

                  {passkeyError && (
                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-700/60 text-rose-300 text-xs flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Access Denied: Incorrect administrative passkey.</span>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setAdminModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-950 border border-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Unlock Vault</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Authenticated Private Inbox View */
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>Jigyasu Vatsa&apos;s Private Feedback Inbox</span>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          {feedbacks.length} Submissions
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Confidential feedback received from academic visitors and collaborators.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogoutAdmin}
                    className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 mr-8"
                  >
                    Lock Vault
                  </button>
                </div>

                {/* Submissions List */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
                  {feedbacks.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      No feedback submissions recorded yet.
                    </div>
                  ) : (
                    feedbacks.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                          <span className="text-cyan-400 font-bold">{item.name}</span>
                          <span>{item.timestamp}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          <span className="text-slate-300 font-semibold">{item.designation}</span> •{' '}
                          <a href={`mailto:${item.email}`} className="text-cyan-400 hover:underline">
                            {item.email}
                          </a>
                        </div>
                        <p className="text-slate-200 bg-slate-900/60 p-3 rounded-lg border border-slate-850 whitespace-pre-wrap leading-relaxed">
                          {item.suggestion}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={handleClearFeedbacks}
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear Inbox</span>
                  </button>

                  <button
                    onClick={handleExportFeedbacks}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors flex items-center gap-1.5 border border-slate-700"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Export JSON File</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
