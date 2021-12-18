import ChartSimulator from "./chart";
import load from "./chart/action";
import { Chart } from "./chart/chart";

type Index = () => Chart[];
type Scroll = (deltaY: number) => void;

const simulators: ChartSimulator[] = load();
let scrollY = (() => {
  const query = new URL(document.location.href).searchParams;
  return parseInt(query.get("depth") || "0", 10);
})();

let scrollEndCount = 0;
let touchScrollPrevY: number | null = null;

const simulate: Index = () => {
  scrollEndCount -= 1;
  if (scrollEndCount === 0) {
    touchScrollPrevY = null;
    const url = `${window.location.pathname}?depth=${scrollY}`;
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

const touchScroll: Scroll = (touchY: number) => {
  if (touchScrollPrevY !== null) {
    scrollY -= 2 * (touchY - touchScrollPrevY);
  }
  touchScrollPrevY = touchY;
  if (scrollY < 0) {
    scrollY = 0;
  }
  scrollEndCount = 6;
};

export { scroll, simulate, touchScroll };
