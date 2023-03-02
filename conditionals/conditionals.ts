/** Function for checking if first argument is true, or if it is false, perform logical AND on second argument */
export const TrueOrNegativeAnd = (
  condition: boolean,
  negativeCondition?: boolean
) => condition || (!condition && negativeCondition);

export const MultipleOr = (...args: boolean[]) => args.reduce((prevValue, currentValue) => prevValue || currentValue, false) 

export const MultipleAnd = (...args: boolean[]) => args.reduce((prevValue, currentValue) => prevValue && currentValue, true) 