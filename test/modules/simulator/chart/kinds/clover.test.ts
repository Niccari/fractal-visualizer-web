import Clover from "../../../../../src/modules/simulator/chart/kinds/clover";
import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import ChartSimulator from "../../../../../src/modules/simulator/chart";
import { baseChart, zip } from "../testCommon";

describe("Clover test", () => {
  test("init test", () => {
    const chart = new Clover();
    const simulator = new ChartSimulator(chart, {
      ...baseChart,
      kind: ChartType.SUNRISE,
      complexity: 4,
    });

    simulator.reset();
    const { points } = simulator.simulate();
    const length = 4 * 40;
    const items = zip<Point>(
      points,
      Array.from({ length }, (_, k) => k).map((index) => {
        const amplify = 0.1 * Math.sin((2 * Math.PI * 4 * index) / length);
        const angle = (2 * Math.PI * index) / length - Math.PI;
        return {
          x: amplify * Math.cos(angle),
          y: amplify * Math.sin(angle),
        };
      }),
    );
    for (const item of items) {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    }
  });
});
