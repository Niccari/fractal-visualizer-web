import { ChartConfig, ChartType, Order, Point } from "../../models";
import IChartShaper from "../interface";
import OrderGenerator from "../../orders";
import { OrderType } from "../../orders/interface";
import { FoldRule, IFoldCurveEngine } from "./interface";
import FoldCurveEngine from "./index";

class FoldCurve implements IChartShaper {
  private readonly engine: IFoldCurveEngine;

  public constructor() {
    this.engine = new FoldCurveEngine();
  }

  private static selectFoldRules(kind: ChartType): FoldRule[] {
    const leftFold = {
      length: Math.SQRT1_2,
      radian: (45 * Math.PI) / 180,
    };
    const rightFold = {
      length: Math.SQRT1_2,
      radian: (-45 * Math.PI) / 180,
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
