import { Chart, ChartConfig, ChartType, Order, Point } from "./models";
import ColorGenerator from "../color";
import IChartSimulator from "./interface";
import IChartShaper from "./kinds/interface";
import { IColorGenerator } from "../color/interface";

interface ChartIdentity {
  basePoints: Point[];
  orders: Order[];
  config: ChartConfig;
  colorGenerator: IColorGenerator;
  timestamp: number;
}

class ChartSimulator implements IChartSimulator {
  private shaper: IChartShaper;
  private config: ChartConfig;
  private identity?: ChartIdentity;

  public constructor(shaper: IChartShaper, config: ChartConfig) {
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
    if (identity.config.kind === ChartType.RANDOM) {
      this.reset();
    }
    const currentAngle = rotation.angle + rotation.speed * timestamp;
    const sin = Math.sin(currentAngle);
    const cos = Math.cos(currentAngle);
    const points = identity.basePoints.map((point) => {
      const translateX = point.x * scale.w;
      const translateY = point.y * scale.h;
      return {
        x: center.x + translateX * cos - translateY * sin,
        y: center.y + translateX * sin + translateY * cos,
      };
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
