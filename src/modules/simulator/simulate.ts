import { Chart, ChartSimulator, Circle, Clover, KochTriangle, Random, Star, Starmine, Sunrise } from "./index";

type Simulate = () => Chart[];
type CreateSimulators = () => void;

const simulators: ChartSimulator[] = [];

const createSimulators: CreateSimulators = () => {
  simulators.length = 0;

  simulators.push(new KochTriangle(4, false));
  simulators.push(new KochTriangle(4, true));
  simulators.push(new Random(3));
  simulators.push(new Starmine(10));
  simulators.push(new Circle(10));
  simulators.push(new Clover(4));
  simulators.push(new Star(7));
  simulators.push(new Sunrise(100));
};

const simulate: Simulate = () => {
  simulators.forEach((s) => s.simulate());
  return simulators.map((s) => s.getChart());
};

export { createSimulators, simulate };
