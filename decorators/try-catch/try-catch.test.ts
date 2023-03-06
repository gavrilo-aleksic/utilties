import { TryCatchClass } from "./mocks/TryCatchClass";

test("TryCatch decorator should catch error and return callback's value", () => {
  const testInstance = new TryCatchClass();
  const result = testInstance.methodThatThrows();
  expect(result).toBeInstanceOf(Error);
  expect(result?.message).toBe("Caught Error");
});
