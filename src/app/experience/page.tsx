export default function Experience() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Experience</h1>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Software Engineer</h2>
          <p className="text-blue-500">Microsoft</p>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Working on AI-powered products and solutions, contributing to the
          development of intelligent features that enhance user experiences
          across Microsoft&apos;s ecosystem.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm">AI/ML</span>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm">Cloud Computing</span>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm">Full Stack</span>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What I Do</h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          I collaborate with cross-functional teams to design, develop, and deploy
          AI-driven solutions. My work involves building scalable systems, integrating
          machine learning models into production environments, and ensuring our
          products meet high standards of quality and performance.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          I&apos;m particularly interested in the practical applications of large language
          models, computer vision, and other AI technologies that can transform how
          people interact with software.
        </p>
      </section>
    </div>
  );
}
