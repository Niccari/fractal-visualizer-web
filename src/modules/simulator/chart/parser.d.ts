import { ChartConfig } from "./models";

declare module "charts.json" {
  const charts: ChartConfig[];
  // biome-ignore lint/correctness/noUndeclaredVariables: not invalid
  export = charts;
}
