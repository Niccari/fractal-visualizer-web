import { Chart, Point, StyleType } from "../simulator/chart/models";
import IVisualizer from "./interface";

type Draw = (context: CanvasRenderingContext2D, start: Point, end: Point, thickness: number, color: string) => void;

class Visualizer implements IVisualizer {
  private nullableContext: CanvasRenderingContext2D | null = null;

  public setContext = (context: CanvasRenderingContext2D) => {
    this.nullableContext = context;

    const screenWidth = context.canvas.width;
    const screenHeight = context.canvas.height;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, screenWidth, screenHeight);
  };

  public draw = (charts: Chart[]) => {
    const context = this.nullableContext;
    if (context !== null) {
      const screenWidth = context.canvas.width;
      const screenHeight = context.canvas.height;

      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, screenWidth, screenHeight);

      charts.forEach((chart) => {
        if (Visualizer.shouldDrawChart(chart)) {
          Visualizer.drawChart(context, chart, screenWidth, screenHeight);
        }
      });
    }
  };

  private static drawLine: Draw = (
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

  private static drawTriangle: Draw = (
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

  private static drawCircles: Draw = (
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

  private static drawCurve: Draw = (
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

  private static shouldDrawChart = (chart: Chart) => {
    const ys = chart.points.map((point) => point.y).sort();
    const lower = Math.floor((ys.length * 2) / 10);
    const upper = Math.floor((ys.length * 8) / 10);
    return ys[lower] > -1.0 && ys[upper] < 2.0;
  };

  private static drawChart = (
    context: CanvasRenderingContext2D,
    chart: Chart,
    screenWidth: number,
    screenHeight: number
  ) => {
    const points = chart.points.map((point) => {
      return { x: point.x * screenWidth, y: point.y * screenHeight };
    });
    const { style } = chart;
    const drawMethod: Draw = (() => {
      switch (style.type) {
        case StyleType.LINE:
          return Visualizer.drawLine;
        case StyleType.TRIANGLE:
          return Visualizer.drawTriangle;
        case StyleType.CIRCLES:
          return Visualizer.drawCircles;
        case StyleType.CURVE:
          return Visualizer.drawCurve;
        default:
          throw new Error("Invalid style type!");
      }
    })();
    for (let index = 0; index < chart.orders.length; index += 1) {
      const order = chart.orders[index];
      const { link } = order;
      const color = chart.colors[index];

      const start = points[link[0]];
      const end = points[link[1]];
      drawMethod(context, start, end, style.thickness, color);
    }
  };
}

export default Visualizer;
