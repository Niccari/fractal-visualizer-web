import RandomGenerator from "../randomizer";
import { ChartType, ChartConfig, StyleType, DefaultComplexity } from "./chart/models";
import { ColorType } from "./color";

interface ChartKindConstraints {
  complexity: {
    min: number;
    max: number;
  };
}

const CHART_KIND_CONSTRAINTS: Record<ChartType, ChartKindConstraints> = {
  [ChartType.CIRCLE]: { complexity: { min: 1, max: 5 } },
  [ChartType.STAR]: { complexity: { min: 3, max: 8 } },
  [ChartType.CLOVER]: { complexity: { min: 2, max: 6 } },
  [ChartType.SUNRISE]: { complexity: { min: 50, max: 100 } },
  [ChartType.RANDOM]: { complexity: { min: 50, max: 100 } },
  [ChartType.STARMINE]: { complexity: { min: 6, max: 12 } },
  [ChartType.KOCH_CURVE]: { complexity: { min: 3, max: 7 } },
  [ChartType.KOCH_TRIANGLE_INNER]: { complexity: { min: 3, max: 6 } },
  [ChartType.KOCH_TRIANGLE_OUTER]: { complexity: { min: 3, max: 6 } },
  [ChartType.FOLD_DRAGON]: { complexity: { min: 8, max: 12 } },
  [ChartType.FOLD_CCURVE]: { complexity: { min: 8, max: 12 } },
  [ChartType.TRI_CIS]: { complexity: { min: 4, max: 8 } },
  [ChartType.TRI_TRANS]: { complexity: { min: 4, max: 8 } },
  [ChartType.BINARY_TREE]: { complexity: { min: 6, max: 10 } },
};

const CHART_KINDS = Object.values(ChartType);
const STYLE_TYPES = Object.values(StyleType).filter((style) => style !== StyleType.CIRCLES);
const COLOR_TYPES = Object.values(ColorType);

export class ChartGenerator {
  private randomGenerator: RandomGenerator;

  constructor(seed: number) {
    this.randomGenerator = new RandomGenerator(seed);
  }

  private normalizeRandom(): number {
    return (this.randomGenerator.generate() + 1) / 2;
  }

  private getRandomItem<T>(array: T[]): T {
    const index = Math.floor(this.normalizeRandom() * array.length);
    return array[index];
  }

  private getRandomNumber(min: number, max: number): number {
    return min + this.normalizeRandom() * (max - min);
  }

  private getRandomInteger(min: number, max: number): number {
    return Math.floor(this.getRandomNumber(min, max + 1));
  }

  generateCharts(): ChartConfig[] {
    const charts: ChartConfig[] = [];

    for (let rangeIndex = 0; rangeIndex < 12; rangeIndex++) {
      const chartsInRange = this.getRandomInteger(3, 6);

      for (let i = 0; i < chartsInRange; i++) {
        const kind = this.getRandomItem(CHART_KINDS);
        const constraints = CHART_KIND_CONSTRAINTS[kind];

        const complexity = this.getRandomInteger(constraints.complexity.min, constraints.complexity.max);

        // Y position within the current range (rangeIndex to rangeIndex+1)
        const centerY = rangeIndex + this.normalizeRandom();
        const centerX = this.getRandomNumber(0, 1);

        const scale = this.getRandomNumber(0.5, 1.2);

        const chart: ChartConfig = {
          kind,
          complexity: complexity as DefaultComplexity,
          center: {
            x: centerX,
            y: centerY,
          },
          scale: {
            w: scale,
            h: scale,
          },
          rotation: {
            angle: this.getRandomNumber(0, 360),
            speed: this.getRandomNumber(-2, 2),
          },
          mutation: {
            size: this.getRandomNumber(0.5, 1.2),
            angle: this.getRandomNumber(0.5, 1.2),
          },
          randomizer: {
            size: {
              amplify: this.getRandomNumber(-10, 10),
              seed: Math.floor(this.normalizeRandom() * 2147483647),
            },
            angle: {
              amplify: this.getRandomNumber(-5, 5),
              seed: Math.floor(this.normalizeRandom() * 2147483647),
            },
          },
          style: {
            type: this.getRandomItem(STYLE_TYPES),
            thickness: this.getRandomNumber(1, 10),
          },
          color: {
            type: this.getRandomItem(COLOR_TYPES),
            alpha: this.getRandomNumber(0.1, 1.0),
            speed: this.getRandomNumber(0.1, 3.0),
          },
        };

        charts.push(chart);
      }
    }

    return charts;
  }
}
