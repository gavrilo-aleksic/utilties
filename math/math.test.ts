import { ar } from "./arithmetics";
import { limit } from "./limit";

describe("[math]", () => {
  test("[limit]", () => {
    const calculatedLimit = limit((x) => Math.pow(1 + 1 / x, x));
    expect(calculatedLimit.result).toBeCloseTo(Math.E);
  });
});

describe("[Arithmetics]", () => {
  test("Should correctly add numbers", () => {
    const arithmetics = ar();
    arithmetics.add(2, 3, -1).add(2);
    expect(arithmetics.getValue()).toBe(6);
  });

  test("Should correctly multiply numbers", () => {
    const arithmetics = ar(1);
    arithmetics.multiply(2).add(3).multiply(5);
    expect(arithmetics.getValue()).toBe(25);
  });

  test("Should correctly display steps", () => {
    const arithmetics = ar();
    arithmetics.subtract(5).subtract(1, 2, 3);
    expect(arithmetics.getSteps()).toBe([
      { args: [5], operation: "subtract" },
      { args: [1, 2, 3], operation: "subtract" },
    ]);
  });
});
