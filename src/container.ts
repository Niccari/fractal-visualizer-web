import Simulator from "./modules/simulator";
import Visualizer from "./visualizer";
import { View } from "./view";

class Container {
  public constructor() {
    const visualizer = new Visualizer();
    const simulator = new Simulator(visualizer);
    new View(visualizer, simulator);
  }
}

export default Container;
