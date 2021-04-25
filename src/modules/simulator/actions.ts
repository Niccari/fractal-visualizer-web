import { draw } from "../visualizer/action";
import { createSimulators, simulate } from "./simulate";
let iterator: NodeJS.Timeout | null = null;

type RefreshIterator = () => void;
type Resume = (framerate?: number) => void;
type Stop = () => void;

type ToggleRunning = () => boolean;

const _refreshIterator: RefreshIterator = () => {
  if (iterator !== null) {
    clearInterval(iterator);
    iterator = null;
  }
};

const _resume: Resume = (framerate = 50) => {
  _refreshIterator();
  const refreshMs = 1000 / framerate;
  iterator = setInterval(() => {
    const calcResult = simulate();
    draw(calcResult);
  }, refreshMs);
};

const _stop: Stop = () => {
  _refreshIterator();
};

const toggleRunning: ToggleRunning = () => {
  if (iterator !== null) {
    _stop();
    return false;
  } else {
    _resume();
    return true;
  }
};

export { createSimulators, toggleRunning };
