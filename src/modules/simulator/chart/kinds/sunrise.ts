import { ChartConfig, Order, Point } from "../models";
import PointsGenerator from "../points";
import { PointsType } from "../points";
import OrderGenerator from "../orders";
import { OrderType } from "../orders";

class Sunrise {
  private static pointCounts(complexity: number): number {
    return complexity;
  }

  // eslint-disable-next-line class-methods-use-this
  public configureBasePoints(config: ChartConfig): Point[] {
    return new PointsGenerator().generate({
      type: PointsType.CIRCLE,
      length: Sunrise.pointCounts(config.complexity),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    return new OrderGenerator().generate({
      type: OrderType.END_2X_FASTER,
      pointCount: Sunrise.pointCounts(complexity),
    });
  }
}

export default Sunrise;
