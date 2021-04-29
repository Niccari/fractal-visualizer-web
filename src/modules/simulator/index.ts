import { Chart, DefaultComplexity, IChartSimulator, Point, StyleType } from "./chart";
import { ColorConfig, ColorType, IColorGenerator } from "./color";
import newCharts from "../../charts.json";

interface Scale {
  w: number;
  h: number;
}

interface Rotation {
  angle: number;
  speed: number;
}

interface Mutation {
  size: number;
  angle: number;
}
interface RandomItem {
  amplify: number;
  seed: number;
}
interface Randomizer {
  size: RandomItem;
  angle: RandomItem;
}

enum ChartType {
  CIRCLE = "start",
  STAR = "star",
  CLOVER = "clover",
  SUNRISE = "sunrise",
  RANDOM = "random",
  STARMINE = "starmine",
  KOCH_CURVE = "koch_curve",
  KOCH_TRIANGLE_INNER = "koch_triangle_inner",
  KOCH_TRIANGLE_OUTER = "koch_triangle_outer",
  FOLD_DRAGON = "fold_dragon",
  FOLD_TRIANGLE = "fold_triangle",
  FOLD_CCURVE = "fold_ccurve",
  TRI_CIS = "tri_cis",
  TRI_TRANS = "tri_trans",
  BINARY_TREE = "binary_tree",
}

interface MutableChart extends Chart {
  kind: ChartType;
  basePoints: Point[];
  complexity: DefaultComplexity;
  center: Point;
  scale: Scale;
  rotation: Rotation;
  mutation?: Mutation;
  randomizer?: Randomizer;
}

type ColorGradientItem = {
  position: number;
  red: number;
  green: number;
  blue: number;
};

class ColorGenerator implements IColorGenerator {
  private readonly _config: ColorConfig;
  private colorStartIndex: number;
  private colorIterateIndex: number;
  private colorTable: string[] = [];
  private readonly gradientRainbows: ColorGradientItem[] = [
    { position: 0, red: 255, green: 0, blue: 0 },
    { position: 43, red: 255, green: 255, blue: 0 },
    { position: 85, red: 0, green: 255, blue: 0 },
    { position: 128, red: 0, green: 255, blue: 255 },
    { position: 171, red: 0, green: 0, blue: 255 },
    { position: 223, red: 255, green: 0, blue: 255 },
    { position: 255, red: 255, green: 0, blue: 0 },
  ];
  private readonly gradientWarm: ColorGradientItem[] = [
    { position: 0, red: 255, green: 0, blue: 0 },
    { position: 128, red: 255, green: 255, blue: 0 },
    { position: 255, red: 255, green: 0, blue: 0 },
  ];
  private readonly gradientForest: ColorGradientItem[] = [
    { position: 0, red: 255, green: 255, blue: 0 },
    { position: 128, red: 0, green: 255, blue: 0 },
    { position: 255, red: 255, green: 255, blue: 0 },
  ];
  private readonly gradientCool: ColorGradientItem[] = [
    { position: 0, red: 0, green: 0, blue: 255 },
    { position: 128, red: 0, green: 255, blue: 255 },
    { position: 255, red: 0, green: 0, blue: 255 },
  ];
  private readonly gradientHeat: ColorGradientItem[] = [
    { position: 0, red: 255, green: 255, blue: 0 },
    { position: 43, red: 255, green: 0, blue: 0 },
    { position: 85, red: 0, green: 0, blue: 255 },
    { position: 128, red: 0, green: 0, blue: 0 },
    { position: 171, red: 0, green: 0, blue: 255 },
    { position: 223, red: 255, green: 0, blue: 0 },
    { position: 255, red: 255, green: 255, blue: 0 },
  ];
  private readonly gradientMonochrome: ColorGradientItem[] = [
    { position: 0, red: 0, green: 0, blue: 0 },
    { position: 128, red: 255, green: 255, blue: 255 },
    { position: 255, red: 0, green: 0, blue: 0 },
  ];
  private readonly gradientPastel: ColorGradientItem[] = [
    { position: 0, red: 255, green: 154, blue: 154 },
    { position: 85, red: 255, green: 255, blue: 154 },
    { position: 170, red: 154, green: 255, blue: 255 },
    { position: 255, red: 255, green: 154, blue: 154 },
  ];

  private _colorToHex = (color: number) => {
    const hex = Math.round(color).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  constructor(config: ColorConfig) {
    this._config = config;
    this.colorStartIndex = 0;
    this.colorIterateIndex = 0;
    const gradient: ColorGradientItem[] = (() => {
      switch (config.type) {
        case ColorType.RAINBOW:
          return this.gradientRainbows;
        case ColorType.WARM:
          return this.gradientWarm;
        case ColorType.FOREST:
          return this.gradientForest;
        case ColorType.COOL:
          return this.gradientCool;
        case ColorType.HEAT:
          return this.gradientHeat;
        case ColorType.MONOCHROME:
          return this.gradientMonochrome;
        case ColorType.PASTEL:
          return this.gradientPastel;
        default:
          throw Error("Not Implemented");
      }
    })();

    let endIndex = 1;
    let start = gradient[0];
    let end = gradient[1];
    for (let i = 0; i < 256; i++) {
      const ratio = (i - start.position) / (end.position - start.position);
      const red = start.red + ratio * (end.red - start.red);
      const green = start.green + ratio * (end.green - start.green);
      const blue = start.blue + ratio * (end.blue - start.blue);
      this.colorTable.push("#" + this._colorToHex(red) + this._colorToHex(green) + this._colorToHex(blue));
      if (end.position == i) {
        start = end;
        end = gradient[++endIndex];
      }
    }
  }

  next(): string {
    const color = this.colorTable[this.colorIterateIndex];
    this.colorIterateIndex = (this.colorIterateIndex + 1) % 256;
    return color;
  }
  endIteration() {
    this.colorStartIndex = (this.colorStartIndex + 1) % 256;
    this.colorIterateIndex = this.colorStartIndex;
  }
}

export class ChartSimulator implements IChartSimulator {
  protected _chart: MutableChart;
  constructor(chart: MutableChart) {
    this._chart = chart;
  }
  reset(): void {
    this.setBasePoints();
    this.setOrders();
  }
  getChart(): Chart {
    return this._chart;
  }
  private readonly colorType = (() => {
    const p = Math.random();
    if (p > 0.86) {
      return ColorType.RAINBOW;
    } else if (p > 0.71) {
      return ColorType.WARM;
    } else if (p > 0.57) {
      return ColorType.FOREST;
    } else if (p > 0.43) {
      return ColorType.HEAT;
    } else if (p > 0.29) {
      return ColorType.COOL;
    } else if (p > 0.14) {
      return ColorType.PASTEL;
    } else {
      return ColorType.MONOCHROME;
    }
  })();
  readonly _colorGenerator = new ColorGenerator({
    type: this.colorType,
    transientSpeed: 1,
  });
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

class KochCurve extends ChartSimulator {
  length0 = 1.0;
  angle0 = (60 * Math.PI) / 180;

  constructor(chart: MutableChart) {
    super(chart);

    this._chart.complexity = (() => {
      if (chart.complexity < 3) {
        return 3;
      } else if (chart.complexity > 5) {
        return 5;
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
    const length = parentLength * (this._chart.mutation?.size || 1.0);
    const angle = parentAngle * (this._chart.mutation?.angle || 1.0);
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
    this._chart.complexity = _chart.complexity;
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

class FoldCurve extends ChartSimulator {
  arm0 = Math.sqrt(2) / 2;
  angle0 = (45 * Math.PI) / 180;
  curveType = FoldCurveType.DRAGON;

  constructor(_chart: MutableChart) {
    super(_chart);
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
      } else if (_chart.complexity > 9) {
        return 9;
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
    const length = parentLength * (this._chart.mutation?.size || 1.0);
    const angle = parentAngle * (this._chart.mutation?.angle || 1.0);
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

class TriCurve extends ChartSimulator {
  curveType = TriCurveType.CIS;

  constructor(_chart: MutableChart) {
    super(_chart);
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
    const length = parentLength * (this._chart.mutation?.size || 1.0);
    const angle = parentAngle * (this._chart.mutation?.angle || 1.0);
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

class BinaryTree extends ChartSimulator {
  constructor(_chart: MutableChart) {
    super(_chart);
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
    const length = parentLength * (this._chart.mutation?.size || 1.0);
    const angle = parentAngle * (this._chart.mutation?.angle || 1.0);
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

type Load = () => ChartSimulator[];
const load: Load = () => {
  const simulators = newCharts.charts.map((chart) => {
    const mutableChart: MutableChart = {
      ...chart,
      kind: chart.kind as ChartType,
      style: {
        ...chart.style,
        type: chart.style.type as StyleType,
      },
      rotation: {
        angle: (chart.rotation.angle * Math.PI) / 180,
        speed: (chart.rotation.speed * Math.PI) / 180,
      },
      complexity: chart.complexity as DefaultComplexity,
      basePoints: [],
      points: [],
      orders: [],
      colors: [],
    };
    switch (chart.kind) {
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
  });
  simulators.map((simulator) => simulator.reset());
  return simulators;
};

export type { Chart, MutableChart };
export { load };
