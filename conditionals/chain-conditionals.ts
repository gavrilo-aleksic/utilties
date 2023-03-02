type ChainConditionCallback = (value: boolean) => boolean | undefined | void;
type ChainConditionValue = () => boolean;

type ChainCondition = {
  value: ChainConditionValue;
  next: (callback: ChainConditionCallback) => ChainCondition;
  ifTrue: (callback: ChainConditionCallback) => ChainCondition;
};

const createChainCondition: (value: boolean) => ChainCondition = (
  value: boolean
) => ({
  value: () => value,
  next: (callback: ChainConditionCallback) =>
    createChainCondition(!!callback(value)),
  ifTrue: (callback: ChainConditionCallback) => {
    if(!!value) return createChainCondition(!!callback(value));
    return createChainCondition(value);
  }
});

/** Creates a system for checking multiple conditions with provided initial condition. Returned object
 * has next() method which accepts callback which will receive initialCondition value and so on.
 */
export const ChainCondition = (initialCondition: boolean) => {
  return createChainCondition(initialCondition);
};
