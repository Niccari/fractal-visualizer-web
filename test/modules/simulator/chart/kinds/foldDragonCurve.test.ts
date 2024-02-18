import FoldCurve from "../../../../../src/modules/simulator/chart/kinds/fold/foldCurve";
import { ChartConfig, ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, zip } from "../testCommon";
import ChartSimulator from "../../../../../src/modules/simulator/chart";

describe("Fold Curve(Dragon) test", () => {
  test("init test", () => {
    const foldDragonCurve = new FoldCurve();
    const config: ChartConfig = {
      ...baseChart,
      kind: ChartType.FOLD_DRAGON,
      complexity: 6,
    };
    const simulator = new ChartSimulator(foldDragonCurve, config);
    simulator.reset();
    const { points } = simulator.simulate();

    const items = zip<Point>(points, [
      { x: -0.1, y: 0 },
      { x: -0.125, y: -0.025 },
      { x: -0.15, y: 0 },
      { x: -0.125, y: 0.025 },
      { x: -0.15, y: 0.05 },
      { x: -0.125, y: 0.075 },
      { x: -0.1, y: 0.05 },
      { x: -0.075, y: 0.075 },
      { x: -0.1, y: 0.1 },
      { x: -0.075, y: 0.125 },
      { x: -0.05, y: 0.1 },
      { x: -0.075, y: 0.075 },
      { x: -0.05, y: 0.05 },
      { x: -0.025, y: 0.075 },
      { x: 0, y: 0.05 },
      { x: 0.025, y: 0.075 },
      { x: 0, y: 0.1 },
      { x: 0.025, y: 0.125 },
      { x: 0.05, y: 0.1 },
      { x: 0.025, y: 0.075 },
      { x: 0.05, y: 0.05 },
      { x: 0.025, y: 0.025 },
      { x: 0, y: 0.05 },
      { x: -0.025, y: 0.025 },
      { x: 0, y: 0 },
      { x: 0.025, y: 0.025 },
      { x: 0.05, y: 0 },
      { x: 0.025, y: -0.025 },
      { x: 0.05, y: -0.05 },
      { x: 0.075, y: -0.025 },
      { x: 0.1, y: -0.05 },
      { x: 0.125, y: -0.025 },
      { x: 0.1, y: 0 },
    ]);

    for (const item of items) {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    }
  });
});
