import BinaryTree from "../../../../../src/modules/simulator/chart/kinds/binaryTree";
import { ChartConfig, ChartType, Point } from "../../../../../src/modules/simulator/chart/models";
import ChartSimulator from "../../../../../src/modules/simulator/chart";
import { baseChart, zip } from "../testCommon";

describe("Binarytree test", () => {
  test("init test", () => {
    const binaryTree = new BinaryTree();
    const config: ChartConfig = {
      ...baseChart,
      complexity: 3,
      kind: ChartType.BINARY_TREE,
    };
    const simulator = new ChartSimulator(binaryTree, config);
    simulator.reset();
    const { points } = simulator.simulate();
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
  });
});
