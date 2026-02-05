export type FeatureFlags = {
  researchNotes: boolean;
  // Add more features here as needed
};

export const features: FeatureFlags = {
  researchNotes: process.env.NEXT_PUBLIC_FEATURE_RESEARCH_NOTES === 'true',
};

export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  return features[feature] ?? false;
}
