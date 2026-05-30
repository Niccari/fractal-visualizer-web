import Visualizer from "../../src/visualizer";
import { Chart, Order, StyleType } from "../../src/modules/simulator/chart/models";

type Counts = {
  fillRect: number;
  beginPath: number;
  moveTo: number;
  lineTo: number;
  stroke: number;
  fill: number;
};

const makeMockContext = (width: number, height: number) => {
  const counts: Counts = { fillRect: 0, beginPath: 0, moveTo: 0, lineTo: 0, stroke: 0, fill: 0 };
  const context = {
    canvas: { width, height },
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 0,
    fillRect: () => {
      counts.fillRect += 1;
    },
    beginPath: () => {
      counts.beginPath += 1;
    },
    moveTo: () => {
      counts.moveTo += 1;
    },
    lineTo: () => {
      counts.lineTo += 1;
    },
    closePath: () => {},
    stroke: () => {
      counts.stroke += 1;
    },
    fill: () => {
      counts.fill += 1;
    },
    arc: () => {},
    bezierCurveTo: () => {},
  };
  return { context: context as unknown as CanvasRenderingContext2D, counts };
};

const lineChart = (points: { x: number; y: number }[], orders: Order[]): Chart => ({
  points,
  orders,
  style: { type: StyleType.LINE, thickness: 1 },
  colors: orders.map(() => "#ffffffff"),
});

describe("Visualizer.draw", () => {
  it("draws one stroke per order for an on-screen chart", () => {
    const { context, counts } = makeMockContext(100, 100);
    const visualizer = new Visualizer();
    visualizer.setContext(context);

    const chart = lineChart(
      [
        { x: 0.0, y: 0.0 },
        { x: 0.5, y: 0.5 },
        { x: 0.2, y: -0.2 },
      ],
      [{ link: [0, 1] }, { link: [1, 2] }],
    );

    const before = counts.stroke;
    visualizer.draw([chart]);

    expect(counts.stroke - before).toBe(chart.orders.length);
  });

  it("culls a chart whose points are entirely below the viewport (y >= 1)", () => {
    const { context, counts } = makeMockContext(100, 100);
    const visualizer = new Visualizer();
    visualizer.setContext(context);

    const chart = lineChart(
      [
        { x: 0.0, y: 5.0 },
        { x: 0.5, y: 6.0 },
      ],
      [{ link: [0, 1] }],
    );

    const before = counts.stroke;
    visualizer.draw([chart]);

    expect(counts.stroke - before).toBe(0);
  });

  it("culls a chart whose points are entirely above the viewport (y <= -1)", () => {
    const { context, counts } = makeMockContext(100, 100);
    const visualizer = new Visualizer();
    visualizer.setContext(context);

    const chart = lineChart(
      [
        { x: 0.0, y: -5.0 },
        { x: 0.5, y: -6.0 },
      ],
      [{ link: [0, 1] }],
    );

    const before = counts.stroke;
    visualizer.draw([chart]);

    expect(counts.stroke - before).toBe(0);
  });

  it("reuses its scaled-point buffer correctly across charts of different sizes", () => {
    const { context, counts } = makeMockContext(100, 100);
    const visualizer = new Visualizer();
    visualizer.setContext(context);

    const big = lineChart(
      [
        { x: 0.0, y: 0.0 },
        { x: 0.1, y: 0.1 },
        { x: 0.2, y: 0.2 },
        { x: 0.3, y: 0.3 },
      ],
      [{ link: [0, 1] }, { link: [1, 2] }, { link: [2, 3] }],
    );
    const small = lineChart(
      [
        { x: 0.0, y: 0.0 },
        { x: 0.5, y: 0.5 },
      ],
      [{ link: [0, 1] }],
    );

    const before = counts.stroke;
    // Draw the larger chart first so the buffer grows, then the smaller one.
    visualizer.draw([big, small]);

    expect(counts.stroke - before).toBe(big.orders.length + small.orders.length);
  });
});
