import { getPaperBySlug } from '@/lib/papers';
import { isFeatureEnabled } from '@/lib/features';
import { notFound } from 'next/navigation';
import { ExternalLink, Calendar, User } from 'lucide-react';
import { MDXContent } from '@/components/MDXContent';

export default async function PaperPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  if (!isFeatureEnabled('researchNotes')) {
    notFound();
  }

  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="space-y-4 pb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {paper.metadata.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{paper.metadata.authors}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Published: {new Date(paper.metadata.publicationDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Notes: {new Date(paper.metadata.postDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {paper.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
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
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-blue-500/50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Read original paper
          </a>
        )}
      </header>

      <div className="relative flex items-center justify-center my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-300 dark:border-zinc-700"></div>
        </div>
        <div className="relative bg-background px-4 text-sm text-zinc-500 dark:text-zinc-500">
          My Notes • {new Date(paper.metadata.postDate).toLocaleDateString()}
        </div>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-zinc-400">
        <MDXContent slug={slug} />
      </div>
    </article>
  );
}
