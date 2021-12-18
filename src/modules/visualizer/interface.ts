import { Chart } from "../simulator/chart/models";

interface IVisualizer {
  setContext: (context: CanvasRenderingContext2D) => void;
  draw: (charts: Chart[]) => void;
}

export default IVisualizer;
