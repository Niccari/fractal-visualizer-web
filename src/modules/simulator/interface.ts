interface ISimulator {
  start: (framerate: number) => void;
  handleScroll: (deltaY: number) => void;
  handleTouchScroll: (touchY: number) => void;
}

export default ISimulator;
