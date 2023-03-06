import ChainCondition from "./chain-conditionals";
import { MultipleAnd, MultipleOr, TrueOrNegativeAnd } from "./logic-operators";

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

  test("[ChainCondition] Should call ifTrue only on true condition and ifFalse on false condition", () => {
    const callback = jest.fn();
    ChainCondition(10 < 9).ifTrue(callback)
    expect(callback).not.toHaveBeenCalled();

    const callback2 = jest.fn();
    ChainCondition(9 < 10).ifTrue(callback2)
    expect(callback2).toHaveBeenCalled();
    
    const callback3 = jest.fn();
    const callback4 = jest.fn();
    ChainCondition(9 < 10).ifTrue(callback3).next(() => 8 > 10).ifFalse(callback4);
    expect(callback3).toHaveBeenCalled();
    expect(callback4).toHaveBeenCalled();
  });

  test("[ChainCondition] Should chain or/and operators", () => {
    const result = ChainCondition(9 < 8).or(2 < 3)
    expect(result.value()).toBe(true);
    
    const result2 = ChainCondition(8 < 9).and(3 < 2)
    expect(result2.value()).toBe(false);

    const result3 = ChainCondition(8 < 9).and(2 < 3)
    expect(result3.value()).toBe(true);
  });

  test("[ChainCondition] Should display previous values only for executed callbacks", () => {
    const result = ChainCondition(9 < 8).ifTrue(() => 2 < 3).ifFalse(() => 3 > 1);
    expect(result.getPreviousValues()).toMatchObject([false, true])
  });

  test("[ChainCondition] Longer chaining", () => {
    const result = ChainCondition(9 < 8).ifTrue(() => 2 < 3).ifFalse(() => 3 > 1).and(true);
    expect(result.getPreviousValues()).toMatchObject([false, true])
    expect(result.value()).toBe(true)

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
