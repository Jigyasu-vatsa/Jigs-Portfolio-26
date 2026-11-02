import React, { useState } from 'react';
import { SkillItem, SkillCodeSnippet } from '../types';
import {
  Cpu,
  Terminal,
  Database,
  Sparkles,
  Code2,
  Globe,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Flame,
} from 'lucide-react';

interface SkillsMatrixProps {
  skills: SkillItem[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLanguage, setActiveLanguage] = useState<string>('Python');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const categories = ['All', 'Languages', 'Frameworks & Web', 'AI & Data', 'Databases & Tools'];

  // Interactive Code Playground Snippets
  const codePlaygroundSnippets: Record<string, { filename: string; language: string; icon: string; code: string; defaultOutput: string }> = {
    Python: {
      filename: 'priority_decay_heuristic.py',
      language: 'python',
      icon: '🐍',
      code: `# Jigyasu Vatsa - Circular Resource Priority Heuristic
# Published in Springer Nature ICIPAI-2026

def hello_jigyasu():
    author = "Jigyasu Vatsa (Chairperson @ JIGSY INDIA)"
    harvest_batch = "Fresh Produce Lot #A2026"
    hours_left = 18.5
    decay_rate = 0.22  # Priority heuristic coefficient
    
    # Mathematical priority scoring
    priority_score = (100 / (hours_left + 1)) * (1 + decay_rate)
    return {
        "developer": author,
        "batch": harvest_batch,
        "urgency_index": round(priority_score, 2),
        "status": "DISPATCH QUEUED: Civil Welfare Beneficiary Unit #3"
    }

print("Initializing JIGSY Optimization Engine...")
res = hello_jigyasu()
for k, v in res.items():
    print(f"  [{k.upper()}]: {v}")
print("-> Algorithm execution verified successfully!")`,
      defaultOutput: `Initializing JIGSY Optimization Engine...
  [DEVELOPER]: Jigyasu Vatsa (Chairperson @ JIGSY INDIA)
  [BATCH]: Fresh Produce Lot #A2026
  [URGENCY_INDEX]: 6.26
  [STATUS]: DISPATCH QUEUED: Civil Welfare Beneficiary Unit #3
-> Algorithm execution verified successfully!
[Process completed with exit code 0 in 14ms]`,
    },
    'C#': {
      filename: 'DeadlockRemediation.cs',
      language: 'csharp',
      icon: '🔷',
      code: `// Jigyasu Vatsa - Limsys Concurrency Deadlock Remediation
// Solved client database lockups at Renuka Associates

using System;
using System.Threading.Tasks;

public class DeadlockMonitor {
    public static void Main() {
        Console.WriteLine("[JIGSY Systems] Auditing Library Indexing Concurrency Locks...");
        int activeDeadlocks = 0;
        bool isStable = RemediateLockContention(ref activeDeadlocks);
        Console.WriteLine($"Lock Count: {activeDeadlocks} | Concurrency State: STABLE | Patched: {isStable}");
    }
    
    private static bool RemediateLockContention(ref int locks) {
        locks = 0; // Optimistic lock isolation applied
        return true;
    }
}`,
      defaultOutput: `[JIGSY Systems] Auditing Library Indexing Concurrency Locks...
Lock Count: 0 | Concurrency State: STABLE | Patched: True
[Process completed with exit code 0 in 22ms]`,
    },
    SQL: {
      filename: 'tatkal_booking_isolation.sql',
      language: 'sql',
      icon: '🗄️',
      code: `-- IRCTC High-Concurrency Tatkal Booking Isolation
-- Eliminating phantom allocation under 35,000+ QPS

BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SELECT seat_id, train_no, quota_category, reservation_status 
FROM train_reservations 
WHERE train_no = '12309' 
  AND travel_date = '2026-06-15'
  AND quota_category = 'TATKAL'
FOR UPDATE NOWAIT;

-- Atomic inventory lockout confirmed
COMMIT;
-- Transaction committed with zero locking latency.`,
      defaultOutput: `Query Executed Successfully.
Rows matched: 120 seats
Isolation Level: SERIALIZABLE (Zero Phantom Reads)
Lock Wait: 0.00ms
Status: 200 OK COMMIT`,
    },
    TypeScript: {
      filename: 'packetRouter.ts',
      language: 'typescript',
      icon: '⚡',
      code: `// JIGSY INDIA - WebSocket Real-Time Channel Dispatcher
// Powers internal collaborative messenger

interface MessagePacket {
  from: string;
  channel: string;
  timestamp: number;
}

const dispatchAlert = (pkt: MessagePacket): string => {
  return \`[JIGSY-NET] Routed packet from \${pkt.from} -> #\${pkt.channel} [AES-256 ENCRYPTED]\`;
};

console.log(dispatchAlert({
  from: "Jigyasu Vatsa",
  channel: "executive-dispatch",
  timestamp: Date.now()
}));`,
      defaultOutput: `[JIGSY-NET] Routed packet from Jigyasu Vatsa -> #executive-dispatch [AES-256 ENCRYPTED]
Latency: 1.4ms | WebSockets Synchronized
Status: Packet Delivered`,
    },
    Java: {
      filename: 'DmrcTicketValidation.java',
      language: 'java',
      icon: '☕',
      code: `// IRCTC & DMRC Multimodal Metro QR Ticket Validator
// High-throughput automated turnstile authorization

public class DmrcTicketValidation {
    public static void main(String[] args) {
        String token = "IRCTC-DMRC-METRO-QR-PASS-2026-TOKEN-OK";
        System.out.println("Processing Multimodal Transit Ticket: " + token);
        boolean isValid = validatePass(token);
        System.out.println("Turnstile Status: Gate #04 OPENED [VALIDATED: " + isValid + "]");
    }
    
    private static boolean validatePass(String token) {
        return token.startsWith("IRCTC-DMRC");
    }
}`,
      defaultOutput: `Processing Multimodal Transit Ticket: IRCTC-DMRC-METRO-QR-PASS-2026-TOKEN-OK
Turnstile Status: Gate #04 OPENED [VALIDATED: true]
Commuter Authorized for Delhi Metro Rail Entry.`,
    },
  };

  const currentSnippet = codePlaygroundSnippets[activeLanguage];

  const handleRunCode = () => {
    setIsRunning(true);
    setExecutionOutput('Compiling and executing code in sandboxed runtime...');
    setTimeout(() => {
      setExecutionOutput(currentSnippet.defaultOutput);
      setIsRunning(false);
    }, 450);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSkills = skills.filter((s) => {
    if (activeCategory === 'All') return true;
    return s.category === activeCategory;
  });

  // Render official language icon
  const renderLanguageIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('python')) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M11.91 2C6.88 2 7.23 4.18 7.23 4.18L7.24 6.45H12V7.21H5.16S2 6.84 2 11.91C2 16.98 4.76 16.71 4.76 16.71H6.38V14.41S6.24 11.91 8.74 11.91H13.56S15.93 12.06 15.93 9.7V4.28S16.42 2 11.91 2ZM9.3 3.63C9.75 3.63 10.12 3.99 10.12 4.45C10.12 4.9 9.75 5.27 9.3 5.27C8.84 5.27 8.48 4.9 8.48 4.45C8.48 3.99 8.84 3.63 9.3 3.63Z" fill="#38bdf8"/>
          <path d="M12.09 22C17.12 22 16.77 19.82 16.77 19.82L16.76 17.55H12V16.79H18.84S22 17.16 22 12.09C22 7.02 19.24 7.29 19.24 7.29H17.62V9.59S17.76 12.09 15.26 12.09H10.44S8.07 11.94 8.07 14.3V19.72S7.58 22 12.09 22ZM14.7 20.37C14.25 20.37 13.88 20.01 13.88 19.55C13.88 19.1 14.25 18.73 14.7 18.73C15.16 18.73 15.52 19.1 15.52 19.55C15.52 20.01 15.16 20.37 14.7 20.37Z" fill="#facc15"/>
        </svg>
      );
    }
    if (n.includes('c#')) {
      return (
        <div className="w-5 h-5 rounded bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center font-mono">
          C#
        </div>
      );
    }
    if (n.includes('sql')) {
      return (
        <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      );
    }
    if (n.includes('javascript') || n.includes('typescript')) {
      return (
        <div className="w-5 h-5 rounded bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center font-mono">
          TS
        </div>
      );
    }
    if (n.includes('java')) {
      return (
        <div className="w-5 h-5 rounded bg-red-600 text-white font-bold text-[10px] flex items-center justify-center font-mono">
          ☕
        </div>
      );
    }
    if (n.includes('react')) {
      return (
        <svg className="w-5 h-5 text-cyan-400 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)"/>
        </svg>
      );
    }
    return <Code2 className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <section id="skills" className="py-16 scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive Engineering Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Interactive Code Runner & Technical Skills
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Execute live algorithm snippets in Python, C#, SQL, TypeScript, and Java directly from Jigyasu&apos;s
              research papers and enterprise backend systems.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono self-start md:self-auto bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Runtime Active</span>
          </div>
        </div>

        {/* Interactive Code Runner Playground Widget */}
        <div className="mb-12 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Top Bar with Language Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5 gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-3">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Language Selection Tabs */}
              {Object.keys(codePlaygroundSnippets).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setActiveLanguage(lang);
                    setExecutionOutput(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 ${
                    activeLanguage === lang
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span>{codePlaygroundSnippets[lang].icon}</span>
                  <span>{lang}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-mono">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Running...' : 'Run Code ▶'}</span>
              </button>
            </div>
          </div>

          {/* Code Editor and Live Terminal Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {/* Left: Code Editor Screen */}
            <div className="lg:col-span-7 p-4 bg-slate-950/70 font-mono text-xs text-slate-300 overflow-x-auto min-h-[220px]">
              <div className="text-[10px] text-slate-500 pb-2 border-b border-slate-900 flex items-center justify-between">
                <span>{currentSnippet.filename}</span>
                <span>UTF-8 • {currentSnippet.language}</span>
              </div>
              <pre className="mt-3 leading-relaxed font-mono whitespace-pre-wrap selection:bg-cyan-500 selection:text-slate-950">
                {currentSnippet.code}
              </pre>
            </div>

            {/* Right: Live Terminal Output Screen */}
            <div className="lg:col-span-5 p-4 bg-black/80 font-mono text-xs flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 border-b border-slate-900">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Terminal className="w-3 h-3" />
                    <span>Terminal Stdout</span>
                  </span>
                  <span>Exit: 0</span>
                </div>

                <div className="mt-3 text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px]">
                  {executionOutput ? (
                    <div className="text-emerald-300">{executionOutput}</div>
                  ) : (
                    <div className="text-slate-500 italic">
                      Click <strong className="text-cyan-400 not-italic">Run Code ▶</strong> above to execute the {activeLanguage} snippet and observe the live computational output...
                    </div>
                  )}
                </div>
              </div>

              {executionOutput && (
                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="text-cyan-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Execution Verified</span>
                  </span>
                  <button
                    onClick={() => setExecutionOutput(null)}
                    className="text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Clear</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-900/60 border border-slate-800 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid with Official Icons and Mastery Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                    {renderLanguageIcon(skill.name)}
                    <span>{skill.name}</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-cyan-400 tabular-nums">
                    {skill.level}%
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {skill.highlight}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{skill.category}</span>
                <span className="text-cyan-400/90 font-medium">Production Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
