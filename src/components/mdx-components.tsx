import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-5">
        {children}
      </p>
    ),
    em: ({ children }) => (
      <em className="italic text-zinc-700 dark:text-zinc-300">
        {children}
      </em>
    ),
    ul: ({ children }) => (
      <ul className="space-y-2 mb-6 ml-6">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-3 mb-6 ml-6">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
    code: ({ children }) => (
      <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
