import newCharts from "../../../charts.json";
import ChartSimulator from "../chart";
import BinaryTree from "../chart/kinds/binaryTree";
import Circle from "../chart/kinds/circle";
import Clover from "../chart/kinds/clover";
import FoldCurve from "../chart/kinds/foldCurve";
import KochCurve from "../chart/kinds/kochCurve";
import KochTriangle from "../chart/kinds/kochTriangle";
import Random from "../chart/kinds/random";
import Star from "../chart/kinds/star";
import Starmine from "../chart/kinds/starmine";
import Sunrise from "../chart/kinds/sunrise";
import TriCurve from "../chart/kinds/triCurve";
import { MutableChart, ChartType, StyleType, DefaultComplexity } from "../chart/models";
import { ColorType } from "../color/interface";

import IChartLoader from "./interface";

class ChartLoader implements IChartLoader {
  private static instantiateChart = (mutableChart: MutableChart): ChartSimulator => {
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

  // eslint-disable-next-line class-methods-use-this
  public load = (): ChartSimulator[] => {
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
      return ChartLoader.instantiateChart(mutableChart);
    });
    simulators.map((simulator) => simulator.reset());
    return simulators;
  };
}

export default ChartLoader;
