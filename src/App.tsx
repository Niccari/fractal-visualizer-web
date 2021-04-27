import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import { setContext } from "./modules/visualizer/action";
import { createSimulators, start, onScroll } from "./modules/simulator/actions";

function App(): JSX.Element {
  return (
    <div className="App">
      <Canvas
        onCanvasReady={(context: CanvasRenderingContext2D) => {
          setContext(context);
          createSimulators();
          start();
        }}
        onScroll={(deltaY: number) => {
          onScroll(deltaY);
        }}
      />
    </div>
  );
}

export default App;
