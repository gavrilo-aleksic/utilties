export const exists: <T>(value: T | null | undefined) => value is T = <T>(
  value: T | undefined | null
): value is T => value !== undefined && value !== null;
