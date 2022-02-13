import RandomGenerator from "../../../src/modules/randomizer";

describe("RandomGenerator test", () => {
  test("RandomGenerator normal test", () => {
    const randomGenerator = new RandomGenerator(123456789);
    expect(randomGenerator.generate()).toBe(-0.13010242255404592);
    expect(randomGenerator.generate()).toBe(0.09869055449962616);
    expect(randomGenerator.generate()).toBe(-0.4101166841574013);
    expect(randomGenerator.generate()).toBe(0.3082401375286281);
    expect(randomGenerator.generate()).toBe(0.11266117682680488);
  });

  test("RandomGenerator seed test", () => {
    expect(new RandomGenerator(1).generate()).toBe(-0.14876804105006158);
    expect(new RandomGenerator(23456).generate()).toBe(-0.14877237007021904);
    expect(new RandomGenerator(-123456789).generate()).toBe(0.13010380021296442);
  });
});
