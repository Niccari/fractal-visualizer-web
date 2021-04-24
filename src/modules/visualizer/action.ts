import { CalcResult } from "../simulator";

let context: CanvasRenderingContext2D | null = null;
let w = 0;
let h = 0;
const setContext: (_: CanvasRenderingContext2D) => void = (_context: CanvasRenderingContext2D) => {
  context = _context;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const draw: (_: CalcResult) => void = (result: CalcResult) => {
  if (context !== null) {
    const screen_width = context.canvas.width;
    const screen_height = context.canvas.height;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, screen_width, screen_height);

    context.fillStyle = "rgb(" + (w % 255) + ", 255, 0)";
    w += 1;
    h += 1;
    w %= screen_width;
    h %= screen_height;
    context.fillRect(0, 0, w, h);
  }
};

export { draw, setContext };
