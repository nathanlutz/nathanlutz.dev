export default function Home() {
    return (
        <div className='space-y-8'>
            <section className='space-y-6 text-zinc-600 dark:text-zinc-400'>
                <h2 className='text-2xl font-semibold text-zinc-900 dark:text-zinc-100'>About Me</h2>

                <p className='text-lg leading-relaxed'>
                    I&apos;m a software engineer with a strong interest in generative AI, search, and evaluation
                    systems. I&apos;m especially drawn to how LLMs interact with retrieval, how relevance is measured,
                    and how to design feedback loops that improve model quality over time.
                </p>

                <p className='text-lg leading-relaxed'>
                    I enjoy building the tooling, pipelines, and experimentation frameworks that help teams understand
                    whether AI systems are actually getting better—or just getting different.
                </p>

                <div className='text-lg leading-relaxed'>
                    <p className='mb-2'>On the day-to-day, my work touches areas like:</p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>GenAI + Copilot experiences</li>
                        <li>Search and retrieval models</li>
                        <li>Evaluation frameworks and metrics</li>
                        <li>Model experimentation, A/B testing, and quality analysis</li>
                    </ul>
                </div>

                <p className='text-lg leading-relaxed'>
                    Overall, I&apos;m motivated by the engineering and research challenges that make AI systems
                    reliable, interpretable, and grounded in real-world usage.
                </p>
            </section>
        </div>
    )
}
