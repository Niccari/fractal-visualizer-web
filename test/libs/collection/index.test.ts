import { range } from "../../../src/libs/collection";

describe("collection test", () => {
  test("range test", () => {
    expect(range(1)).toEqual([0]);
    expect(range(4)).toEqual([0, 1, 2, 3]);

    expect(range(0)).toEqual([]);
    expect(range(-1)).toEqual([]);
  });
});
