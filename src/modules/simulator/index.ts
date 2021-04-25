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

class ChartSimulator implements IChartSimulator {
  private _chart: MutableChart = {
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
    this.allocatePoints();
  }
  getChart(): Chart {
    return this._chart;
  }
  private readonly colorType = (() => {
    const p = Math.random();
    if (p > 0.666) {
      return ColorType.RAINBOW;
    } else if (p > 0.333) {
      return ColorType.PASTEL;
    } else {
      return ColorType.MONOCHROME;
    }
  })();
  readonly _colorGenerator = new ColorGenerator({
    type: this.colorType,
    transientSpeed: 1,
  });

  allocatePoints(): void {
    const chart = this._chart;
    chart.basePoints = [];
    chart.orders = [];
    chart.styles = [];
    const complexity = chart.complexity;
    for (let i = 0; i < complexity; i++) {
      const radian = (2 * Math.PI * i) / complexity;
      const x = 0.1 * Math.sin(radian);
      const y = 0.1 * Math.cos(radian);
      chart.basePoints.push({ id: i, x, y });
      chart.points.push({ id: i, x: -1, y: -1 });
    }
    for (let i = 0; i < complexity; i++) {
      chart.orders.push({
        id: i,
        link: [i, (i + 1) % complexity],
      });
      chart.styles.push({
        type: StyleType.LINE,
        color: "#ffffff",
        thickness: 3,
      });
    }
  }
  simulate(): void {
    const chart = this._chart;
    chart.points = [];
    for (let i = 0; i < chart.basePoints.length; i++) {
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

export type { Chart };
export { ChartSimulator };