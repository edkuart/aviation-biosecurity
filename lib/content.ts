import type { SectionContent, SectionMeta, GlossaryEntry, QAEntry } from '@/types/content';
import type { Source } from '@/types/sources';

import sources from '@/content/sources.json';
import glossary from '@/content/glossary.json';
import riskMatrix from '@/content/risk-matrix.json';
import qaBank from '@/content/qa-bank.json';
import homepageSections from '@/content/sections/homepage.json';

export function getSources(): Source[] {
  return sources as Source[];
}

export function getSourceById(id: string): Source | undefined {
  return (sources as Source[]).find((s) => s.id === id);
}

export function getSourcesByIds(ids: string[]): Source[] {
  return ids.map((id) => getSourceById(id)).filter(Boolean) as Source[];
}

export function getGlossary(): GlossaryEntry[] {
  return glossary as GlossaryEntry[];
}

export function getQABank(): QAEntry[] {
  return qaBank as QAEntry[];
}

export function getRiskMatrix() {
  return riskMatrix;
}

export function getHomepageSections(): SectionMeta[] {
  return homepageSections as SectionMeta[];
}

export async function getSectionContent(slug: string): Promise<SectionContent | null> {
  try {
    const data = await import(`@/content/sections/${slug}.json`);
    return data.default as SectionContent;
  } catch {
    return null;
  }
}
