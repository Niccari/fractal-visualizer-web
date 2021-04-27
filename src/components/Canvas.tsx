import React, { useEffect } from "react";

interface Props {
  onCanvasReady: (_: CanvasRenderingContext2D) => void;
  onScroll: (_: number) => void;
}

const Canvas: React.FC<Props> = ({ onCanvasReady, onScroll }: Props) => {
  function adjustCanvas(canvas: HTMLCanvasElement): void {
    const scale = window.devicePixelRatio;
    canvas.width = window.innerWidth * scale * 2;
    canvas.height = window.innerHeight * scale * 2;
  }

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (canvas instanceof HTMLCanvasElement) {
      canvas.onwheel = (e: WheelEvent) => {
        onScroll(e.deltaY);
      };
      window.onresize = () => {
        adjustCanvas(canvas);
      };
      const context = canvas.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        adjustCanvas(canvas);
        onCanvasReady(context);
      }
    }
  }, []);

  return <canvas className="canvas" id="canvas" style={{ width: "100%", height: "100%" }} />;
};

export default Canvas;
