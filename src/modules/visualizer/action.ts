import { Chart } from "../simulator";
import { Point, Style, StyleType } from "../simulator/chart";

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
type DrawLine = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => void;
type DrawTriangle = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => void;
type DrawCircles = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => void;
type DrawCurve = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => void;

const drawLine: DrawLine = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => {
  context.lineWidth = style.thickness || 1;
  context.strokeStyle = style.color;

  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.closePath();
  context.stroke();
};

const drawTriangle: DrawTriangle = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => {
  const diffX = end.x - start.x;
  const diffY = end.y - start.y;
  const norm = Math.sqrt(diffX * diffX + diffY * diffY);
  const eX = diffX / norm;
  const eY = diffY / norm;
  const thickness = style.thickness || 1;

  context.fillStyle = style.color;

  context.beginPath();
  context.moveTo(end.x, end.y);
  context.lineTo(start.x + eY * thickness, start.y - eX * thickness);
  context.lineTo(start.x - eY * thickness, start.y + eX * thickness);
  context.lineTo(end.x, end.y);
  context.closePath();
  context.fill();
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const drawCircles: DrawCircles = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const drawCurve: DrawCurve = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => {};

const draw: Draw = (charts: Chart[]) => {
  if (context !== null) {
    const screen_width = context.canvas.width;
    const screen_height = context.canvas.height;

    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, screen_width, screen_height);

    for (const chart of charts) {
      const points = chart.points.map((point) => {
        return { id: point.id, x: point.x * screen_width, y: point.y * screen_height };
      });
      for (let index = 0; index < chart.orders.length; index++) {
        const order = chart.orders[index];
        const style = chart.styles[index];
        const link = order.link;

        const start = points[link[0]];
        const end = points[link[1]];
        switch (style.type) {
          case StyleType.LINE:
            drawLine(context, start, end, style);
            break;
          case StyleType.TRIANGLE:
            drawTriangle(context, start, end, style);
            break;
          case StyleType.CIRCLES:
            drawCircles(context, start, end, style);
            break;
          case StyleType.CURVE:
            drawCurve(context, start, end, style);
            break;
        }
      }
    }
  }
};

export { draw, setContext };
