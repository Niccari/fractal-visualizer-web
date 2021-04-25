import React, { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import { setContext } from "./modules/visualizer/action";
import { createSimulators, toggleRunning } from "./modules/simulator/actions";
import { EventType, Menu } from "./components/Menu";

function App(): JSX.Element {
  const [isRunning, setIsRunning] = useState(true);
  return (
    <div className="App">
      <Canvas
        onCanvasReady={(context: CanvasRenderingContext2D) => {
          setContext(context);
          createSimulators();
          toggleRunning();
        }}
      />
      <Menu
        isRunning={isRunning}
        onClick={(eventType) => {
          switch (eventType) {
            case EventType.REFRESH:
              createSimulators();
              break;
            case EventType.RESUME_STOP:
              setIsRunning(toggleRunning());
              break;
            default:
              throw Error("Unsupported button type!!");
          }
        }}
      />
    </div>
  );
}

export default App;
