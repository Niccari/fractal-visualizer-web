import ColorGenerator from "../../../src/modules/simulator/color";

describe("colorGenerator get test", () => {
  test("Rainbow gradation test", () => {
    const rainbowGenerator = new ColorGenerator({
      type: "rainbow",
      alpha: 1,
      speed: 1,
    });
    const colors = rainbowGenerator.get(0, 256);
    expect([colors[0], colors[43], colors[85], colors[128], colors[171], colors[223], colors[255]]).toStrictEqual([
      "#ff0000ff",
      "#ffff00ff",
      "#00ff00ff",
      "#00ffffff",
      "#0000ffff",
      "#ff00ffff",
      "#ff0000ff",
    ]);
  });

  test("Warm gradation test", () => {
    const warmGradation = new ColorGenerator({
      type: "warm",
      alpha: 1,
      speed: 1,
    });
    const colors = warmGradation.get(0, 256);
    expect([colors[0], colors[64], colors[128], colors[192], colors[255]]).toStrictEqual([
      "#ff0000ff",
      "#ff8000ff",
      "#ffff00ff",
      "#ff7e00ff",
      "#ff0000ff",
    ]);
  });

  test("Forest gradation test", () => {
    const forestGradation = new ColorGenerator({
      type: "forest",
      alpha: 1,
      speed: 1,
    });
    const colors = forestGradation.get(0, 256);
    expect([colors[0], colors[64], colors[128], colors[192], colors[255]]).toStrictEqual([
      "#ffff00ff",
      "#80ff00ff",
      "#00ff00ff",
      "#81ff00ff",
      "#ffff00ff",
    ]);
  });

  test("Cool gradation test", () => {
    const coolGradation = new ColorGenerator({
      type: "cool",
      alpha: 1,
      speed: 1,
    });
    const colors = coolGradation.get(0, 256);
    expect([colors[0], colors[64], colors[128], colors[192], colors[255]]).toStrictEqual([
      "#0000ffff",
      "#0080ffff",
      "#00ffffff",
      "#007effff",
      "#0000ffff",
    ]);
  });

  test("Heat gradation test", () => {
    const heatGradation = new ColorGenerator({
      type: "heat",
      alpha: 1,
      speed: 1,
    });
    const colors = heatGradation.get(0, 256);
    expect([colors[0], colors[43], colors[85], colors[128], colors[171], colors[223], colors[255]]).toStrictEqual([
      "#ffff00ff",
      "#ff0000ff",
      "#0000ffff",
      "#000000ff",
      "#0000ffff",
      "#ff0000ff",
      "#ffff00ff",
    ]);
  });

  test("Monochrome gradation test", () => {
    const monochromeGradation = new ColorGenerator({
      type: "monochrome",
      alpha: 1,
      speed: 1,
    });
    const colors = monochromeGradation.get(0, 256);
    expect([colors[0], colors[128], colors[255]]).toStrictEqual(["#000000ff", "#ffffffff", "#000000ff"]);
  });

  test("Pastel gradation test", () => {
    const pastelGradation = new ColorGenerator({
      type: "pastel",
      alpha: 1,
      speed: 1,
    });
    const colors = pastelGradation.get(0, 256);
    expect([colors[0], colors[85], colors[170], colors[255]]).toStrictEqual([
      "#ff9a9aff",
      "#ffff9aff",
      "#9affffff",
      "#ff9a9aff",
    ]);
  });
});

describe("colorGenerator alpha", () => {
  test("alpha gradation test", () => {
    const rainbowGenerator = new ColorGenerator({
      type: "rainbow",
      alpha: 0.75,
      speed: 1,
    });
    const colors = rainbowGenerator.get(0, 256);
    expect([colors[0], colors[43], colors[85], colors[128], colors[171], colors[223], colors[255]]).toStrictEqual([
      "#ff0000bf",
      "#ffff00bf",
      "#00ff00bf",
      "#00ffffbf",
      "#0000ffbf",
      "#ff00ffbf",
      "#ff0000bf",
    ]);
  });
});

describe("colorGenerator speed test", () => {
  test("2x faster", () => {
    const rainbowGenerator = new ColorGenerator({
      type: "rainbow",
      alpha: 1,
      speed: 2,
    });
    const colors = rainbowGenerator.get(0, 256);
    expect([colors[0], colors[43], colors[86], colors[128]]).toStrictEqual([
      "#ff0000ff",
      "#00ff06ff",
      "#0500ffff",
      "#ff0000ff",
    ]);
  });
});
