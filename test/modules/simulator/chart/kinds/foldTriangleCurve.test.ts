import FoldCurve from "../../../../../src/modules/simulator/chart/kinds/foldCurve";
import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, zip } from "../chartSimulator.test";

describe("Fold Curve(Triangle) test", () => {
  test("init test", () => {
    const foldTriangleCurve = new FoldCurve({
      ...baseChart,
      kind: ChartType.FOLD_TRIANGLE,
      basePoints: [],
      points: [],
      orders: [],
      complexity: 4,
    });
    foldTriangleCurve.reset();
    foldTriangleCurve.simulate();

    const { points } = foldTriangleCurve.getChart();
    const items = zip<Point>(points, [
      { x: -0.1, y: 0 },
      { x: -0.05, y: -0.05 },
      { x: 0, y: 0 },
      { x: 0.05, y: -0.05 },
      { x: 0, y: -0.1 },
      { x: 0.05, y: -0.15 },
      { x: 0.1, y: -0.1 },
      { x: 0.05, y: -0.05 },
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
