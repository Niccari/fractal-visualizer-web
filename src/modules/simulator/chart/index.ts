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
  timestamp: number;
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
    const { shaper, config } = this;
    this.identity = {
      basePoints: shaper.configureBasePoints(config),
      orders: shaper.configureOrders(config.complexity),
      config,
      colorGenerator: new ColorGenerator(config.color),
      timestamp: 0,
    };
  }

  public simulate(): Chart {
    const { identity } = this;
    if (!identity) {
      throw new Error("shape not reset");
    }
    const { config, orders, timestamp } = identity;
    const { rotation, scale, center } = config;
    // TODO(Niccari): specify reset timing by ChartConfig.
    if (identity.config.kind === ChartType.RANDOM) {
      this.reset();
    }
    const currentAngle = rotation.angle + rotation.speed * timestamp;
    const points = identity.basePoints.map((point) => {
      const translate = {
        x: point.x * scale.w,
        y: point.y * scale.h,
      };
      return rotateBy(center, translate, currentAngle);
    });
    const colors = points.map(() => identity.colorGenerator.next());
    identity.colorGenerator.endIteration();
    identity.timestamp += 1;
    return {
      points,
      style: config.style,
      colors,
      orders,
    };
  }
}

export default ChartSimulator;
