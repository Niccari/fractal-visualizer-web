import Simulator from "./modules/simulator";
import Visualizer from "./visualizer";
import { View } from "./view";
import ViewEvent from "./viewEvent";

class Container {
  public constructor() {
    // modules
    const visualizer = new Visualizer();
    const simulator = new Simulator(visualizer);
    const viewEvent = new ViewEvent(visualizer, simulator);
    new View(viewEvent);
  }
}

export default Container;
