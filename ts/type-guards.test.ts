import { exists } from "./type-guards";

describe("[type-guards test]", () => {
  test("Should create a sub-type from type if array contains nullable values", () => {
    type TypeWithUndefinedValue = "A" | "B" | "C" | undefined;

    const arr: TypeWithUndefinedValue[] = ["A", "B", "A", undefined];
    /** Will only take 'A', 'B', 'C' values and change type from Test to ('A' | 'B' | 'C') */
    const definedValues = arr.filter(exists);
    expect(definedValues).toStrictEqual(["A", "B", "A"]);
  });
});
