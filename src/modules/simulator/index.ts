import { Chart, DefaultComplexity, IChartSimulator, Point, StyleType } from "./chart";
import { ColorConfig, ColorType, IColorGenerator } from "./color";

interface MutableChart extends Chart {
  basePoints: Point[];
  complexity: DefaultComplexity;
  center: Point;
  scale: number;
  angle: number;
  rotationSpeed: number;
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
  protected _chart: MutableChart = {
    basePoints: [],
    complexity: 1,
    center: { id: -1, x: Math.random(), y: Math.random() },
    scale: 2.0,
    angle: 0.0,
    rotationSpeed: Math.PI / 180.0,
    points: [],
    orders: [],
    styles: [],
  };
  constructor(complexity: DefaultComplexity) {
    this._chart.complexity = complexity;
    this.allocate();
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
  allocate(): void {
    const chart = this._chart;
    chart.basePoints = [];
    chart.orders = [];
    chart.styles = [];
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      chart.basePoints.push({ id: i, x: -1, y: -1 });
      chart.points.push({ id: i, x: -1, y: -1 });
      chart.styles.push({
        type: StyleType.LINE,
        color: "#ffffff",
        thickness: 3,
      });
    }
  }
  setBasePoints(): void {
    const chart = this._chart;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      const radian = (2 * Math.PI * i) / pointLength;
      const x = 0.1 * Math.sin(radian);
      const y = 0.1 * Math.cos(radian);
      chart.basePoints[i] = { id: i, x, y };
    }
  }
  setOrders(): void {
    const chart = this._chart;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      chart.orders.push({
        id: i,
        link: [i, (i + 1) % pointLength],
      });
    }
  }
  simulate(): void {
    const chart = this._chart;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i++) {
      const translateX = chart.basePoints[i].x * chart.scale;
      const translateY = chart.basePoints[i].y * chart.scale;
      const sin = Math.sin(chart.angle);
      const cos = Math.cos(chart.angle);
      chart.points[i] = {
        id: i,
        x: chart.center.x + translateX * cos - translateY * sin,
        y: chart.center.y + translateX * sin + translateY * cos,
      };
    }
    chart.angle += chart.rotationSpeed;
    if (chart.angle > Math.PI) {
      chart.angle -= 2 * Math.PI;
    }
    if (chart.angle < -Math.PI) {
      chart.angle += 2 * Math.PI;
    }

    for (let index = 0; index < chart.orders.length; index++) {
      chart.styles[index] = {
        type: StyleType.LINE,
        color: this._colorGenerator.next(),
        thickness: 3,
      };
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
        id: i,
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
        id: i,
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
        id: i,
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
          id: i,
          x: 0.1 * Math.cos(angle),
          y: 0.1 * Math.sin(angle),
        };
      } else {
        this._chart.basePoints[i] = {
          id: i,
          x: (0.1 * Math.cos(angle)) / 4,
          y: (0.1 * Math.sin(angle)) / 4,
        };
      }
    }
  }
}

export type { Chart };
export { Circle, Clover, Star, Starmine, Sunrise };
