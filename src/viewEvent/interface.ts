interface IViewEvent {
  onCanvasReady: (_: CanvasRenderingContext2D) => void;
  onScroll: (_: number) => void;
  onTouchScroll: (_: number) => void;
}

export default IViewEvent;
