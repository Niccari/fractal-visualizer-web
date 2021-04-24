import { CalcResult } from "../simulator";

let context: CanvasRenderingContext2D | null = null;
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

    const charts = result.charts.sort((chart) => chart.elevation);
    for (const chart of charts) {
      const points = chart.points.map((point) => {
        return { x: point.x * screen_width, y: point.y * screen_height };
      });
      const orders = chart.orders;
      for (const order of orders) {
        const link = order.link;
        const style = order.style;

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
