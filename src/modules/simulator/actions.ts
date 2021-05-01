import { draw } from "../visualizer/action";
import { simulate, scroll, touchScroll } from "./simulate";

type Start = (framerate?: number) => void;
type OnScroll = (deltaY: number) => void;

const start: Start = (framerate = 50) => {
  const refreshMs = 1000 / framerate;
  setInterval(() => {
    const calcResult = simulate();
    draw(calcResult);
  }, refreshMs);
};

const onScroll: OnScroll = (deltaY) => {
  scroll(deltaY);
};

const onTouchScroll: OnScroll = (touchY) => {
  touchScroll(touchY);
};

export { start, onScroll, onTouchScroll };
