import Star from "../../../../../src/modules/simulator/chart/kinds/star";
import { ChartType } from "../../../../../src/modules/simulator/chart/models";
import ChartSimulator from "../../../../../src/modules/simulator/chart";
import { baseChart } from "../testCommon";

describe("Star test", () => {
  test("init test", () => {
    const chart = new Star();
    const simulator = new ChartSimulator(chart, {
      ...baseChart,
      kind: ChartType.STAR,
      complexity: 3,
    });
    simulator.reset();
    const { orders } = simulator.simulate();

    expect(orders).toStrictEqual([{ link: [0, 2] }, { link: [2, 1] }, { link: [1, 0] }]);
  });
});
