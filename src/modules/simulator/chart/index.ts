import { Chart, MutableChart } from "./models";
import ColorGenerator from "../color";
import IChartSimulator from "./interface";

class ChartSimulator implements IChartSimulator {
  protected chart: MutableChart;
  private readonly colorGenerator;
  public constructor(chart: MutableChart) {
    this.chart = chart;
    this.colorGenerator = new ColorGenerator(this.chart.color);
  }

  public reset(): void {
    this.setBasePoints();
    this.setOrders();
  }

  public getChart(): Chart {
    return this.chart;
  }

  public pointLength(): number {
    return this.chart.complexity;
  }

  public setBasePoints(): void {
    const { chart } = this;
    chart.basePoints = [];
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i += 1) {
      const radian = (2 * Math.PI * i) / pointLength;
      const x = 0.1 * Math.sin(radian);
      const y = 0.1 * Math.cos(radian);
      chart.basePoints[i] = { x, y };
    }
  }

  public setOrders(): void {
    const { chart } = this;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i += 1) {
      chart.orders.push({
        link: [i, (i + 1) % pointLength],
      });
    }
  }

  public simulate(): void {
    const { chart } = this;
    const pointLength = this.pointLength();
    for (let i = 0; i < pointLength; i += 1) {
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

    for (let index = 0; index < chart.orders.length; index += 1) {
      chart.colors[index] = this.colorGenerator.next();
    }
    this.colorGenerator.endIteration();
  }
}

export default ChartSimulator;
