import { ChartConfig, Order, Point } from "../../models";
import OrderGenerator from "../../orders";
import { OrderType } from "../../orders";
import FoldCurveEngine, { FoldRule } from "./index";
import { degree2radian } from "../../../../../libs/math";

class KochCurve {
  private readonly engine: FoldCurveEngine;

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
            radian: degree2radian(60),
          },
          {
            length: 1 / 3,
            radian: degree2radian(-60),
          },
        ],
      },
    ];
  }

  public configureBasePoints(config: ChartConfig): Point[] {
    const rules = KochCurve.getFoldRule();
    return this.engine.createPoints(config, rules);
  }

  public configureOrders(complexity: number): Order[] {
    const pointCount = 2 ** (2 * (complexity - 1)) + 1;
    return new OrderGenerator().generate({
      type: OrderType.LINEAR,
      pointCount,
    });
  }
}

export default KochCurve;
