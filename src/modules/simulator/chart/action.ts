import newCharts from "../../../charts.json";
import { ChartType, DefaultComplexity, MutableChart, StyleType } from "./chart";
import { ColorType } from "../color/color";
import { ChartSimulator, instantiateChart } from "./index";

type Load = () => ChartSimulator[];
const load: Load = () => {
  const simulators = newCharts.charts.map((chart) => {
    const mutableChart: MutableChart = {
      ...chart,
      kind: chart.kind as ChartType,
      style: {
        ...chart.style,
        type: chart.style.type as StyleType,
      },
      color: {
        ...chart.color,
        type: chart.color.type as ColorType,
      },
      rotation: {
        angle: (chart.rotation.angle * Math.PI) / 180,
        speed: (chart.rotation.speed * Math.PI) / 180,
      },
      complexity: chart.complexity as DefaultComplexity,
      basePoints: [],
      points: [],
      orders: [],
      colors: [],
    };
    return instantiateChart(mutableChart);
  });
  simulators.map((simulator) => simulator.reset());
  return simulators;
};

export { load };
