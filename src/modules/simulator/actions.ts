import { draw } from "../visualizer/action";

let iterator: NodeJS.Timeout | null = null;

type RefreshIterator = () => void;
type Resume = (framerate?: number) => void;
type Stop = () => void;

const _refreshIterator: RefreshIterator = () => {
  if (iterator !== null) {
    clearInterval(iterator);
    iterator = null;
  }
};

const resume: Resume = (framerate = 50) => {
  _refreshIterator();
  const refreshMs = 1000 / framerate;
  iterator = setInterval(() => {
    draw({
      elapsedMs: 0,
      charts: [],
    });
  }, refreshMs);
};

const stop: Stop = () => {
  _refreshIterator();
};

export { resume, stop };
