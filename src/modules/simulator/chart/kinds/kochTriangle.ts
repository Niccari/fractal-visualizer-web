import { ChartType, MutableChart } from "../models";
import KochCurve from "./kochCurve";

class KochTriangle extends KochCurve {
  private isInner = false;

  public constructor(chart: MutableChart) {
    super(chart);
    this.isInner = chart.kind === ChartType.KOCH_TRIANGLE_INNER;
  }

  public pointLength(): number {
    const { complexity } = this.chart;
    return 3 * (2 ** (2 * (complexity - 1)) + 1);
  }

  public setBasePoints(): void {
    this.chart.basePoints = [];
    this.chart.basePoints.push({ x: -0.1, y: 0.0 });
    this.chart.basePoints.push({ x: 0.1, y: 0.0 });
    this.divideBasePoints(1, this.length0, this.angle0);

    const sin120 = -Math.sin((120 * Math.PI) / 180);
    const cos120 = Math.cos((120 * Math.PI) / 180);

    const pointLength = this.pointLength();
    if (this.isInner) {
      for (let i = 0; i < pointLength / 3; i += 1) {
        this.chart.basePoints[i].y = -this.chart.basePoints[i].y;
      }
    }
    for (let i = 0; i < pointLength / 3; i += 1) {
      this.chart.basePoints[i].y += 0.1 / Math.sqrt(3);
    }
    for (let i = 0; i < pointLength / 3; i += 1) {
      const baseX = this.chart.basePoints[i].x;
      const baseY = this.chart.basePoints[i].y;
      this.chart.basePoints.push({
        x: baseX * cos120 - baseY * sin120,
        y: baseX * sin120 + baseY * cos120,
      });
    }
    for (let i = 0; i < pointLength / 3; i += 1) {
      const baseX = this.chart.basePoints[i + pointLength / 3].x;
      const baseY = this.chart.basePoints[i + pointLength / 3].y;
      this.chart.basePoints.push({
        x: baseX * cos120 - baseY * sin120,
        y: baseX * sin120 + baseY * cos120,
      });
    }
  }

  public setOrders(): void {
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength - 1; i += 1) {
      this.chart.orders[i] = {
        link: [i, i + 1],
      };
    }
  }
}

export default KochTriangle;
