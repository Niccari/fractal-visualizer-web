// sample data type
type Point = {
  x: number;
  y: number;
};
type Order = {
  type: string;
  targetPoints: [number];
  drawStyles: Record<string, unknown>;
};
type Chart = {
  points: [Point];
  orders: [Order];
  elevation: number;
};
type CalcResult = {
  elapsedMs: number;
  charts: [Chart?];
};

export type { CalcResult };
