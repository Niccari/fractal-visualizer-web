// sample data type
type Point = {
  id: number;
  x: number;
  y: number;
};
type Style = {
  type: string;
  color: string;
  thickness?: number;
};
type Order = {
  id: number;
  link: number[];
  style: Style;
};
type Chart = {
  points: Point[];
  orders: Order[];
  elevation: number;
  kind: string;
};
type CalcResult = {
  elapsedMs: number;
  charts: Chart[];
};

export type { CalcResult };
