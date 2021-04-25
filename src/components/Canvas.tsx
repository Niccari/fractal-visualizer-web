import React, { useEffect } from "react";

interface Props {
  onCanvasReady: (_: CanvasRenderingContext2D) => void;
}

const Canvas: React.FC<Props> = ({ onCanvasReady }: Props) => {
  function adjustCanvas(context: CanvasRenderingContext2D): void {
    const scale = window.devicePixelRatio;
    context.canvas.width = context.canvas.width * scale * 2;
    context.canvas.height = context.canvas.height * scale * 2;
  }

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (canvas instanceof HTMLCanvasElement) {
      const context = canvas.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        adjustCanvas(context);
        onCanvasReady(context);
      }
    }
  }, []);

  return <canvas className="canvas" id="canvas" style={{ width: "100%", height: "100%" }} />;
};

export default Canvas;
