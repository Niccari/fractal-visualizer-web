import OrderGenerator from "../../../../../src/modules/simulator/chart/orders";
import { OrderType } from "../../../../../src/modules/simulator/chart/orders";

describe("OrdersGenerator test", () => {
  test("loop test", () => {
    const ordersGenerator = new OrderGenerator();
    const orders = ordersGenerator.generate({
      type: OrderType.LOOP,
      pointCount: 6,
    });
    expect(orders).toEqual([
      { link: [0, 1] },
      { link: [1, 2] },
      { link: [2, 3] },
      { link: [3, 4] },
      { link: [4, 5] },
      { link: [5, 0] },
    ]);
  });

  test("linear test", () => {
    const ordersGenerator = new OrderGenerator();
    const orders = ordersGenerator.generate({
      type: OrderType.LINEAR,
      pointCount: 8,
    });
    expect(orders).toEqual([
      { link: [0, 1] },
      { link: [1, 2] },
      { link: [2, 3] },
      { link: [3, 4] },
      { link: [4, 5] },
      { link: [5, 6] },
      { link: [6, 7] },
    ]);
  });

  test("start_end_2x_faster test even", () => {
    const ordersGenerator = new OrderGenerator();
    const orders = ordersGenerator.generate({
      type: OrderType.START_END_2X_FASTER,
      pointCount: 6,
    });
    expect(orders).toEqual([
      { link: [0, 2] },
      { link: [2, 4] },
      { link: [4, 0] },
      { link: [0, 2] },
      { link: [2, 4] },
      { link: [4, 0] },
    ]);
  });

  test("start_end_2x_faster test odd", () => {
    const ordersGenerator = new OrderGenerator();
    const orders = ordersGenerator.generate({
      type: OrderType.START_END_2X_FASTER,
      pointCount: 7,
    });
    expect(orders).toEqual([
      { link: [0, 2] },
      { link: [2, 4] },
      { link: [4, 6] },
      { link: [6, 1] },
      { link: [1, 3] },
      { link: [3, 5] },
      { link: [5, 0] },
    ]);
  });

  test("end_2x_faster test even", () => {
    const ordersGenerator = new OrderGenerator();
    const orders = ordersGenerator.generate({
      type: OrderType.END_2X_FASTER,
      pointCount: 8,
    });
    expect(orders).toEqual([
      { link: [0, 2] },
      { link: [1, 4] },
      { link: [2, 6] },
      { link: [3, 0] },
      { link: [4, 2] },
      { link: [5, 4] },
      { link: [6, 6] },
      { link: [7, 0] },
    ]);
  });

  test("end_2x_faster test odd", () => {
    const ordersGenerator = new OrderGenerator();
    const orders = ordersGenerator.generate({
      type: OrderType.END_2X_FASTER,
      pointCount: 7,
    });
    expect(orders).toEqual([
      { link: [0, 2] },
      { link: [1, 4] },
      { link: [2, 6] },
      { link: [3, 1] },
      { link: [4, 3] },
      { link: [5, 5] },
      { link: [6, 0] },
    ]);
  });
});
