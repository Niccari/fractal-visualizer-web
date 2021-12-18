import Simulator from "./modules/simulator";
import ISimulator from "./modules/simulator/interface";
import Visualizer from "./modules/visualizer";
import IVisualizer from "./modules/visualizer/interface";

export const visualizer: IVisualizer = new Visualizer();
export const simulator: ISimulator = new Simulator(visualizer);
