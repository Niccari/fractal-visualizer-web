import ChartSimulator from "..";
import { degree2radian } from "../../../../libs/math";
import RandomGenerator from "../../../randomizer";
import { MutableChart } from "../models";

class KochCurve extends ChartSimulator {
  protected readonly length0 = 1.0;
  protected readonly angle0 = degree2radian(60);
  private readonly lengthRandom: RandomGenerator;
  private readonly angleRandom: RandomGenerator;

  public constructor(chart: MutableChart) {
    super(chart);
    this.lengthRandom = new RandomGenerator(chart.randomizer?.size?.seed || -1);
    this.angleRandom = new RandomGenerator(chart.randomizer?.angle?.seed || -1);

    this.chart.complexity = (() => {
      if (chart.complexity < 3) {
        return 3;
      }
      if (chart.complexity > 10) {
        return 10;
      }
      return chart.complexity;
    })();
  }

  public pointLength(): number {
    const { complexity } = this.chart;
    return 2 ** (2 * (complexity - 1)) + 1;
  }

  public setBasePoints(): void {
    this.chart.basePoints = [];
    this.chart.basePoints.push({ x: -0.1, y: 0.0 });
    this.chart.basePoints.push({ x: 0.1, y: 0.0 });
    this.divideBasePoints(1, this.length0, this.angle0);
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
    const iterateLength = 2 ** (2 * depth);
    for (let i = 0; i < iterateLength; i += 1) {
      const mod4 = i % 4;
      if (mod4 <= 1) {
        const start = this.chart.basePoints[i];
        const end = this.chart.basePoints[i + 1];
        const vectorX = end.x - start.x;
        const vectorY = end.y - start.y;
        this.chart.basePoints.splice(i + 1, 0, {
          x: start.x + (vectorX * length) / (3 - mod4),
          y: start.y + (vectorY * length) / (3 - mod4),
        });
      } else if (mod4 === 2) {
        const start = this.chart.basePoints[i - 1];
        const end = this.chart.basePoints[i];
        const vectorX = end.x - start.x;
        const vectorY = end.y - start.y;
        this.chart.basePoints.splice(i, 0, {
          x: start.x + length * (cos * vectorX - sin * vectorY),
          y: start.y + length * (sin * vectorX + cos * vectorY),
        });
      }
    }
    this.divideBasePoints(depth + 1, length, angle);
  }

  public setOrders(): void {
    for (let i = 0; i < this.pointLength() - 1; i += 1) {
      this.chart.orders[i] = {
        link: [i, i + 1],
      };
    }
  }
}

export default KochCurve;
