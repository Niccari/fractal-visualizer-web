import { IPointsGenerator, PointsConfig, PointsType } from "./interface";
import { Point } from "../models";
import { range } from "../../../../libs/collection";

class PointsGenerator implements IPointsGenerator {
  // eslint-disable-next-line class-methods-use-this
  public generate(config: PointsConfig): Point[] {
    const { type, length } = config;
    const baseAmplitude = 0.1;
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
