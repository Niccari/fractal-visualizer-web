import { ChartConfig } from "./models";

declare module "charts.json" {
  const charts: ChartConfig[];
  export = charts;
}
