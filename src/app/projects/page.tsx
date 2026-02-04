const projects = [
  {
    title: "AI-Powered Code Assistant",
    description:
      "Contributed to developing intelligent coding assistance features that help developers write better code faster using large language models.",
    tags: ["LLMs", "TypeScript", "Azure"],
  },
  {
    title: "ML Pipeline Automation",
    description:
      "Built scalable machine learning pipelines for training, evaluating, and deploying models in production environments.",
    tags: ["Python", "MLOps", "Kubernetes"],
  },
  {
    title: "Personal Website",
    description:
      "This website! Built with Next.js and Tailwind CSS to showcase my work and interests in software engineering and AI.",
    tags: ["Next.js", "React", "TypeScript"],
  },
];

export default function Projects() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Projects</h1>

      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        A selection of projects I&apos;ve worked on. Some are from my work at Microsoft,
        while others are personal explorations in AI and software development.
      </p>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4 hover:border-blue-500/50 transition-colors"
          >
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
