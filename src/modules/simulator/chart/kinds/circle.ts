import { ChartConfig, Order, Point } from "../models";
import OrderGenerator, { OrderType } from "../orders";
import PointsGenerator, { PointsType } from "../points";

class Circle {
  private static pointCounts(complexity: number): number {
    return complexity;
  }

  // eslint-disable-next-line class-methods-use-this
  public configureBasePoints(config: ChartConfig): Point[] {
    const length = Circle.pointCounts(config.complexity);
    return new PointsGenerator().generate({
      type: PointsType.CIRCLE,
      length,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    const length = Circle.pointCounts(complexity);
    return new OrderGenerator().generate({
      type: OrderType.LOOP,
      pointCount: length,
    });
  }
}

export default Circle;
