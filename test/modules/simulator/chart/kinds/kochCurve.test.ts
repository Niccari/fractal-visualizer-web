import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, zip } from "../testCommon";
import KochCurve from "../../../../../src/modules/simulator/chart/kinds/fold/kochCurve";
import ChartSimulator from "../../../../../src/modules/simulator/chart";

describe("Koch Curve test", () => {
  test("init test", () => {
    const curve = new KochCurve();
    const simulator = new ChartSimulator(curve, {
      ...baseChart,
      kind: ChartType.KOCH_CURVE,
      complexity: 3,
    });
    simulator.reset();
    const { points } = simulator.simulate();

    const items = zip<Point>(points, [
      { x: -0.1, y: 0 },
      { x: -0.07777777777777778, y: 0 },
      { x: -0.06666666666666667, y: 0.01924500897298752 },
      { x: -0.05555555555555556, y: 0 },
      { x: -0.03333333333333334, y: 0 },
      { x: -0.022222222222222227, y: 0.01924500897298753 },
      { x: -0.033333333333333326, y: 0.03849001794597505 },
      { x: -0.01111111111111111, y: 0.03849001794597505 },
      { x: 0, y: 0.05773502691896258 },
      { x: 0.011111111111111118, y: 0.03849001794597505 },
      { x: 0.03333333333333334, y: 0.03849001794597505 },
      { x: 0.022222222222222227, y: 0.01924500897298753 },
      { x: 0.03333333333333334, y: 0 },
      { x: 0.055555555555555566, y: 0 },
      { x: 0.06666666666666668, y: 0.01924500897298752 },
      { x: 0.07777777777777778, y: 0 },
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
