import { degree2radian } from "../../../../../src/libs/math";
import Starmine from "../../../../../src/modules/simulator/chart/kinds/starmine";
import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, defaultRadius, zip } from "../testCommon";
import ChartSimulator from "../../../../../src/modules/simulator/chart";

describe("Starmine test", () => {
  test("init test", () => {
    const chart = new Starmine();
    const simulator = new ChartSimulator(chart, {
      ...baseChart,
      kind: ChartType.STARMINE,
      complexity: 3,
    });
    simulator.reset();
    const { points } = simulator.simulate();
    const items = zip<Point>(points, [
      {
        x: defaultRadius * Math.cos(degree2radian(-180)),
        y: defaultRadius * Math.sin(degree2radian(-180)),
      },
      {
        x: (defaultRadius * Math.cos(degree2radian(-120))) / 4,
        y: (defaultRadius * Math.sin(degree2radian(-120))) / 4,
      },
      {
        x: defaultRadius * Math.cos(degree2radian(-60)),
        y: defaultRadius * Math.sin(degree2radian(-60)),
      },
      {
        x: (defaultRadius * Math.cos(degree2radian(0))) / 4,
        y: (defaultRadius * Math.sin(degree2radian(0))) / 4,
      },
      {
        x: defaultRadius * Math.cos(degree2radian(60)),
        y: defaultRadius * Math.sin(degree2radian(60)),
      },
      {
        x: (defaultRadius * Math.cos(degree2radian(120))) / 4,
        y: (defaultRadius * Math.sin(degree2radian(120))) / 4,
      },
    ]);
    for (const item of items) {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    }
  });
});
