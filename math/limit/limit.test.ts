import { limit } from "./limit";

describe("[limit]", () => {
  test("Should provide correct approximation for natural logarithm E", () => {
    const calculatedLimit = limit((x) => Math.pow(1 + 1 / x, x));
    expect(calculatedLimit.result).toBeCloseTo(Math.E);
  });
});

