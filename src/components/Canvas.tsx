import React, { useEffect } from "react";

interface Props {
  onCanvasReady: (_: CanvasRenderingContext2D) => void;
  onScroll: (_: number) => void;
  onTouchScroll: (_: number) => void;
}

const Canvas: React.FC<Props> = ({ onCanvasReady, onScroll, onTouchScroll }: Props) => {
  function adjustCanvas(canvas: HTMLCanvasElement): void {
    const scale = window.devicePixelRatio;
    canvas.width = window.innerWidth * scale * 2;
    canvas.height = window.innerHeight * scale * 2;
  }

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (canvas instanceof HTMLCanvasElement) {
      if ("ontouchstart" in window) {
        const onTouchStartEvent = ((e: TouchEvent) => {
          e.preventDefault();
        }) as EventListener;
        const onTouchMoveEvent = ((e: TouchEvent) => {
          e.preventDefault();
          onTouchScroll(e.touches[0].pageY);
        }) as EventListener;
        canvas.addEventListener("touchstart", onTouchStartEvent, { passive: false });
        canvas.addEventListener("touchend", onTouchStartEvent, { passive: false });
        canvas.addEventListener("touchcancel", onTouchStartEvent, { passive: false });
        canvas.addEventListener("touchmove", onTouchMoveEvent, { passive: false });
      } else {
        canvas.onwheel = (e: WheelEvent) => {
          onScroll(e.deltaY);
        };
      }
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
