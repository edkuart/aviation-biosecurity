export type Lang = 'az' | 'en';

export interface Bilingual {
  az: string;
  en: string;
}

export type StatusType =
  | 'confirmed'
  | 'regulation-dependent'
  | 'guidance-only'
  | 'needs-verification';

export interface StatusedClaim {
  status: StatusType;
  claim: Bilingual;
  sourceIds?: string[];
}

export interface SafeImage {
  src: string;
  altAz: string;
  altEn: string;
  captionAz: string;
  captionEn: string;
  sourceUrl: string;
  license: string;
  sourceOrg: string;
}

export interface KeyTerm {
  termAz: string;
  termEn: string;
  definitionAz: string;
  definitionEn: string;
}

export interface StudyQuestion {
  questionAz: string;
  questionEn: string;
  answerAz: string;
  answerEn: string;
}

export interface ExpandableSection {
  titleAz: string;
  titleEn: string;
  bodyAz: string;
  bodyEn: string;
  defaultOpen?: boolean;
}

export interface SectionContent {
  id: string;
  slug: string;
  navLabel: string;
  title: Bilingual;
  summary: Bilingual;
  tags: string[];
  heroImage?: SafeImage;
  expandableSections: ExpandableSection[];
  keyTerms: KeyTerm[];
  studyQuestions: StudyQuestion[];
  sourceIds: string[];
  statusedClaims: StatusedClaim[];
}

export interface SectionMeta {
  id: string;
  slug: string;
  navLabel: string;
  title: Bilingual;
  summary: Bilingual;
  cardImage?: SafeImage;
  tags: string[];
  color: string;
  icon: string;
}

export interface GlossaryEntry {
  id: string;
  termAz: string;
  termEn: string;
  definitionAz: string;
  definitionEn: string;
  relatedSections: string[];
  relatedSources: string[];
}

export interface QAEntry {
  id: string;
  tagsAz: string[];
  tagsEn: string[];
  questionAz: string;
  questionEn: string;
  answerAz: string;
  answerEn: string;
  sourceIds: string[];
}
