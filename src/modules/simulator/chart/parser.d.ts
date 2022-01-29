import { MutableChart } from "./models";

declare module "charts.json" {
  const charts: MutableChart[];
  export = charts;
}
