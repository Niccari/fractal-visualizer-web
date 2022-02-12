import ChartSimulator from "..";
import { degree2radian } from "../../../../libs/math";
import RandomGenerator from "../../../randomizer";
import { MutableChart } from "../models";

class BinaryTree extends ChartSimulator {
  private readonly lengthRandom: RandomGenerator;
  private readonly angleRandom: RandomGenerator;

  public constructor(chart: MutableChart) {
    super(chart);
    this.lengthRandom = new RandomGenerator(chart.randomizer?.size?.seed || -1);
    this.angleRandom = new RandomGenerator(chart.randomizer?.angle?.seed || -1);
    this.chart.complexity = (() => {
      if (chart.complexity < 2) {
        return 2;
      }
      if (chart.complexity > 10) {
        return 10;
      }
      return chart.complexity;
    })();
  }

  public pointLength(): number {
    const { complexity } = this.chart;
    return 2 ** (complexity + 1);
  }

  public setBasePoints(): void {
    const { chart } = this;
    chart.basePoints[0] = { x: 0.0, y: -0.1 };
    chart.basePoints[1] = { x: 0.0, y: 0.0 };
    this.divideBasePoints(1, 0.85, degree2radian(45));
  }

  protected divideBasePoints(depth: number, parentLength: number, parentAngle: number): void {
    const lengthRandom = (this.chart.randomizer?.size?.amplify || 0.0) * this.lengthRandom.generate();
    const angleRandom = (this.chart.randomizer?.angle?.amplify || 0.0) * this.angleRandom.generate();
    const length = parentLength * (lengthRandom + (this.chart.mutation?.size || 1.0));
    const angle = parentAngle * (angleRandom + (this.chart.mutation?.angle || 1.0));
    if (depth >= Math.floor(this.pointLength() / 2)) {
      return;
    }
    const start = this.chart.basePoints[Math.floor(depth / 2)];
    const end = this.chart.basePoints[depth];
    const vectorX = end.x - start.x;
    const vectorY = end.y - start.y;

    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    this.chart.basePoints[2 * depth] = {
      x: end.x + length * (cos * vectorX - sin * vectorY),
      y: end.y + length * (sin * vectorX + cos * vectorY),
    };
    this.chart.basePoints[2 * depth + 1] = {
      x: end.x + length * (cos * vectorX + sin * vectorY),
      y: end.y + length * (-sin * vectorX + cos * vectorY),
    };
    this.divideBasePoints(2 * depth, length, angle);
    this.divideBasePoints(2 * depth + 1, length, angle);
  }

  public setOrders(): void {
    this.chart.orders[0] = {
      link: [0, 1],
    };
    this.setOrdersRecursive(1, 1);
  }

  public setOrdersRecursive(base: number, src: number): void {
    if (base >= this.pointLength() / 2) {
      return;
    }
    const dstLeft = 2 * base;
    const dstRight = 2 * base + 1;
    this.chart.orders[dstLeft - 1] = {
      link: [src, dstLeft],
    };
    this.chart.orders[dstRight - 1] = {
      link: [src, dstRight],
    };
    this.setOrdersRecursive(dstLeft, dstLeft);
    this.setOrdersRecursive(dstRight, dstRight);
  }
}

export default BinaryTree;
