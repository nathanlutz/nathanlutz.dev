import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1>Contact</h1>
        <p>
          Always happy to connect and chat. Feel free to reach out!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="https://github.com/nathanlutz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <Github className="w-6 h-6" />
          <span className="meta">github.com/nathanlutz</span>
        </a>

        <a
          href="https://www.linkedin.com/in/nathanlutz1/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <Linkedin className="w-6 h-6" />
          <span className="meta">linkedin.com/in/nathanlutz1</span>
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
          <span className="meta">x.com/NathanLutz20520</span>
        </a>

        <a
          href="mailto:me@nathanlutz.dev"
          className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors"
        >
          <Mail className="w-6 h-6" />
          <span className="meta">me@nathanlutz.dev</span>
        </a>
      </div>
    </div>
  );
}
