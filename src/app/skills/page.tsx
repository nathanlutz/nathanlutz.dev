const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "C#", "SQL"],
  },
  {
    title: "AI/ML",
    skills: ["Machine Learning", "Deep Learning", "NLP", "LLMs", "Computer Vision"],
  },
  {
    title: "Frameworks",
    skills: ["React", "Next.js", "Node.js", ".NET", "PyTorch"],
  },
  {
    title: "Cloud & Tools",
    skills: ["Azure", "Docker", "Kubernetes", "Git", "CI/CD"],
  },
];

export default function Skills() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Skills</h1>

      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Here&apos;s an overview of the technologies and tools I work with regularly.
        I&apos;m always exploring new technologies, especially in the AI/ML space.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-blue-500 mb-4 uppercase tracking-wide">
              {category.title}
            </h2>
            <ul className="space-y-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="text-zinc-600 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2 last:border-0"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
