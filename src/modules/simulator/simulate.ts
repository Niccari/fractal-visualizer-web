import {
  Chart,
  ChartSimulator,
  Circle,
  Clover,
  KochCurve,
  KochTriangle,
  Random,
  Star,
  Starmine,
  Sunrise,
} from "./index";

type Simulate = () => Chart[];
type CreateSimulators = () => void;
type Scroll = (deltaY: number) => void;

const simulators: ChartSimulator[] = [];
let scrollY = 0;
let scrollEndCount = 0;

const createSimulators: CreateSimulators = () => {
  simulators.length = 0;

  simulators.push(new KochTriangle(4, 0.3, false));
  simulators.push(new KochTriangle(4, 1.2, true));
  simulators.push(new Random(3, 1.6));
  simulators.push(new Starmine(10, 1.8));
  simulators.push(new Circle(10, 2.2));
  simulators.push(new Clover(4, 2.6));
  simulators.push(new Star(7, 3.0));
  simulators.push(new Sunrise(100, 5.0));
  simulators.push(new KochCurve(4, 6.0));
};

const simulate: Simulate = () => {
  scrollEndCount--;
  if (scrollEndCount === 0) {
    window.history.replaceState(null, "Fractal-Visualizer depth: + scrollY", "/?depth=" + scrollY);
  }
  simulators.forEach((s) => s.simulate());
  return simulators.map((s) => {
    const chart = s.getChart();
    chart.points = chart.points.map((point) => {
      return {
        ...point,
        y: point.y - scrollY / 300,
      };
    });
    return chart;
  });
};

const scroll: Scroll = (deltaY: number) => {
  scrollY += deltaY;
  if (scrollY < 0) {
    scrollY = 0;
  }
  scrollEndCount = 6;
};

export { createSimulators, scroll, simulate };
