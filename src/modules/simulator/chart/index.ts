import { Chart, ChartConfig, ChartType, Order, Point } from "./models";
import ColorGenerator from "../color";
import { rotateBy } from "../matrix";

export interface ChartShaper {
  configureBasePoints(chart: ChartConfig): Point[];
  configureOrders(complexity: number): Order[];
}

interface ChartIdentity {
  basePoints: Point[];
  orders: Order[];
  config: ChartConfig;
  colorGenerator: ColorGenerator;
  // TODO(Niccari): split below variables, they are dynamic by timestamp
  timestamp: number;
  points: Point[];
}

class ChartSimulator {
  private shaper: ChartShaper;
  private config: ChartConfig;
  private identity?: ChartIdentity;

  public constructor(shaper: ChartShaper, config: ChartConfig) {
    this.shaper = shaper;
    this.config = config;
  }

  public reset(): void {
    const basePoints = this.shaper.configureBasePoints(this.config);
    this.identity = {
      basePoints,
      orders: this.shaper.configureOrders(this.config.complexity),
      config: this.config,
      colorGenerator: new ColorGenerator(this.config.color),
      timestamp: 0,
      points: new Array(basePoints.length),
    };
  }

  public simulate(): Chart {
    if (!this.identity) {
      throw new Error("shape not reset");
    }
    const { config, orders, timestamp, points } = this.identity;
    const { rotation, scale, center } = config;
    // TODO(Niccari): specify reset timing by ChartConfig.
    if (this.identity.config.kind === ChartType.RANDOM) {
      this.reset();
    }
    const currentAngle = rotation.angle + rotation.speed * timestamp;
    const colors = this.identity.colorGenerator.get(timestamp, this.identity.basePoints.length);
    for (let i = 0; i < this.identity.basePoints.length; i++) {
      const point = this.identity.basePoints[i];
      const translate = {
        x: point.x * scale.w,
        y: point.y * scale.h,
      };
      points[i] = rotateBy(center, translate, currentAngle);
    }
    this.identity.timestamp += 1;
    return {
      points,
      style: config.style,
      colors,
      orders,
    };
  }
}

export default ChartSimulator;
