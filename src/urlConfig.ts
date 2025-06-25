export interface UrlConfig {
  seed: number | null;
  depth: number;
}

export function getUrlConfig(): UrlConfig {
  const urlParams = new URLSearchParams(window.location.search);

  const seedParam = urlParams.get("seed");
  let seed: number | null = null;
  if (seedParam) {
    const parsedSeed = Number.parseInt(seedParam, 10);
    if (!Number.isNaN(parsedSeed) && seedParam.length <= 16 && /^\d+$/.test(seedParam)) {
      seed = parsedSeed;
    }
  }

  const depthParam = urlParams.get("depth");
  const depth = depthParam ? Number.parseInt(depthParam, 10) || 0 : 0;

  return { seed, depth };
}
