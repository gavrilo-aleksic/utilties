import { ChainCondition } from "./chain-conditionals";
import { MultipleAnd, MultipleOr, TrueOrNegativeAnd } from "./conditionals";

describe("[conditionals]", () => {
  test("[TrueOrNegativeAnd] If provided negative number, should return TRUE if its absolute value is larger than 1", () => {
    const a = -2;
    const condition = a > 0;
    const result = TrueOrNegativeAnd(condition, Math.abs(a) > 1);
    expect(result).toBe(true);
  });

  test("[ChainCondition] Should chain condition", () => {
    const a = 10;
    const result = ChainCondition(a > 9).next((isALargerThan9) => {
      if (!isALargerThan9) return false;
      return true;
    });
    expect(result.value()).toBe(true);
  });

  test("[ChainCondition] Should call ifTrue only on true condition", () => {
    const callback = jest.fn();
    ChainCondition(10 < 9).ifTrue(callback)
    expect(callback).not.toHaveBeenCalled();

    ChainCondition(9 < 10).ifTrue(callback)
    expect(callback).toHaveBeenCalled();
  });

  test("[MultipleOr] Should match all arguments", () => {
    const shouldBeTrue = MultipleOr(false, false, true, false);
    expect(shouldBeTrue).toBe(true);

    const shouldBeFalse = MultipleOr(false, false, false, false);
    expect(shouldBeFalse).toBe(false);
  })

  test("[MultipleAnd] Should match all arguments", () => {
    const shouldBeTrue = MultipleAnd(true, true, true, true);
    expect(shouldBeTrue).toBe(true);

    const shouldBeFalse = MultipleAnd(true, true, false, true);
    expect(shouldBeFalse).toBe(false);
  })
});
