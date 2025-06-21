import Simulator from "./modules/simulator";
import Visualizer from "./visualizer";

class ViewEvent {
  private visualizer: Visualizer;
  private simulator: Simulator;

  public constructor(visualizer: Visualizer, simulator: Simulator) {
    this.visualizer = visualizer;
    this.simulator = simulator;
  }

  public onCanvasReady = (context: CanvasRenderingContext2D) => {
    this.visualizer.setContext(context);
    this.simulator.start(50);
  };

  public onScroll = (deltaY: number) => {
    this.simulator.handleScroll(deltaY);
  };

  public onTouchScroll = (touchY: number) => {
    this.simulator.handleTouchScroll(touchY);
  };
}

export default ViewEvent;
