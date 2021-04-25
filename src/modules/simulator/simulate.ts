import { Chart, ChartSimulator } from "./index";

type Simulate = () => Chart[];

const simulators: ChartSimulator[] = [];

simulators.push(new ChartSimulator(3));
simulators.push(new ChartSimulator(5));
simulators.push(new ChartSimulator(100));
simulators.map((chart) => {
  chart.allocatePoints();
});

const simulate: Simulate = () => {
  simulators.forEach((s) => s.simulate());
  return simulators.map((s) => s.getChart());
};

export default simulate;
