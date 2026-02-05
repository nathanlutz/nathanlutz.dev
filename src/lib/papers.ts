import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Paper, PaperMetadata } from '@/types/research';

const papersDirectory = path.join(process.cwd(), 'content', 'research');

export function getAllPapers(): Paper[] {
  if (!fs.existsSync(papersDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(papersDirectory);
  const allPapers = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      return getPaperBySlug(slug);
    })
    .filter((paper): paper is Paper => paper !== null);

  // Sort by post date (newest first)
  return allPapers.sort((a, b) => {
    return new Date(b.metadata.postDate).getTime() - new Date(a.metadata.postDate).getTime();
  });
}

export function getPaperBySlug(slug: string): Paper | null {
  try {
    const fullPath = path.join(papersDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      metadata: data as PaperMetadata,
      content,
      filePath: fullPath,
    };
  } catch (error) {
    console.error(`Error loading paper ${slug}:`, error);
    return null;
  }
}

export function getAllPaperSlugs(): string[] {
  if (!fs.existsSync(papersDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(papersDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
