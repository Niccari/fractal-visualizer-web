import "./App.css";
import Canvas from "./components/Canvas";
import { simulator, visualizer } from "./container";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Canvas
        onCanvasReady={(context: CanvasRenderingContext2D) => {
          visualizer.setContext(context);
          simulator.start(50);
        }}
        onScroll={(deltaY: number) => {
          simulator.handleScroll(deltaY);
        }}
        onTouchScroll={(touchY: number) => {
          simulator.handleTouchScroll(touchY);
        }}
      />
    </div>
  );
};

export default App;
