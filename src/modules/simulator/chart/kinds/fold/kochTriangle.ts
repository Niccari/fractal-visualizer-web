import { ChartConfig, ChartType, Order, Point } from "../../models";
import IChartShaper from "../interface";
import OrderGenerator from "../../orders";
import { OrderType } from "../../orders/interface";
import KochCurve from "./kochCurve";
import { degree2radian } from "../../../../../libs/math";

class KochTriangle implements IChartShaper {
  private readonly kochCurve: KochCurve;

  public constructor() {
    this.kochCurve = new KochCurve();
  }

  public configureBasePoints(config: ChartConfig): Point[] {
    const isInner = config.kind === ChartType.KOCH_TRIANGLE_INNER;

    let kochCurvePoints = this.kochCurve.configureBasePoints(config);

    const sin120 = Math.sin(degree2radian(120));
    const cos120 = Math.cos(degree2radian(120));

    if (isInner) {
      kochCurvePoints = kochCurvePoints.map((p) => ({ ...p, y: -p.y }));
    }
    kochCurvePoints = kochCurvePoints.map((p) => ({
      ...p,
      y: p.y + 0.1 / Math.sqrt(3),
    }));
    const points120 = kochCurvePoints.map((p) => ({
      x: p.x * cos120 - p.y * sin120,
      y: p.x * sin120 + p.y * cos120,
    }));
    const points240 = points120.map((p) => ({
      x: p.x * cos120 - p.y * sin120,
      y: p.x * sin120 + p.y * cos120,
    }));
    return [...kochCurvePoints, ...points240, ...points120];
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    const pointCount = 3 * (2 ** (2 * (complexity - 1)) + 1);
    return new OrderGenerator().generate({
      type: OrderType.LINEAR,
      pointCount,
    });
  }
}

export default KochTriangle;
