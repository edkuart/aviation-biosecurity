import type { Bilingual } from './content';

export type ReliabilityLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type SourceRegion = 'International' | 'Europe' | 'United States' | 'Azerbaijan' | 'Other';
export type SourceType =
  | 'Regulation'
  | 'Guidance'
  | 'Paper'
  | 'Patent'
  | 'Report'
  | 'Advisory Circular';

export const RELIABILITY_LABELS: Record<ReliabilityLevel, string> = {
  1: 'Primary Regulation',
  2: 'Official Technical Guidance',
  3: 'Peer-reviewed Research',
  4: 'Industry Technical Document',
  5: 'Patent',
  6: 'Educational / Reference',
};

export interface Source {
  id: string;
  title: Bilingual;
  organization: string;
  year: number;
  region: SourceRegion;
  categories: string[];
  url: string;
  reliability: ReliabilityLevel;
  type: SourceType;
  summary: Bilingual;
  notes?: string;
}
