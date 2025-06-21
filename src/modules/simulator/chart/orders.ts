import { Order } from "./models";
import { range } from "../../../libs/collection";

export const OrderType = {
  LOOP: "loop",
  START_END_2X_FASTER: "start_end_2x_faster",
  END_2X_FASTER: "end_2x_faster",
  LINEAR: "linear",
} as const;
export type OrderType = (typeof OrderType)[keyof typeof OrderType];

export type OrderConfig = {
  type: OrderType;
  pointCount: number;
};

class OrderGenerator {
  public generate(config: OrderConfig): Order[] {
    const { type, pointCount } = config;
    switch (type) {
      case OrderType.LINEAR:
        return range(pointCount - 1).map((i) => ({
          link: [i, (i + 1) % pointCount],
        }));
      case OrderType.LOOP:
        return range(pointCount).map((i) => ({
          link: [i, (i + 1) % pointCount],
        }));
      case OrderType.START_END_2X_FASTER:
        return range(pointCount).map((i) => ({
          link: [(2 * i) % pointCount, (2 * (i + 1)) % pointCount],
        }));
      case OrderType.END_2X_FASTER:
        return range(pointCount).map((i) => ({
          link: [i, (2 * (i + 1)) % pointCount],
        }));
      default:
        return [];
    }
  }
}

export default OrderGenerator;
