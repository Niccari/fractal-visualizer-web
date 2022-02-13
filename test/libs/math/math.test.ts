import { degree2radian, radian2degree } from "../../../src/libs/math";

describe("math test", () => {
  test("radian2degree test", () => {
    expect(radian2degree(0)).toBe(0);

    expect(radian2degree(Math.PI / 4)).toBe(45);
    expect(radian2degree(Math.PI / 2)).toBe(90);
    expect(radian2degree(Math.PI)).toBe(180);
    expect(radian2degree((3 * Math.PI) / 2)).toBe(270);
    expect(radian2degree(2 * Math.PI)).toBe(360);
    expect(radian2degree(4 * Math.PI)).toBe(720);

    expect(radian2degree(-Math.PI / 4)).toBe(-45);
    expect(radian2degree(-Math.PI / 2)).toBe(-90);
    expect(radian2degree(-Math.PI)).toBe(-180);
    expect(radian2degree(-(3 * Math.PI) / 2)).toBe(-270);
    expect(radian2degree(-2 * Math.PI)).toBe(-360);
    expect(radian2degree(-4 * Math.PI)).toBe(-720);
  });

  test("degree2radian test", () => {
    expect(degree2radian(0)).toBe(0);

    expect(degree2radian(45)).toBe(Math.PI / 4);
    expect(degree2radian(90)).toBe(Math.PI / 2);
    expect(degree2radian(180)).toBe(Math.PI);
    expect(degree2radian(270)).toBe((3 * Math.PI) / 2);
    expect(degree2radian(360)).toBe(2 * Math.PI);
    expect(degree2radian(720)).toBe(4 * Math.PI);

    expect(degree2radian(-45)).toBe(-Math.PI / 4);
    expect(degree2radian(-90)).toBe(-Math.PI / 2);
    expect(degree2radian(-180)).toBe(-Math.PI);
    expect(degree2radian(-270)).toBe(-(3 * Math.PI) / 2);
    expect(degree2radian(-360)).toBe(-2 * Math.PI);
    expect(degree2radian(-720)).toBe(-4 * Math.PI);
  });
});
