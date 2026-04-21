import { getAllPapers } from '@/lib/papers';
import { isFeatureEnabled } from '@/lib/features';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FileText, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Notes | Nathan Lutz',
  description: 'Breakdowns and notes on AI/ML research papers',
};

export default function ResearchPage() {
  if (!isFeatureEnabled('researchNotes')) {
    notFound();
  }

  const papers = getAllPapers();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1>Research Notes</h1>
        <p>
          Papers I found interesting and my notes trying to make sense of them.
        </p>
      </div>

      {papers.length === 0 ? (
        <p className="text-zinc-500">No research notes yet. Check back soon!</p>
      ) : (
        <div className="space-y-6">
          {papers.map((paper) => (
            <article
              key={paper.metadata.slug}
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/research/${paper.metadata.slug}`}>
                    <h2 className="text-xl hover:text-blue-500 transition-colors">
                      {paper.metadata.title}
                    </h2>
                  </Link>
                  <FileText className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                </div>

                <div className="meta space-y-1">
                  <p>{paper.metadata.authors}</p>
                  <p>
                    Published: {new Date(paper.metadata.publicationDate).toLocaleDateString()}
                    {' • '}
                    Notes: {new Date(paper.metadata.postDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {paper.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {paper.metadata.paperUrl && (
                  <a
                    href={paper.metadata.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 meta text-blue-500 hover:underline"
                  >
                    View original paper
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
