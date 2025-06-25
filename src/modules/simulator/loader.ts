import newCharts from "../../charts.json";
import { degree2radian } from "../../libs/math";
import ChartSimulator from "./chart";
import BinaryTree from "./chart/kinds/binaryTree";
import Circle from "./chart/kinds/circle";
import Clover from "./chart/kinds/clover";
import FoldCurve from "./chart/kinds/fold/foldCurve";
import Random from "./chart/kinds/random";
import Star from "./chart/kinds/star";
import Starmine from "./chart/kinds/starmine";
import Sunrise from "./chart/kinds/sunrise";
import { ChartConfig, ChartType, DefaultComplexity, StyleType } from "./chart/models";
import { ColorType } from "./color";
import { ChartShaper } from "./chart";
import KochCurve from "./chart/kinds/fold/kochCurve";
import TriCurve from "./chart/kinds/fold/triCurve";
import KochTriangle from "./chart/kinds/fold/kochTriangle";
import { ChartGenerator } from "./chartGenerator";
import { getUrlConfig } from "../../urlConfig";

class ChartLoader {
  private static instantiateChart = (kind: ChartType): ChartShaper => {
    switch (kind) {
      case ChartType.STAR:
        return new Star();
      case ChartType.STARMINE:
        return new Starmine();
      case ChartType.SUNRISE:
        return new Sunrise();
      case ChartType.CIRCLE:
        return new Circle();
      case ChartType.CLOVER:
        return new Clover();
      case ChartType.RANDOM:
        return new Random();
      case ChartType.FOLD_CCURVE:
      case ChartType.FOLD_DRAGON:
        return new FoldCurve();
      case ChartType.KOCH_CURVE:
        return new KochCurve();
      case ChartType.KOCH_TRIANGLE_INNER:
      case ChartType.KOCH_TRIANGLE_OUTER:
        return new KochTriangle();
      case ChartType.TRI_CIS:
      case ChartType.TRI_TRANS:
        return new TriCurve();
      case ChartType.BINARY_TREE:
        return new BinaryTree();
      default:
        throw new Error("Unsupported chart type!");
    }
  };

  public load = (): ChartSimulator[] => {
    const { seed } = getUrlConfig();

    let charts: ChartConfig[];

    if (seed !== null) {
      const generator = new ChartGenerator(seed);
      charts = generator.generateCharts();
    } else {
      charts = newCharts.charts.map((chart) => ({
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
          angle: degree2radian(chart.rotation.angle),
          speed: degree2radian(chart.rotation.speed),
        },
        complexity: chart.complexity as DefaultComplexity,
      }));
    }

    const shapes = charts.map((config) => ({
      chart: ChartLoader.instantiateChart(config.kind),
      config:
        seed !== null
          ? {
              ...config,
              rotation: {
                angle: degree2radian(config.rotation.angle),
                speed: degree2radian(config.rotation.speed),
              },
            }
          : config,
    }));

    const simulators = shapes.map((shape) => new ChartSimulator(shape.chart, shape.config));
    simulators.map((s) => s.reset());
    return simulators;
  };
}

export default ChartLoader;
