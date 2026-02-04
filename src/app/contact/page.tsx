export default function Contact() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Contact</h1>

      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        I&apos;m always interested in connecting with others who share a passion for
        AI, machine learning, and software engineering. Feel free to reach out!
      </p>

      <div className="space-y-4">
        <a
          href="https://github.com/nathanlutz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <span className="text-2xl">GitHub</span>
          <span className="text-zinc-500">github.com/nathanlutz</span>
        </a>

        <a
          href="https://www.linkedin.com/in/nathanlutz1/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <span className="text-2xl">LinkedIn</span>
          <span className="text-zinc-500">linkedin.com/in/nathanlutz1</span>
        </a>

        <a
          href="mailto:hello@nathanlutz.dev"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <span className="text-2xl">Email</span>
          <span className="text-zinc-500">hello@nathanlutz.dev</span>
        </a>
      </div>
    </div>
  );
}
