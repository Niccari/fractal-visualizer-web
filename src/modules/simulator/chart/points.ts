import { Point } from "./models";
import { range } from "../../../libs/collection";
import { Constants } from "../../../constants";

export const PointsType = {
  CIRCLE: "circle",
  RANDOM: "random",
} as const;
export type PointsType = (typeof PointsType)[keyof typeof PointsType];

export type PointsConfig = {
  type: PointsType;
  length: number;
};

class PointsGenerator {
  public generate(config: PointsConfig): Point[] {
    const { type, length } = config;
    const { baseAmplitude } = Constants;
    switch (type) {
      case PointsType.CIRCLE: {
        const radians = range(length).map((i) => (2 * Math.PI * i) / length);
        return radians.map((radian) => ({
          x: baseAmplitude * Math.sin(radian),
          y: baseAmplitude * Math.cos(radian),
        }));
      }
      case PointsType.RANDOM: {
        return range(length).map(() => ({
          x: baseAmplitude * (Math.random() - 0.5),
          y: baseAmplitude * (Math.random() - 0.5),
        }));
      }
      default:
        return [];
    }
  }
}

export default PointsGenerator;
