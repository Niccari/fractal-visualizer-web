import { Chart } from "../simulator";
import { Point, StyleType } from "../simulator/chart";

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
type DrawLine = (context: CanvasRenderingContext2D, start: Point, end: Point, thickness: number, color: string) => void;
type DrawTriangle = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  thickness: number,
  color: string
) => void;
type DrawCircles = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  thickness: number,
  color: string
) => void;
type DrawCurve = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  thickness: number,
  color: string
) => void;

const drawLine: DrawLine = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  thickness: number,
  color: string
) => {
  context.lineWidth = thickness;
  context.strokeStyle = color;

  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.closePath();
  context.stroke();
};

const drawTriangle: DrawTriangle = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  thickness: number,
  color: string
) => {
  const diffX = end.x - start.x;
  const diffY = end.y - start.y;
  const norm = Math.sqrt(diffX * diffX + diffY * diffY);
  const eX = diffX / norm;
  const eY = diffY / norm;

  context.fillStyle = color;

  context.beginPath();
  context.moveTo(end.x, end.y);
  context.lineTo(start.x + eY * thickness, start.y - eX * thickness);
  context.lineTo(start.x - eY * thickness, start.y + eX * thickness);
  context.lineTo(end.x, end.y);
  context.closePath();
  context.fill();
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const drawCircles: DrawCircles = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  thickness: number,
  color: string
) => {
  const width = Math.log(thickness || 1 + 10);
  const vectorX = end.x - start.x;
  const vectorY = end.y - start.y;
  const distance = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
  const baseRadius = width * distance;
  const angle = 2 * Math.PI;

  context.fillStyle = color;

  context.beginPath();
  context.arc(start.x + vectorX * 0.3, start.y + vectorY * 0.3, baseRadius * 0.3, 0, angle);
  context.fill();
  context.beginPath();
  context.arc(start.x + vectorX * 0.6, start.y + vectorY * 0.6, baseRadius * 0.15, 0, angle);
  context.fill();
};

const drawCurve: DrawCurve = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  thickness: number,
  color: string
) => {
  const width = 1.5 * (thickness || 1);
  const diffX = end.x - start.x;
  const diffY = end.y - start.y;
  const norm = Math.sqrt(diffX * diffX + diffY * diffY);
  const eX = diffX / norm;
  const eY = diffY / norm;

  const midBaseX = start.x + (end.x - start.x) / 2;
  const midBaseY = start.y + (end.y - start.y) / 2;
  const baseWidthX = eY * width;
  const baseWidthY = eX * width;
  context.fillStyle = color;

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

const _shouldDrawChart = (chart: Chart) => {
  const ys = chart.points.map((point) => point.y).sort();
  const lower = Math.floor((ys.length * 2) / 10);
  const upper = Math.floor((ys.length * 8) / 10);
  return ys[lower] > -1.0 && ys[upper] < 2.0;
};

const draw: Draw = (charts: Chart[]) => {
  if (context !== null) {
    const screen_width = context.canvas.width;
    const screen_height = context.canvas.height;

    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, screen_width, screen_height);

    for (const chart of charts) {
      if (!_shouldDrawChart(chart)) {
        continue;
      }
      const points = chart.points.map((point) => {
        return { x: point.x * screen_width, y: point.y * screen_height };
      });
      const style = chart.style;
      const drawMethod = (() => {
        switch (style.type) {
          case StyleType.LINE:
            return drawLine;
          case StyleType.TRIANGLE:
            return drawTriangle;
          case StyleType.CIRCLES:
            return drawCircles;
          case StyleType.CURVE:
            return drawCurve;
          default:
            throw new Error("Invalid style type!");
        }
      })();
      for (let index = 0; index < chart.orders.length; index++) {
        const order = chart.orders[index];
        const link = order.link;
        const color = chart.colors[index];

        const start = points[link[0]];
        const end = points[link[1]];
        drawMethod(context, start, end, style.thickness, color);
      }
    }
  }
};

export { draw, setContext };
