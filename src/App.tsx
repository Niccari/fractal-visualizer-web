import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import { setContext } from "./modules/visualizer/action";
import { start, onScroll, onTouchScroll } from "./modules/simulator/actions";

function App(): JSX.Element {
  return (
    <div className="App">
      <Canvas
        onCanvasReady={(context: CanvasRenderingContext2D) => {
          setContext(context);
          start();
        }}
        onScroll={(deltaY: number) => {
          onScroll(deltaY);
        }}
        onTouchScroll={(touchY: number) => {
          onTouchScroll(touchY);
        }}
      />
    </div>
  );
}

export default App;
