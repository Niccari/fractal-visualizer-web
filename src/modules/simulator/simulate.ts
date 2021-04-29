import { Chart, ChartSimulator, load } from "./index";

type Simulate = () => Chart[];
type Scroll = (deltaY: number) => void;

const simulators: ChartSimulator[] = load();
let scrollY = (() => {
  const query = new URL(document.location.href).searchParams;
  return parseInt(query.get("depth") || "0");
})();

let scrollEndCount = 0;

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

export { scroll, simulate };
