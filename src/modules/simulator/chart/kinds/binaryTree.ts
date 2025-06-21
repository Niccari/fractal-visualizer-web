import { degree2radian } from "../../../../libs/math";
import RandomGenerator from "../../../randomizer";
import { ChartConfig, Order, Point } from "../models";
import { Constants } from "../../../../constants";
import { rotateBy } from "../../matrix";

interface PointWithIndex extends Point {
  index: number;
}

class BinaryTree {
  private static pointCounts(complexity: number): number {
    const newComplexity = Math.max(Math.min(complexity, 10), 2);
    return 2 ** (newComplexity + 1);
  }

  public configureBasePoints(config: ChartConfig): Point[] {
    const lengthRandom = new RandomGenerator(config.randomizer?.size?.seed || -1);
    const angleRandom = new RandomGenerator(config.randomizer?.angle?.seed || -1);
    const { baseAmplitude } = Constants;
    const basePoints: PointWithIndex[] = [
      { x: 0.0, y: -baseAmplitude, index: 0 },
      { x: 0.0, y: 0.0, index: 1 },
    ];
    const result = this.divideBasePoints(
      config,
      basePoints[0],
      basePoints[1],
      1,
      0.85,
      degree2radian(45),
      lengthRandom,
      angleRandom,
    );
    return [basePoints[0], basePoints[1], ...result];
  }

  private divideBasePoints(
    config: ChartConfig,
    start: PointWithIndex,
    end: PointWithIndex,
    depth: number,
    parentLength: number,
    parentAngle: number,
    lengthRandomizer: RandomGenerator,
    angleRandomizer: RandomGenerator,
  ): PointWithIndex[] {
    const { complexity, randomizer, mutation } = config;
    const lengthRandom = (randomizer?.size?.amplify || 0.0) * lengthRandomizer.generate();
    const angleRandom = (randomizer?.angle?.amplify || 0.0) * angleRandomizer.generate();
    const length = parentLength * (lengthRandom + (mutation?.size || 1.0));
    const angle = parentAngle * (angleRandom + (mutation?.angle || 1.0));
    if (depth >= Math.floor(BinaryTree.pointCounts(complexity) / 2)) {
      return [];
    }
    const vector = {
      x: length * (end.x - start.x),
      y: length * (end.y - start.y),
    };
    const leftDepth = 2 * depth;
    const rightDepth = 2 * depth + 1;
    const leftPoint = {
      ...rotateBy(end, vector, angle),
      index: leftDepth,
    };
    const rightPoint = {
      ...rotateBy(end, vector, -angle),
      index: rightDepth,
    };
    const result: PointWithIndex[] = [];
    result.push(
      ...this.divideBasePoints(config, end, leftPoint, leftDepth, length, angle, lengthRandomizer, angleRandomizer),
    );
    result.push(
      ...this.divideBasePoints(config, end, rightPoint, rightDepth, length, angle, lengthRandomizer, angleRandomizer),
    );
    return [leftPoint, rightPoint, ...result.sort((a, b) => a.index - b.index)];
  }

  // eslint-disable-next-line class-methods-use-this
  public configureOrders(complexity: number): Order[] {
    const maxDepth = BinaryTree.pointCounts(complexity) / 2;
    return [{ link: [0, 1] }, ...this.setOrdersRecursive(maxDepth, 1).sort((a, b) => a.link[1] - b.link[1])];
  }

  public setOrdersRecursive(maxDepth: number, base: number): Order[] {
    if (base >= maxDepth) {
      return [];
    }
    const dstLeft = 2 * base;
    const dstRight = 2 * base + 1;
    const leftOrder = { link: [base, dstLeft] };
    const rightOrder = { link: [base, dstRight] };
    const leftOrders = this.setOrdersRecursive(maxDepth, dstLeft);
    const rightOrders = this.setOrdersRecursive(maxDepth, dstRight);
    return [leftOrder, rightOrder, ...leftOrders, ...rightOrders];
  }
}

export default BinaryTree;
