import { Chart, ChartType, IChartSimulator, MutableChart } from "./chart";
import { RandomGenerator } from "../../randomizer";
import ColorGenerator from "../color";

export class ChartSimulator implements IChartSimulator {
  protected _chart: MutableChart;
  private readonly _colorGenerator;
  constructor(chart: MutableChart) {
    this._chart = chart;
    this._colorGenerator = new ColorGenerator(this._chart.color);
  }
  reset(): void {
    this.setBasePoints();
    this.setOrders();
  }
  getChart(): Chart {
    return this._chart;
  }
  pointLength(): number {
    return this._chart.complexity;
  }
  setBasePoints(): void {
    const chart = this._chart;
    chart.basePoints = [];
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      const radian = (2 * Math.PI * i) / pointLength;
      const x = 0.1 * Math.sin(radian);
      const y = 0.1 * Math.cos(radian);
      chart.basePoints[i] = { x, y };
    }
  }
  setOrders(): void {
    const chart = this._chart;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      chart.orders.push({
        link: [i, (i + 1) % pointLength],
      });
    }
  }
  simulate(): void {
    const chart = this._chart;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      const translateX = chart.basePoints[i].x * chart.scale.w;
      const translateY = chart.basePoints[i].y * chart.scale.h;
      const sin = Math.sin(chart.rotation.angle);
      const cos = Math.cos(chart.rotation.angle);
      chart.points[i] = {
        x: chart.center.x + translateX * cos - translateY * sin,
        y: chart.center.y + translateX * sin + translateY * cos,
      };
    }
    chart.rotation.angle += chart.rotation.speed;
    if (chart.rotation.angle > Math.PI) {
      chart.rotation.angle -= 2 * Math.PI;
    }
    if (chart.rotation.angle < -Math.PI) {
      chart.rotation.angle += 2 * Math.PI;
    }

    for (let index = 0; index < chart.orders.length; index++) {
      chart.colors[index] = this._colorGenerator.next();
    }
    this._colorGenerator.endIteration();
  }
}

class Circle extends ChartSimulator {}
class Star extends ChartSimulator {
  setOrders(): void {
    const chart = this._chart;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      const start = (2 * i) % pointLength;
      const end = (2 * i + 2) % pointLength;
      chart.orders.push({
        link: [start, end],
      });
    }
  }
}

class Sunrise extends ChartSimulator {
  setOrders(): void {
    const chart = this._chart;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      const start = i;
      const end = (2 * i + 2) % pointLength;
      chart.orders.push({
        link: [start, end],
      });
    }
  }
}

class Clover extends ChartSimulator {
  pointLength(): number {
    return this._chart.complexity * 40;
  }
  setBasePoints(): void {
    for (let i = 0; i < this.pointLength(); i++) {
      const sinA = Math.sin((2 * Math.PI * this._chart.complexity * i) / this.pointLength());
      this._chart.basePoints[i] = {
        x: 0.1 * sinA * Math.cos((2 * Math.PI * i) / this.pointLength() - Math.PI),
        y: 0.1 * sinA * Math.sin((2 * Math.PI * i) / this.pointLength() - Math.PI),
      };
    }
  }
}

class Starmine extends ChartSimulator {
  pointLength(): number {
    return this._chart.complexity * 2;
  }
  setBasePoints(): void {
    for (let i = 0; i < this.pointLength(); i++) {
      const angle = (2 * Math.PI * i) / this.pointLength() - Math.PI;
      if (i % 2 === 0) {
        this._chart.basePoints[i] = {
          x: 0.1 * Math.cos(angle),
          y: 0.1 * Math.sin(angle),
        };
      } else {
        this._chart.basePoints[i] = {
          x: (0.1 * Math.cos(angle)) / 4,
          y: (0.1 * Math.sin(angle)) / 4,
        };
      }
    }
  }
}

class Random extends ChartSimulator {
  simulate(): void {
    const chart = this._chart;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      const x = 0.1 * (Math.random() - 0.5);
      const y = 0.1 * (Math.random() - 0.5);
      chart.basePoints[i] = { x, y };
    }
    super.simulate();
  }
}

// noinspection DuplicatedCode
class KochCurve extends ChartSimulator {
  protected readonly length0 = 1.0;
  protected readonly angle0 = (60 * Math.PI) / 180;
  private readonly lengthRandom: RandomGenerator;
  private readonly angleRandom: RandomGenerator;

  constructor(chart: MutableChart) {
    super(chart);
    this.lengthRandom = new RandomGenerator(chart.randomizer?.size?.seed || -1);
    this.angleRandom = new RandomGenerator(chart.randomizer?.angle?.seed || -1);

    this._chart.complexity = (() => {
      if (chart.complexity < 3) {
        return 3;
      } else if (chart.complexity > 10) {
        return 10;
      } else {
        return chart.complexity;
      }
    })();
  }
  pointLength(): number {
    const complexity = this._chart.complexity;
    return Math.pow(2, 2 * (complexity - 1)) + 1;
  }
  setBasePoints(): void {
    this._chart.basePoints = [];
    this._chart.basePoints.push({ x: -0.1, y: 0.0 });
    this._chart.basePoints.push({ x: 0.1, y: 0.0 });
    this.divideBasePoints(1, this.length0, this.angle0);
  }
  protected divideBasePoints(depth: number, parentLength: number, parentAngle: number): void {
    const lengthRandom = (this._chart.randomizer?.size?.amplify || 0.0) * this.lengthRandom.generate();
    const angleRandom = (this._chart.randomizer?.angle?.amplify || 0.0) * this.angleRandom.generate();
    const length = parentLength * (lengthRandom + (this._chart.mutation?.size || 1.0));
    const angle = parentAngle * (angleRandom + (this._chart.mutation?.angle || 1.0));
    if (depth >= this._chart.complexity) {
      return;
    }
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const iterateLength = Math.pow(2, 2 * depth);
    for (let i = 0; i < iterateLength; i++) {
      const mod4 = i % 4;
      if (mod4 <= 1) {
        const start = this._chart.basePoints[i];
        const end = this._chart.basePoints[i + 1];
        const vectorX = end.x - start.x;
        const vectorY = end.y - start.y;
        this._chart.basePoints.splice(i + 1, 0, {
          x: start.x + (vectorX * length) / (3 - mod4),
          y: start.y + (vectorY * length) / (3 - mod4),
        });
      } else if (mod4 == 2) {
        const start = this._chart.basePoints[i - 1];
        const end = this._chart.basePoints[i];
        const vectorX = end.x - start.x;
        const vectorY = end.y - start.y;
        this._chart.basePoints.splice(i, 0, {
          x: start.x + length * (cos * vectorX - sin * vectorY),
          y: start.y + length * (sin * vectorX + cos * vectorY),
        });
      }
    }
    this.divideBasePoints(depth + 1, length, angle);
  }
  setOrders(): void {
    for (let i = 0; i < this.pointLength() - 1; i++) {
      this._chart.orders[i] = {
        link: [i, i + 1],
      };
    }
  }
}

class KochTriangle extends KochCurve {
  isInner = false;

  constructor(_chart: MutableChart) {
    super(_chart);
    this.isInner = _chart.kind === ChartType.KOCH_TRIANGLE_INNER;
  }
  pointLength(): number {
    const complexity = this._chart.complexity;
    return 3 * (Math.pow(2, 2 * (complexity - 1)) + 1);
  }
  setBasePoints(): void {
    this._chart.basePoints = [];
    this._chart.basePoints.push({ x: -0.1, y: 0.0 });
    this._chart.basePoints.push({ x: 0.1, y: 0.0 });
    this.divideBasePoints(1, this.length0, this.angle0);

    const sin120 = -Math.sin((120 * Math.PI) / 180);
    const cos120 = Math.cos((120 * Math.PI) / 180);

    const pointLength = this.pointLength();
    if (this.isInner) {
      for (let i = 0; i < pointLength / 3; i++) {
        this._chart.basePoints[i].y = -this._chart.basePoints[i].y;
      }
    }
    for (let i = 0; i < pointLength / 3; i++) {
      this._chart.basePoints[i].y += 0.1 / Math.sqrt(3);
    }
    for (let i = 0; i < pointLength / 3; i++) {
      const baseX = this._chart.basePoints[i].x;
      const baseY = this._chart.basePoints[i].y;
      this._chart.basePoints.push({
        x: baseX * cos120 - baseY * sin120,
        y: baseX * sin120 + baseY * cos120,
      });
    }
    for (let i = 0; i < pointLength / 3; i++) {
      const baseX = this._chart.basePoints[i + pointLength / 3].x;
      const baseY = this._chart.basePoints[i + pointLength / 3].y;
      this._chart.basePoints.push({
        x: baseX * cos120 - baseY * sin120,
        y: baseX * sin120 + baseY * cos120,
      });
    }
  }
  setOrders(): void {
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength - 1; i++) {
      this._chart.orders[i] = {
        link: [i, i + 1],
      };
    }
  }
}

enum FoldCurveType {
  DRAGON = "dragon",
  TRIANGLE = "triangle",
  CCURVE = "ccurve",
}

// noinspection DuplicatedCode
class FoldCurve extends ChartSimulator {
  private readonly arm0 = Math.sqrt(2) / 2;
  private readonly angle0 = (45 * Math.PI) / 180;
  private readonly curveType: FoldCurveType;
  private readonly lengthRandom: RandomGenerator;
  private readonly angleRandom: RandomGenerator;

  constructor(_chart: MutableChart) {
    super(_chart);
    this.lengthRandom = new RandomGenerator(_chart.randomizer?.size?.seed || -1);
    this.angleRandom = new RandomGenerator(_chart.randomizer?.angle?.seed || -1);
    this.curveType = (() => {
      switch (this._chart.kind) {
        case ChartType.FOLD_CCURVE:
          return FoldCurveType.CCURVE;
        case ChartType.FOLD_TRIANGLE:
          return FoldCurveType.TRIANGLE;
        case ChartType.FOLD_DRAGON:
          return FoldCurveType.DRAGON;
        default:
          throw new Error("Unsupported curve type!");
      }
    })();
    this._chart.complexity = (() => {
      if (_chart.complexity < 3) {
        return 3;
      } else if (_chart.complexity > 12) {
        return 12;
      } else {
        return _chart.complexity;
      }
    })();
  }
  pointLength(): number {
    const complexity = this._chart.complexity;
    return Math.pow(2, complexity - 1) + 1;
  }
  setBasePoints(): void {
    const chart = this._chart;
    chart.basePoints.push({ x: -0.1, y: 0.0 });
    chart.basePoints.push({ x: 0.1, y: 0.0 });
    this.divideBasePoints(1, this.arm0, this.angle0);
  }
  protected divideBasePoints(depth: number, parentLength: number, parentAngle: number): void {
    const lengthRandom = (this._chart.randomizer?.size?.amplify || 0.0) * this.lengthRandom.generate();
    const angleRandom = (this._chart.randomizer?.angle?.amplify || 0.0) * this.angleRandom.generate();
    const length = parentLength * (lengthRandom + (this._chart.mutation?.size || 1.0));
    const angle = parentAngle * (angleRandom + (this._chart.mutation?.angle || 1.0));
    if (depth >= this._chart.complexity) {
      return;
    }
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const iterateLength = Math.pow(2, depth - 1);
    for (let i = iterateLength; i > 0; i--) {
      const start = this._chart.basePoints[i];
      const end = this._chart.basePoints[i - 1];
      const vectorX = end.x - start.x;
      const vectorY = end.y - start.y;
      const newPoint = (() => {
        if (this.isLeftFold(i, depth)) {
          return {
            x: start.x + length * (cos * vectorX - sin * vectorY),
            y: start.y + length * (sin * vectorX + cos * vectorY),
          };
        } else {
          return {
            x: start.x + length * (cos * vectorX + sin * vectorY),
            y: start.y + length * (-sin * vectorX + cos * vectorY),
          };
        }
      })();
      this._chart.basePoints.splice(i, 0, newPoint);
    }
    this.divideBasePoints(depth + 1, length, angle);
  }
  private isLeftFold(i: number, depth: number): boolean {
    switch (this.curveType) {
      case FoldCurveType.DRAGON:
        return i % 2 == 0;
      case FoldCurveType.TRIANGLE:
        return (i + depth) % 2 == 0;
      case FoldCurveType.CCURVE:
        return true;
      default:
        throw new Error("Unsupported CurveType!");
    }
  }
  setOrders(): void {
    for (let i = 0; i < this.pointLength() - 1; i++) {
      this._chart.orders[i] = {
        link: [i, i + 1],
      };
    }
  }
}

enum TriCurveType {
  CIS = "cis",
  TRANS = "trans",
}

// noinspection DuplicatedCode
class TriCurve extends ChartSimulator {
  private readonly curveType;
  private readonly lengthRandom: RandomGenerator;
  private readonly angleRandom: RandomGenerator;

  constructor(_chart: MutableChart) {
    super(_chart);
    this.lengthRandom = new RandomGenerator(_chart.randomizer?.size?.seed || -1);
    this.angleRandom = new RandomGenerator(_chart.randomizer?.angle?.seed || -1);
    this.curveType = (() => {
      switch (this._chart.kind) {
        case ChartType.TRI_CIS:
          return TriCurveType.CIS;
        case ChartType.TRI_TRANS:
          return TriCurveType.TRANS;
        default:
          throw new Error("Unsupported curve type!");
      }
    })();
    this._chart.complexity = (() => {
      if (_chart.complexity > 7) {
        return 7;
      } else {
        return _chart.complexity;
      }
    })();
  }

  pointLength(): number {
    const complexity = this._chart.complexity;
    return Math.pow(4, complexity) + 1;
  }

  setBasePoints(): void {
    const chart = this._chart;
    chart.basePoints = [];
    chart.basePoints.push({ x: -0.1, y: 0.0 });
    chart.basePoints.push({ x: 0.1, y: 0.0 });
    this.divideBasePoints(1, 1.0, (90 * Math.PI) / 180);
  }

  protected divideBasePoints(depth: number, parentLength: number, parentAngle: number): void {
    const lengthRandom = (this._chart.randomizer?.size?.amplify || 0.0) * this.lengthRandom.generate();
    const angleRandom = (this._chart.randomizer?.angle?.amplify || 0.0) * this.angleRandom.generate();
    const length = parentLength * (lengthRandom + (this._chart.mutation?.size || 1.0));
    const angle = parentAngle * (angleRandom + (this._chart.mutation?.angle || 1.0));
    if (depth > this._chart.complexity) {
      return;
    }
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const iterateLength = Math.pow(4, depth - 1);
    for (let i = iterateLength; i > 0; i--) {
      const start = this._chart.basePoints[i];
      const end = this._chart.basePoints[i - 1];
      const midX = (end.x + start.x) / 2;
      const midY = (end.y + start.y) / 2;
      const startMidX = midX - start.x;
      const startMidY = midY - start.y;
      const midEndX = end.x - midX;
      const midEndY = end.y - midY;
      const midPoint = {
        x: midX,
        y: midY,
      };

      const length_signed = this.curveType == TriCurveType.CIS ? -length : length;
      const sin_signed = this.curveType == TriCurveType.TRANS && i % 2 == 0 ? sin : -sin;
      this._chart.basePoints.splice(i, 0, {
        x: start.x + length_signed * (cos * startMidX + sin_signed * startMidY),
        y: start.y + length_signed * (-sin_signed * startMidX + cos * startMidY),
      });
      this._chart.basePoints.splice(i, 0, midPoint);
      this._chart.basePoints.splice(i, 0, {
        x: end.x - length_signed * (cos * midEndX - sin_signed * midEndY),
        y: end.y - length_signed * (sin_signed * midEndX + cos * midEndY),
      });
    }
    this.divideBasePoints(depth + 1, length, angle);
  }

  setOrders(): void {
    for (let i = 0; i < this.pointLength() - 1; i++) {
      this._chart.orders[i] = {
        link: [i, i + 1],
      };
    }
  }
}

// noinspection DuplicatedCode
class BinaryTree extends ChartSimulator {
  private readonly lengthRandom: RandomGenerator;
  private readonly angleRandom: RandomGenerator;

  constructor(_chart: MutableChart) {
    super(_chart);
    this.lengthRandom = new RandomGenerator(_chart.randomizer?.size?.seed || -1);
    this.angleRandom = new RandomGenerator(_chart.randomizer?.angle?.seed || -1);
    this._chart.complexity = (() => {
      if (_chart.complexity < 2) {
        return 2;
      } else if (_chart.complexity > 10) {
        return 10;
      } else {
        return _chart.complexity;
      }
    })();
  }
  pointLength(): number {
    const complexity = this._chart.complexity;
    return Math.pow(2, complexity + 1);
  }
  setBasePoints(): void {
    const chart = this._chart;
    chart.basePoints[0] = { x: 0.0, y: -0.1 };
    chart.basePoints[1] = { x: 0.0, y: 0.0 };
    this.divideBasePoints(1, 0.85, (45 * Math.PI) / 180);
  }
  protected divideBasePoints(depth: number, parentLength: number, parentAngle: number): void {
    const lengthRandom = (this._chart.randomizer?.size?.amplify || 0.0) * this.lengthRandom.generate();
    const angleRandom = (this._chart.randomizer?.angle?.amplify || 0.0) * this.angleRandom.generate();
    const length = parentLength * (lengthRandom + (this._chart.mutation?.size || 1.0));
    const angle = parentAngle * (angleRandom + (this._chart.mutation?.angle || 1.0));
    if (depth >= Math.floor(this.pointLength() / 2)) {
      return;
    }
    const start = this._chart.basePoints[Math.floor(depth / 2)];
    const end = this._chart.basePoints[depth];
    const vectorX = end.x - start.x;
    const vectorY = end.y - start.y;

    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    this._chart.basePoints[2 * depth] = {
      x: end.x + length * (cos * vectorX - sin * vectorY),
      y: end.y + length * (sin * vectorX + cos * vectorY),
    };
    this._chart.basePoints[2 * depth + 1] = {
      x: end.x + length * (cos * vectorX + sin * vectorY),
      y: end.y + length * (-sin * vectorX + cos * vectorY),
    };
    this.divideBasePoints(2 * depth, length, angle);
    this.divideBasePoints(2 * depth + 1, length, angle);
  }
  setOrders(): void {
    this._chart.orders[0] = {
      link: [0, 1],
    };
    this.setOrdersRecursive(1, 1);
  }
  setOrdersRecursive(base: number, src: number): void {
    if (base >= this.pointLength() / 2) {
      return;
    }
    const dstLeft = 2 * base;
    const dstRight = 2 * base + 1;
    this._chart.orders[dstLeft - 1] = {
      link: [src, dstLeft],
    };
    this._chart.orders[dstRight - 1] = {
      link: [src, dstRight],
    };
    this.setOrdersRecursive(dstLeft, dstLeft);
    this.setOrdersRecursive(dstRight, dstRight);
  }
}

type InstantiateChart = (_: MutableChart) => ChartSimulator;
const instantiateChart: InstantiateChart = (mutableChart: MutableChart) => {
  switch (mutableChart.kind) {
    case ChartType.STAR:
      return new Star(mutableChart);
    case ChartType.STARMINE:
      return new Starmine(mutableChart);
    case ChartType.SUNRISE:
      return new Sunrise(mutableChart);
    case ChartType.CIRCLE:
      return new Circle(mutableChart);
    case ChartType.CLOVER:
      return new Clover(mutableChart);
    case ChartType.RANDOM:
      return new Random(mutableChart);
    case ChartType.FOLD_CCURVE:
    case ChartType.FOLD_TRIANGLE:
    case ChartType.FOLD_DRAGON:
      return new FoldCurve(mutableChart);
    case ChartType.KOCH_CURVE:
      return new KochCurve(mutableChart);
    case ChartType.KOCH_TRIANGLE_INNER:
    case ChartType.KOCH_TRIANGLE_OUTER:
      return new KochTriangle(mutableChart);
    case ChartType.TRI_CIS:
    case ChartType.TRI_TRANS:
      return new TriCurve(mutableChart);
    case ChartType.BINARY_TREE:
      return new BinaryTree(mutableChart);
    default:
      throw new Error("Unsupported chart type!");
  }
};

export type { Chart, MutableChart };
export { instantiateChart };
