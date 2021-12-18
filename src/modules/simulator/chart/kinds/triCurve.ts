import { ChartSimulator, MutableChart } from "..";
import RandomGenerator from "../../../randomizer";
import { ChartType } from "../chart";

export const TriCurveType = {
  CIS: "cis",
  TRANS: "trans",
} as const;
export type TriCurveType = typeof TriCurveType[keyof typeof TriCurveType];

class TriCurve extends ChartSimulator {
  private readonly curveType;
  private readonly lengthRandom: RandomGenerator;
  private readonly angleRandom: RandomGenerator;

  public constructor(_chart: MutableChart) {
    super(_chart);
    this.lengthRandom = new RandomGenerator(_chart.randomizer?.size?.seed || -1);
    this.angleRandom = new RandomGenerator(_chart.randomizer?.angle?.seed || -1);
    this.curveType = (() => {
      switch (this.chart.kind) {
        case ChartType.TRI_CIS:
          return TriCurveType.CIS;
        case ChartType.TRI_TRANS:
          return TriCurveType.TRANS;
        default:
          throw new Error("Unsupported curve type!");
      }
    })();
    this.chart.complexity = (() => {
      if (_chart.complexity > 7) {
        return 7;
      }
      return _chart.complexity;
    })();
  }

  public pointLength(): number {
    const { complexity } = this.chart;
    return 4 ** complexity + 1;
  }

  public setBasePoints(): void {
    const { chart } = this;
    chart.basePoints = [];
    chart.basePoints.push({ x: -0.1, y: 0.0 });
    chart.basePoints.push({ x: 0.1, y: 0.0 });
    this.divideBasePoints(1, 1.0, (90 * Math.PI) / 180);
  }

  protected divideBasePoints(depth: number, parentLength: number, parentAngle: number): void {
    const lengthRandom = (this.chart.randomizer?.size?.amplify || 0.0) * this.lengthRandom.generate();
    const angleRandom = (this.chart.randomizer?.angle?.amplify || 0.0) * this.angleRandom.generate();
    const length = parentLength * (lengthRandom + (this.chart.mutation?.size || 1.0));
    const angle = parentAngle * (angleRandom + (this.chart.mutation?.angle || 1.0));
    if (depth > this.chart.complexity) {
      return;
    }
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const iterateLength = 4 ** (depth - 1);
    for (let i = iterateLength; i > 0; i -= 1) {
      const start = this.chart.basePoints[i];
      const end = this.chart.basePoints[i - 1];
      const midX = (end.x + start.x) / 2;
      const midY = (end.y + start.y) / 2;
      const startMidX = midX - start.x;
      const startMidY = midY - start.y;
      const midEndX = end.x - midX;
      const midEndY = end.y - midY;
      const midPoint = {
        x: midX,
        y: midY,
      };

      const lengthSigned = this.curveType === TriCurveType.CIS ? -length : length;
      const sinSigned = this.curveType === TriCurveType.TRANS && i % 2 === 0 ? sin : -sin;
      this.chart.basePoints.splice(i, 0, {
        x: start.x + lengthSigned * (cos * startMidX + sinSigned * startMidY),
        y: start.y + lengthSigned * (-sinSigned * startMidX + cos * startMidY),
      });
      this.chart.basePoints.splice(i, 0, midPoint);
      this.chart.basePoints.splice(i, 0, {
        x: end.x - lengthSigned * (cos * midEndX - sinSigned * midEndY),
        y: end.y - lengthSigned * (sinSigned * midEndX + cos * midEndY),
      });
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

export default TriCurve;
