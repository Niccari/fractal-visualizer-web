import { ChartConfig, ChartType, Order, Point } from "../../models";
import IChartShaper from "../interface";
import OrderGenerator from "../../orders";
import { OrderType } from "../../orders/interface";
import { FoldRule, IFoldCurveEngine } from "./interface";
import FoldCurveEngine from "./index";
import { degree2radian } from "../../../../../libs/math";

class TriCurve implements IChartShaper {
  private readonly engine: IFoldCurveEngine;

  public constructor() {
    this.engine = new FoldCurveEngine();
  }

  private static selectFoldRules(kind: ChartType): FoldRule[] {
    const foldTriTransCurve: FoldRule[] = [
      {
        folds: [
          {
            length: 1 / 2,
            radian: degree2radian(90),
          },
          {
            length: 1 / 2,
            radian: 0,
            fromStart: true,
          },
          {
            length: 1 / 2,
            radian: degree2radian(90),
            fromEnd: true,
          },
        ],
      },
    ];

    const foldTriCisCurve: FoldRule[] = [
      {
        folds: [
          {
            length: 1 / 2,
            radian: degree2radian(90),
          },
          {
            length: 1 / 2,
            radian: 0.0,
            fromStart: true,
          },
          {
            length: 1 / 2,
            radian: degree2radian(-90),
            fromEnd: true,
          },
        ],
      },
    ];
    if (kind === ChartType.TRI_CIS) {
      return foldTriCisCurve;
    }
    return foldTriTransCurve;
  }

  public configureBasePoints(config: ChartConfig): Point[] {
    const rules = TriCurve.selectFoldRules(config.kind);
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

export default TriCurve;
