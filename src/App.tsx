import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import { setContext } from "./modules/visualizer/action";
import { resume } from "./modules/simulator/actions";
import { EventType, Menu } from "./components/Menu";

function App(): JSX.Element {
  return (
    <div className="App">
      <Canvas
        onCanvasReady={(context: CanvasRenderingContext2D) => {
          setContext(context);
          resume();
        }}
      />
      <Menu
        onClick={(eventType) => {
          switch (eventType) {
            case EventType.ADD_SHAPE:
              console.log("add shape button tapped");
              break;
            case EventType.EDIT_SHAPE:
              console.log("edit shape button tapped");
              break;
            case EventType.EDIT_STYLE:
              console.log("edit style button tapped");
              break;
            case EventType.MISC:
              console.log("misc button tapped");
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
