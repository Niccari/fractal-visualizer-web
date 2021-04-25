import { Chart, ChartSimulator } from "./index";

type Simulate = () => Chart[];
type CreateSimulators = () => void;

const simulators: ChartSimulator[] = [];

const createSimulators: CreateSimulators = () => {
  simulators.length = 0;
  simulators.push(new ChartSimulator(2));
  simulators.push(new ChartSimulator(3));
  simulators.push(new ChartSimulator(4));
  simulators.push(new ChartSimulator(5));
  simulators.push(new ChartSimulator(6));
  simulators.push(new ChartSimulator(10));
  simulators.push(new ChartSimulator(100));
  simulators.map((chart) => {
    chart.allocatePoints();
  });
};

const simulate: Simulate = () => {
  simulators.forEach((s) => s.simulate());
  return simulators.map((s) => s.getChart());
};

export { createSimulators, simulate };
