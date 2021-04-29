import {
  BinaryTree,
  Chart,
  ChartSimulator,
  Circle,
  Clover,
  FoldCurve,
  FoldCurveType,
  KochCurve,
  KochTriangle,
  Random,
  Star,
  Starmine,
  Sunrise,
  TriCurve,
  TriCurveType,
} from "./index";

type Simulate = () => Chart[];
type CreateSimulators = () => void;
type Scroll = (deltaY: number) => void;

const simulators: ChartSimulator[] = [];
let scrollY = (() => {
  const query = new URL(document.location.href).searchParams;
  return parseInt(query.get("depth") || "0");
})();

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
  simulators.push(new FoldCurve(10, 7.0, FoldCurveType.DRAGON));
  simulators.push(new FoldCurve(6, 8.0, FoldCurveType.TRIANGLE));
  simulators.push(new FoldCurve(9, 9.0, FoldCurveType.CCURVE));
  simulators.push(new TriCurve(4, 10.0, TriCurveType.CIS));
  simulators.push(new TriCurve(5, 11.0, TriCurveType.TRANS));
  simulators.push(new BinaryTree(7, 12.0));
  simulators.forEach((simulator) => simulator.reset());
};

const simulate: Simulate = () => {
  scrollEndCount--;
  if (scrollEndCount === 0) {
    const url = window.location.pathname + "?depth=" + scrollY;
    window.history.replaceState(null, "Fractal-Visualizer depth: + scrollY", url);
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
