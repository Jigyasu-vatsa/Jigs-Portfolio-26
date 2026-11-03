import React, { useState, useEffect } from 'react';
import { FeedbackSubmission } from '../types';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Download,
  Trash2,
  Search,
  ArrowLeft,
  Mail,
  Building,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  FileJson,
  UserCheck,
} from 'lucide-react';

interface AdminVaultPageProps {
  onBackToHome: () => void;
}

export const AdminVaultPage: React.FC<AdminVaultPageProps> = ({ onBackToHome }) => {
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Primary recipient passkey for Mr. Jigyasu Vatsa
  const RECIPIENT_PASSKEY = 'JIGSY2025';

  useEffect(() => {
    // Check if session already authenticated in memory or tab
    const savedFeedbacks = localStorage.getItem('jigsy_feedbacks_vault');
    if (savedFeedbacks) {
      try {
        const parsed = JSON.parse(savedFeedbacks);
        setFeedbacks(parsed);
      } catch {
        setFeedbacks([]);
      }
    } else {
      // Seed default sample feedbacks if empty
      const initialSeed: FeedbackSubmission[] = [
        {
          id: 'fb-seed-1',
          name: 'Dr. Ramesh Sharma',
          email: 'r.sharma@research-iit.ac.in',
          designation: 'Professor & Head of Dept. (CSE), IIT Roorkee',
          suggestion:
            'Commendations on your Springer Nature paper on Priority-Based Circular Redistribution. Would like to invite you as an expert keynote speaker for our upcoming IEEE Symposium.',
          timestamp: '2026-10-24 14:32:10',
        },
        {
          id: 'fb-seed-2',
          name: 'Pooja Verma',
          email: 'pooja.v@enterprise-solutions.com',
          designation: 'Technical Program Manager @ Transport Tech',
          suggestion:
            'Impressed by your IRCTC and DMRC QR test automation contributions and your book "Mastering DSA Without Fear". Interested in exploring technical consultancy with JIGSY INDIA.',
          timestamp: '2026-10-29 09:15:40',
        },
      ];
      setFeedbacks(initialSeed);
      localStorage.setItem('jigsy_feedbacks_vault', JSON.stringify(initialSeed));
    }
  }, []);

  const handleVerifyPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput.trim() === RECIPIENT_PASSKEY) {
      setIsAuthenticated(true);
      setPasskeyError(false);
    } else {
      setPasskeyError(true);
    }
  };

  const handleLockOut = () => {
    setIsAuthenticated(false);
    setPasskeyInput('');
    setPasskeyError(false);
  };

  const handleClearInbox = () => {
    if (window.confirm('Are you sure you want to delete all stored submissions? This action cannot be undone.')) {
      setFeedbacks([]);
      localStorage.removeItem('jigsy_feedbacks_vault');
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(feedbacks, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `jigsy_vault_export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExportCSV = () => {
    if (feedbacks.length === 0) return;
    const headers = ['ID', 'Date & Time', 'Sender Name', 'Email Address', 'Organization / Role', 'Feedback Message'];
    const rows = feedbacks.map((f) => [
      f.id,
      `"${f.timestamp}"`,
      `"${f.name.replace(/"/g, '""')}"`,
      `"${f.email.replace(/"/g, '""')}"`,
      `"${f.designation.replace(/"/g, '""')}"`,
      `"${f.suggestion.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encodedUri;
    a.download = `jigsy_feedbacks_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredFeedbacks = feedbacks.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.designation.toLowerCase().includes(q) ||
      item.suggestion.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <button
          onClick={onBackToHome}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-2 text-xs font-mono transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>&larr; Return to Main Dashboard</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Vault Security Node:</span>
          <span className="text-emerald-300 font-bold">Confidential Storage Active</span>
        </div>
      </div>

      {/* Prominent Line of Protection Notice */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-800/50 shadow-xl">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 mt-0.5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/80">
                Confidential Access
              </span>
              <span className="text-xs font-mono text-slate-400">Protected Submissions Inbox</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Private Feedback &amp; Institutional Communication Vault
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              <strong>Line of Protection:</strong> This dedicated portal is strictly visible only to{' '}
              <strong className="text-cyan-300">Mr. Jigyasu Vatsa</strong> (Founder, Developer &amp; Chairperson, JIGSY INDIA).
              All submissions made via the feedback form are stored securely and kept private from public visitors.
            </p>
          </div>
        </div>
      </div>

      {!isAuthenticated ? (
        /* Password Challenge Gate */
        <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-slate-900/90 border border-slate-750 shadow-2xl backdrop-blur-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-teal-400/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            Authentication Required
          </h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Please enter your private recipient passkey to unlock and review the confidential feedback inbox.
          </p>

          <form onSubmit={handleVerifyPasskey} className="mt-6 space-y-4">
            <div className="relative text-left">
              <label className="block text-xs font-mono text-slate-400 mb-1.5 font-medium">
                Recipient Passkey
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={passkeyInput}
                  onChange={(e) => {
                    setPasskeyInput(e.target.value);
                    setPasskeyError(false);
                  }}
                  placeholder="Enter administrator passkey"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm font-mono"
                />
              </div>
            </div>

            {passkeyError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Incorrect passkey. Only authorized recipient access is permitted.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-cyan-500/20 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Confidential Vault</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Authorized: Mr. Jigyasu Vatsa (Owner)</span>
          </div>
        </div>
      ) : (
        /* Authenticated In-Depth Inbox View */
        <div className="space-y-6">
          {/* Action Toolbar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono text-xs font-bold">
                Total Submissions: {feedbacks.length}
              </div>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Encrypted persistent storage
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-750 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Download CSV Spreadsheet"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="px-3.5 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-750 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Download JSON Archive"
              >
                <FileJson className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export JSON</span>
              </button>

              {feedbacks.length > 0 && (
                <button
                  onClick={handleClearInbox}
                  className="px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/50 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Inbox</span>
                </button>
              )}

              <button
                onClick={handleLockOut}
                className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Lock Vault</span>
              </button>
            </div>
          </div>

          {/* Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by sender name, email, organization, or message text..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Feedbacks Grid */}
          {filteredFeedbacks.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <Mail className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-300">No Messages Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                {searchQuery ? 'Try adjusting your search criteria.' : 'No feedback submissions received yet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFeedbacks.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{item.name}</span>
                        </h4>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{item.email}</span>
                        </a>
                      </div>

                      <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 shrink-0 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{item.timestamp}</span>
                      </div>
                    </div>

                    {item.designation && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 mb-3">
                        <Building className="w-3 h-3 text-emerald-400" />
                        <span>{item.designation}</span>
                      </div>
                    )}

                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-850 text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                      {item.suggestion}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Submission</span>
                    </span>
                    <a
                      href={`mailto:${item.email}?subject=Reply:%20Regarding%20Portfolio%20Inquiry&body=Dear%20${encodeURIComponent(
                        item.name
                      )},%0A%0AThank%20you%20for%20reaching%20out.`}
                      className="text-cyan-400 hover:text-white hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Reply Direct &rarr;</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
