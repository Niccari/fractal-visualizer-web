import { ChartConfig, Point } from "../../models";
import { FoldRule, IFoldCurveEngine } from "./interface";
import RandomGenerator from "../../../../randomizer";

class FoldCurveEngine implements IFoldCurveEngine {
  private recursive(
    config: ChartConfig,
    div: number,
    depth: number,
    start: Point,
    end: Point,
    rules: FoldRule[],
    lengthRandomizer: RandomGenerator,
    angleRandomizer: RandomGenerator
  ): Point[] {
    const { randomizer, mutation, complexity } = config;
    const rule = rules[div % rules.length];
    const vectorX = end.x - start.x;
    const vectorY = end.y - start.y;
    const divPoints: Point[] = [];
    rule.folds.forEach((fold, i) => {
      const src = (() => {
        if (i === 0 || fold.fromStart) {
          return start;
        }
        if (fold.fromEnd) {
          return end;
        }
        return divPoints[i - 1];
      })();
      const sign = fold.fromEnd ? -1 : 1;
      const { length, radian } = fold;
      const lengthRandom =
        (randomizer?.size?.amplify ?? 0.0) * lengthRandomizer.generate();
      const angleRandom =
        (randomizer?.angle?.amplify ?? 0.0) * angleRandomizer.generate();
      const newLength =
        sign * length * (lengthRandom + (mutation?.size ?? 1.0));
      const newRadian = radian * (angleRandom + (mutation?.angle ?? 1.0));

      const sin = Math.sin(newRadian);
      const cos = Math.cos(newRadian);
      divPoints.push({
        x: src.x + newLength * (cos * vectorX - sin * vectorY),
        y: src.y + newLength * (sin * vectorX + cos * vectorY),
      });
    });
    if (depth === complexity) {
      if (div === 0) {
        return [start, ...divPoints, end];
      }
      if (div < rule.folds.length - 1) {
        return [...divPoints, end];
      }
      return [...divPoints, end];
    }
    const points = [start, ...divPoints, end];
    const range = Array.from({ length: points.length - 1 }, (_, v) => v);
    const pointPairs: [Point, Point][] = range.map((i) => [
      points[i],
      points[i + 1],
    ]);
    return [
      ...pointPairs
        .map((pair, i) => {
          const nextDiv = (rule.folds.length + 1) * div + i;
          const newPoints = this.recursive(
            config,
            nextDiv,
            depth + 1,
            pair[0],
            pair[1],
            rules,
            lengthRandomizer,
            angleRandomizer
          );
          return [...newPoints];
        })
        .reduce((acc, x) => acc.concat(x)),
    ];
  }

  public createPoints(config: ChartConfig, rules: FoldRule[]): Point[] {
    const lengthRandomizer = new RandomGenerator(
      config.randomizer?.size?.seed || -1
    );
    const angleRandomizer = new RandomGenerator(
      config.randomizer?.angle?.seed || -1
    );
    const start: Point = { x: -0.1, y: 0 };
    const end: Point = { x: 0.1, y: 0 };

    const points = this.recursive(
      config,
      0,
      2,
      start,
      end,
      rules,
      lengthRandomizer,
      angleRandomizer
    );
    return points;
  }
}

export default FoldCurveEngine;
