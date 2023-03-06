import { findFromIndex } from "./array";

describe("Test Array utils", () => {
  test("[findFromIndex] should find first element starting search from provided index", () => {
    const result = findFromIndex(
      [
        { label: "first", value: 0 },
        { label: "second", value: 1 },
        { label: "third", value: 2 },
        { label: "fourth", value: 1 },
      ],
      (e) => e.value === 1,
      2
    );
    expect(result?.label).toBe("fourth");
  });
});
