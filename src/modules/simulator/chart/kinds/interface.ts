import { Point, Order, ChartConfig } from "../models";

interface IChartShaper {
  configureBasePoints(chart: ChartConfig): Point[];
  configureOrders(complexity: number): Order[];
}

export default IChartShaper;
