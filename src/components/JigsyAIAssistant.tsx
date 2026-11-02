import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  X,
  Sparkles,
  User,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO, RESEARCH_PAPERS, CONFERENCES, FDP_WORKSHOPS } from '../data/portfolioData';

interface Message {
  sender: 'user' | 'jigsy';
  text: string;
  timestamp: string;
}

export const JigsyAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'jigsy',
      text: `Hello! I am JIGSY, Jigyasu Vatsa's AI Assistant. Ask me anything about his 4 research papers, simultaneous Dual Masters (M.Tech + MBA), FDPs, IRCTC engineering work, or JIGSY INDIA!`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Speech synthesis function
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignored if voice fails in sandbox
    }
  };

  // Automated intelligent knowledge responder
  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('paper') || q.includes('research') || q.includes('publish') || q.includes('scopus') || q.includes('wos')) {
      return `Jigyasu has 4 major scholarly publications:
1. ICIPAI-2026 Paper published with Springer Nature on "AI-Assisted Smart Food Redistribution" (Accepted for Web of Science/WoS indexing).
2. GTISD-2026 Scopus-Indexed Conference Paper on "Zero Waste Food Management Circular Economy".
3. ICTTI-2026 Paper accepted for Taylor & Francis publication & Scopus Indexing on "Cyber-Resilient AI Food Redistribution for Industry 5.0".
4. Peer-Reviewed UGC-CARE listed journal paper in Vedanjali on "Entrepreneurship & Inclusive Economic Growth".`;
    }

    if (q.includes('master') || q.includes('dual') || q.includes('mba') || q.includes('m.tech') || q.includes('degree') || q.includes('ugc')) {
      return `Jigyasu is pursuing Simultaneous Dual Master's Degrees in full compliance with UGC Guidelines:
• M.Tech in Computer Science & Engineering (Regular Full-Time, 2025–2027) at Sandip University.
• MBA in Strategic Enterprise Management (Distance / ODL, 2026–2028) at IGNOU.
As per UGC regulations, students are legally entitled to pursue one regular degree and one distance degree concurrently!`;
    }

    if (q.includes('fdp') || q.includes('workshop') || q.includes('ardent') || q.includes('c-dac') || q.includes('cdac') || q.includes('vaani')) {
      return `Jigyasu has completed 3 high-impact FDPs & Workshops:
1. Ardent Computech 6-day FDP on "Cyber Security Fundamentals for Educators" (Cert ID: ARDENT/194640).
2. International Conference on Future of AI organized with C-DAC & LNMI Patna (presented paper on Robotic Automation & Ethical AI).
3. AICTE-VAANI 2-day Workshop at Patna Sahib Technical Campus on "AI & Smart Information Systems in Maithili language" (ATAL ID: ATAL/2026/1790086518).`;
    }

    if (q.includes('irctc') || q.includes('railway') || q.includes('internship') || q.includes('dmrc') || q.includes('tatkal')) {
      return `At IRCTC (World Trade Centre & State Entry Road, New Delhi), Jigyasu worked as a Developer Intern Trainee. He contributed to the DMRC Metro QR-ticket integration, Travel Protect insurance checkout validations, and high-concurrency database optimizations under peak Tatkal booking windows (handling 35,000+ QPS).`;
    }

    if (q.includes('jigsy') || q.includes('company') || q.includes('chairperson') || q.includes('founder')) {
      return `Jigyasu Vatsa is the Founder & Chairperson of JIGSY INDIA (Jigyasu Integrated Global Services Pvt. Ltd.). He directs full-stack digital product engineering, including proprietary recruitment pipelines, employee management suites, and real-time enterprise communication messengers.`;
    }

    if (q.includes('orcid') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
      return `You can connect with Jigyasu directly:
• ORCID ID: https://orcid.org/0009-0006-1712-8520
• Email: jigyasu.vatsa@gmail.com
• Phone: +919431400022
• LinkedIn: linkedin.com/in/jigyasu-vatsa
• Website: https://jigyasu.jigsy.in`;
    }

    if (q.includes('conference') || q.includes('present') || q.includes('summit')) {
      return `Jigyasu has presented at premier academic summits including GTISD-2026 (Sandip University), ICIPAI-2026 (Quantum University / Springer), ICTTI-2026 (Noida International University / Taylor & Francis), and the LNMI/C-DAC Future of AI Conference in Patna.`;
    }

    return `Jigyasu Vatsa is a Computer Science Researcher & Systems Architect pursuing Dual Masters (M.Tech CSE + MBA) and serving as Chairperson at JIGSY INDIA. He specializes in AI circular resource optimization, high-concurrency database engineering (IRCTC alum), and algorithm pedagogy. How else may I assist you?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      timestamp: 'Now',
    };

    const replyText = generateResponse(query);
    const botMsg: Message = {
      sender: 'jigsy',
      text: replyText,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue('');
    speakText(replyText);
  };

  const handleStartListening = () => {
    // Web Speech API recognition check
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message below.');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      setIsListening(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const quickPrompts = [
    'Tell me about his 4 Research Papers',
    'Explain Dual Masters (M.Tech + MBA)',
    'What FDPs & Workshops did he complete?',
    'What was his role at IRCTC?',
    'What is JIGSY INDIA?',
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open JIGSY AI Voice & Chat Assistant"
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 group backdrop-blur-md"
      >
        <Bot className="w-5 h-5 text-slate-950 animate-bounce" />
        <span className="hidden sm:inline-block text-xs font-black tracking-wide">
          Ask JIGSY AI
        </span>
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-6 left-6 z-50 w-full max-w-md sm:max-w-lg bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[560px] animate-fadeIn"
        >
          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 font-black shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>JIGSY AI Assistant</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800/40 font-mono">
                    Voice & Chat
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Interactive Intelligence for Jigyasu Vatsa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (voiceEnabled && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                aria-label={voiceEnabled ? 'Mute voice' : 'Enable voice'}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={voiceEnabled ? 'Voice enabled (speaking answers)' : 'Voice muted'}
              >
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                }}
                aria-label="Close JIGSY Assistant"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'jigsy' && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-850 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSendMessage(p)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={handleStartListening}
              className={`p-2 rounded-xl border transition-colors ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-900 text-slate-400 hover:text-cyan-400 border-slate-800'
              }`}
              title={isListening ? 'Listening...' : 'Voice mic input'}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder="Ask anything about Jigyasu's research, papers, dual masters..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="p-2 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-slate-950 rounded-xl font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
