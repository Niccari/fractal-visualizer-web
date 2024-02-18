import PointsGenerator from "../../../../../src/modules/simulator/chart/points";
import { PointsType } from "../../../../../src/modules/simulator/chart/points/interface";
import { zip } from "../testCommon";
import { Point } from "../../../../../src/modules/simulator/chart/models";

describe("PointsGenerator test", () => {
  test("circle test", () => {
    const pointsGenerator = new PointsGenerator();
    const points = pointsGenerator.generate({
      type: PointsType.CIRCLE,
      length: 12,
    });
    const items = zip<Point>(points, [
      { x: 0, y: 0.1 },
      { x: 0.05, y: 0.08660254037844388 },
      { x: 0.08660254037844387, y: 0.05 },
      { x: 0.1, y: 0 },
      { x: 0.08660254037844388, y: -0.05 },
      { x: 0.05, y: -0.08660254037844388 },
      { x: 0.0, y: -0.1 },
      { x: -0.05, y: -0.08660254037844389 },
      { x: -0.08660254037844385, y: -0.05 },
      { x: -0.1, y: -0.0 },
      { x: -0.08660254037844387, y: 0.05 },
      { x: -0.05, y: 0.08660254037844384 },
    ]);
    for (const item of items) {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    }
  });
});
