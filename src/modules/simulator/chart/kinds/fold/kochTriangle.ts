import { ChartConfig, ChartType, Order, Point } from "../../models";
import OrderGenerator from "../../orders";
import { OrderType } from "../../orders";
import KochCurve from "./kochCurve";
import { rotateBy } from "../../../matrix";
import { degree2radian } from "../../../../../libs/math";

class KochTriangle {
  private readonly kochCurve: KochCurve;

  public constructor() {
    this.kochCurve = new KochCurve();
  }

  public configureBasePoints(config: ChartConfig): Point[] {
    const isInner = config.kind === ChartType.KOCH_TRIANGLE_INNER;

    let kochCurvePoints = this.kochCurve.configureBasePoints(config);

    const radian120deg = degree2radian(120);

    if (isInner) {
      kochCurvePoints = kochCurvePoints.map((p) => ({ ...p, y: -p.y }));
    }
    kochCurvePoints = kochCurvePoints.map((p) => ({
      ...p,
      y: p.y + 0.1 / Math.sqrt(3),
    }));
    const points120 = kochCurvePoints.map((p) => rotateBy({ x: 0, y: 0 }, p, radian120deg));
    const points240 = points120.map((p) => rotateBy({ x: 0, y: 0 }, p, radian120deg));
    return [...kochCurvePoints, ...points240, ...points120];
  }

  public configureOrders(complexity: number): Order[] {
    const pointCount = 3 * (2 ** (2 * (complexity - 1)) + 1);
    return new OrderGenerator().generate({
      type: OrderType.LINEAR,
      pointCount,
    });
  }
}

export default KochTriangle;
