import { Point } from "../models";

export const PointsType = {
  CIRCLE: "circle",
  RANDOM: "random",
} as const;
export type PointsType = typeof PointsType[keyof typeof PointsType];

export type PointsConfig = {
  type: PointsType;
  length: number;
};

export interface IPointsGenerator {
  generate(config: PointsConfig): Point[];
}
