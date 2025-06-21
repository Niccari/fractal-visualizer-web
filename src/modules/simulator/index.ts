import Visualizer from "../../visualizer";
import ChartSimulator from "./chart";
import { Chart } from "./chart/models";
import ChartLoader from "./loader";

class Simulator {
  private visualizer: Visualizer;
  private simulators: ChartSimulator[];
  private scrollEndCount: number;
  private touchScrollPrevY?: number;
  private scrollY: number;

  public constructor(visualizer: Visualizer) {
    this.visualizer = visualizer;
    this.simulators = new ChartLoader().load();
    this.scrollEndCount = 0;
    this.scrollY = (() => {
      const query = new URL(document.location.href).searchParams;
      return Number.parseInt(query.get("depth") || "0", 10);
    })();
  }

  public start = (framerate: number): void => {
    const refreshMs = 1000 / framerate;
    setInterval(() => {
      const calcResult = this.simulate();
      this.visualizer.draw(calcResult);
    }, refreshMs);
  };

  private restrictScroll = () => {
    if (this.scrollY < 0) {
      this.scrollY = 0;
    }
    if (this.scrollY > 3400) {
      this.scrollY = 3400;
    }
  };

  public handleScroll = (deltaY: number): void => {
    this.scrollY += deltaY;
    this.restrictScroll();

    this.scrollEndCount = 6;
  };

  public handleTouchScroll = (touchY: number): void => {
    if (this.touchScrollPrevY) {
      this.scrollY -= 2 * (touchY - this.touchScrollPrevY);
    }
    this.touchScrollPrevY = touchY;
    this.restrictScroll();
    this.scrollEndCount = 6;
  };

  private simulate = (): Chart[] => {
    this.scrollEndCount -= 1;
    if (this.scrollEndCount === 0) {
      this.touchScrollPrevY = undefined;
      const url = `${window.location.pathname}?depth=${this.scrollY}`;
      window.history.replaceState(null, "Fractal-Visualizer depth: + scrollY", url);
    }
    const charts = this.simulators.map((s) => s.simulate());
    return charts.map((c) => ({
      ...c,
      points: c.points.map((point) => ({
        ...point,
        y: point.y - this.scrollY / 300,
      })),
    }));
  };
}

export default Simulator;
