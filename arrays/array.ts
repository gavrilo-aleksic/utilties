/** Searches the array start from the optionally provided index (otherwise works same as Array.prototype.find) */
export const findFromIndex = <T = any>(
  array: T[],
  predicate: (element: T, index: number, array: T[]) => boolean,
  from: number = 0
): T | undefined =>
  array.find((e, index) => predicate(e, index, array) && index >= from);
