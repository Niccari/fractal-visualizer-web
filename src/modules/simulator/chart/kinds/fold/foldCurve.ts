import { ChartConfig, ChartType, Order, Point } from "../../models";
import OrderGenerator from "../../orders";
import { OrderType } from "../../orders";
import FoldCurveEngine, { FoldRule } from "./index";
import { degree2radian } from "../../../../../libs/math";

class FoldCurve {
  private readonly engine: FoldCurveEngine;

  public constructor() {
    this.engine = new FoldCurveEngine();
  }

  private static selectFoldRules(kind: ChartType): FoldRule[] {
    const leftFold = {
      length: Math.SQRT1_2,
      radian: degree2radian(45),
    };
    const rightFold = {
      length: Math.SQRT1_2,
      radian: degree2radian(-45),
    };
    switch (kind) {
      case ChartType.FOLD_CCURVE:
        return [
          {
            folds: [rightFold],
          },
        ];
      case ChartType.FOLD_DRAGON:
        return [
          {
            folds: [leftFold],
          },
          {
            folds: [rightFold],
          },
        ];
      default:
        throw new Error("Unsupported curve type!");
    }
  }

  public configureBasePoints(config: ChartConfig): Point[] {
    const rules = FoldCurve.selectFoldRules(config.kind);
    return this.engine.createPoints(config, rules);
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    const length = 2 ** (complexity - 1) + 1;
    return new OrderGenerator().generate({
      type: OrderType.LINEAR,
      pointCount: length,
    });
  }
}

export default FoldCurve;
