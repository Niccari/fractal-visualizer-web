type Point = {
  x: number;
  y: number;
};

type Order = {
  link: number[];
};

enum StyleType {
  LINE = "line",
  TRIANGLE = "triangle",
  CIRCLES = "circles",
  CURVE = "curve",
}

type Style = {
  type: StyleType;
  thickness: number;
};

interface Chart {
  points: Point[];
  orders: Order[];
  style: Style;
  colors: string[];
}

type DefaultComplexity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 100;

interface IChartSimulator {
  reset(): void;
  getChart(): Chart;
  pointLength(): number;
  setBasePoints(): void;
  setOrders(): void;
  simulate(): void;
}

export type { Chart, DefaultComplexity, IChartSimulator, Point, Style };
export { StyleType };
