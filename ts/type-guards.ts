export const exists = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;

/** Defines the type of the array elements
 * @example
 *
 * const array = ["A", "B", "C"] as const;
 * const elementFromArray: ArrayElementType<typeof array> = "A"; <-- type of elementFromArray will not be 'string' but 'A' | 'B' | 'C'
 */
export type ArrayElementType<ArrayType extends Readonly<any>> =
  ArrayType[number];

/** Checks if provided variable is part of the array type and assigns correct type for it
 * @example
 *
 *   const AllowedValues = ["A", "B", "C", "D"] as const;
 *   const value: any = "B";
 *   if (isInAllowedValues(value, AllowedValues)) {
 *      value; <---- 'value' will have type of 'A' | 'B' | 'C' | 'D'
 *   }
 */
export const isInAllowedValues = <T extends Readonly<any>>(
  value: any,
  array: T
): value is ArrayElementType<T> => array.includes(value);
