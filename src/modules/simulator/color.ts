enum ColorType {
  RAINBOW = "rainbow",
  WARM = "warm",
  FOREST = "forest",
  COOL = "cool",
  HEAT = "heat",
  MONOCHROME = "monochrome",
  PASTEL = "pastel",
}

type ColorConfig = {
  type: ColorType;
  alpha: number;
  speed: number;
};

interface IColorGenerator {
  next(): string;
}

export type { ColorConfig, IColorGenerator };
export { ColorType };
