import newCharts from "../../../charts.json";
import { ChartType, DefaultComplexity, MutableChart, StyleType } from "./chart";
import { ColorType } from "../color/interface";
import ChartSimulator from "./index";
import BinaryTree from "./kinds/binaryTree";
import Circle from "./kinds/circle";
import Clover from "./kinds/clover";
import FoldCurve from "./kinds/foldCurve";
import KochCurve from "./kinds/kochCurve";
import KochTriangle from "./kinds/kochTriangle";
import Random from "./kinds/random";
import Star from "./kinds/star";
import Starmine from "./kinds/starmine";
import Sunrise from "./kinds/sunrise";
import TriCurve from "./kinds/triCurve";

type InstantiateChart = (_: MutableChart) => ChartSimulator;
const instantiateChart: InstantiateChart = (mutableChart: MutableChart) => {
  switch (mutableChart.kind) {
    case ChartType.STAR:
      return new Star(mutableChart);
    case ChartType.STARMINE:
      return new Starmine(mutableChart);
    case ChartType.SUNRISE:
      return new Sunrise(mutableChart);
    case ChartType.CIRCLE:
      return new Circle(mutableChart);
    case ChartType.CLOVER:
      return new Clover(mutableChart);
    case ChartType.RANDOM:
      return new Random(mutableChart);
    case ChartType.FOLD_CCURVE:
    case ChartType.FOLD_TRIANGLE:
    case ChartType.FOLD_DRAGON:
      return new FoldCurve(mutableChart);
    case ChartType.KOCH_CURVE:
      return new KochCurve(mutableChart);
    case ChartType.KOCH_TRIANGLE_INNER:
    case ChartType.KOCH_TRIANGLE_OUTER:
      return new KochTriangle(mutableChart);
    case ChartType.TRI_CIS:
    case ChartType.TRI_TRANS:
      return new TriCurve(mutableChart);
    case ChartType.BINARY_TREE:
      return new BinaryTree(mutableChart);
    default:
      throw new Error("Unsupported chart type!");
  }
};

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

export default load;
