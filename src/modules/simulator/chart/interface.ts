import { Chart, ChartConfig } from "./models";

interface IChartSimulator {
  reset(chartConfig: ChartConfig): void;
  simulate(): Chart;
}

export default IChartSimulator;
