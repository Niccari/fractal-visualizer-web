import KochTriangle from "../../../../../src/modules/simulator/chart/kinds/kochTriangle";
import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, zip } from "../chartSimulator.test";

describe("Koch Triangle Outer Curve test", () => {
  test("init test", () => {
    const kochTriangleOuterCurve = new KochTriangle({
      ...baseChart,
      kind: ChartType.KOCH_TRIANGLE_OUTER,
      basePoints: [],
      points: [],
      orders: [],
      complexity: 3,
    });
    kochTriangleOuterCurve.reset();
    kochTriangleOuterCurve.simulate();

    const { points } = kochTriangleOuterCurve.getChart();
    const items = zip<Point>(points, [
      { x: -0.1, y: 0.05773502691896258 },
      { x: -0.07777777777777778, y: 0.05773502691896258 },
      { x: -0.06666666666666667, y: 0.0769800358919501 },
      { x: -0.05555555555555556, y: 0.05773502691896258 },
      { x: -0.03333333333333334, y: 0.05773502691896258 },
      { x: -0.022222222222222227, y: 0.07698003589195011 },
      { x: -0.033333333333333326, y: 0.09622504486493764 },
      { x: -0.01111111111111111, y: 0.09622504486493763 },
      { x: 0, y: 0.11547005383792516 },
      { x: 0.011111111111111118, y: 0.09622504486493763 },
      { x: 0.03333333333333334, y: 0.09622504486493763 },
      { x: 0.022222222222222227, y: 0.0769800358919501 },
      { x: 0.03333333333333334, y: 0.05773502691896258 },
      { x: 0.055555555555555566, y: 0.05773502691896258 },
      { x: 0.06666666666666668, y: 0.0769800358919501 },
      { x: 0.07777777777777778, y: 0.05773502691896258 },
      { x: 0.1, y: 0.05773502691896258 },
      { x: 0.09999999999999999, y: 0.0577350269189626 },
      { x: 0.08888888888888888, y: 0.03849001794597507 },
      { x: 0.09999999999999998, y: 0.019245008972987546 },
      { x: 0.07777777777777778, y: 0.019245008972987546 },
      { x: 0.06666666666666668, y: 0 },
      { x: 0.07777777777777779, y: -0.01924500897298751 },
      { x: 0.1, y: -0.019245008972987518 },
      { x: 0.08888888888888889, y: -0.038490017945975036 },
      { x: 0.10000000000000002, y: -0.05773502691896256 },
      { x: 0.07777777777777778, y: -0.05773502691896257 },
      { x: 0.06666666666666668, y: -0.07698003589195009 },
      { x: 0.05555555555555556, y: -0.05773502691896257 },
      { x: 0.03333333333333335, y: -0.05773502691896257 },
      { x: 0.02222222222222224, y: -0.0769800358919501 },
      { x: 0.03333333333333334, y: -0.09622504486493763 },
      { x: 0.011111111111111134, y: -0.09622504486493763 },
      { x: 0, y: -0.11547005383792516 },
      { x: 0, y: -0.11547005383792515 },
      { x: -0.011111111111111065, y: -0.09622504486493763 },
      { x: -0.033333333333333284, y: -0.09622504486493762 },
      { x: -0.022222222222222192, y: -0.07698003589195011 },
      { x: -0.03333333333333331, y: -0.057735026918962595 },
      { x: -0.05555555555555554, y: -0.05773502691896261 },
      { x: -0.06666666666666665, y: -0.07698003589195013 },
      { x: -0.07777777777777775, y: -0.0577350269189626 },
      { x: -0.09999999999999998, y: -0.05773502691896262 },
      { x: -0.08888888888888888, y: -0.03849001794597508 },
      { x: -0.09999999999999998, y: -0.01924500897298756 },
      { x: -0.07777777777777777, y: -0.019245008972987553 },
      { x: -0.06666666666666667, y: 0 },
      { x: -0.07777777777777778, y: 0.019245008972987494 },
      { x: -0.1, y: 0.0192450089729875 },
      { x: -0.0888888888888889, y: 0.03849001794597501 },
      { x: -0.10000000000000003, y: 0.05773502691896253 },
    ]);
    items.forEach((item) => {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    });
  });
});