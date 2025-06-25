import Simulator from "./modules/simulator";
import Visualizer from "./visualizer";

export class View {
  private visualizer: Visualizer;
  private simulator: Simulator;

  private static adjustCanvas = (canvas: HTMLCanvasElement): void => {
    const scale = window.devicePixelRatio;
    canvas.width = window.innerWidth * scale * 2;
    canvas.height = window.innerHeight * scale * 2;
  };

  public constructor(visualizer: Visualizer, simulator: Simulator) {
    this.visualizer = visualizer;
    this.simulator = simulator;
    const canvas = document.getElementById("canvas");
    if (canvas instanceof HTMLCanvasElement) {
      if ("ontouchstart" in window) {
        const onTouchStartEvent = ((e: TouchEvent) => {
          e.preventDefault();
        }) as EventListener;
        const onTouchMoveEvent = ((e: TouchEvent) => {
          e.preventDefault();
          this.simulator.handleTouchScroll(e.touches[0].pageY);
        }) as EventListener;
        canvas.addEventListener("touchstart", onTouchStartEvent, {
          passive: false,
        });
        canvas.addEventListener("touchend", onTouchStartEvent, {
          passive: false,
        });
        canvas.addEventListener("touchcancel", onTouchStartEvent, {
          passive: false,
        });
        canvas.addEventListener("touchmove", onTouchMoveEvent, {
          passive: false,
        });
      } else {
        canvas.onwheel = (e: WheelEvent) => {
          this.simulator.handleScroll(e.deltaY);
        };
      }
      window.onresize = () => {
        View.adjustCanvas(canvas);
      };
      const context = canvas.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        View.adjustCanvas(canvas);
        this.visualizer.setContext(context);
        this.simulator.start(50);
      }
    }
  }
}
