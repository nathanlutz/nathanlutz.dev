'use client';

import { useState } from 'react';

export function AttentionVisualizer() {
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const sentence = ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "too", "tired"];

  const attentionWeights: Record<number, number[]> = {
    7: [0.1, 0.7, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.05, 0.05, 0.05], // "it" attends to "animal"
  };

  return (
    <div className="my-6 p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
        Click on "it" to see attention weights:
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {sentence.map((word, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedWord(idx === 7 ? idx : null)}
            className={`px-3 py-2 rounded-lg transition-all ${
              idx === 7
                ? 'cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 border-2 border-blue-300 dark:border-blue-700'
                : 'cursor-default border border-transparent'
            } ${
              selectedWord === 7 && attentionWeights[7][idx] > 0.3
                ? 'bg-blue-500 text-white font-semibold'
                : selectedWord === 7 && attentionWeights[7][idx] > 0.05
                ? 'bg-blue-200 dark:bg-blue-800'
                : 'bg-white dark:bg-zinc-800'
            }`}
          >
            {word}
          </button>
        ))}
      </div>
      {selectedWord === 7 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">
          The word "it" attends most strongly to "animal" (shown in dark blue)
        </p>
      )}
    </div>
  );
}
