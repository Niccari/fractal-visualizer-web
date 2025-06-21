import { ChartConfig, Order, Point } from "../models";
import PointsGenerator from "../points";
import { PointsType } from "../points";
import OrderGenerator from "../orders";
import { OrderType } from "../orders";

class Random {
  private static pointCounts(complexity: number): number {
    return complexity;
  }

  // eslint-disable-next-line class-methods-use-this
  public configureBasePoints(config: ChartConfig): Point[] {
    const length = Random.pointCounts(config.complexity);
    return new PointsGenerator().generate({
      type: PointsType.RANDOM,
      length,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    const length = Random.pointCounts(complexity);
    return new OrderGenerator().generate({
      type: OrderType.LOOP,
      pointCount: length,
    });
  }
}

export default Random;
