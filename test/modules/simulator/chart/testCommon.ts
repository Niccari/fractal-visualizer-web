import { ChartType, ChartConfig, StyleType } from "../../../../src/modules/simulator/chart/models";

export const zip = <T>(a: T[], b: T[]) => a.map((k, i) => [k, b[i]]);
export const defaultRadius = 0.1;
export const baseChart: ChartConfig = {
  kind: ChartType.CIRCLE,
  complexity: 6,
  center: {
    x: 0,
    y: 0,
  },
  scale: {
    w: 1.0,
    h: 1.0,
  },
  color: {
    type: "rainbow",
    alpha: 1,
    speed: 1,
  },
  style: {
    type: StyleType.LINE,
    thickness: 1,
  },
  rotation: {
    angle: 0.0,
    speed: 0.0,
  },
};
