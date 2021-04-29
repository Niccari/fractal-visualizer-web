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
const drawCircles: DrawCircles = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => {
  const thickness = Math.log(style.thickness || 1 + 10);
  const vectorX = end.x - start.x;
  const vectorY = end.y - start.y;
  const distance = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
  const baseRadius = thickness * distance;
  const angle = 2 * Math.PI;

  context.fillStyle = style.color;

  context.beginPath();
  context.arc(start.x + vectorX * 0.3, start.y + vectorY * 0.3, baseRadius * 0.3, 0, angle);
  context.fill();
  context.beginPath();
  context.arc(start.x + vectorX * 0.6, start.y + vectorY * 0.6, baseRadius * 0.15, 0, angle);
  context.fill();
};

const drawCurve: DrawCurve = (context: CanvasRenderingContext2D, start: Point, end: Point, style: Style) => {
  const thickness = 1.5 * (style.thickness || 1);
  const diffX = end.x - start.x;
  const diffY = end.y - start.y;
  const norm = Math.sqrt(diffX * diffX + diffY * diffY);
  const eX = diffX / norm;
  const eY = diffY / norm;

  const midBaseX = start.x + (end.x - start.x) / 2;
  const midBaseY = start.y + (end.y - start.y) / 2;
  const baseWidthX = eY * thickness;
  const baseWidthY = eX * thickness;
  context.fillStyle = style.color;

  context.beginPath();
  context.moveTo(start.x, start.y);
  context.bezierCurveTo(
    midBaseX + 1.5 * baseWidthX,
    midBaseY - 1.5 * baseWidthY,
    midBaseX + 1.5 * baseWidthX,
    midBaseY - 1.5 * baseWidthY,
    end.x,
    end.y
  );
  context.bezierCurveTo(
    midBaseX + 2.0 * baseWidthX,
    midBaseY - 2.0 * baseWidthY,
    midBaseX + 2.0 * baseWidthX,
    midBaseY - 2.0 * baseWidthY,
    start.x,
    start.y
  );
  context.closePath();
  context.fill();
};

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
