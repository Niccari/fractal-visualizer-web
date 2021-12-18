import { Chart } from "./models";

interface IChartSimulator {
  reset(): void;
  getChart(): Chart;
  pointLength(): number;
  setBasePoints(): void;
  setOrders(): void;
  simulate(): void;
}

export default IChartSimulator;
