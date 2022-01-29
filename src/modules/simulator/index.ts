import IVisualizer from "../../visualizer/interface";
import ChartSimulator from "./chart";
import { Chart } from "./chart/models";
import ISimulator from "./interface";
import ChartLoader from "./loader";

class Simulator implements ISimulator {
  private visualizer: IVisualizer;
  private simulators: ChartSimulator[];
  private scrollEndCount: number;
  private touchScrollPrevY?: number;
  private scrollY: number;

  public constructor(visualizer: IVisualizer) {
    this.visualizer = visualizer;
    this.simulators = new ChartLoader().load();
    this.scrollEndCount = 0;
    this.scrollY = (() => {
      const query = new URL(document.location.href).searchParams;
      return parseInt(query.get("depth") || "0", 10);
    })();
  }

  public start = (framerate: number): void => {
    const refreshMs = 1000 / framerate;
    setInterval(() => {
      const calcResult = this.simulate();
      this.visualizer.draw(calcResult);
    }, refreshMs);
  };

  public handleScroll = (deltaY: number): void => {
    this.scrollY += deltaY;
    if (this.scrollY < 0) {
      this.scrollY = 0;
    }
    this.scrollEndCount = 6;
  };

  public handleTouchScroll = (touchY: number): void => {
    if (this.touchScrollPrevY) {
      this.scrollY -= 2 * (touchY - this.touchScrollPrevY);
    }
    this.touchScrollPrevY = touchY;
    if (this.scrollY < 0) {
      this.scrollY = 0;
    }
    this.scrollEndCount = 6;
  };

  private simulate = (): Chart[] => {
    this.scrollEndCount -= 1;
    if (this.scrollEndCount === 0) {
      this.touchScrollPrevY = undefined;
      const url = `${window.location.pathname}?depth=${this.scrollY}`;
      window.history.replaceState(null, "Fractal-Visualizer depth: + scrollY", url);
    }
    this.simulators.forEach((s) => s.simulate());
    return this.simulators.map((s) => {
      const chart = s.getChart();
      chart.points = chart.points.map((point) => {
        return {
          ...point,
          y: point.y - this.scrollY / 300,
        };
      });
      return chart;
    });
  };
}

export default Simulator;
