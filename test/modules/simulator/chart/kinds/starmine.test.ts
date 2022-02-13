import { degree2radian } from "../../../../../src/libs/math";
import Starmine from "../../../../../src/modules/simulator/chart/kinds/starmine";
import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, zip, defaultRadius } from "../chartSimulator.test";

describe("Starmine test", () => {
  test("init test", () => {
    const star = new Starmine({
      ...baseChart,
      kind: ChartType.STARMINE,
      basePoints: [],
      points: [],
      orders: [],
      complexity: 3,
    });
    star.reset();
    star.simulate();

    const { points } = star.getChart();
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
    items.forEach((item) => {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    });
  });
});
