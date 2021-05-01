import { ColorConfig } from "../color/color";

type Point = {
  x: number;
  y: number;
};

type Order = {
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
  thickness: number;
};

interface Chart {
  points: Point[];
  orders: Order[];
  style: Style;
  colors: string[];
}

type DefaultComplexity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 100;

interface IChartSimulator {
  reset(): void;
  getChart(): Chart;
  pointLength(): number;
  setBasePoints(): void;
  setOrders(): void;
  simulate(): void;
}

interface Scale {
  w: number;
  h: number;
}

interface Rotation {
  angle: number;
  speed: number;
}

interface Mutation {
  size: number;
  angle: number;
}

interface RandomItem {
  amplify: number;
  seed: number;
}

interface Randomizer {
  size: RandomItem;
  angle: RandomItem;
}

enum ChartType {
  CIRCLE = "start",
  STAR = "star",
  CLOVER = "clover",
  SUNRISE = "sunrise",
  RANDOM = "random",
  STARMINE = "starmine",
  KOCH_CURVE = "koch_curve",
  KOCH_TRIANGLE_INNER = "koch_triangle_inner",
  KOCH_TRIANGLE_OUTER = "koch_triangle_outer",
  FOLD_DRAGON = "fold_dragon",
  FOLD_TRIANGLE = "fold_triangle",
  FOLD_CCURVE = "fold_ccurve",
  TRI_CIS = "tri_cis",
  TRI_TRANS = "tri_trans",
  BINARY_TREE = "binary_tree",
}

interface MutableChart extends Chart {
  kind: ChartType;
  basePoints: Point[];
  complexity: DefaultComplexity;
  center: Point;
  scale: Scale;
  color: ColorConfig;
  rotation: Rotation;
  mutation?: Mutation;
  randomizer?: Randomizer;
}

export type { Chart, DefaultComplexity, IChartSimulator, MutableChart, Point, Style };
export { StyleType, ChartType };
