import { ChartConfig, Order, Point } from "../models";
import OrderGenerator from "../orders";
import { OrderType } from "../orders";
import { range } from "../../../../libs/collection";
import { Constants } from "../../../../constants";

class Starmine {
  private static pointCounts(complexity: number): number {
    return complexity * 2;
  }

  public configureBasePoints(config: ChartConfig): Point[] {
    const length = Starmine.pointCounts(config.complexity);
    const { baseAmplitude } = Constants;
    return range(length).map((i) => {
      const angle = (2 * Math.PI * i) / length - Math.PI;
      const amplitude = i % 2 === 0 ? baseAmplitude : baseAmplitude / 4;
      return {
        x: amplitude * Math.cos(angle),
        y: amplitude * Math.sin(angle),
      };
    });
  }

  public configureOrders(complexity: number): Order[] {
    return new OrderGenerator().generate({
      type: OrderType.LOOP,
      pointCount: Starmine.pointCounts(complexity),
    });
  }
}

export default Starmine;
