const defaultEpsilonDiff = 0.000001;
const maxDepth = 100000000;

/** Calculates the limit of the provided expression as x moves to infinity. Can pass down epsilon expected difference between two iteration to stop */
export const limit = (
  expression: (x: number) => number,
  epsilon = defaultEpsilonDiff
) => {
  let result: number | null = null;
  let numberOfIterations = 1;
  while (true) {
    if (result === null) {
      result = expression(numberOfIterations);
      continue;
    }
    if (numberOfIterations > maxDepth)
      return {
        result,
        numberOfIterations,
      };

    const newResult = expression(numberOfIterations + 1);
    const difference = Math.abs(newResult - result);

    if (difference < epsilon) {
      return {
        result: newResult,
        numberOfIterations,
      };
    }
    result = newResult;
    numberOfIterations += 1;
  }
};
