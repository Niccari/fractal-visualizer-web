import BinaryTree from "../../../../../src/modules/simulator/chart/kinds/binaryTree";
import { ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import { baseChart, zip } from "../chartSimulator.test";

describe("Binarytree test", () => {
  test("init test", () => {
    const binaryTree = new BinaryTree({
      ...baseChart,
      kind: ChartType.BINARY_TREE,
      basePoints: [],
      points: [],
      orders: [],
      complexity: 3,
    });
    binaryTree.reset();
    binaryTree.simulate();

    const { points, orders } = binaryTree.getChart();
    const items = zip<Point>(points, [
      { x: 0, y: -0.1 },
      { x: 0, y: 0 },
      { x: -0.060104076400856535, y: 0.06010407640085655 },
      { x: 0.060104076400856535, y: 0.06010407640085655 },
      { x: -0.13235407640085653, y: 0.06010407640085656 },
      { x: -0.06010407640085653, y: 0.13235407640085656 },
      { x: 0.06010407640085653, y: 0.13235407640085656 },
      { x: 0.13235407640085653, y: 0.06010407640085656 },
      { x: -0.17577927160047538, y: 0.016678881201237727 },
      { x: -0.17577927160047538, y: 0.10352927160047541 },
      { x: -0.10352927160047537, y: 0.1757792716004754 },
      { x: -0.016678881201237672, y: 0.1757792716004754 },
      { x: 0.016678881201237672, y: 0.1757792716004754 },
      { x: 0.10352927160047537, y: 0.1757792716004754 },
      { x: 0.17577927160047538, y: 0.10352927160047541 },
      { x: 0.17577927160047538, y: 0.016678881201237727 },
    ]);
    items.forEach((item) => {
      const actualValue = item[0];
      const expectValue = item[1];
      expect(actualValue.x).toBeCloseTo(expectValue.x, 12);
      expect(actualValue.y).toBeCloseTo(expectValue.y, 12);
    });
    expect(orders).toEqual([
      { link: [0, 1] },
      { link: [1, 2] },
      { link: [1, 3] },
      { link: [2, 4] },
      { link: [2, 5] },
      { link: [3, 6] },
      { link: [3, 7] },
      { link: [4, 8] },
      { link: [4, 9] },
      { link: [5, 10] },
      { link: [5, 11] },
      { link: [6, 12] },
      { link: [6, 13] },
      { link: [7, 14] },
      { link: [7, 15] },
    ]);
  });
});
