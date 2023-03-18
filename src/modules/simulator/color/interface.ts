export const ColorType = {
  RAINBOW: "rainbow",
  WARM: "warm",
  FOREST: "forest",
  COOL: "cool",
  HEAT: "heat",
  MONOCHROME: "monochrome",
  PASTEL: "pastel",
} as const;
export type ColorType = (typeof ColorType)[keyof typeof ColorType];

type ColorConfig = {
  type: ColorType;
  alpha: number;
  speed: number;
};

interface IColorGenerator {
  next(): string;
  endIteration(): void;
}

type ColorGradientItem = {
  position: number;
  red: number;
  green: number;
  blue: number;
};

export type { ColorConfig, ColorGradientItem, IColorGenerator };
