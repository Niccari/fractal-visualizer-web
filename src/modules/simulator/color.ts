enum ColorType {
  RAINBOW = "rainbow",
  FIRE = "fire",
  FOREST = "forest",
  COOL = "cool",
  DAWN = "dawn",
  DARK_SEA = "dark_sea",
  HEAT = "heat",
  MONOCHROME = "monochrome",
  PASTEL = "pastel",
}

type ColorConfig = {
  type: ColorType;
  transientSpeed: number;
};

interface IColorGenerator {
  next(): string;
}

export type { ColorConfig, IColorGenerator };
export { ColorType };
