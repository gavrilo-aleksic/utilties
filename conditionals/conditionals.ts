/** Function for checking if first argument is true, or if it is false, perform logical AND on second argument */
export const trueOrNegativeAnd = (condition: boolean, negativeCondition?: boolean) =>
  condition || (!condition && negativeCondition);

  
