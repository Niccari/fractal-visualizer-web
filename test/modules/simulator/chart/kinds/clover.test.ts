import Clover from "../../../../../src/modules/simulator/chart/kinds/clover";
import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, defaultRadius, zip } from "../chartSimulator.test";

describe("Clover test", () => {
  test("init test", () => {
    const clover = new Clover({
      ...baseChart,
      kind: ChartType.SUNRISE,
      basePoints: [],
      points: [],
      orders: [],
      complexity: 4,
    });
    clover.reset();
    clover.simulate();

    const { points } = clover.getChart();
    const length = 4 * 40;
    const items = zip<Point>(
      points,
      Array.from({ length }, (_, k) => k).map((index) => {
        const amplify = defaultRadius * Math.sin((2 * Math.PI * 4 * index) / length);
        const angle = (2 * Math.PI * index) / length - Math.PI;
        return {
          x: amplify * Math.cos(angle),
          y: amplify * Math.sin(angle),
        };
      })
    );
    items.forEach((item) => {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    });
  });
});
