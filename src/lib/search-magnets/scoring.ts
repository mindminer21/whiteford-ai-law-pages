import type { SearchMagnetConfig } from "./configs";

export type SearchMagnetDimensionScore = {
  key: string;
  label: string;
  raw: number;
  max: number;
  pct: number;
};

export type SearchMagnetScore = {
  dimensions: SearchMagnetDimensionScore[];
  totalRaw: number;
  totalMax: number;
  pct: number;
  tier: SearchMagnetConfig["result"]["tiers"][number];
  actions: string[];
};

export function scoreSearchMagnet(
  config: SearchMagnetConfig,
  answers: Record<number, number | undefined>,
): SearchMagnetScore {
  const dimScores = Object.fromEntries(
    config.dimensions.map((dimension) => [
      dimension.key,
      { key: dimension.key, label: dimension.label, raw: 0, max: 0, pct: 0 },
    ]),
  ) as Record<string, SearchMagnetDimensionScore>;

  config.questions.forEach((question, index) => {
    const maxWeight = Math.max(...question.options.map((option) => option.weight));
    const selectedIndex = answers[index];
    const selectedWeight =
      selectedIndex === undefined ? 0 : question.options[selectedIndex]?.weight ?? 0;
    dimScores[question.dim].max += maxWeight;
    dimScores[question.dim].raw += selectedWeight;
  });

  const dimensions = Object.values(dimScores).map((dimension) => ({
    ...dimension,
    pct: dimension.max ? dimension.raw / dimension.max : 0,
  }));
  const totalRaw = dimensions.reduce((sum, dimension) => sum + dimension.raw, 0);
  const totalMax = dimensions.reduce((sum, dimension) => sum + dimension.max, 0);
  const pct = totalMax ? totalRaw / totalMax : 0;
  const tier =
    config.result.tiers.find((tierOption) => pct <= tierOption.maxPct) ??
    config.result.tiers[config.result.tiers.length - 1];
  const actions: string[] = [];

  for (const dimension of [...dimensions].sort((left, right) => right.pct - left.pct)) {
    for (const action of config.result.dimActions[dimension.key] ?? []) {
      if (actions.length < 3) actions.push(action);
    }
    if (actions.length >= 3) break;
  }

  return { dimensions, totalRaw, totalMax, pct, tier, actions };
}

export function dimensionBarTone(pct: number) {
  if (pct <= 0.34) return "good";
  if (pct <= 0.66) return "warn";
  return "risk";
}
