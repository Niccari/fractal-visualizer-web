import { Point } from "../chart/models";

export const rotateBy = (point: Point, vector: Point, radian: number): Point => {
  const sin = Math.sin(radian);
  const cos = Math.cos(radian);
  return {
    x: point.x + vector.x * cos - vector.y * sin,
    y: point.y + vector.x * sin + vector.y * cos,
  };
};
