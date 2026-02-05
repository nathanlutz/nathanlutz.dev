'use client';

import AttentionIsAllYouNeed from '../../content/research/attention-is-all-you-need.mdx';

interface MDXContentProps {
  slug: string;
}

const mdxComponents: Record<string, React.ComponentType> = {
  'attention-is-all-you-need': AttentionIsAllYouNeed,
};

export function MDXContent({ slug }: MDXContentProps) {
  const Component = mdxComponents[slug];

  if (!Component) {
    return <div>Content not found</div>;
  }

  return <Component />;
}
