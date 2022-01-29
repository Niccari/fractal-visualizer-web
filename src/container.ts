import Simulator from "./modules/simulator";
import ISimulator from "./modules/simulator/interface";
import Visualizer from "./visualizer";
import IVisualizer from "./visualizer/interface";
import { View } from "./view";
import ViewEvent from "./viewEvent";
import IViewEvent from "./viewEvent/interface";

class Container {
  public constructor() {
    // modules
    const visualizer: IVisualizer = new Visualizer();
    const simulator: ISimulator = new Simulator(visualizer);
    const viewEvent: IViewEvent = new ViewEvent(visualizer, simulator);
    // eslint-disable-next-line no-new
    new View(viewEvent);
  }
}

export default Container;
