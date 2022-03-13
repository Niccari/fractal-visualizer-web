import { ChartConfig, Order, Point } from "../models";
import IChartShaper from "./interface";
import OrderGenerator from "../orders";
import { OrderType } from "../orders/interface";
import PointsGenerator from "../points";
import { PointsType } from "../points/interface";

class Star implements IChartShaper {
  private static pointCounts(complexity: number): number {
    return complexity;
  }

  // eslint-disable-next-line class-methods-use-this
  public configureBasePoints(config: ChartConfig): Point[] {
    const length = Star.pointCounts(config.complexity);
    return new PointsGenerator().generate({
      type: PointsType.CIRCLE,
      length,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    const length = Star.pointCounts(complexity);
    return new OrderGenerator().generate({
      type: OrderType.START_END_2X_FASTER,
      pointCount: length,
    });
  }
}

export default Star;
