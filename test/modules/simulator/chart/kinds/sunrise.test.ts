import Sunrise from "../../../../../src/modules/simulator/chart/kinds/sunrise";
import { ChartType } from "../../../../../src/modules/simulator/chart/models";
import { baseChart } from "../chartSimulator.test";

describe("Sunrise test", () => {
  test("init test", () => {
    const sunrise = new Sunrise({
      ...baseChart,
      kind: ChartType.SUNRISE,
      basePoints: [],
      points: [],
      orders: [],
      complexity: 5,
    });
    sunrise.reset();
    sunrise.simulate();

    const { orders } = sunrise.getChart();
    expect(orders).toStrictEqual([
      { link: [0, 2] },
      { link: [1, 4] },
      { link: [2, 1] },
      { link: [3, 3] },
      { link: [4, 0] },
    ]);
  });
});
