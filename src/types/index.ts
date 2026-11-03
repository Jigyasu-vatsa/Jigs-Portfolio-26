export type ResearchTag =
  | 'All'
  | 'Conference Paper'
  | 'Journal'
  | 'Book Chapter'
  | 'Book Chapter WOS Index'
  | 'Conference Paper Scopus Index'
  | 'Peer Review'
  | 'UGC-CARE Approved'
  | 'Accepted for Indexing'
  | 'Published Book'
  | 'ISBN Proceeding';

export type IndexingStatus =
  | 'Indexed'
  | 'Published (Accepted for WoS Indexing)'
  | 'Accepted for Scopus Indexing (In Press)'
  | 'Peer-Reviewed & Indexed'
  | 'Published Book (ISBN)'
  | 'Published Abstract (ISBN Proceeding)'
  | 'Published (ISBN Proceeding)';

export interface ResearchPaper {
  id: string;
  title: string;
  publication: string;
  year: number;
  date: string;
  type: 'Book Chapter' | 'Conference Paper' | 'Journal Article' | 'Authored Book' | 'Conference Proceeding';
  role: string;
  doi?: string;
  doiUrl?: string;
  driveUrl?: string;
  isbn?: string[];
  issn?: string[];
  contributors: string[];
  source: string;
  tags: ResearchTag[];
  indexing: ('Scopus' | 'Web of Science' | 'Peer Reviewed' | 'UGC-CARE' | 'ISBN Registered')[];
  indexingStatus: IndexingStatus;
  abstract: string;
  keywords: string[];
  citationsCount: number;
  paperUrl?: string;
  certificateUrl?: string;
  bibtex: string;
}

export interface FdpWorkshopItem {
  id: string;
  title: string;
  organizer: string;
  collaboration?: string;
  sponsorOrPartner?: string;
  type: 'Faculty Development Programme (FDP)' | 'Workshop' | 'Conference Abstract Proceeding';
  dates: string;
  year: number;
  duration?: string;
  role: string;
  certificateId?: string;
  isbn?: string;
  verificationLink?: string;
  venue: string;
  description: string;
  skills: string[];
  certificateUrl?: string;
}

export interface NationalQualification {
  id: string;
  examName: string;
  conductingBody: string;
  subject: string;
  year: string;
  rollNumber: string;
  applicationNumber?: string;
  scoreOrMarks: string;
  resultStatus: string;
  certificateUrl?: string;
  badge: string;
  description: string;
}

export interface AuthoredBook {
  title: string;
  subtitle: string;
  asin: string;
  isbn13: string;
  publisher: string;
  publicationDate: string;
  pages: number;
  language: string;
  amazonUrl: string;
  coverImage?: string;
  backCoverImage?: string;
  description: string;
}

export interface ConferenceItem {
  id: string;
  title: string;
  conferenceName: string;
  acronym: string;
  dates: string;
  year: number;
  location: string;
  mode: 'In-Person' | 'Virtual' | 'Hybrid';
  role: string;
  paperTitle?: string;
  organizer: string;
  indexing?: string;
  description: string;
  topics: string[];
  certificateUrl?: string;
  driveUrl?: string;
}

export type ExperienceCategory = 'industrial' | 'internship' | 'teaching';

export interface ExperienceItem {
  id: string;
  duration: string;
  startMonth: string;
  startYear: number;
  endMonth: string;
  endYear: number | 'Present';
  company: string;
  location: string;
  designation: string;
  category: ExperienceCategory;
  shortDescription: string;
  fullDescription: string;
  achievements: string[];
  skills: string[];
  certificateUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  associatedWith: string;
  category: 'AI & Research Systems' | 'Enterprise & Infrastructure' | 'AI & Bots' | 'Web & SaaS Platform';
  description: string;
  techStack: string[];
  impact: string;
  reportUrl?: string;
  featured?: boolean;
}

export interface SkillCodeSnippet {
  language: string;
  code: string;
  output: string;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'Frameworks & Web' | 'AI & Data' | 'Databases & Tools';
  level: number; // 0-100
  highlight: string;
  iconType: string;
  snippet?: SkillCodeSnippet;
}

export interface EducationItem {
  year: string;
  degree: string;
  institute: string;
  mode: 'Regular / Full-Time' | 'Distance / ODL (Simultaneous UGC Compliant)' | 'Secondary / Schooling';
  details: string;
  grade?: string;
  ugcNote?: string;
  downloads?: { label: string; url: string }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  url?: string;
  category: 'Certification' | 'Training';
}

export interface FeedbackSubmission {
  id: string;
  name: string;
  email: string;
  designation: string;
  suggestion: string;
  timestamp: string;
}

export type PageView =
  | 'all'
  | 'research'
  | 'fdp'
  | 'conferences'
  | 'academics'
  | 'projects'
  | 'interactive'
  | 'jigsy-india'
  | 'admin-vault';
