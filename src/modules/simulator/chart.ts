type Point = {
  id: number;
  x: number;
  y: number;
};

type Order = {
  id: number;
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
  color: string;
  thickness?: number;
};

interface Chart {
  points: Point[];
  orders: Order[];
  styles: Style[];
}

type DefaultComplexity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 100;

interface IChartSimulator {
  getChart(): Chart;
  pointLength(): number;
  allocate(): void;
  setBasePoints(): void;
  setOrders(): void;
  simulate(): void;
}

export type { Chart, DefaultComplexity, IChartSimulator, Point };
export { StyleType };
