import ISimulator from "../modules/simulator/interface";
import IVisualizer from "../visualizer/interface";
import IViewEvent from "./interface";

class ViewEvent implements IViewEvent {
  private visualizer: IVisualizer;
  private simulator: ISimulator;

  public constructor(visualizer: IVisualizer, simulator: ISimulator) {
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
