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

export type ColorConfig = {
  type: ColorType;
  alpha: number;
  speed: number;
};

type ColorGradientItem = {
  position: number;
  red: number;
  green: number;
  blue: number;
};

class ColorGenerator {
  private readonly config: ColorConfig;
  private colorStartIndex: number;
  private colorIterateIndex: number;
  private colorTable: string[] = [];
  private readonly alphaHex: string;

  private readonly gradientRainbows: ColorGradientItem[] = [
    { position: 0, red: 255, green: 0, blue: 0 },
    { position: 43, red: 255, green: 255, blue: 0 },
    { position: 85, red: 0, green: 255, blue: 0 },
    { position: 128, red: 0, green: 255, blue: 255 },
    { position: 171, red: 0, green: 0, blue: 255 },
    { position: 223, red: 255, green: 0, blue: 255 },
    { position: 255, red: 255, green: 0, blue: 0 },
  ];

  private readonly gradientWarm: ColorGradientItem[] = [
    { position: 0, red: 255, green: 0, blue: 0 },
    { position: 128, red: 255, green: 255, blue: 0 },
    { position: 255, red: 255, green: 0, blue: 0 },
  ];

  private readonly gradientForest: ColorGradientItem[] = [
    { position: 0, red: 255, green: 255, blue: 0 },
    { position: 128, red: 0, green: 255, blue: 0 },
    { position: 255, red: 255, green: 255, blue: 0 },
  ];

  private readonly gradientCool: ColorGradientItem[] = [
    { position: 0, red: 0, green: 0, blue: 255 },
    { position: 128, red: 0, green: 255, blue: 255 },
    { position: 255, red: 0, green: 0, blue: 255 },
  ];

  private readonly gradientHeat: ColorGradientItem[] = [
    { position: 0, red: 255, green: 255, blue: 0 },
    { position: 43, red: 255, green: 0, blue: 0 },
    { position: 85, red: 0, green: 0, blue: 255 },
    { position: 128, red: 0, green: 0, blue: 0 },
    { position: 171, red: 0, green: 0, blue: 255 },
    { position: 223, red: 255, green: 0, blue: 0 },
    { position: 255, red: 255, green: 255, blue: 0 },
  ];

  private readonly gradientMonochrome: ColorGradientItem[] = [
    { position: 0, red: 0, green: 0, blue: 0 },
    { position: 128, red: 255, green: 255, blue: 255 },
    { position: 255, red: 0, green: 0, blue: 0 },
  ];

  private readonly gradientPastel: ColorGradientItem[] = [
    { position: 0, red: 255, green: 154, blue: 154 },
    { position: 85, red: 255, green: 255, blue: 154 },
    { position: 170, red: 154, green: 255, blue: 255 },
    { position: 255, red: 255, green: 154, blue: 154 },
  ];

  private static colorToHex = (color: number) => {
    const hex = Math.round(color).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  public constructor(config: ColorConfig) {
    this.config = config;
    this.colorStartIndex = 0;
    this.colorIterateIndex = 0;
    this.alphaHex = ColorGenerator.colorToHex(Math.floor(255 * this.config.alpha));
    const gradient: ColorGradientItem[] = (() => {
      switch (config.type.toString()) {
        case ColorType.RAINBOW:
          return this.gradientRainbows;
        case ColorType.WARM:
          return this.gradientWarm;
        case ColorType.FOREST:
          return this.gradientForest;
        case ColorType.COOL:
          return this.gradientCool;
        case ColorType.HEAT:
          return this.gradientHeat;
        case ColorType.MONOCHROME:
          return this.gradientMonochrome;
        case ColorType.PASTEL:
          return this.gradientPastel;
        default:
          throw Error("Not Implemented");
      }
    })();

    let endIndex = 1;
    let start = gradient[0];
    let end = gradient[1];
    for (let i = 0; i < 256; i += 1) {
      const ratio = (i - start.position) / (end.position - start.position);
      const red = start.red + ratio * (end.red - start.red);
      const green = start.green + ratio * (end.green - start.green);
      const blue = start.blue + ratio * (end.blue - start.blue);
      this.colorTable.push(
        `#${ColorGenerator.colorToHex(red)}${ColorGenerator.colorToHex(green)}${ColorGenerator.colorToHex(blue)}${
          this.alphaHex
        }`,
      );
      if (end.position === i) {
        start = end;
        endIndex += 1;
        end = gradient[endIndex];
      }
    }
  }

  public next(): string {
    const color = this.colorTable[this.colorIterateIndex];
    this.colorIterateIndex = (this.colorIterateIndex + this.config.speed) % 256;
    return color;
  }

  public endIteration(): void {
    this.colorStartIndex = (this.colorStartIndex + this.config.speed) % 256;
    this.colorIterateIndex = this.colorStartIndex;
  }
}

export default ColorGenerator;
