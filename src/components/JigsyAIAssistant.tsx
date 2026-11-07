import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send,
  Volume2,
  VolumeX,
  Mic,
  X,
  User,
  Clock,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Globe,
  Building,
  Radio,
  Trash2,
  Sparkles,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'jigsy';
  text: string;
  timestamp: string;
}

interface JigsyAIAssistantProps {
  pulseSignal?: boolean;
  autoOpenSignal?: boolean;
}

const STORAGE_KEY = 'jigsy_assistant_chat_history_v10';

const getGreeting = (forVoice = false): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return forVoice ? 'Good morning' : 'Good morning! 🌅';
  if (hour >= 12 && hour < 17) return forVoice ? 'Good afternoon' : 'Good afternoon! ☀️';
  if (hour >= 17 && hour < 22) return forVoice ? 'Good evening' : 'Good evening! 🌆';
  return forVoice ? 'Hello and welcome' : 'Hello & welcome! 🌙';
};

const formatCurrentTime = (): string => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Official Assets provided by user
const JIGSY_AI_LOGO = '/assets/aistudio/VoiceAssistantCumChatBotIcon_8fa904b4.png';
const HELLO_JIGS_BG = '/assets/aistudio/HelloJigs_95232d68.png';

export const JigsyAIAssistant: React.FC<JigsyAIAssistantProps> = ({ pulseSignal, autoOpenSignal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isAttracting, setIsAttracting] = useState(false);
  const [showCalloutBadge, setShowCalloutBadge] = useState(false);
  const [activeVoiceLabel, setActiveVoiceLabel] = useState<string>('Soft Female Voice');
  const [listeningStatusNotice, setListeningStatusNotice] = useState<string | null>(null);

  // Real-Time Audio Capture & Live Analysis State
  const [audioVolume, setAudioVolume] = useState<number>(0);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [detectedIntent, setDetectedIntent] = useState<string | null>(null);

  const femaleVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const silenceTimerRef = useRef<any>(null);
  const speechTranscriptRef = useRef<string>('');
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Persistent conversation history across views and reloads
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // ignore parse error
      }
    }
    return [
      {
        id: 'init-1',
        sender: 'jigsy',
        text: `${getGreeting()} I am JIGSY, Mr. Jigyasu Vatsa's AI Assistant. How can I help you today? Ask me about his 5 research publications, Amazon authored book, simultaneous Dual Masters (M.Tech + MBA), JIGSY INDIA, or previous portfolio!`,
        timestamp: formatCurrentTime(),
      },
    ];
  });

  // Automatically save conversation history to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // ignore quota error
      }
    }
  }, [messages]);

  const handleClearChat = () => {
    const freshMsg: Message = {
      id: `init-${Date.now()}`,
      sender: 'jigsy',
      text: `${getGreeting()} Chat history cleared. How may I assist you with Mr. Jigyasu Vatsa's portfolio today?`,
      timestamp: formatCurrentTime(),
    };
    setMessages([freshMsg]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load and cache high-quality soft female voice across all platforms
  const resolveFemaleVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Explicit female identifiers in voice name or URI
    const explicitFemale = voices.find((v) => {
      const lower = `${v.name} ${v.voiceURI}`.toLowerCase();
      return (
        (lower.includes('female') ||
          lower.includes('zira') ||
          lower.includes('samantha') ||
          lower.includes('victoria') ||
          lower.includes('jenny') ||
          lower.includes('aria') ||
          lower.includes('karen') ||
          lower.includes('moira') ||
          lower.includes('tessa') ||
          lower.includes('fiona') ||
          lower.includes('hazel') ||
          lower.includes('susan') ||
          lower.includes('cora') ||
          lower.includes('elizabeth') ||
          lower.includes('neerja') ||
          lower.includes('heera') ||
          lower.includes('serena') ||
          lower.includes('swara') ||
          lower.includes('aditi') ||
          lower.includes('google uk english female') ||
          lower.includes('google us english female')) &&
        !lower.includes('male')
      );
    });

    if (explicitFemale) {
      femaleVoiceRef.current = explicitFemale;
      setActiveVoiceLabel(explicitFemale.name.replace(/Google|Microsoft/gi, '').trim() || 'Soft Female Voice');
      return explicitFemale;
    }

    // 2. English voice that does not contain known male identifiers
    const maleIdentifiers = ['david', 'mark', 'george', 'guy', 'male', 'daniel', 'oliver', 'richard', 'alex', 'fred', 'bruce'];
    const nonMale = voices.find((v) => {
      const lower = v.name.toLowerCase();
      return v.lang.startsWith('en') && !maleIdentifiers.some((m) => lower.includes(m));
    });

    if (nonMale) {
      femaleVoiceRef.current = nonMale;
      setActiveVoiceLabel('Soft Tone');
      return nonMale;
    }

    const fallbackVoice = voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
    femaleVoiceRef.current = fallbackVoice;
    return fallbackVoice;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      resolveFemaleVoice();
      window.speechSynthesis.onvoiceschanged = () => {
        resolveFemaleVoice();
      };
    }
  }, [resolveFemaleVoice]);

  // Page Load / Refresh Attention Animation:
  // "wait 2 or 3 and pop or blink for 3 times some larger to its size so that user attracts towards"
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAttracting(true);
      setShowCalloutBadge(true);
      const attractDuration = setTimeout(() => {
        setIsAttracting(false);
      }, 2600); // 2.5s for 3 complete pulse cycles
      return () => clearTimeout(attractDuration);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Post-Theme Modal Trigger: As soon as user clicks "Okay, Proceed" or closes the theme popup,
  // the assistant launcher pulses to attract the user, but does NOT auto-open the app.
  // The app will only open when the user explicitly clicks the launcher button.
  useEffect(() => {
    if (pulseSignal || autoOpenSignal) {
      setIsAttracting(true);
      setShowCalloutBadge(true);
      const timer = setTimeout(() => {
        setIsAttracting(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [pulseSignal, autoOpenSignal]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowCalloutBadge(false);
      // On first open, voice-greet user in soft female tone if voice is enabled.
      // Use clean greeting without icons/emojis (e.g. "Good afternoon", not "Good afternoon! ☀️")
      // so speech synthesis never verbalizes "sun" / "son".
      if (!hasGreeted) {
        setHasGreeted(true);
        const spokenGreeting = getGreeting(true);
        speakText(`${spokenGreeting}! I am JIGSY. How may I assist you with Jigyasu Vatsa's research papers, dual masters, or previous portfolio today?`);
      }
    }
  }, [messages, isOpen, hasGreeted]);

  // Comprehensive text sanitizer for speech synthesis to prevent icons/emojis (e.g. ☀️ -> "sun"/"son", 👋 -> "waving hand")
  // and code/markdown characters from being spoken aloud
  const sanitizeForSpeech = (rawText: string): string => {
    return rawText
      // Remove web links
      .replace(/https?:\/\/\S+/g, '')
      // Strip all Unicode emojis, pictographs, weather icons, dingbats (☀️, 🌅, 🌆, 🌙, 👋, ✨, 🚀, etc.)
      .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\p{Emoji}\u200d\ufe0f\u2600-\u27bf\u2300-\u23ff\u2b50-\u2b55\u3030\u303d\u3297\u3299]/gu, '')
      // Replace ampersand with 'and'
      .replace(/&/g, ' and ')
      // Remove markdown formatting characters
      .replace(/[*_#`~[\]()]/g, '')
      // Replace bullet points, dashes, slashes with natural pauses
      .replace(/[•–—|/]/g, ', ')
      // Strip technical identifiers numbers that sound robotic
      .replace(/\bISBN:?\s*[\d-]+\b/gi, '')
      .replace(/\bASIN:?\s*\w+\b/gi, '')
      .replace(/\bCIN:?\s*\w+\b/gi, '')
      .replace(/\bGSTIN:?\s*\w+\b/gi, '')
      .replace(/\bMSME:?\s*[\w-]+\b/gi, '')
      .replace(/\bDOI:?\s*[\w./-]+\b/gi, '')
      // Replace newlines with sentence pauses
      .replace(/\n+/g, '. ')
      // Normalize whitespace
      .replace(/\s{2,}/g, ' ')
      // Collapse repeated punctuation like '! .' or '? !'
      .replace(/([.!?])\s*[.!?]+/g, '$1')
      .trim();
  };

  // Soft female tone speech synthesis
  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();

      const speechReadable = sanitizeForSpeech(text);
      if (!speechReadable) return;

      const utterance = new SpeechSynthesisUtterance(speechReadable);
      
      // Pitch 1.45 guarantees a soft, gentle, higher-register feminine timbre
      utterance.pitch = 1.45;
      // Rate 0.90 ensures relaxed, calm, polite cadence
      utterance.rate = 0.90;
      utterance.volume = 1.0;

      const voice = femaleVoiceRef.current || resolveFemaleVoice();
      if (voice) {
        utterance.voice = voice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignored if voice API is unavailable in sandbox
    }
  };

  // Real-time Intent Recognition for live voice analysis
  const analyzeIntent = (rawQuery: string): string | null => {
    const q = rawQuery
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'<>]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!q) return null;
    if (/\b(call|calling|dial|phone|mobile|cell|telephone|ring|mail|email|gmail|inbox|contact|contacts|reach|whatsapp|number|address|location)\b/i.test(q)) {
      return '📞 Contact & Phone / Email';
    }
    if (/\b(help|support|assist|assistance|guide|guidance|what can you do|how to use|commands|topics)\b/i.test(q)) {
      return '💡 Help & Guidance';
    }
    if (/\b(chat|chatbot|talk|speak|voice|dialogue|converse|conversation|bot|assistant)\b/i.test(q)) {
      return '💬 Voice & Chat Mode';
    }
    if (/\b(zerowfm|zero waste|food|redistribution|circular|aifm|ctfm|prototype)\b/i.test(q)) {
      return '🌐 ZeroWFM & Web Presence';
    }
    if (/\b(paper|papers|research|publish|publication|scopus|wos|springer|taylor|vedanjali|journal)\b/i.test(q)) {
      return '📄 5 Research Publications';
    }
    if (/\b(dual|master|masters|mtech|m\.tech|mba|degree|ugc dual)\b/i.test(q)) {
      return '🎓 Dual Masters (M.Tech + MBA)';
    }
    if (/\b(ugc|net|stet|bihar stet|accreditation|eligibility|nta)\b/i.test(q)) {
      return '🏆 UGC-NET & Bihar STET';
    }
    if (/\b(book|dsa|amazon|author|textbook|fear)\b/i.test(q)) {
      return '📚 Mastering DSA Book';
    }
    if (/\b(irctc|dmrc|railway|ticket|testing|integration|tatkal)\b/i.test(q)) {
      return '🚆 IRCTC & DMRC Systems';
    }
    if (/\b(jigsy|startup|founder|chairperson|vertical|verticals|dpiit|cin|gstin|msme)\b/i.test(q)) {
      return '🏢 JIGSY INDIA Startup';
    }
    if (/\b(student|students|mentor|teach|pedagogy|guide|guided|daa|coached|capstone)\b/i.test(q)) {
      return '👥 Mentorship (385+ Students)';
    }
    if (/\b(conference|conferences|seminar|symposium|proceeding|fair|gtisd|icipai|ictti|lnmi|talk)\b/i.test(q)) {
      return '🎙️ Conferences & Proceedings';
    }
    if (/\b(previous|jigyasu1|old portfolio|x portfolio|former)\b/i.test(q)) {
      return '🔗 Previous Portfolio (jigyasu1)';
    }
    if (/\b(hi|hello|hey|good morning|good afternoon|good evening|namaste|greetings)\b/i.test(q)) {
      return '👋 Greeting & Welcome';
    }
    return '🔍 Analyzing Portfolio Query...';
  };

  // Automated intelligent professional knowledge responder
  const generateResponse = (query: string): string => {
    // Strip trailing punctuation from Speech Recognition transcript
    const q = query
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'<>]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // 1. Conversational Politeness & Wellness ("How are you")
    if (
      q.includes('how are you') ||
      q.includes('how r u') ||
      q.includes('how are u') ||
      q.includes('how do you do') ||
      q.includes("how's it going") ||
      q.includes('how are things')
    ) {
      return "I am doing great, thank you for asking! I'm here as Mr. Jigyasu Vatsa's professional AI Assistant. I can share comprehensive details regarding his 5 research publications, dual masters (M.Tech + MBA), JIGSY INDIA, railway integration testing at IRCTC & DMRC, or student mentorship. How may I assist you today?";
    }

    // 2. Identity, Role & Bot Capabilities ("Who are you", "What can you do")
    if (
      q.includes('who are you') ||
      q.includes('what can you do') ||
      q.includes('your name') ||
      q.includes('introduce yourself') ||
      q.includes('what are you') ||
      q.includes('help me') ||
      q.includes('commands') ||
      q.includes('options')
    ) {
      return `I am JIGSY, Mr. Jigyasu Vatsa's official AI Portfolio Assistant. You can ask me about:
• 5 Scholarly Publications (Springer Nature, Taylor & Francis, Vedanjali, LNMI)
• Authored Amazon Book ('Mastering DSA Without Fear')
• Simultaneous Dual Masters (M.Tech CSE @ Sandip Univ + MBA @ IGNOU)
• Accreditations: UGC-NET (Ph.D. Eligibility) & Bihar STET
• Four Conferences & Seminars (ICIPAI, ICTTI, LNMI FAIR-2026, GTISD)
• JIGSY INDIA & its 6 Enterprise Verticals (DPIIT DIPP228528)
• Systems Engineering at IRCTC & DMRC (Integration Testing)
• Academic Pedagogy & Mentorship (385+ Students Guided)
• Technical Skills, Education, FDPs, and Previous Portfolio`;
    }

    // 3. Natural friendly greetings
    const greetings = [
      'hi',
      'hello',
      'hey',
      'hii',
      'hiii',
      'heyy',
      'good morning',
      'good afternoon',
      'good evening',
      'greetings',
      'namaste',
      'hola',
      'howdy',
      'sup',
    ];

    if (
      greetings.includes(q) ||
      q === 'hi' ||
      q === 'hello' ||
      q === 'hey' ||
      q.startsWith('hi ') ||
      q.startsWith('hello ') ||
      q.startsWith('hey ')
    ) {
      return "Hello! How can I help you today? Ask me anything about Jigyasu's 5 research publications, Dual Masters (M.Tech + MBA), JIGSY INDIA, or previous portfolio!";
    }

    // 4. Appreciation & Gratitude ("Thank you", "Great")
    if (
      q.includes('thank') ||
      q.includes('thanks') ||
      q.includes('awesome') ||
      q.includes('good job') ||
      q.includes('appreciate') ||
      q.includes('helpful')
    ) {
      return "You're very welcome! It's a pleasure to assist. Feel free to explore more about Jigyasu's research, engineering innovations, or academic contributions!";
    }

    // 5. Closure & Farewell detection
    const closureTriggers = [
      'no',
      'nope',
      'no thanks',
      'no thank you',
      'nothing',
      'nothing else',
      'not now',
      'bye',
      'bye bye',
      'goodbye',
      'good bye',
      'tata',
      'see you',
      'exit',
      'quit',
      'close',
    ];

    if (
      closureTriggers.includes(q) ||
      q.startsWith('no,') ||
      q.startsWith('no ') ||
      q.endsWith(' no') ||
      q.includes('nothing else') ||
      q.includes('no thank') ||
      q.includes('bye bye') ||
      q.includes('good bye')
    ) {
      return 'Have a nice day, please visit us again! Bye bye! 👋';
    }

    // 6. Direct Contact & Communication (call, phone, mobile, mail, email, contact, dial, reach, whatsapp)
    const isContactQuery =
      q === 'call' ||
      q === 'phone' ||
      q === 'mobile' ||
      q === 'mail' ||
      q === 'email' ||
      q === 'contact' ||
      q.startsWith('call ') ||
      q.startsWith('mail ') ||
      q.startsWith('email ') ||
      q.startsWith('contact ') ||
      /\b(call|dial|phone|mobile|cell|telephone|ring|mail|email|gmail|inbox|contact|contacts|reach|whatsapp|number|address|location|get in touch)\b/i.test(q);

    if (isContactQuery) {
      return `Connect & Direct Communication with Mr. Jigyasu Vatsa:
• 📞 Phone / Mobile: +91 9431400022 (Available for Voice Calls & WhatsApp)
• ✉️ Email / Mail: jigyasu.vatsa@gmail.com
• 📍 Location: Darbhanga, Bihar, India
• 💼 LinkedIn: https://linkedin.com/in/jigyasu-vatsa
• 🐙 GitHub: https://github.com/jigyasu-vatsa
• 🌐 Official Portal: https://jigsy.in
• 🔗 Previous Portfolio: https://jigyasu1.jigsy.in

Feel free to dial +91 9431400022, send an email, or message on WhatsApp for research collaborations, faculty lectures, startup initiatives, or academic inquiries!`;
    }

    // 7. Help & Technical / Portfolio Support (help, support, assist, guide, guidance)
    const isHelpQuery =
      q === 'help' ||
      q === 'support' ||
      q.startsWith('help') ||
      q.startsWith('support') ||
      /\b(help|support|assist|assistance|guide|guidance|what can you do|how to use|topics|features|commands|options|menu)\b/i.test(q);

    if (isHelpQuery) {
      return `I am JIGSY, here to provide complete help and support! You can ask me about:
• 📞 Contact & Reach: Inquire with 'call', 'mail', 'email', 'phone', or 'contact' for direct details.
• 📄 5 Research Publications: Ask 'papers', 'research', 'springer', 'taylor & francis', or 'vedanjali'.
• 📚 Authored Book: Ask 'dsa book' or 'amazon' for 'Mastering DSA Without Fear'.
• 🎓 Dual Masters & Accreditations: Ask 'dual masters', 'mtech', 'mba', 'ugc-net', or 'bihar stet'.
• 🚆 Engineering Telemetry: Ask 'irctc', 'dmrc', or 'mentorship' (385+ guided students).
• 🏢 JIGSY INDIA: Ask 'startup' or 'verticals' for DPIIT-recognized enterprise divisions.
• 🎙️ Voice & Chat: Speak your question via microphone or type in the chat box!`;
    }

    // 8. Chat, Conversation & Voice Interaction (chat, talk, speak, voice, dialogue, chatbot)
    const isChatQuery =
      q === 'chat' ||
      q.startsWith('chat') ||
      /\b(chat|chatbot|talk|speak|voice|dialogue|converse|conversation|bot|assistant)\b/i.test(q);

    if (isChatQuery) {
      return `You are in live conversation with JIGSY AI Assistant!
• 🎙️ Voice Interaction: Click the microphone icon to speak naturally. The assistant stays active, transcribes your voice live, and responds in a calm, soft female voice.
• 💬 Interactive Text: Type any query or keyword like 'call', 'mail', 'help', '5 papers', 'dual masters', 'conferences', or 'IRCTC'.
• 🔊 Soft Voice Output: You can test the female voice anytime using 'Test Voice' or mute/unmute via the speaker icon.
How can I assist your conversation today?`;
    }

    // 9. Accreditations: UGC-NET & Bihar STET (Checked BEFORE Dual Masters to prevent precedence bug)
    if (
      q.includes('ugc-net') ||
      q.includes('ugc net') ||
      q.includes('stet') ||
      q.includes('bihar stet') ||
      q.includes('accreditation') ||
      q.includes('qualification') ||
      q.includes('national qualification') ||
      q.includes('eligibility') ||
      q.includes('nta')
    ) {
      return `Mr. Jigyasu Vatsa holds two premier national & state academic qualifications:
1. UGC-NET Qualified (June 2026, Roll: BR071500137, 80.44 percentile) – Awarded by National Testing Agency (NTA) for University Grants Commission, qualifying him for Doctoral Research (Ph.D. Admission) in Computer Science & Applications across Indian Universities.
2. Bihar STET Qualified (2025, Roll: 2551007648, Paper-2 Code 208) – State Teacher Eligibility Test certification qualifying him for Senior Secondary Computer Science Faculty appointments in Bihar.
He also serves as Assistant Examination Coordinator at Sandip University SOCSE.`;
    }

    // 10. Conferences, Seminars & Proceedings
    if (
      q.includes('conference') ||
      q.includes('seminar') ||
      q.includes('symposium') ||
      q.includes('proceeding') ||
      q.includes('fair') ||
      q.includes('gtisd') ||
      q.includes('icipai') ||
      q.includes('ictti') ||
      q.includes('lnmi') ||
      q.includes('keynote') ||
      q.includes('presentation') ||
      q.includes('talk')
    ) {
      return `Mr. Jigyasu Vatsa has presented research at four prestigious international and national conferences:
1. ICIPAI-2026 (Roorkee / Springer Nature & Atlantis Press): Presented 'AI-Assisted Smart Food Redistribution System with Priority-Based Optimization' (Accepted for Web of Science indexing).
2. ICTTI-2026 (Patna / Taylor & Francis & CRC Press): Presented 'Cyber-Resilient AI-Assisted Smart Food Redistribution Using Secure Priority Optimization for Industry 5.0' (Accepted for Scopus indexing).
3. FAIR-2026 (LNMI Patna in collaboration with C-DAC): Presented 'Futuristic Automation in Robotics with AI for Strategizing Mankind's Ethical Growth' (Published with ISBN: 978-93-94599-97-0).
4. GTISD-2026 (Sandip University Madhubani): Presented 'Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution' (ISBN: 978-81-685333-4-9). Live Prototype: https://zerowfm.jigsy.in`;
    }

    // Zero Waste Food Management (ZeroWFM) & Related Web Presence
    if (
      q.includes('zerowfm') ||
      q.includes('zero waste') ||
      q.includes('food') ||
      q.includes('redistribution') ||
      q.includes('circular') ||
      q.includes('aifm') ||
      q.includes('ctfm') ||
      q.includes('presence') ||
      q.includes('prototype')
    ) {
      return `Mr. Jigyasu Vatsa's Smart Food Redistribution & Circular Economy Research Ecosystem:
• 🌐 ZeroWFM (Active Prototype): https://zerowfm.jigsy.in
  Web-based circular economy prototype demonstrating how urban food surplus redistribution, priority heuristics, and real-time donor-beneficiary allocation work before this paper and conference publications were done.
• 🔜 AI-AssistedFM (Upcoming): https://aifm.jigsy.in
  AI priority heuristics and predictive shelf-life modeling engine.
• 🔜 CyberTrustedFM (Upcoming): https://ctfm.jigsy.in
  Cryptographically tamper-proofed supply validation and audit logs for Industry 5.0.
This research is published in Springer Nature (ICIPAI-2026), Taylor & Francis (ICTTI-2026), and Sandip University (GTISD-2026).`;
    }

    // 11. Jigyasu's Previous Portfolio
    if (
      q.includes('previous') ||
      q.includes('jigyasu1') ||
      q.includes('old portfolio') ||
      q.includes('x portfolio') ||
      q.includes('former')
    ) {
      return `You can explore Jigyasu's Previous Portfolio at:
🔗 https://jigyasu1.jigsy.in

Jigyasu's Previous Portfolio chronicles his foundational projects, earlier systems engineering, and developmental milestones before this unified research dossier.`;
    }

    // 9. 5 Research Papers & Publications
    if (
      q.includes('paper') ||
      q.includes('research') ||
      q.includes('publish') ||
      q.includes('publication') ||
      q.includes('scopus') ||
      q.includes('wos') ||
      q.includes('web of science') ||
      q.includes('springer') ||
      q.includes('taylor') ||
      q.includes('vedanjali') ||
      q.includes('journal')
    ) {
      return `Mr. Jigyasu Vatsa has 5 major scholarly research publications and 1 authored book:

1. Springer Nature (ICIPAI-2026):
   "AI-Assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Model"
   • Accepted for Web of Science (WoS) indexing | DOI: 10.1007/978-981-96-4848-1_15

2. Vedanjali Research Journal (UGC-CARE Listed, Vol. 11, Issue 44):
   "उद्यमशीलता के राजनीतिक परिदृश्य एवं दलितों का साथ : समावेशी आर्थिक विकास का एक संस्थागत विश्लेषण"
   • Institutional economic analysis on inclusive entrepreneurial growth.

3. Taylor & Francis / CRC Press (ICTTI-2026):
   "Cyber-Resilient AI-Assisted Smart Food Redistribution Using Secure Priority Optimization for Industry 5.0"
   • Accepted for Scopus Indexing.

4. LNMI International Conference Proceeding:
   "Futuristic Automation in Robotics & Ethical AI Frameworks"
   • Published with ISBN: 978-93-94599-97-0 in collaboration with C-DAC.

5. Authored Academic Book on Amazon:
   "Mastering DSA Without Fear: A Hands-On Guide for Beginners and Beyond"
   • 109 pages | ASIN: B0H5QK7MF2 | ISBN: 979-8181718425.

Plus, his research paper and presentation on 'Zero Waste Food Management: A Web-Based Circular Economy Framework' with live prototype at https://zerowfm.jigsy.in (GTISD-2026, ISBN: 978-81-685333-4-9).`;
    }

    // 10. Authored Book: Mastering DSA
    if (
      q.includes('book') ||
      q.includes('dsa') ||
      q.includes('amazon') ||
      q.includes('fear') ||
      q.includes('author') ||
      q.includes('textbook')
    ) {
      return `Jigyasu Vatsa authored the book "Mastering DSA Without Fear: A Hands-On Guide for Beginners and Beyond" (109 pages).
• Published on Amazon (ASIN: B0H5QK7MF2, ISBN: 979-8181718425).
• It demystifies Data Structures & Algorithms with practical Python, C#, and visual mental models, covering time-complexity, trees, graphs, and dynamic programming for competitive engineering!`;
    }

    // 11. Dual Masters (M.Tech + MBA)
    if (
      q.includes('master') ||
      q.includes('dual') ||
      q.includes('mba') ||
      q.includes('m.tech') ||
      q.includes('mtech') ||
      q.includes('degree') ||
      q.includes('ugc dual') ||
      q.includes('ugc regulation') ||
      q.includes('ugc guideline')
    ) {
      return `Jigyasu is pursuing Simultaneous Dual Master's Degrees in full compliance with UGC Guidelines:
• M.Tech in Computer Science & Engineering (Regular Full-Time, 2025–2027) at School of Computer Science & Engineering (SOCSE), Sandip University.
• MBA in Strategic Enterprise Management (Distance / ODL, 2026–2028) at IGNOU.
Under official UGC regulations, Indian university students can pursue one full-time regular degree and one distance degree concurrently!`;
    }

    // 12. IRCTC & DMRC Systems Engineering & Integration Testing
    if (
      q.includes('irctc') ||
      q.includes('railway') ||
      q.includes('dmrc') ||
      q.includes('tatkal') ||
      q.includes('ticket') ||
      q.includes('testing') ||
      q.includes('integration')
    ) {
      return `At IRCTC & DMRC (World Trade Centre & State Entry Road, New Delhi), Jigyasu served as a Developer Intern Trainee conducting Integration Testing:
• Integrated DMRC Delhi Metro QR-code transit ticketing directly into the IRCTC Next Generation e-Ticketing system.
• Validated Travel Protect insurance policy checkout pipelines and regression test validation across passenger workflows.
• Engineered PostgreSQL query indexing & caching optimizations handling peak Tatkal ticket surges of 35,000+ Queries Per Second!`;
    }

    // 13. Teaching, Academic Pedagogy & Student Mentorship
    if (
      q.includes('student') ||
      q.includes('mentor') ||
      q.includes('teach') ||
      q.includes('pedagogy') ||
      q.includes('guide') ||
      q.includes('daa') ||
      q.includes('coached') ||
      q.includes('capstone')
    ) {
      return `Jigyasu Vatsa has guided and mentored 385+ students across Computer Science & Engineering:
• Guided & Mentored 385+ Students across academic and project domains.
• Also co-guided undergraduate (B.Tech) capstone major project & guided students to do research paper.
• Coached 180+ students in Design & Analysis of Algorithms (DAA).
• Coached 120+ students in Data Structures & Algorithms (DSA).
• Mentored 80+ students in Advance Technology cohorts.
• Serves as Assistant Examination Coordinator, FDP Coordinator, and Training & Placement Committee Member at Sandip University SOCSE.`;
    }

    // 14. JIGSY INDIA & 6 Verticals
    if (
      q.includes('jigsy') ||
      q.includes('company') ||
      q.includes('chairperson') ||
      q.includes('founder') ||
      q.includes('startup') ||
      q.includes('vertical') ||
      q.includes('dpiit') ||
      q.includes('cin') ||
      q.includes('gstin') ||
      q.includes('msme')
    ) {
      return `Jigyasu Vatsa is Founder & Chairperson of JIGSY INDIA (Jigyasu Integrated Global Services Private Limited).
• DPIIT Recognized Startup: DIPP228528
• Corporate Identification (CIN): U62099BR2025PTC078592
• GSTIN: 10AAHCJ0404B1ZN | MSME: UDYAM-BR-34-0051280
The enterprise operates across 6 specialized divisions:
1. JIGSY R&D (Heuristics & AI Algorithms)
2. JIGSY DigiTech (Enterprise Cloud Platforms)
3. JIGSY Consult (Strategic Advisory)
4. JIGSY Tech (Systems Engineering)
5. JIGSY Youth (Capacity Building)
6. JIGSY EduTech (Skill Development & Pedagogy)
Official Corporate Portal: https://jigsy.in`;
    }

    // 15. Skills & Tech Stack
    if (
      q.includes('skill') ||
      q.includes('tech stack') ||
      q.includes('technologies') ||
      q.includes('programming') ||
      q.includes('language') ||
      q.includes('python') ||
      q.includes('c#') ||
      q.includes('typescript') ||
      q.includes('react') ||
      q.includes('database') ||
      q.includes('stack')
    ) {
      return `Jigyasu Vatsa's Technical Skills & System Stack:
• Core Languages: Python, C#, TypeScript, JavaScript, SQL, C++
• Web & Distributed Systems: React, Next.js, Node.js, Express, Tailwind CSS, RESTful APIs
• Databases & Infrastructure: PostgreSQL, MongoDB, Redis, Docker, Git, Linux
• Core Specializations: Artificial Intelligence, Cyber Security, Heuristic Algorithms, High-Concurrency Queues, and Circular Resource Optimization`;
    }

    // 16. Education & Academic Background
    if (
      q.includes('education') ||
      q.includes('academic') ||
      q.includes('b.tech') ||
      q.includes('btech') ||
      q.includes('college') ||
      q.includes('university') ||
      q.includes('school') ||
      q.includes('bseb') ||
      q.includes('cbse')
    ) {
      return `Jigyasu Vatsa's Academic Trajectory:
1. M.Tech in Computer Science & Engineering (2025–2027) – School of Computer Science & Engineering, Sandip University.
2. MBA in Strategic Enterprise Management (2026–2028) – Distance / ODL, IGNOU.
3. B.Tech in Computer Science & Engineering (2021–2025) – First Class with Distinction.
4. Senior Secondary Intermediate (12th Science) – BSEB Patna.
5. Secondary Matriculation (10th) – CBSE.`;
    }

    // 17. FDPs & Workshops
    if (
      q.includes('fdp') ||
      q.includes('workshop') ||
      q.includes('ardent') ||
      q.includes('c-dac') ||
      q.includes('vaani') ||
      q.includes('atal') ||
      q.includes('certificate') ||
      q.includes('certification')
    ) {
      return `Jigyasu has participated in and organized high-impact Faculty Development Programs:
1. Ardent Computech 6-day FDP on "Cyber Security Fundamentals for Educators" (Cert ID: ARDENT/194640).
2. Electronics & ICT Academy C-DAC Patna 5-day FDP on "Cyber Security & Digital Excellence: From Awareness to Resilience" (Cert ID: C-DAC(P)/E&ICT/FDP/26/235).
3. AICTE-VAANI 2-day Workshop on "AI & Smart Information Systems in Regional Language (Maithili)" at Patna Sahib Technical Campus (ATAL ID: ATAL/2026/1790086518).`;
    }

    // 18. Projects
    if (
      q.includes('project') ||
      q.includes('work') ||
      q.includes('portfolio') ||
      q.includes('system') ||
      q.includes('app')
    ) {
      return `Key Production & Research Engineering Projects:
1. AI-Assisted Smart Food Redistribution Framework: Decentralized circular economy system reducing perishable food spoilage with priority routing (Published with Springer Nature).
2. IRCTC & DMRC Transit Ticketing Integration: High-throughput QR transit ticketing integration for Delhi Metro across IRCTC infrastructure.
3. JIGSY Enterprise Platform & R&D Portals: Multi-tenant corporate architectures across 6 divisions.
4. Unified Research Dossier: High-performance portfolio with Cyber-Snake telemetry, citation indexing, and AI intelligence.`;
    }

    // 19. Contact & Profiles
    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('phone') ||
      q.includes('reach') ||
      q.includes('orcid') ||
      q.includes('linkedin') ||
      q.includes('github') ||
      q.includes('location')
    ) {
      return `Connect with Mr. Jigyasu Vatsa:
• Email: jigyasu.vatsa@gmail.com
• Phone: +919431400022
• Location: Darbhanga, Bihar, India
• ORCID ID: 0009-0006-1712-8520
• LinkedIn: linkedin.com/in/jigyasu-vatsa
• GitHub: github.com/jigyasu-vatsa
• Previous Portfolio: https://jigyasu1.jigsy.in
• Official Website: https://jigsy.in`;
    }

    // 20. Professional Fallback with Suggestions
    return `Mr. Jigyasu Vatsa is a Computer Science Researcher, Systems Architect, and Founder of JIGSY INDIA. He is pursuing Dual Masters (M.Tech CSE @ Sandip University + MBA @ IGNOU), has authored "Mastering DSA Without Fear", and has 5 research publications across Springer Nature, Taylor & Francis, Vedanjali, and LNMI.

How can I help you today? You can ask me with keywords like 'call', 'mail', 'help', 'chat', 'contact', '5 papers', 'dual masters', 'conferences', 'IRCTC systems', or 'student mentorship'!`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: formatCurrentTime(),
    };

    const replyText = generateResponse(query);
    const botMsg: Message = {
      id: `msg-b-${Date.now() + 1}`,
      sender: 'jigsy',
      text: replyText,
      timestamp: formatCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue('');
    setLiveTranscript('');
    setDetectedIntent(null);
    speakText(replyText);
  };

  const stopListening = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {
        // ignore
      }
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch {
        // ignore
      }
      mediaStreamRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
    setAudioVolume(0);
  }, []);

  const handleToggleListening = async () => {
    // If already listening, stop recording and send whatever transcript was accumulated
    if (isListening) {
      stopListening();
      const query = speechTranscriptRef.current.trim() || inputValue.trim();
      if (query) {
        speechTranscriptRef.current = '';
        setLiveTranscript('');
        setDetectedIntent(null);
        handleSendMessage(query);
      }
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setListeningStatusNotice('Speech recognition is not supported in this browser. Please type or tap quick topics below.');
      return;
    }

    try {
      // Cancel any ongoing speech synthesis so mic doesn't hear assistant voice
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      // Keep live mediaStream open and connect to Web Audio API for real-time visualizer
      let micStream: MediaStream | null = null;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = micStream;

          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            const audioCtx = new AudioContextClass();
            audioContextRef.current = audioCtx;
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;
            analyserRef.current = analyser;
            const source = audioCtx.createMediaStreamSource(micStream);
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const checkVolume = () => {
              if (!analyserRef.current) return;
              analyserRef.current.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const avg = sum / dataArray.length;
              const normalized = Math.min(100, Math.round((avg / 110) * 100));
              setAudioVolume(normalized);
              animFrameRef.current = requestAnimationFrame(checkVolume);
            };
            animFrameRef.current = requestAnimationFrame(checkVolume);
          }
        } catch (err) {
          console.warn('Microphone permission check:', err);
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognitionRef.current = recognition;
      recognition.lang = 'en-US';
      // Continuous mode ensures browser does not abruptly kill session
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      speechTranscriptRef.current = '';
      setLiveTranscript('');
      setDetectedIntent(null);
      setIsListening(true);
      setListeningStatusNotice(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let accumulated = '';
        for (let i = 0; i < event.results.length; i++) {
          accumulated += event.results[i][0].transcript;
        }
        const trimmed = accumulated.trim();
        if (trimmed) {
          speechTranscriptRef.current = trimmed;
          setLiveTranscript(trimmed);
          setInputValue(trimmed);
          setDetectedIntent(analyzeIntent(trimmed));

          // Clear previous silence timer and reset
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          // Automatically send after 1.8s of silence after speaking
          silenceTimerRef.current = setTimeout(() => {
            const queryToSend = speechTranscriptRef.current.trim() || inputValue.trim();
            if (queryToSend) {
              stopListening();
              speechTranscriptRef.current = '';
              setLiveTranscript('');
              setDetectedIntent(null);
              handleSendMessage(queryToSend);
            }
          }, 1800);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        const errType = event?.error;
        const existingText = speechTranscriptRef.current.trim() || inputValue.trim();

        if (existingText) {
          stopListening();
          speechTranscriptRef.current = '';
          setLiveTranscript('');
          setDetectedIntent(null);
          handleSendMessage(existingText);
          return;
        }

        if (errType === 'no-speech') {
          stopListening();
          setListeningStatusNotice('No speech detected. Speak clearly, or tap any quick keyword below:');
        } else if (errType === 'not-allowed' || errType === 'service-not-allowed') {
          stopListening();
          setListeningStatusNotice('Microphone permission blocked. Please allow mic in browser settings, or tap below:');
        } else if (errType === 'audio-capture') {
          stopListening();
          setListeningStatusNotice('No microphone found. Please connect a mic or tap below:');
        } else {
          stopListening();
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        const finalText = speechTranscriptRef.current.trim() || inputValue.trim();
        if (finalText) {
          stopListening();
          speechTranscriptRef.current = '';
          setLiveTranscript('');
          setDetectedIntent(null);
          handleSendMessage(finalText);
        }
      };

      recognition.start();

      // 14-second safety guard: If user does not say anything, stop listening gracefully
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        if (!speechTranscriptRef.current.trim()) {
          stopListening();
          setListeningStatusNotice('No speech detected. Speak clearly, or tap any quick keyword below:');
        }
      }, 14000);
    } catch {
      stopListening();
      setListeningStatusNotice('Could not start microphone. You can type or tap a quick keyword below.');
    }
  };

  const quickPrompts = [
    '📞 Call / Contact',
    '✉️ Mail / Email',
    '💬 Chat & Voice',
    '💡 Help & Support',
    '5 Research Papers',
    'Dual Masters (M.Tech + MBA)',
    'UGC-NET & Bihar STET',
    'Conferences & Talks',
    'Students Guided (385+)',
    'IRCTC & DMRC Systems',
    'Mastering DSA Book',
    'ZeroWFM (zerowfm.jigsy.in)',
    'JIGSY INDIA Verticals',
    "Jigyasu's Previous Portfolio",
  ];

  return (
    <>
      {/* Floating Trigger Button Container with Attention Callout */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        {/* Callout Bubble attracting user on load */}
        {showCalloutBadge && !isOpen && (
          <div className="animate-bounce mb-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/50 shadow-xl text-[11px] font-semibold text-cyan-300 flex items-center gap-1.5 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Tap to talk with JIGSY AI!</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCalloutBadge(false);
              }}
              className="text-slate-400 hover:text-white ml-1 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Floating Trigger Button with 3-Times Blink/Enlarge Animation on load or trigger */}
        <button
          onClick={() => {
            setIsOpen(true);
            setShowCalloutBadge(false);
            setIsAttracting(false);
          }}
          aria-label="Open JIGSY AI Voice & Chat Assistant"
          className={`p-2.5 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group backdrop-blur-md border border-cyan-300/60 ${
            isAttracting ? 'animate-attract-3x' : ''
          }`}
        >
          {/* Provided Official JIGSY AI Logo Avatar - Pure Cutout Without Black Box */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
            <img
              src={JIGSY_AI_LOGO}
              alt="JIGSY AI Assistant Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-black tracking-wide leading-tight text-slate-950 flex items-center gap-1.5">
              <span>Ask JIGSY AI</span>
            </div>
            <div className="text-[10px] font-mono text-slate-950/80 leading-tight">
              Voice &amp; Chatbot
            </div>
          </div>
        </button>
      </div>

      {/* Floating Chat Modal with Increased Height & Pop Larger-to-Smaller Animation */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-6 left-6 z-50 w-[calc(100vw-3rem)] max-w-md sm:max-w-lg bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[690px] max-h-[92vh] sm:h-[730px] animate-pop-larger origin-bottom-left"
        >
          {/* Header with Transparent Cutout Logo & Soft Voice Indicator */}
          <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* JIGSY AI Official Logo in Header - Pure Cutout */}
              <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                <img
                  src={JIGSY_AI_LOGO}
                  alt="JIGSY AI Official Logo"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>JIGSY AI Assistant</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/40 font-mono font-semibold">
                    Soft Voice
                  </span>
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                  <span>Intelligence for Jigyasu Vatsa</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Test Voice Button */}
              <button
                onClick={() => {
                  speakText('Hello! How can I help you today? I am your soft voice assistant.');
                }}
                aria-label="Preview soft female voice"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/25 transition-colors"
                title="Click to test soft female voice"
              >
                <Volume2 className="w-3 h-3" />
                <span>Test Voice</span>
              </button>

              {/* Clear Stored Conversation History */}
              <button
                onClick={handleClearChat}
                aria-label="Clear chat history"
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Clear saved chat history"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Mute / Unmute Toggle */}
              <button
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (voiceEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                aria-label={voiceEnabled ? 'Mute voice' : 'Enable voice'}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={voiceEnabled ? 'Soft female voice active (click to mute)' : 'Voice muted (click to unmute)'}
              >
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* Close Dialog Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  stopListening();
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                aria-label="Close JIGSY Assistant"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body Area with Prominent 'Hello, Jigs' Tactical Background */}
          <div className="relative flex-1 overflow-hidden bg-slate-950">
            {/* Custom Background Image Layer: HelloJigs.png clearly visible */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45"
              style={{ backgroundImage: `url('${HELLO_JIGS_BG}')` }}
            />
            {/* Subtle darkening tint keeping artwork crisp & vibrant while chat messages pop */}
            <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />

            {/* Scrollable Messages Content */}
            <div className="relative z-10 h-full p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.sender === 'jigsy' && (
                    <div className="w-8 h-8 shrink-0 mt-0.5 flex items-center justify-center">
                      <img
                        src={JIGSY_AI_LOGO}
                        alt="JIGSY"
                        className="w-full h-full object-contain filter drop-shadow-sm"
                      />
                    </div>
                  )}
                  <div className="max-w-[85%] flex flex-col">
                    <div
                      className={`p-3 rounded-2xl leading-relaxed shadow-lg ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-tr-none'
                          : 'bg-slate-950/95 border border-slate-800 text-slate-100 rounded-tl-none whitespace-pre-wrap'
                      }`}
                    >
                      {m.text}
                    </div>
                    {/* Timestamp */}
                    <div
                      className={`flex items-center gap-1 mt-1 text-[10px] font-mono text-slate-400 ${
                        m.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <Clock className="w-2.5 h-2.5" />
                      <span>{m.timestamp}</span>
                    </div>
                  </div>
                  {m.sender === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-950/95 border-t border-slate-800 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSendMessage(p)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Active Recording & Real-Time Audio Analysis Console */}
          {isListening && (
            <div className="p-3 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-rose-500/50 text-xs font-mono animate-fadeIn space-y-2.5">
              {/* Header with Visual Audio Waveform Equalizer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                  </span>
                  <span className="font-bold text-rose-300">REAL-TIME RECORDING ACTIVE</span>
                </div>

                {/* Animated 5-Bar Audio Waveform reacting to mic volume */}
                <div className="flex items-end gap-1 h-5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {[25, 50, 90, 60, 35].map((baseHeight, idx) => {
                    const dynamicHeight = Math.max(15, Math.min(100, Math.round((baseHeight * Math.max(audioVolume, 15)) / 45)));
                    return (
                      <span
                        key={idx}
                        className="w-1.5 rounded-full bg-gradient-to-t from-emerald-500 via-cyan-400 to-rose-400 transition-all duration-75"
                        style={{ height: `${dynamicHeight}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Real-time live speech transcript */}
              <div className="p-2 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-200">
                <div className="text-[10px] text-slate-400 flex items-center justify-between mb-1">
                  <span>Live Speech Transcript:</span>
                  <span className="text-cyan-400 font-semibold">
                    {audioVolume > 5 ? `Mic Level: ${audioVolume}%` : 'Speak into microphone...'}
                  </span>
                </div>
                <div className="text-xs text-white font-sans font-medium min-h-[20px] italic">
                  {liveTranscript ? `"${liveTranscript}"` : 'Listening... Say "call", "email", "help", "5 papers", or "dual masters"'}
                </div>
              </div>

              {/* Live detected intent match pill */}
              {detectedIntent && (
                <div className="flex items-center justify-between text-[11px] bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1.5 rounded-lg text-cyan-200">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    <span>Matched Intent:</span>
                    <span className="text-white font-bold">{detectedIntent}</span>
                  </span>
                  <span className="text-[10px] text-cyan-300/80">Auto-sending in 1.8s</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-0.5">
                <button
                  onClick={() => {
                    stopListening();
                    const toSend = liveTranscript.trim() || inputValue.trim();
                    if (toSend) {
                      handleSendMessage(toSend);
                    }
                  }}
                  disabled={!liveTranscript.trim() && !inputValue.trim()}
                  className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Send Query Now</span>
                </button>

                <button
                  onClick={() => {
                    stopListening();
                    setLiveTranscript('');
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Listening Notice / Feedback Banner with Interactive Keyword Actions */}
          {listeningStatusNotice && (
            <div className="p-2.5 sm:p-3 bg-slate-900/95 border-t border-amber-500/40 text-xs font-mono animate-fadeIn">
              <div className="flex items-center justify-between text-amber-300 mb-2">
                <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                  <span className="font-semibold">{listeningStatusNotice}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setListeningStatusNotice(null)}
                  className="text-slate-400 hover:text-white p-1"
                  aria-label="Dismiss notice"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 font-sans">
                <button
                  onClick={() => {
                    setListeningStatusNotice(null);
                    handleSendMessage('call');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>📞 Call / Phone</span>
                </button>
                <button
                  onClick={() => {
                    setListeningStatusNotice(null);
                    handleSendMessage('mail');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>✉️ Mail / Email</span>
                </button>
                <button
                  onClick={() => {
                    setListeningStatusNotice(null);
                    handleSendMessage('help');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>💡 Help &amp; Support</span>
                </button>
                <button
                  onClick={() => {
                    setListeningStatusNotice(null);
                    handleSendMessage('chat');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>💬 Chat &amp; Voice</span>
                </button>
                <button
                  onClick={() => {
                    setListeningStatusNotice(null);
                    handleSendMessage('5 research papers');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>📄 5 Papers</span>
                </button>
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleListening}
              className={`p-2 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse shadow-lg shadow-rose-500/40 ring-2 ring-rose-400'
                  : 'bg-slate-900 text-slate-400 hover:text-cyan-400 border-slate-800 hover:border-slate-700'
              }`}
              title={isListening ? 'Listening active. Click to stop and send' : 'Click to speak query (Voice input)'}
              aria-label={isListening ? 'Stop recording voice' : 'Start voice input'}
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder={isListening ? 'Listening to your voice... Speak clearly' : 'Ask about 5 papers, dual masters, previous portfolio...'}
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
