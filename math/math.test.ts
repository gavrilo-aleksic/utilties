import { limit } from "./limit"

describe('[math]', () => {
  test('[limit]', () => {
    const calculatedLimit = limit((x) => Math.pow(1 + 1/x, x));
    expect(calculatedLimit.result).toBeCloseTo(Math.E);
  })
})