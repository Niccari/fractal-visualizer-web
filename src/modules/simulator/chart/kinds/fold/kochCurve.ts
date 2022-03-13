import { ChartConfig, Order, Point } from "../../models";
import IChartShaper from "../interface";
import OrderGenerator from "../../orders";
import { OrderType } from "../../orders/interface";
import { FoldRule, IFoldCurveEngine } from "./interface";
import FoldCurveEngine from "./index";

class KochCurve implements IChartShaper {
  private readonly engine: IFoldCurveEngine;

  public constructor() {
    this.engine = new FoldCurveEngine();
  }

  private static getFoldRule(): FoldRule[] {
    return [
      {
        folds: [
          {
            length: 1 / 3,
            radian: 0,
          },
          {
            length: 1 / 3,
            radian: (60 * Math.PI) / 180,
          },
          {
            length: 1 / 3,
            radian: (-60 * Math.PI) / 180,
          },
        ],
      },
    ];
  }

  public configureBasePoints(config: ChartConfig): Point[] {
    const rules = KochCurve.getFoldRule();
    return this.engine.createPoints(config, rules);
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    const pointCount = 2 ** (2 * (complexity - 1)) + 1;
    return new OrderGenerator().generate({
      type: OrderType.LINEAR,
      pointCount,
    });
  }
}

export default KochCurve;
