import Star from "../../../../../src/modules/simulator/chart/kinds/star";
import { ChartType } from "../../../../../src/modules/simulator/chart/models";
import { baseChart } from "../chartSimulator.test";

describe("Star test", () => {
  test("init test", () => {
    const star = new Star({
      ...baseChart,
      kind: ChartType.STAR,
      basePoints: [],
      points: [],
      orders: [],
      complexity: 3,
    });
    star.reset();
    star.simulate();

    const { orders } = star.getChart();
    expect(orders).toStrictEqual([{ link: [0, 2] }, { link: [2, 1] }, { link: [1, 0] }]);
  });
});
