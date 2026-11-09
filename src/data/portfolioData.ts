import {
  ResearchPaper,
  FdpWorkshopItem,
  ConferenceItem,
  ExperienceItem,
  ProjectItem,
  SkillItem,
  EducationItem,
  CertificationItem,
  AuthoredBook,
  NationalQualification,
} from '../types';

/**
 * Developer Maintenance Note:
 * PERSONAL_INFO contains the primary profile data for Mr. Jigyasu Vatsa.
 * Changes to social handles, roles, or contacts should be updated here.
 */
export const PERSONAL_INFO = {
  name: 'Jigyasu Vatsa',
  tagline: 'Computer Science Researcher & Full-Stack Systems Engineer',
  role: 'Developer & Chairperson @ JIGSY INDIA | Dual Masters: M.Tech CSE & MBA',
  corporateStatus: 'Developer & Chairperson at JIGSY INDIA (DPIIT Recognised)',
  primaryDomain: 'CSE in AI and Cyber Security',
  specialization: 'Artificial Intelligence, Cyber Security, Distributed Systems & Circular Resource Optimization',
  // Official Corporate Identifiers for Jigyasu Integrated Global Services Private Limited
  dpiit: 'DIPP228528',
  gstin: '10AAHCJ0404B1ZN',
  msme: 'UDYAM-BR-34-0051280',
  cin: 'U62099BR2025PTC078592',
  email: 'jigyasu.vatsa@gmail.com',
  phone: '+919431400022',
  location: 'Darbhanga, Bihar, India',
  website: 'https://jigsy.in',
  orcidId: 'https://orcid.org/0009-0006-1712-8520',
  linkedin: 'https://www.linkedin.com/in/jigyasu-vatsa/',
  github: 'https://github.com/jigyasu-vatsa',
  twitter: 'https://x.com/JigyasuVatsa',
  instagram: 'https://www.instagram.com/jigyasu_vatsa/',
  threads: 'https://www.threads.net/@jigyasu_vatsa',
  facebook: 'https://www.facebook.com/jigyasu.vatsa',
  avatarUrl: '/assets/aistudio/image_1d924a9e.png',
  avatarAltUrl: '/assets/aistudio/image_9a2ceab0.png',
  jigsyLogoUrl: '/assets/aistudio/image_bdd66c74.png',
  bio: 'Computer Science professional, researcher, author, and Developer & Chairperson of JIGSY INDIA (DPIIT Recognised Startup / Jigyasu Integrated Global Services Private Limited). Pursuing simultaneous Dual Master\'s degrees (Regular M.Tech CSE @ Sandip University + Distance MBA @ IGNOU under UGC dual-degree guidelines), UGC-NET Qualified (Ph.D.) and Bihar STET Qualified. Author of "Mastering DSA Without Fear" on Amazon. Serving as Assistant Examination Coordinator at SOCSE Sandip University, FDP Coordinator, and Training Placement Committee (TPC) Member. Former Developer Intern at IRCTC (DMRC QR Ticketing Integration). Specializing in AI, Cyber Security, High-Concurrency Systems, and Circular Resource Optimization.',
};

/**
 * Developer Maintenance Note:
 * AUTHORED_BOOK contains published Amazon textbook details.
 * Fresh front and back cover images are anchored in /public/assets/aistudio/.
 */
export const AUTHORED_BOOK: AuthoredBook = {
  title: 'Mastering DSA Without Fear',
  subtitle: 'Data Structures & Algorithms Made Intuitive',
  asin: 'B0H5QK7MF2',
  isbn13: '979-8181718425',
  publisher: 'Amazon Digital Services / Kindle Direct Publishing',
  publicationDate: 'June 17, 2026',
  pages: 109,
  language: 'English',
  amazonUrl: 'https://www.amazon.com/dp/B0H5QK7MF2',
  coverImage: '/assets/aistudio/image_8a0e4c1d.png',
  backCoverImage: '/assets/aistudio/image_9a2ceab0.png',
  description: 'A comprehensive, intuitive guide for engineering scholars and competitive programmers to conquer complex Data Structures & Algorithms without anxiety. Bridges abstract mathematical algorithmic complexity with real-world system designs, visual memory layouts, and interview-ready patterns.',
};

export const NATIONAL_QUALIFICATIONS: NationalQualification[] = [
  {
    id: 'qual-ugcnet',
    examName: 'UGC - NET (June 2026)',
    conductingBody: 'National Testing Agency (NTA), University Grants Commission',
    subject: '(087) Computer Science and Applications',
    year: 'June 2026 (Issued: 28.08.2026)',
    rollNumber: 'BR071500137',
    applicationNumber: '260510798406',
    scoreOrMarks: '150 / 300 (80.4387 Percentile)',
    resultStatus: 'QUALIFIED FOR ADMISSION TO Ph.D. ONLY',
    certificateUrl: '/assets/aistudio/20261101_205005_42ec6ef9.jpg',
    badge: 'National UGC-NET Qualified (Ph.D.)',
    description: 'National Level Eligibility examination conducted by NTA for University Grants Commission, qualifying Jigyasu Vatsa for Doctoral Research (Ph.D. Admission) in Computer Science & Applications across Indian Universities.',
  },
  {
    id: 'qual-stet',
    examName: 'Bihar STET 2025 (Paper-2)',
    conductingBody: 'Bihar School Examination Board (BSEB)',
    subject: 'Paper-2 (Senior Secondary Code 208) - Computer Science',
    year: '2025',
    rollNumber: '2551007648',
    scoreOrMarks: '82.30 / 150 Marks (Cut-off Cleared)',
    resultStatus: 'QUALIFIED',
    certificateUrl: '/assets/aistudio/20261101_204904_b108c1e9.jpg',
    badge: 'State Teacher Eligibility (STET) Qualified',
    description: 'State Secondary Teachers Eligibility Test certification qualifying Jigyasu Vatsa for Senior Secondary Computer Science Faculty appointments in Bihar.',
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'AI-Assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for SRM',
    publication: 'International Conference on Innovation and Practices in Artificial Intelligence (ICIPAI-2026) / Springer Nature & Atlantis Press',
    year: 2026,
    date: '2026-05-16',
    type: 'Conference Paper',
    role: 'Primary Author & Presenter',
    doi: '10.2991/978-94-6239-789-7_18',
    doiUrl: 'https://doi.org/10.2991/978-94-6239-789-7_18',
    isbn: ['9789462397880', '9789462397897'],
    issn: ['2731-7870', '1951-6851'],
    contributors: ['Jigyasu Vatsa', 'Brajesh Kumar', 'Gyanvati Jha', 'Diwakar Chaudhary'],
    source: 'ICIPAI-2026 / Springer Nature / Atlantis Press (Quantum University Roorkee)',
    tags: ['Conference Paper', 'Book Chapter WOS Index', 'Peer Review', 'Accepted for Indexing'],
    indexing: ['Web of Science', 'Peer Reviewed'],
    indexingStatus: 'Published (Accepted for WoS Indexing)',
    abstract: 'This research proposes an intelligent priority-based resource allocation algorithm integrated into a decentralized circular economy network for sustainable resource management (SRM). Addressing high perishable food wastage and logistic latency, the system incorporates real-time priority scoring based on shelf-life decay indices, geographical proximity matching, and dynamic demand routing.',
    keywords: ['Artificial Intelligence', 'Circular Economy', 'Resource Optimization', 'Decentralized Architecture', 'Springer Nature'],
    citationsCount: 14,
    prototypeUrl: 'https://aifm.jigsy.in',
    prototypeLabel: 'AI-AssistedFM (aifm.jigsy.in)',
    prototypeBadge: 'Prototype',
    prototypeStatus: 'active',
    prototypeNote: 'AI-AssistedFM live AI priority heuristics and predictive shelf-life modeling engine.',
    paperUrl: 'https://doi.org/10.2991/978-94-6239-789-7_18',
    certificateUrl: '/assets/aistudio/ICIPAI_Certificate_29406d59.jpg',
    bibtex: `@inproceedings{vatsa2026icipai,
  title={AI-Assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for SRM},
  author={Vatsa, Jigyasu and Kumar, Brajesh and Jha, Gyanvati and Chaudhary, Diwakar},
  booktitle={Proceedings of the International Conference on Innovation and Practices in Artificial Intelligence (ICIPAI-2026)},
  publisher={Springer Nature / Atlantis Press},
  year={2026},
  doi={10.2991/978-94-6239-789-7_18},
  note={Published in Springer Nature; Accepted for Web of Science (WoS) Indexing}
}`,
  },
  {
    id: 'paper-2',
    title: 'Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution',
    publication: 'International Conference on Green Technologies, Innovation, and Sustainable Development (GTISD-2026)',
    year: 2026,
    date: '2026-04-11',
    type: 'Conference Paper',
    role: 'Guide & Mentor of B.Tech Student (Student Lushi Gre presented; Present in-person as Mentor)',
    isbn: ['978-81-685333-4-9'],
    contributors: ['Lushi Gre (Student Presenter)', 'Jigyasu Vatsa (Faculty Guide & Mentor)'],
    source: 'GTISD-2026 (Ref No: SUM/IConf/2026/139, Sandip University Madhubani; ISBN Proceeding: 978-81-685333-4-9)',
    tags: ['Conference Paper', 'ISBN Proceeding', 'Peer Review'],
    indexing: ['ISBN Registered', 'Peer Reviewed'],
    indexingStatus: 'Published (ISBN Proceeding)',
    driveUrl: 'https://drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view',
    prototypeUrl: 'https://zerowfm.jigsy.in',
    prototypeLabel: 'ZeroWFM Prototype (zerowfm.jigsy.in)',
    prototypeBadge: 'Prototype',
    prototypeStatus: 'active',
    prototypeNote: 'ZeroWFM prototype website showing how and what works before this paper and conference publications were done.',
    abstract: 'Official ISBN proceeding paper (ISBN: 978-81-685333-4-9). Investigates modern web-tier client-server architectures combined with automated matching heuristics for urban edible surplus recovery under the conference theme of AI, Cyber Security & Digital Transformation of Green Technologies. Based on the ZeroWFM prototype platform (zerowfm.jigsy.in) engineered prior to conference publication. Co-authored as Guide & Mentor for B.Tech CSE student Lushi Gre, who delivered the conference presentation with Jigyasu Vatsa in attendance as faculty mentor.',
    keywords: ['ZeroWFM (zerowfm.jigsy.in)', 'Green Technologies', 'Web Engineering', 'Circular Economy', 'ISBN Proceeding', 'GTISD-2026'],
    citationsCount: 8,
    paperUrl: 'https://drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view',
    certificateUrl: '/assets/aistudio/GTISD_Certificate_5305ebbb.jpeg',
    bibtex: `@inproceedings{gre2026zerowaste,
  title={Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution},
  author={Gre, Lushi and Vatsa, Jigyasu},
  booktitle={Proceedings of the International Conference on Green Technologies, Innovation, and Sustainable Development (GTISD-2026)},
  year={2026},
  isbn={978-81-685333-4-9},
  note={Official ISBN Proceeding Paper (ISBN: 978-81-685333-4-9); Prototype: https://zerowfm.jigsy.in; Faculty Guide: Jigyasu Vatsa; Student Presenter: Lushi Gre}
}`,
  },
  {
    id: 'paper-3',
    title: 'Cyber-Resilient AI-Assisted Smart Food Redistribution Using Secure Priority Optimization for Sustainable Industry 5.0',
    publication: 'International Conference on Transformative Technologies for Industry 5.0 to 6.0 (ICTTI-2026) / Taylor & Francis Group',
    year: 2026,
    date: '2026-09-30',
    type: 'Conference Paper',
    role: 'Primary Author & Presenter',
    contributors: ['Jigyasu Vatsa', 'Diwakar Chaudhary', 'Gyanvati Jha'],
    source: 'ICTTI-2026 (Noida International University / Taylor & Francis Group)',
    tags: ['Conference Paper', 'Conference Paper Scopus Index', 'Peer Review', 'Accepted for Indexing'],
    indexing: ['Scopus', 'Peer Reviewed'],
    indexingStatus: 'Accepted for Scopus Indexing (In Press)',
    abstract: 'Presented at ICTTI-2026 organized by the School of Engineering & Technology, Noida International University (NIU). Introduces cyber-resilient cryptographic verification layers over priority-based redistribution queues, preventing adversary tampering in perishable supply pipelines and fulfilling Industry 5.0 human-centric sustainability paradigms.',
    keywords: ['Industry 5.0', 'Cyber-Resilience', 'Priority Optimization', 'Scopus In-Press', 'Taylor & Francis'],
    citationsCount: 6,
    prototypeUrl: 'https://ctfm.jigsy.in',
    prototypeLabel: 'CyberTrustedFM (ctfm.jigsy.in)',
    prototypeBadge: 'Next Soon',
    prototypeStatus: 'upcoming',
    prototypeNote: 'CyberTrustedFM upcoming cryptographically secured supply chain validation framework for Industry 5.0.',
    paperUrl: 'https://niu.edu.in/ictti-2026/proceedings/jigyasu-vatsa',
    certificateUrl: '/assets/aistudio/241_Jigyasu_Vatsa_b3005cd7.pdf',
    bibtex: `@inproceedings{vatsa2026cyberresilient,
  title={Cyber-Resilient AI-Assisted Smart Food Redistribution Using Secure Priority Optimization for Sustainable Industry 5.0},
  author={Vatsa, Jigyasu and Chaudhary, Diwakar and Jha, Gyanvati},
  booktitle={Proceedings of the International Conference on Transformative Technologies for Industry 5.0 to 6.0 (ICTTI-2026)},
  publisher={Taylor & Francis Group},
  year={2026},
  note={Accepted for Publication & Scopus Indexing (In Press)}
}`,
  },
  {
    id: 'paper-4',
    title: 'उद्यमशीलता के राजनीतिक परिदृश्य एवं दलितों का साथ : समावेशी आर्थिक विकास का एक संस्थागत विश्लेषण',
    publication: 'वेदाञ्जलि (Vedanjali Research Journal)',
    year: 2025,
    date: '2025-08-14',
    type: 'Journal Article',
    role: 'Writing - original draft & Co-Author',
    issn: ['2349-364X'],
    contributors: ['Gyanvati Jha', 'Jigyasu Vatsa'],
    source: 'वेदाञ्जलि (UGC-CARE Listed & Peer-Reviewed Journal)',
    tags: ['Journal', 'Peer Review', 'UGC-CARE Approved'],
    indexing: ['Peer Reviewed', 'UGC-CARE'],
    indexingStatus: 'Peer-Reviewed & Indexed',
    driveUrl: 'https://drive.google.com/file/d/11vEgJhOBTcCGlTU7WsO1KHsqDBz3XYaj/view',
    abstract: 'An analytical institutional study examining the socioeconomic empowerment and entrepreneurial ecosystems for marginalized communities in emerging economies. The paper leverages quantitative institutional data and demographic economic indicators to evaluate how technology access, state initiatives, and grassroots policy support foster self-reliant financial autonomy.',
    keywords: ['Institutional Economics', 'Socio-Technical Systems', 'Inclusive Growth', 'Policy Informatics', 'UGC-CARE'],
    citationsCount: 5,
    paperUrl: 'https://drive.google.com/file/d/11vEgJhOBTcCGlTU7WsO1KHsqDBz3XYaj/view',
    bibtex: `@article{jha2025entrepreneurship,
  title={उद्यमशीलता के राजनीतिक परिदृश्य एवं दलितों का साथ : समावेशी आर्थिक विकास का एक संस्थागत विश्लेषण},
  author={Jha, Gyanvati and Vatsa, Jigyasu},
  journal={Vedanjali},
  volume={12},
  number={4},
  issn={2349-364X},
  year={2025},
  note={UGC-CARE Approved & Peer-Reviewed Journal; Available on Google Drive}
}`,
  },
  {
    id: 'paper-5',
    title: 'Futuristic Automation in Robotics with AI for Strategizing Mankind\'s Ethical Growth',
    publication: 'International Conference on "The Future of Artificial Intelligence: Opportunities and Challenges" (FAIR-2026)',
    year: 2026,
    date: '2026-01-21',
    type: 'Conference Proceeding',
    role: 'Paper Presenter & Author (Chairperson - JIGSY INDIA)',
    isbn: ['978-93-94599-97-0'],
    contributors: ['Jigyasu Vatsa'],
    source: 'LNMI Patna / Knowledge Partner: C-DAC / Dept of IT, Govt of Bihar (ISBN Proceeding Page 129)',
    tags: ['Conference Paper', 'Peer Review', 'ISBN Proceeding'],
    indexing: ['Peer Reviewed', 'ISBN Registered'],
    indexingStatus: 'Published Abstract (ISBN Proceeding)',
    abstract: 'Artificial Intelligence (AI)–enabled robotics is accelerating, redefining industrial automation, productivity, and global ethical ecosystems. Aligned with the conference theme, this study builds a multi-disciplinary framework—integrating Science, Technology, Economics, Management, Social Sciences, and Humanities in Industry 5.0. Introduces the IEG Policy Framework, RFA Model, and HRS-X Symbiosis Model.',
    keywords: ['Robotics', 'Ethical Automation', 'C-DAC', 'Industry 5.0', 'LNMI Patna', 'ISBN Proceeding'],
    citationsCount: 4,
    paperUrl: '/assets/aistudio/Screenshot_20261101_205425_Editor_Lite_a7dc580f.jpg',
    certificateUrl: '/assets/aistudio/IxoraConference_Certificate_c3c0a774.jpg',
    bibtex: `@inproceedings{vatsa2026lnmi,
  title={Futuristic Automation in Robotics with AI for Strategizing Mankind's Ethical Growth},
  author={Vatsa, Jigyasu},
  booktitle={Proceedings of the International Conference on The Future of Artificial Intelligence: Opportunities and Challenges},
  pages={129},
  year={2026},
  isbn={978-93-94599-97-0},
  note={Organized by LNMI Patna with Knowledge Partner C-DAC & Bihar IT Dept}
}`,
  },
];

export const FDP_WORKSHOPS: FdpWorkshopItem[] = [
  {
    id: 'fdp-1',
    title: 'Faculty Development Program on Cyber Security Fundamentals for Educators',
    organizer: 'Ardent Computech Pvt. Ltd.',
    collaboration: 'School of Computer Science & Engineering, Sandip University Madhubani',
    sponsorOrPartner: 'NEAT, NASSCOM, Skill India Initiative',
    type: 'Faculty Development Programme (FDP)',
    dates: 'March 23, 2026 to March 28, 2026',
    year: 2026,
    duration: '6 Days Intensive Track',
    role: 'Teaching Assistant (Faculty Trainee)',
    certificateId: 'ARDENT/194640',
    verificationLink: 'https://certificate.ardentsoftware.co.in',
    venue: 'Sandip University, Madhubani',
    description: 'Mastered modern threat modeling, educator cryptography frameworks, defensive network configurations, and laboratory syllabus pedagogical designs for engineering students.',
    skills: ['Cyber Security', 'Pedagogical Frameworks', 'Threat Modeling', 'Network Security'],
    certificateUrl: '/assets/aistudio/FDP_JIGYASU_0248fc13.pdf',
  },
  {
    id: 'fdp-2',
    title: 'Faculty Development Programme on "Cyber Security & Digital Excellence: From Awareness to Resilience"',
    organizer: 'Electronics & ICT Academy, C-DAC Patna (Ministry of Electronics & IT, MeitY)',
    collaboration: 'Sandip University, Madhubani',
    sponsorOrPartner: 'MeitY (Ministry of Electronics & Information Technology), Govt. of India',
    type: 'Faculty Development Programme (FDP)',
    dates: 'July 20 to July 24, 2026',
    year: 2026,
    duration: '5 Days Certified Intensive FDP',
    role: 'Faculty Trainee / PG Scholar',
    certificateId: 'C-DAC(P)/E&ICT/FDP/26/235',
    venue: 'Sandip University, Sijoul, Madhubani, Bihar',
    description: 'Mastered cyber security threat intelligence, digital defense infrastructure, vulnerability assessment, and resilience frameworks under C-DAC Patna MeitY certified academic curriculum.',
    skills: ['C-DAC Cyber Security', 'Digital Resilience', 'Threat Intelligence', 'MeitY Frameworks'],
    certificateUrl: '/assets/aistudio/20261101_204836_073a4be3.jpg',
  },
  {
    id: 'fdp-3',
    title: 'AICTE-VAANI Workshop on AI & Smart Information Systems in Maithili Language',
    organizer: 'All India Council for Technical Education (AICTE), New Delhi',
    collaboration: 'Patna Sahib Technical Campus & ATAL Academy',
    sponsorOrPartner: 'AICTE - VAANI (Vibrant Advocacy for Advancement and Nurturing of Indian Languages)',
    type: 'Workshop',
    dates: 'September 25 to 26, 2026',
    year: 2026,
    duration: '2 Days High-Level Workshop',
    role: 'PG Scholar, Sandip University (Participant)',
    certificateId: 'ATAL/2026/1790086518',
    venue: 'Patna Sahib Technical Campus, Patna',
    description: 'Trained under AICTE VAANI on deploying Artificial Intelligence and Smart Information Systems tailored for Agriculture, Healthcare, and Flood Management in Bihar formulated in Maithili native language.',
    skills: ['AI in Agriculture', 'Flood Management Systems', 'Maithili NLP Localization', 'AICTE ATAL'],
    certificateUrl: '/assets/aistudio/certificate_9efb442c.pdf',
  },
];

export const CONFERENCES: ConferenceItem[] = [
  {
    id: 'conf-1',
    title: 'GTISD-2026: Green Technologies, Innovation, & Sustainable Development',
    conferenceName: 'International Conference on Green Technologies, Innovation and Sustainable Development',
    acronym: 'GTISD-2026',
    dates: 'April 10-11, 2026',
    year: 2026,
    location: 'Sandip University, Sijoul, Madhubani, Bihar',
    mode: 'In-Person',
    role: 'Guide & Mentor',
    paperTitle: 'Zero Waste Food Management: A Web-Based Circular Economy Framework for Sustainable Food Redistribution',
    organizer: 'Sandip University (NAAC Accredited)',
    indexing: 'Published in Official ISBN Proceeding (ISBN: 978-81-685333-4-9)',
    driveUrl: 'https://drive.google.com/file/d/1hl1eKE5VZfyXvZCZT3E7dMydZQXKRzYm/view',
    prototypeUrl: 'https://zerowfm.jigsy.in',
    prototypeLabel: 'ZeroWFM Prototype (zerowfm.jigsy.in)',
    prototypeBadge: 'Prototype',
    prototypeStatus: 'active',
    prototypeNote: 'ZeroWFM prototype website showing how and what works before this conference publication was done.',
    description: 'Faculty Guide & Mentor of B.Tech CSE student Lushi Gre who presented the research based on the ZeroWFM prototype platform (zerowfm.jigsy.in). Present in-person as faculty mentor and co-author. Published in official conference ISBN Proceeding (ISBN: 978-81-685333-4-9).',
    topics: ['ZeroWFM (zerowfm.jigsy.in)', 'Circular Economy', 'Green Computing', 'ISBN 978-81-685333-4-9', 'Cloud Heuristics'],
    certificateUrl: '/assets/aistudio/GTISD_Certificate_5305ebbb.jpeg',
  },
  {
    id: 'conf-2',
    title: 'ICIPAI-2026: Innovation and Practices in Artificial Intelligence',
    conferenceName: 'International Conference on Innovation and Practices in Artificial Intelligence',
    acronym: 'ICIPAI-2026',
    dates: 'May 15-16, 2026',
    year: 2026,
    location: 'Quantum University, Roorkee, Uttarakhand',
    mode: 'In-Person',
    role: 'Presenter',
    paperTitle: 'AI-Assisted Smart Food Redistribution System with Priority-Based Optimization: A Circular Economy Framework for SRM',
    organizer: 'Quantum University in partnership with Springer Nature & Atlantis Press',
    indexing: 'Springer Nature / Atlantis Press (Accepted for Web of Science Indexing)',
    prototypeUrl: 'https://aifm.jigsy.in',
    prototypeLabel: 'AI-AssistedFM (aifm.jigsy.in)',
    prototypeBadge: 'Prototype',
    prototypeStatus: 'active',
    prototypeNote: 'AI-AssistedFM live AI priority heuristics and predictive shelf-life modeling engine.',
    description: 'Presented landmark research on heuristic shelf-life priority modeling. Paper published in Springer Nature series, accepted for Web of Science (WoS) database indexing.',
    topics: ['AI-AssistedFM (aifm.jigsy.in)', 'Springer Nature', 'Web of Science (WoS)', 'Priority Optimization', 'Circular SRM'],
    certificateUrl: '/assets/aistudio/ICIPAI_Certificate_29406d59.jpg',
  },
  {
    id: 'conf-3',
    title: 'ICTTI-2026: Transformative Technologies for Industry 5.0 to 6.0',
    conferenceName: 'International Conference on Transformative Technologies for Industry 5.0 to 6.0',
    acronym: 'ICTTI-2026',
    dates: 'September 29-30, 2026',
    year: 2026,
    location: 'Noida International University (NIU), Gautam Budh Nagar, UP',
    mode: 'Virtual',
    role: 'Presenter (Virtual)',
    paperTitle: 'Cyber-Resilient AI-Assisted Smart Food Redistribution Using Secure Priority Optimization for Sustainable Industry 5.0',
    organizer: 'School of Engineering & Technology, NIU & Taylor & Francis Group',
    indexing: 'Taylor & Francis Group / Scopus (Accepted, In Press)',
    prototypeUrl: 'https://ctfm.jigsy.in',
    prototypeLabel: 'CyberTrustedFM (ctfm.jigsy.in)',
    prototypeBadge: 'Next Soon',
    prototypeStatus: 'upcoming',
    prototypeNote: 'CyberTrustedFM upcoming cryptographically secured supply chain validation framework for Industry 5.0.',
    description: 'Presented research in Virtual Mode on cryptographically secured priority algorithms for Industry 5.0 circular logistics. Paper accepted for publication and Scopus indexing by Taylor & Francis Group.',
    topics: ['CyberTrustedFM (ctfm.jigsy.in)', 'Industry 5.0', 'Taylor & Francis', 'Scopus Indexed (In Press)', 'Cyber-Resilience'],
    certificateUrl: '/assets/aistudio/241_Jigyasu_Vatsa_b3005cd7.pdf',
  },
  {
    id: 'conf-4',
    title: 'International Conference on The Future of Artificial Intelligence (FAIR-LNMI-2026)',
    conferenceName: 'International Conference on "The Future of Artificial Intelligence: Opportunities and Challenges"',
    acronym: 'FAIR-LNMI-2026',
    dates: 'January 20-21, 2026',
    year: 2026,
    location: 'LNMI Campus, Patna, Bihar',
    mode: 'Virtual',
    role: 'Presenter (Virtual)',
    paperTitle: 'Futuristic Automation in Robotics with AI for Strategizing Mankind\'s Ethical Growth',
    organizer: 'Lalit Narayan Mishra Institute of Economic Development & Social Change (LNMI), Patna',
    indexing: 'Published Abstract in ISBN Proceeding (ISBN: 978-93-94599-97-0, Page 129)',
    description: 'Presented peer-reviewed research in Virtual Mode with abstract officially published in the conference ISBN Proceeding book (ISBN: 978-93-94599-97-0, p. 129). Organized by LNMI Patna with Knowledge Partner C-DAC & Dept of IT, Govt of Bihar.',
    topics: ['ISBN 978-93-94599-97-0', 'C-DAC Knowledge Partner', 'Robotics Automation', 'Ethical AI Growth'],
    certificateUrl: '/assets/aistudio/IxoraConference_Certificate_c3c0a774.jpg',
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    year: '2025 — 2027',
    degree: 'Master of Technology (M.Tech), Computer Science & Engineering',
    institute: 'Sandip University, Madhubani, Bihar',
    mode: 'Regular / Full-Time',
    details: 'Regular full-time Master\'s degree with M.Tech Major Project: "Design and Development of a Cyber-Resilient AI-Driven Smart Food Redistribution System for Sustainable Circular Economy and Industry 5.0". Specializing in Advanced Algorithm Design (DAA), Distributed High-Concurrency Systems, and Intelligent Optimization. Actively serving as Faculty Teaching Assistant and mentor for student major projects.',
    grade: 'Regular / Full-Time (Pursuing)',
    ugcNote: 'Primary Regular Master\'s Degree under UGC Guidelines for Simultaneous Programmes.',
  },
  {
    year: '2026 — 2028',
    degree: 'Master of Business Administration (MBA)',
    institute: 'Indira Gandhi National Open University (IGNOU)',
    mode: 'Distance / ODL (Simultaneous UGC Compliant)',
    details: 'Pursuing simultaneous Master\'s in Business Administration via Open & Distance Learning (ODL) to combine technical systems engineering with executive strategic management and enterprise governance.',
    grade: 'Distance / ODL (Pursuing)',
    ugcNote: 'Dual Degree Compliance: Validated under University Grants Commission (UGC) Guidelines for Pursuing Two Academic Programmes Simultaneously (One Regular + One ODL/Distance).',
  },
  {
    year: '2021 — 2025',
    degree: 'Bachelor of Technology (B.Tech), Computer Science & Engineering',
    institute: 'Uttarakhand Technical University (UTU), Dehradun',
    mode: 'Regular / Full-Time',
    details: 'Graduated with 70% aggregate and special Honors add-on in Artificial Intelligence & Machine Learning. Built autonomous conversational AI bot "Jigs - A Voice Assistant cum Chat Bot for Social Platforms" as final B.Tech capstone major project.',
    grade: '70% Aggregate (AI/ML Add-on)',
  },
  {
    year: '2019 — 2021',
    degree: 'Senior Secondary / Intermediate (CBSE, Class XII)',
    institute: 'Kendriya Vidyalaya, AFS, Darbhanga',
    mode: 'Secondary / Schooling',
    details: 'Achieved 84.2% aggregate in PCM. Topped Computer Science with 96/100 marks. Elected School Captain (2020-21) and served as School Vice-Captain & House Captain (2019-20).',
    grade: '84.2% (96/100 CS Topper)',
  },
  {
    year: '2016 — 2018',
    degree: 'Matriculation (CBSE, Class X)',
    institute: 'Jesus & Mary Academy, Darbhanga',
    mode: 'Secondary / Schooling',
    details: 'Scored 82.5% aggregate. Awarded Top Scorer in Foundation of IT with 98/100 marks. Served as School Captain (2016-18).',
    grade: '82.5% (98/100 IT Topper)',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    duration: 'SEP 2025 — Present',
    startMonth: 'SEP',
    startYear: 2025,
    endMonth: 'Present',
    endYear: 'Present',
    company: 'JIGSY INDIA (Jigyasu Integrated Global Services Pvt. Ltd.)',
    location: 'New Delhi & Bihar, India',
    designation: 'Chairperson cum Full Stack Developer (DPIIT Recognised Startup)',
    category: 'industrial',
    shortDescription: 'Directing corporate technology strategy, digitalization initiatives, and cross-platform software engineering under JIGSY Tech.',
    fullDescription: 'Spearheading JIGSY INDIA\'s mission in global digitalization, ethical technology implementation, and employment generation. Architecting the unified corporate ecosystem, including real-time communication networks, applicant tracking pipelines, and enterprise HR automation for domestic and international clients.',
    achievements: [
      'Founded and scaled JIGSY INDIA, establishing high-standard engineering protocols and ethics-first corporate governance.',
      'Architected end-to-end proprietary enterprise suites: Recruitment Pipeline, Employee Management System, and Real-Time Personalized Messenger.',
      'Created and maintained high-speed cloud web presence generating cross-sector client inquiries and technical partnerships.',
    ],
    skills: ['Executive Leadership', 'System Architecture', 'Python', 'React', 'Cloud Infrastructure', 'Enterprise Security'],
    certificateUrl: '#pdfiles/JigsyIndia.pdf',
  },
  {
    id: 'exp-2',
    duration: 'JAN 2026 — Present',
    startMonth: 'JAN',
    startYear: 2026,
    endMonth: 'Present',
    endYear: 'Present',
    company: 'Sandip University',
    location: 'Madhubani, Bihar',
    designation: 'Faculty - Teaching Assistant & Assistant Examination Coordinator (SOCSE)',
    category: 'teaching',
    shortDescription: 'Assistant Examination Coordinator at SOCSE, FDP Coordinator, Training Placement Committee (TPC) Member, and Faculty Mentoring 380+ engineering students in DAA, DSA, and Advanced Technologies.',
    fullDescription: 'Serving multi-faceted academic and administrative leadership roles at School of Computer Science & Engineering (SOCSE). Directing examination logistics, coordinating university Faculty Development Programmes, serving on the Training Placement Committee (TPC), and lecturing undergraduate engineering cohorts across Design & Analysis of Algorithms and Advanced Tech.',
    achievements: [
      'Served as Assistant Examination Coordinator at SOCSE (School of Computer Science & Engineering), Sandip University, managing examination administration and evaluation protocols.',
      'FDP Coordinator of Faculty Development Programme on "Cyber Security & Digital Excellence: From Awareness to Resilience".',
      'Active Member of Training Placement Committee (TPC) for academic-industrial training programs, student placement readiness, and corporate interface.',
      'Coached 180+ engineering students in Design & Analysis of Algorithms (DAA) and 120+ in Data Structures & Algorithms (DSA).',
      'Instructed 80+ scholars in Advanced Technology II (modern multi-tier web architectures & cloud deployment).',
      'Served as Co-guide & Mentor for 4 B.Tech final-year student groups in their Major Capstone Projects and Industrial Training.',
    ],
    skills: ['Examination Administration', 'FDP Coordination', 'Training Placement Committee (TPC)', 'Algorithm Design (DAA)', 'DSA Pedagogy', 'Project Mentorship', 'C++', 'Python'],
    certificateUrl: '#pdfiles/SandipUniversity.pdf',
  },
  {
    id: 'exp-3',
    duration: 'DEC 2024 — MAY 2025',
    startMonth: 'DEC',
    startYear: 2024,
    endMonth: 'MAY',
    endYear: 2025,
    company: 'IRCTC (Indian Railway Catering and Tourism Corporation)',
    location: 'World Trade Centre, Nauroji Nagar, New Delhi',
    designation: 'Developer Intern Trainee',
    category: 'internship',
    shortDescription: 'Engineered backend enhancements, service integrations, and high-load performance modules for India\'s highest-traffic booking infrastructure.',
    fullDescription: 'Worked directly within the core Dev Team at IRCTC World Trade Centre headquarters. Performed internal functionality operations, API integration with third-party transport partners, and regular stability enhancements to deliver high transaction reliability.',
    achievements: [
      'Contributed to the high-profile DMRC (Delhi Metro Rail Corporation) QR-ticket integration into IRCTC portals.',
      'Executed travel insurance / Travel Protect module integration and validation across high-concurrency ticket purchase flows.',
      'Implemented data consistency monitors reducing booking drop-offs during high-load Tatkal windows.',
    ],
    skills: ['Java Enterprise', 'SQL & Oracle DB', 'API Integration', 'Stress Testing', 'Concurrency Control'],
    certificateUrl: '/pdfiles/IRCTCinternship6MonthsDec24May25.pdf',
    reportUrl: '/pdfiles/IRCTCinternshipReportSubmission.PDF',
  },
  {
    id: 'exp-4',
    duration: 'NOV 2024 — NOV 2024',
    startMonth: 'NOV',
    startYear: 2024,
    endMonth: 'NOV',
    endYear: 2024,
    company: 'Renuka Associates Pvt. Ltd.',
    location: 'Tughlakabad Extn., New Delhi',
    designation: 'Trainee - Software Developer',
    category: 'internship',
    shortDescription: 'Resolved mission-critical operational bugs for Limsys Library Management Software.',
    fullDescription: 'Received software developer offer of employment to audit, optimize, and patch edge-case issues in Limsys enterprise library software. Successfully resolved client-reported database lockups before transitioning to IRCTC flagship developer fellowship.',
    achievements: [
      'Diagnosed and eliminated recurring database deadlocks in library indexing catalog modules.',
      'Delivered tested patches that restored operational uptime for institutional library clients.',
    ],
    skills: ['C#', 'SQL Server', 'Bug Remediation', 'Client Systems'],
    certificateUrl: '/pdfiles/RenukaAssociatesOfferLetterJigyasuVatsaNov24.pdf',
  },
  {
    id: 'exp-5',
    duration: 'JUN 2024 — AUG 2024',
    startMonth: 'JUN',
    startYear: 2024,
    endMonth: 'AUG',
    endYear: 2024,
    company: 'Nabeng Techno Solutions Pvt. Ltd.',
    location: 'New Delhi, India',
    designation: 'Database Engineer Intern',
    category: 'internship',
    shortDescription: 'Coordinated database modeling, relational schema optimization, and multi-source analytics pipelines.',
    fullDescription: 'Supervised by senior technical staff on enterprise client systems. Assessed high-frequency modification impacts on relational schemas and configured continuous data integrity validations.',
    achievements: [
      'Optimized query execution plans, slashing query latency across analytical views by 34%.',
      'Engineered structured automated ETL scripts synchronizing external operational telemetry into centralized reporting stores.',
    ],
    skills: ['MySQL', 'Query Optimization', 'ETL Pipelines', 'Schema Normalization'],
    certificateUrl: '/pdfiles/CertificateNabengTechnoSolutionsPvtLtdJun24.PDF',
  },
  {
    id: 'exp-6',
    duration: 'JAN 2024 — APR 2024',
    startMonth: 'JAN',
    startYear: 2024,
    endMonth: 'APR',
    endYear: 2024,
    company: 'IRCTC (State Entry Road Headquarters)',
    location: 'State Entry Road, New Delhi',
    designation: 'Developer Intern Trainee',
    category: 'internship',
    shortDescription: 'Monitored real-time database modifications and automated sprint-driven regression suites.',
    fullDescription: 'Participated in agile sprints for booking subsystem staging and production verification. Evaluated external data ingestion utilities and ensured strict transactional isolation under heavy daily volumes.',
    achievements: [
      'Conducted database record consistency audits across multi-million passenger profile registries.',
      'Developed diagnostic scripts tracking database latency spikes during high-load periods.',
    ],
    skills: ['Database Auditing', 'Sprint Planning', 'Automation Utilities', 'System Testing'],
    certificateUrl: '/pdfiles/IrctcCertificate3MonthsJan24.PDF',
  },
  {
    id: 'exp-7',
    duration: 'JUL 2023 — AUG 2023',
    startMonth: 'JUL',
    startYear: 2023,
    endMonth: 'AUG',
    endYear: 2023,
    company: 'IRCTC (State Entry Road)',
    location: 'New Delhi, India',
    designation: 'Jr. Software Engineer Intern Trainee',
    category: 'internship',
    shortDescription: 'Maintained web application modules for ticketing, inquiries, and customer loyalty services.',
    fullDescription: 'Assisted senior software engineers in modernizing web forms, ticket verification portals, and UI responsiveness across desktop and mobile browsers.',
    achievements: [
      'Contributed to customer-facing loyalty program interface redesign and documentation.',
      'Refactored legacy form validation routines to modern client-side error handling standards.',
    ],
    skills: ['JavaScript', 'HTML5/CSS3', 'JSP', 'Web Performance'],
    certificateUrl: '/pdfiles/IrctcCertificate1MonthJul23.PDF',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-mtech',
    title: 'Smart Food Redistribution for Circular Economy & Industry 5.0',
    associatedWith: 'Sandip University (M.Tech CSE Major Project)',
    category: 'AI & Research Systems',
    description: 'M.Tech capstone project architecting priority decay heuristics, cryptographic tamper-proofing, and dynamic urban logistics for circular resource recovery.',
    techStack: ['zerowfm.jigsy.in', 'aifm.jigsy.in', 'ctfm.jigsy.in'],
    impact: 'Pioneered priority allocation published in Springer Nature (ICIPAI) and accepted in Taylor & Francis (ICTTI).',
    webLinks: [
      {
        label: 'ZeroWFM Prototype',
        url: 'https://zerowfm.jigsy.in',
        badge: 'Prototype',
        status: 'active',
        note: 'Live web-based circular economy food redistribution framework',
      },
      {
        label: 'AI-AssistedFM',
        url: 'https://aifm.jigsy.in',
        badge: 'Prototype',
        status: 'active',
        note: 'Live AI priority heuristics & predictive shelf-life engine',
      },
      {
        label: 'CyberTrustedFM',
        url: 'https://ctfm.jigsy.in',
        badge: 'Next Soon',
        status: 'upcoming',
        note: 'Cryptographically secured supply chain validation',
      },
    ],
    docUrl: 'https://zerowfm.jigsy.in',
    docLabel: 'Explore ZeroWFM Live',
    featured: true,
  },
  {
    id: 'proj-1',
    title: 'Testing & Integration for DMRC Metro on IRCTC',
    associatedWith: 'IRCTC & Delhi Metro Rail Corporation',
    category: 'Enterprise & Infrastructure',
    description: 'Engineered comprehensive validation frameworks for unified DMRC Metro QR ticketing on the IRCTC flagship e-ticketing platform, ensuring seamless multimodal transit booking.',
    techStack: ['Java Enterprise', 'REST APIs', 'Postman Automated Tests', 'Oracle Database', 'Concurrency Testing'],
    impact: 'Streamlined metro-train transit ticketing for thousands of daily interstate commuters.',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'IRCTC Travel Protect Insurance Integration',
    associatedWith: 'IRCTC',
    category: 'Enterprise & Infrastructure',
    description: 'Conducted rigorous functional, integration, and edge-case regression testing for third-party insurance carrier integration within the rapid passenger checkout flow.',
    techStack: ['Automated Testing', 'SOAP / REST APIs', 'Oracle SQL', 'Security Compliance'],
    impact: 'Protected millions of passenger itineraries with instantaneous policy validation.',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Jigs - A Voice Assistant cum Chat Bot for Social Platforms',
    associatedWith: 'Uttarakhand Technical University (UTU B.Tech Major Project)',
    category: 'AI & Bots',
    description: 'Autonomous voice-activated assistant and intelligent conversational chatbot designed for social platform interactions, smart queries, voice-intent processing, and automated dialog management.',
    techStack: ['Python', 'SpeechRecognition', 'PyAudio', 'NLP Algorithms', 'Tkinter / Web API'],
    impact: 'Recognized with departmental top honors for accessible natural language interfaces in B.Tech Computer Science.',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'IRCTC Loyalty Programme Database Analytics & Web Portal',
    associatedWith: 'IRCTC',
    category: 'Enterprise & Infrastructure',
    description: 'Designed database analysis pipelines and responsive customer-facing web interfaces detailing tier benefits, reward points accrual, and partner redemption.',
    techStack: ['Oracle SQL', 'JSP / Servlets', 'JavaScript', 'Responsive UI', 'Data Modeling'],
    impact: 'Boosted user engagement and loyalty portal transparency for frequent travelers.',
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'JIGSY INDIA Unified Digital Enterprise Ecosystem',
    associatedWith: 'JIGSY INDIA',
    category: 'Web & SaaS Platform',
    description: 'Corporate portal and multi-tenant digital backbone powering JIGSY Integrated Global Services Pvt. Ltd. featuring real-time client inquiries and cloud service dispatch.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vite', 'Cloud Hosting'],
    impact: 'Serves as the primary digital gateway for enterprise clients and employment aspirants.',
    featured: true,
  },
  {
    id: 'proj-6',
    title: 'Advanced Recruitment Pipeline & Candidate Scoring',
    associatedWith: 'JIGSY TECH',
    category: 'Web & SaaS Platform',
    description: 'Interactive applicant tracking and resume assessment system featuring stage-by-stage evaluation pipelines, interview scheduling, and automated candidate communications.',
    techStack: ['Python', 'Django', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
    impact: 'Decreased candidate screening turnaround time by 60% for internal technical hiring.',
  },
  {
    id: 'proj-7',
    title: 'Real-Time Personalized Messenger & Support Cell',
    associatedWith: 'JIGSY TECH',
    category: 'Web & SaaS Platform',
    description: 'End-to-end encrypted collaborative chat workstation connecting enterprise support specialists, operational leads, and corporate clients in persistent channels.',
    techStack: ['WebSockets', 'React', 'Node.js', 'State Synchronization', 'Role-Based Access'],
    impact: 'Accelerated client resolution response times to under 3 minutes.',
  },
  {
    id: 'proj-8',
    title: 'Systematic Database Support & Norms Standardization',
    associatedWith: 'NABENG TECHNO SOLUTIONS PVT. LTD',
    category: 'Enterprise & Infrastructure',
    description: 'In-depth study and implementation of standardized database norms, automated index maintenance, and replication checkpoints across enterprise client architectures.',
    techStack: ['MySQL', 'Data Normalization', 'Replication Utilities', 'Bash Scripts'],
    impact: 'Established standardized query guidelines adopted company-wide.',
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    name: 'Python',
    category: 'Languages',
    level: 95,
    highlight: 'Advanced scripting, AI algorithms, priority heuristics & circular systems',
    iconType: 'python',
    snippet: {
      language: 'python',
      code: `# Jigyasu Vatsa - Priority-Based Circular Redistribution Algorithm
def hello_jigyasu():
    author = "Jigyasu Vatsa (Chairperson @ JIGSY INDIA)"
    harvest_batch = "Fresh Produce Lot #A2026"
    hours_left = 18.5
    decay_rate = 0.22  # Priority heuristic from Springer Nature ICIPAI Paper
    
    priority_score = (100 / (hours_left + 1)) * (1 + decay_rate)
    return {
        "developer": author,
        "batch": harvest_batch,
        "urgency_index": round(priority_score, 2),
        "status": "DISPATCH QUEUED: Civil Welfare Beneficiary Unit #3"
    }

print("Executing hello_jigyasu()...")
res = hello_jigyasu()
for k, v in res.items():
    print(f"  [{k.upper()}]: {v}")
print("Algorithm execution verified successfully!")`,
      output: `Executing hello_jigyasu()...
  [DEVELOPER]: Jigyasu Vatsa (Chairperson @ JIGSY INDIA)
  [BATCH]: Fresh Produce Lot #A2026
  [URGENCY_INDEX]: 6.26
  [STATUS]: DISPATCH QUEUED: Civil Welfare Beneficiary Unit #3
Algorithm execution verified successfully!`,
    },
  },
  {
    name: 'C# & .NET',
    category: 'Languages',
    level: 85,
    highlight: 'Enterprise software, Limsys concurrency deadlock remediation, ASP.NET',
    iconType: 'csharp',
    snippet: {
      language: 'csharp',
      code: `// Jigyasu Vatsa - Limsys Transactional Deadlock Remediation
using System;

public class DeadlockMonitor {
    public static void Main() {
        Console.WriteLine("[JIGSY Systems] Checking Library Indexing Concurrency Locks...");
        int activeDeadlocks = 0;
        bool isStable = RemediateLockContention(ref activeDeadlocks);
        Console.WriteLine($"Lock Count: {activeDeadlocks} | Concurrency State: STABLE | Status: {isStable}");
    }
    
    private static bool RemediateLockContention(ref int locks) {
        locks = 0; // Lock release pattern implemented
        return true;
    }
}`,
      output: `[JIGSY Systems] Checking Library Indexing Concurrency Locks...
Lock Count: 0 | Concurrency State: STABLE | Status: True`,
    },
  },
  {
    name: 'MySQL & Oracle SQL',
    category: 'Databases & Tools',
    level: 94,
    highlight: 'High-concurrency query optimization, Tatkal transaction isolation, sharding',
    iconType: 'sql',
    snippet: {
      language: 'sql',
      code: `-- IRCTC High-Concurrency Tatkal Booking Isolation
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SELECT seat_id, train_no, quota_category, reservation_status 
FROM train_reservations 
WHERE train_no = '12309' 
  AND travel_date = '2026-06-15'
  AND quota_category = 'TATKAL'
FOR UPDATE NOWAIT;

-- Zero Phantom Read guarantee implemented
COMMIT;
-- Transaction successfully executed without concurrency conflict.`,
      output: `Rows matched: 120 seats
Execution Time: 4.2ms
Isolation: SERIALIZABLE (Zero Phantom Reads)
Commit Status: SUCCESS`,
    },
  },
  {
    name: 'JavaScript & TypeScript',
    category: 'Languages',
    level: 90,
    highlight: 'Modern React SPAs, async DOM, Node.js, WebSockets, real-time messaging',
    iconType: 'javascript',
    snippet: {
      language: 'typescript',
      code: `// JIGSY INDIA - Real-Time Messenger Packet Router
interface Packet {
  from: string;
  channel: string;
  cipher: string;
}

const dispatchMessage = (pkt: Packet): string => {
  return \`[JIGSY-NET] Routed from \${pkt.from} -> #\${pkt.channel} [AES-256 ENCRYPTED]\`;
};

console.log(dispatchMessage({
  from: "Jigyasu Vatsa",
  channel: "executive-dispatch",
  cipher: "7f4c81..."
}));`,
      output: `[JIGSY-NET] Routed from Jigyasu Vatsa -> #executive-dispatch [AES-256 ENCRYPTED]
Latency: 1.8ms | WebSockets Synchronized`,
    },
  },
  {
    name: 'Java & Enterprise Backends',
    category: 'Languages',
    level: 86,
    highlight: 'IRCTC railway backends, DMRC QR ticketing integration, JSP, Spring MVC',
    iconType: 'java',
    snippet: {
      language: 'java',
      code: `// IRCTC & DMRC Multimodal Metro QR Ticket Validator
public class DmrcTicketValidation {
    public static void main(String[] args) {
        String token = "IRCTC-DMRC-QR-PASS-2026-TOKEN-OK";
        System.out.println("Processing Multimodal Transit Ticket: " + token);
        boolean isValid = validatePass(token);
        System.out.println("Turnstile Status: Gate #04 OPENED [VALIDATED: " + isValid + "]");
    }
    
    private static boolean validatePass(String token) {
        return token.startsWith("IRCTC-DMRC");
    }
}`,
      output: `Processing Multimodal Transit Ticket: IRCTC-DMRC-QR-PASS-2026-TOKEN-OK
Turnstile Status: Gate #04 OPENED [VALIDATED: true]`,
    },
  },
  {
    name: 'React & Modern Frontend',
    category: 'Frameworks & Web',
    level: 92,
    highlight: 'Component architecture, Tailwind CSS, Motion, Interactive Dashboards',
    iconType: 'react',
  },
  {
    name: 'Django & Flask',
    category: 'Frameworks & Web',
    level: 88,
    highlight: 'REST APIs, ORM architecture, microservices, auth security',
    iconType: 'django',
  },
  {
    name: 'Algorithm Design (DAA)',
    category: 'AI & Data',
    level: 94,
    highlight: 'Author of "Mastering DSA Without Fear", graph heuristics, dynamic programming',
    iconType: 'algorithms',
  },
  {
    name: 'Artificial Intelligence & ML',
    category: 'AI & Data',
    level: 89,
    highlight: 'Priority heuristics, NLP voice bots, predictive models, circular optimization',
    iconType: 'ai',
  },
  {
    name: 'Database Management (DBMS)',
    category: 'Databases & Tools',
    level: 93,
    highlight: 'Normalization, ACID compliance, query tuning, indexing architectures',
    iconType: 'dbms',
  },
  {
    name: 'Git & Linux DevOps',
    category: 'Databases & Tools',
    level: 87,
    highlight: 'CI/CD, version control, shell automation, production release pipelines',
    iconType: 'git',
  },
  {
    name: 'System Testing & QA',
    category: 'Frameworks & Web',
    level: 89,
    highlight: 'Integration testing, Postman, regression pipelines, concurrency stress tests',
    iconType: 'testing',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  { title: 'Python Programming Masterclass', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-1222b860-3b5c-41da-a7b4-f3be8dea565c/', category: 'Certification' },
  { title: 'Oracle SQL Certification', issuer: 'Great Learning', url: 'https://www.mygreatlearning.com/certificate/HCAIRVQI', category: 'Certification' },
  { title: 'NoSQL Database Systems', issuer: 'Great Learning', url: 'https://www.mygreatlearning.com/certificate/WPHQKVBV', category: 'Certification' },
  { title: 'Java Programming', issuer: 'Great Learning', url: 'https://www.mygreatlearning.com/certificate/IISDFSEP', category: 'Certification' },
  { title: 'Dot NET Fundamentals', issuer: 'Great Learning', url: 'https://www.mygreatlearning.com/certificate/SSNBRASK', category: 'Certification' },
  { title: 'Machine Learning Advanced Track', issuer: 'Simplilearn', url: 'https://simpli.app.link/CCEjvcVyBOb/', category: 'Certification' },
  { title: 'Complete Django Web Development Course', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-c80179e5-32de-40d7-8082-a92a54b50620/', category: 'Certification' },
  { title: 'JavaScript Mastery from Basics to Advanced', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-fbc5a724-4ca2-4160-9e2d-69a70f2c6cfb/', category: 'Certification' },
  { title: 'CSS & Bootstrap Mastery', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-76d8e2c7-62ab-41a4-b4e5-c9fbf3b72bba/', category: 'Certification' },
  { title: 'HTML5 Web Certification', issuer: 'Lumos Learning', url: 'https://www.lumoslearning.com/llwp/student-certificate-view.html?certificateid=be0bae20c12c8de913f39e60a56810b1', category: 'Certification' },
  { title: 'Basics of IoT & Connected Devices', issuer: 'CISCO Networking Academy', category: 'Training' },
  { title: 'Data Science & Analytics', issuer: 'HP (Hewlett Packard)', category: 'Training' },
  { title: 'Cybersecurity Essentials', issuer: 'CISCO Networking Academy', category: 'Training' },
  { title: 'Introduction to Cybersecurity Awareness', issuer: 'HP (Hewlett Packard)', category: 'Training' },
];

export const ACHIEVEMENTS = [
  {
    title: 'Founder & Chairperson of JIGSY INDIA (DPIIT Recognised Startup)',
    year: '2025 — Present',
    organization: 'Jigyasu Integrated Global Services Pvt. Ltd. (CIN: U62099BR2025PTC078592)',
    description: 'Incorporated and scaling DPIIT-recognised technology and digitalization enterprise (DPIIT: DIPP228528, MSME: UDYAM-BR-34-0051280) pioneering ethical automation, cloud services, and domestic tech employment.',
    highlight: 'Enterprise Leadership & Entrepreneur',
  },
  {
    title: 'Assistant Examination Coordinator (SOCSE) & FDP Coordinator',
    year: '2026 — Present',
    organization: 'School of Computer Science & Engineering (SOCSE), Sandip University',
    description: 'Administering university examination protocols, acting as Coordinator for Faculty Development Programme on "Cyber Security & Digital Excellence", and serving on the Training Placement Committee (TPC).',
    highlight: 'Academic & Institutional Leadership',
  },
  {
    title: 'UGC-NET Qualified in Computer Science (Ph.D. Admission)',
    year: 'June 2026',
    organization: 'National Testing Agency (NTA), University Grants Commission',
    description: 'Secured 80.4387 percentile in National Level UGC-NET examination (Roll: BR071500137), qualifying for Doctoral Research (Ph.D. Admission) in Computer Science & Applications across India.',
    highlight: 'National Academic Honor',
  },
  {
    title: 'Author of "Mastering DSA Without Fear"',
    year: 'June 2026',
    organization: 'Published on Amazon.com (ISBN: 979-8181718425 / ASIN: B0H5QK7MF2)',
    description: 'Authored and published 109-page comprehensive algorithm and data structures textbook on Amazon for university scholars, educators, and software engineers worldwide.',
    highlight: 'Published Author',
  },
  {
    title: 'Bihar STET 2025 Qualified (Paper-2 Computer Science)',
    year: '2025',
    organization: 'Bihar School Examination Board (BSEB)',
    description: 'Cleared Paper-2 Senior Secondary Teacher Eligibility Test in Computer Science (Roll: 2551007648) with 82.30/150 marks, validating senior faculty qualifications.',
    highlight: 'State Eligibility Distinction',
  },
  {
    title: 'Won 1st Prize in SCIENCE FAIR organized by NDMC DELHI (2019)',
    year: '2019',
    organization: 'New Delhi Municipal Council (NDMC), Govt. of NCT of Delhi',
    description: 'Won 1st Prize in Science Fair organized by NDMC Delhi (2019) for applied science research on "24 x 7 soilless farming", demonstrating automated nutrient delivery and sustainable hydroponics.',
    highlight: '1st Prize / Champion (2019)',
  },
  {
    title: 'School Captain & Vice-Captain (2019 — 2021)',
    year: '2019 — 2021',
    organization: 'Kendriya Vidyalaya, AFS Darbhanga (KVS DBG)',
    description: 'Elected School Captain (2020-21) after serving as School Vice-Captain and House Captain (2019-20); presided over the student senate, academic governance, and led ceremonial national contingents.',
    highlight: 'School Captain & Vice-Captain (KVS DBG)',
  },
  {
    title: 'School Captain (2016 — 2018)',
    year: '2016 — 2018',
    organization: 'Jesus & Mary Academy, Darbhanga (JMA DBG)',
    description: 'Elected School Captain at Jesus & Mary Academy Darbhanga, organizing student councils, inter-school olympiads, and school sports & literary festivals.',
    highlight: 'School Captain (JMA DBG)',
  },
];
