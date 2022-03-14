import Sunrise from "../../../../../src/modules/simulator/chart/kinds/sunrise";
import { ChartType } from "../../../../../src/modules/simulator/chart/models";
import { baseChart } from "../testCommon";
import ChartSimulator from "../../../../../src/modules/simulator/chart";

describe("Sunrise test", () => {
  test("init test", () => {
    const chart = new Sunrise();
    const simulator = new ChartSimulator(chart, {
      ...baseChart,
      kind: ChartType.SUNRISE,
      complexity: 5,
    });
    simulator.reset();

    const { orders } = simulator.simulate();
    expect(orders).toStrictEqual([
      { link: [0, 2] },
      { link: [1, 4] },
      { link: [2, 1] },
      { link: [3, 3] },
      { link: [4, 0] },
    ]);
  });
});
