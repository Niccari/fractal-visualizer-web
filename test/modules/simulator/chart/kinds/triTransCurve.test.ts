import TriCurve from "../../../../../src/modules/simulator/chart/kinds/triCurve";
import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, zip } from "../chartSimulator.test";

describe("Tri Trans Curve test", () => {
  test("init test", () => {
    const triTransCurve = new TriCurve({
      ...baseChart,
      kind: ChartType.TRI_TRANS,
      basePoints: [],
      points: [],
      orders: [],
      complexity: 3,
    });
    triTransCurve.reset();
    triTransCurve.simulate();

    const { points } = triTransCurve.getChart();
    const items = zip<Point>(points, [
      { x: -0.1, y: 0 },
      { x: -0.1, y: 0.025 },
      { x: -0.125, y: 0 },
      { x: -0.15, y: 0.025 },
      { x: -0.15, y: 0 },
      { x: -0.125, y: 0.025 },
      { x: -0.125, y: -0.025 },
      { x: -0.075, y: -0.025 },
      { x: -0.1, y: -0.05 },
      { x: -0.125, y: -0.025 },
      { x: -0.125, y: -0.075 },
      { x: -0.175, y: -0.075 },
      { x: -0.15, y: -0.1 },
      { x: -0.15, y: -0.075 },
      { x: -0.125, y: -0.1 },
      { x: -0.1, y: -0.075 },
      { x: -0.1, y: -0.1 },
      { x: -0.075, y: -0.075 },
      { x: -0.125, y: -0.075 },
      { x: -0.125, y: -0.025 },
      { x: -0.15, y: -0.05 },
      { x: -0.15, y: 0 },
      { x: -0.1, y: -0.05 },
      { x: -0.05, y: 0 },
      { x: -0.05, y: -0.05 },
      { x: 0, y: -0.05 },
      { x: -0.05, y: 0 },
      { x: 0, y: 0.05 },
      { x: -0.05, y: 0.05 },
      { x: -0.025, y: 0.075 },
      { x: -0.025, y: 0.025 },
      { x: 0.025, y: 0.025 },
      { x: 0, y: 0 },
      { x: -0.025, y: 0.025 },
      { x: -0.025, y: -0.025 },
      { x: -0.075, y: -0.025 },
      { x: -0.05, y: -0.05 },
      { x: -0.05, y: 0 },
      { x: 0, y: -0.05 },
      { x: 0.05, y: 0 },
      { x: 0.05, y: -0.05 },
      { x: 0, y: -0.05 },
      { x: 0.05, y: -0.1 },
      { x: 0, y: -0.15 },
      { x: 0.05, y: -0.15 },
      { x: 0.025, y: -0.125 },
      { x: 0.075, y: -0.125 },
      { x: 0.075, y: -0.075 },
      { x: 0.1, y: -0.1 },
      { x: 0.1, y: -0.075 },
      { x: 0.075, y: -0.1 },
      { x: 0.05, y: -0.075 },
      { x: 0.05, y: -0.1 },
      { x: 0.025, y: -0.075 },
      { x: 0.075, y: -0.075 },
      { x: 0.075, y: -0.025 },
      { x: 0.1, y: -0.05 },
      { x: 0.125, y: -0.025 },
      { x: 0.075, y: -0.025 },
      { x: 0.075, y: 0.025 },
      { x: 0.05, y: 0 },
      { x: 0.05, y: 0.025 },
      { x: 0.075, y: 0 },
      { x: 0.1, y: 0.025 },
      { x: 0.1, y: 0 },
    ]);
    items.forEach((item) => {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    });
  });
});
