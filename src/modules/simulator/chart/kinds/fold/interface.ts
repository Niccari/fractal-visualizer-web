import { ChartConfig, Point } from "../../models";

export interface Fold {
  length: number;
  radian: number;
  fromStart?: boolean;
  fromEnd?: boolean;
}

export interface FoldRule {
  folds: Fold[];
}

export interface IFoldCurveEngine {
  createPoints(config: ChartConfig, rules: FoldRule[]): Point[];
}
