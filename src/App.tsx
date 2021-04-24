import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import { setContext } from "./modules/visualizer/action";
import { resume } from "./modules/simulator/actions";

function App(): JSX.Element {
  return (
    <div className="App">
      <Canvas
        onCanvasReady={(context: CanvasRenderingContext2D) => {
          setContext(context);
          resume();
        }}
      />
    </div>
  );
}

export default App;
