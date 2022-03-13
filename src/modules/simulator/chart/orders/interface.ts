import { Order } from "../models";

export const OrderType = {
  LOOP: "loop",
  START_END_2X_FASTER: "start_end_2x_faster",
  END_2X_FASTER: "end_2x_faster",
  LINEAR: "linear",
} as const;
export type OrderType = typeof OrderType[keyof typeof OrderType];

export type OrderConfig = {
  type: OrderType;
  pointCount: number;
};

export interface IOrdersGenerator {
  generate(config: OrderConfig): Order[];
}
