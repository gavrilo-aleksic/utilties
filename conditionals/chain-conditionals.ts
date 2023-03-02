type ChainConditionCallback = (value: boolean) => boolean | undefined | void;
type ChainConditionValue = () => boolean;

type ChainCondition = {
  /** Method for getting the current value of condition */
  value: ChainConditionValue;
  /** Method for attaching additional condition check */
  next: (callback: ChainConditionCallback) => ChainCondition;
  /** Method for attaching callback upon truthy return */
  ifTrue: (callback: ChainConditionCallback) => ChainCondition;
  /** Method for attaching callback upon falsy return */
  ifFalse: (callback: ChainConditionCallback) => ChainCondition;
};

const createChainCondition: (value: boolean) => ChainCondition = (
  value: boolean
) => ({
  value: () => value,
  next: (callback: ChainConditionCallback) =>
    createChainCondition(!!callback(value)),
  ifTrue: (callback: ChainConditionCallback) => {
    if (!!value) return createChainCondition(!!callback(value));
    return createChainCondition(value);
  },
  ifFalse: (callback: ChainConditionCallback) => {
    if (!value) return createChainCondition(!!callback(value));
    return createChainCondition(value);
  },
});

/** Creates a system for checking multiple conditions with provided initial condition. Returned object
 * has next() method which accepts callback which will receive initialCondition value and so on.
 * @returns ChainConditionValue
 */
export const ChainCondition = (initialCondition: boolean) => {
  return createChainCondition(initialCondition);
};
