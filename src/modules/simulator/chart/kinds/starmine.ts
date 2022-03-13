import { ChartConfig, Order, Point } from "../models";
import IChartShaper from "./interface";
import OrderGenerator from "../orders";
import { OrderType } from "../orders/interface";
import { range } from "../../../../libs/collection";

class Starmine implements IChartShaper {
  private static pointCounts(complexity: number): number {
    return complexity * 2;
  }

  // eslint-disable-next-line class-methods-use-this
  public configureBasePoints(config: ChartConfig): Point[] {
    const length = Starmine.pointCounts(config.complexity);
    return range(length).map((i) => {
      const angle = (2 * Math.PI * i) / length - Math.PI;
      const amplitude = i % 2 === 0 ? 0.1 : 0.1 / 4;
      return {
        x: amplitude * Math.cos(angle),
        y: amplitude * Math.sin(angle),
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    return new OrderGenerator().generate({
      type: OrderType.LOOP,
      pointCount: Starmine.pointCounts(complexity),
    });
  }
}

export default Starmine;
