import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Contact</h1>

      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Always happy to connect and chat. Feel free to reach out!
      </p>

      <div className="space-y-4">
        <a
          href="https://github.com/nathanlutz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <Github className="w-6 h-6" />
          <span className="text-zinc-500">github.com/nathanlutz</span>
        </a>

        <a
          href="https://www.linkedin.com/in/nathanlutz1/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <Linkedin className="w-6 h-6" />
          <span className="text-zinc-500">linkedin.com/in/nathanlutz1</span>
        </a>

        <a
          href="https://x.com/NathanLutz20520"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-zinc-500">x.com/NathanLutz20520</span>
        </a>

        <a
          href="mailto:me@nathanlutz.dev"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <Mail className="w-6 h-6" />
          <span className="text-zinc-500">me@nathanlutz.dev</span>
        </a>
      </div>
    </div>
  );
}
