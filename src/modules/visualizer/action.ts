import { Chart } from "../simulator";

type SetContext = (_: CanvasRenderingContext2D) => void;

let context: CanvasRenderingContext2D | null = null;
const setContext: SetContext = (_context: CanvasRenderingContext2D) => {
  context = _context;

  const screen_width = context.canvas.width;
  const screen_height = context.canvas.height;
  context.fillStyle = "rgb(0, 0, 0)";
  context.fillRect(0, 0, screen_width, screen_height);
};

type Draw = (_: Chart[]) => void;
const draw: Draw = (charts: Chart[]) => {
  if (context !== null) {
    const screen_width = context.canvas.width;
    const screen_height = context.canvas.height;

    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, screen_width, screen_height);

    for (const chart of charts) {
      const points = chart.points.map((point) => {
        return { x: point.x * screen_width, y: point.y * screen_height };
      });
      for (let index = 0; index < chart.orders.length; index++) {
        const order = chart.orders[index];
        const style = chart.styles[index];
        const link = order.link;

        context.lineWidth = style.thickness || 1;
        context.strokeStyle = style.color;

        // TODO(Niccari): Change drawing method by style.type.
        const start = points[link[0]];
        const end = points[link[1]];
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.closePath();
        context.stroke();
      }
    }
  }
};

export { draw, setContext };
