import { degree2radian } from "../../../../src/libs/math";
import Circle from "../../../../src/modules/simulator/chart/kinds/circle";
import { ChartType, MutableChart, StyleType } from "../../../../src/modules/simulator/chart/models";

export const zip = <T>(a: T[], b: T[]) => a.map((k, i) => [k, b[i]]);
export const defaultRadius = 0.1;
export const baseChart: MutableChart = {
  kind: ChartType.CIRCLE,
  basePoints: [],
  points: [],
  orders: [],
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
  colors: [],
  rotation: {
    angle: 0.0,
    speed: 0.0,
  },
};

describe("ChartSimulator test", () => {
  test("Circle init test", () => {
    const chartSimulator = new Circle(baseChart);
    chartSimulator.reset();
    chartSimulator.simulate();

    const { points } = chartSimulator.getChart();
    const expectPoints = [0, 1, 2, 3, 4, 5].map((index) => ({
      x: defaultRadius * Math.sin(degree2radian(index * 60)),
      y: defaultRadius * Math.cos(degree2radian(index * 60)),
    }));
    expect(points).toStrictEqual(expectPoints);
  });
});
