import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, zip } from "../testCommon";
import ChartSimulator from "../../../../../src/modules/simulator/chart";
import KochTriangle from "../../../../../src/modules/simulator/chart/kinds/fold/kochTriangle";

describe("Koch Triangle Inner Curve test", () => {
  test("init test", () => {
    const curve = new KochTriangle();
    const simulator = new ChartSimulator(curve, {
      ...baseChart,
      kind: ChartType.KOCH_TRIANGLE_INNER,
      complexity: 3,
    });
    simulator.reset();
    const { points } = simulator.simulate();
    const items = zip<Point>(points, [
      { x: -0.1, y: 0.05773502691896258 },
      { x: -0.07777777777777778, y: 0.05773502691896258 },
      { x: -0.06666666666666667, y: 0.038490017945975064 },
      { x: -0.05555555555555556, y: 0.05773502691896258 },
      { x: -0.03333333333333334, y: 0.05773502691896258 },
      { x: -0.022222222222222227, y: 0.03849001794597505 },
      { x: -0.033333333333333326, y: 0.019245008972987518 },
      { x: -0.01111111111111111, y: 0.019245008972987532 },
      { x: 0, y: 0 },
      { x: 0.011111111111111118, y: 0.019245008972987532 },
      { x: 0.03333333333333334, y: 0.01924500897298754 },
      { x: 0.022222222222222227, y: 0.03849001794597506 },
      { x: 0.03333333333333334, y: 0.05773502691896258 },
      { x: 0.055555555555555566, y: 0.05773502691896258 },
      { x: 0.06666666666666668, y: 0.038490017945975064 },
      { x: 0.07777777777777778, y: 0.05773502691896258 },
      { x: 0.1, y: 0.05773502691896258 },
      { x: 0.09999999999999999, y: 0.0577350269189626 },
      { x: 0.08888888888888888, y: 0.03849001794597507 },
      { x: 0.06666666666666667, y: 0.03849001794597506 },
      { x: 0.07777777777777778, y: 0.019245008972987546 },
      { x: 0.06666666666666668, y: 1.734723475976807e-17 },
      { x: 0.04444444444444444, y: 1.3877787807814457e-17 },
      { x: 0.03333333333333332, y: 0.01924500897298753 },
      { x: 0.022222222222222227, y: 0 },
      { x: 0, y: 0 },
      { x: 0.011111111111111117, y: -0.019245008972987532 },
      { x: 0, y: -0.038490017945975064 },
      { x: 0.022222222222222233, y: -0.03849001794597505 },
      { x: 0.03333333333333335, y: -0.05773502691896257 },
      { x: 0.02222222222222224, y: -0.0769800358919501 },
      { x: 0, y: -0.07698003589195011 },
      { x: 0.011111111111111134, y: -0.09622504486493763 },
      { x: 0, y: -0.1154700538379252 },
      { x: 0, y: -0.1154700538379252 },
      { x: -0.011111111111111065, y: -0.09622504486493763 },
      { x: 0, y: -0.0769800358919501 },
      { x: -0.022222222222222192, y: -0.07698003589195011 },
      { x: -0.03333333333333331, y: -0.057735026918962595 },
      { x: -0.0222222222222222, y: -0.03849001794597506 },
      { x: 0, y: -0.038490017945975036 },
      { x: -0.011111111111111108, y: -0.019245008972987532 },
      { x: 0, y: 0 },
      { x: -0.02222222222222223, y: 0 },
      { x: -0.033333333333333354, y: 0.01924500897298751 },
      { x: -0.044444444444444446, y: 0 },
      { x: -0.06666666666666667, y: 0 },
      { x: -0.07777777777777778, y: 0.019245008972987494 },
      { x: -0.0666666666666667, y: 0.03849001794597502 },
      { x: -0.0888888888888889, y: 0.03849001794597501 },
      { x: -0.10000000000000003, y: 0.05773502691896253 },
    ]);
    for (const item of items) {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    }
  });
});
