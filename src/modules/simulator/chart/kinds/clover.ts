import IChartShaper from "./interface";
import { ChartConfig, Order, Point } from "../models";
import { range } from "../../../../libs/collection";
import OrderGenerator from "../orders";
import { OrderType } from "../orders/interface";
import { Constants } from "../../../../constants";

class Clover implements IChartShaper {
  private static pointCounts(complexity: number): number {
    return complexity * 40;
  }

  // eslint-disable-next-line class-methods-use-this
  public configureBasePoints(chart: ChartConfig): Point[] {
    const length = Clover.pointCounts(chart.complexity);
    const { baseAmplitude } = Constants;
    return range(length).map((i) => {
      const baseRadian = (2 * Math.PI * i) / length;
      const amplitude = baseAmplitude * Math.sin(chart.complexity * baseRadian);
      return {
        x: amplitude * Math.cos(baseRadian - Math.PI),
        y: amplitude * Math.sin(baseRadian - Math.PI),
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    const length = Clover.pointCounts(complexity);
    return new OrderGenerator().generate({
      type: OrderType.LOOP,
      pointCount: length,
    });
  }
}

export default Clover;
