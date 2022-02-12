import ChartSimulator from "..";
import { degree2radian } from "../../../../libs/math";
import RandomGenerator from "../../../randomizer";
import { ChartType, MutableChart } from "../models";

export const FoldCurveType = {
  DRAGON: "dragon",
  TRIANGLE: "triangle",
  CCURVE: "ccurve",
} as const;
export type FoldCurveType = typeof FoldCurveType[keyof typeof FoldCurveType];

// noinspection DuplicatedCode
class FoldCurve extends ChartSimulator {
  private readonly arm0 = Math.sqrt(2) / 2;
  private readonly angle0 = degree2radian(45);
  private readonly curveType: FoldCurveType;
  private readonly lengthRandom: RandomGenerator;
  private readonly angleRandom: RandomGenerator;

  public constructor(chart: MutableChart) {
    super(chart);
    this.lengthRandom = new RandomGenerator(chart.randomizer?.size?.seed || -1);
    this.angleRandom = new RandomGenerator(chart.randomizer?.angle?.seed || -1);
    this.curveType = (() => {
      switch (this.chart.kind) {
        case ChartType.FOLD_CCURVE:
          return FoldCurveType.CCURVE;
        case ChartType.FOLD_TRIANGLE:
          return FoldCurveType.TRIANGLE;
        case ChartType.FOLD_DRAGON:
          return FoldCurveType.DRAGON;
        default:
          throw new Error("Unsupported curve type!");
      }
    })();
    this.chart.complexity = (() => {
      if (chart.complexity < 3) {
        return 3;
      }
      if (chart.complexity > 12) {
        return 12;
      }
      return chart.complexity;
    })();
  }

  public pointLength(): number {
    const { complexity } = this.chart;
    return 2 ** (complexity - 1) + 1;
  }

  public setBasePoints(): void {
    const { chart } = this;
    chart.basePoints.push({ x: -0.1, y: 0.0 });
    chart.basePoints.push({ x: 0.1, y: 0.0 });
    this.divideBasePoints(1, this.arm0, this.angle0);
  }

  protected divideBasePoints(depth: number, parentLength: number, parentAngle: number): void {
    const lengthRandom = (this.chart.randomizer?.size?.amplify || 0.0) * this.lengthRandom.generate();
    const angleRandom = (this.chart.randomizer?.angle?.amplify || 0.0) * this.angleRandom.generate();
    const length = parentLength * (lengthRandom + (this.chart.mutation?.size || 1.0));
    const angle = parentAngle * (angleRandom + (this.chart.mutation?.angle || 1.0));
    if (depth >= this.chart.complexity) {
      return;
    }
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const iterateLength = 2 ** (depth - 1);
    for (let i = iterateLength; i > 0; i -= 1) {
      const start = this.chart.basePoints[i];
      const end = this.chart.basePoints[i - 1];
      const vectorX = end.x - start.x;
      const vectorY = end.y - start.y;
      const newPoint = (() => {
        if (this.isLeftFold(i, depth)) {
          return {
            x: start.x + length * (cos * vectorX - sin * vectorY),
            y: start.y + length * (sin * vectorX + cos * vectorY),
          };
        }
        return {
          x: start.x + length * (cos * vectorX + sin * vectorY),
          y: start.y + length * (-sin * vectorX + cos * vectorY),
        };
      })();
      this.chart.basePoints.splice(i, 0, newPoint);
    }
    this.divideBasePoints(depth + 1, length, angle);
  }

  private isLeftFold(i: number, depth: number): boolean {
    switch (this.curveType) {
      case FoldCurveType.DRAGON:
        return i % 2 === 0;
      case FoldCurveType.TRIANGLE:
        return (i + depth) % 2 === 0;
      case FoldCurveType.CCURVE:
        return true;
      default:
        throw new Error("Unsupported CurveType!");
    }
  }

  public setOrders(): void {
    for (let i = 0; i < this.pointLength() - 1; i += 1) {
      this.chart.orders[i] = {
        link: [i, i + 1],
      };
    }
  }
}

export default FoldCurve;
