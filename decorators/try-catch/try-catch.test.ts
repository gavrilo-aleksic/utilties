import { TryCatchClass } from "./mocks/TryCatchClass";

test("TryCatch decorator should catch error", () => {
  const testInstance = new TryCatchClass();
  const result = testInstance.methodThatThrows();
  expect(result).toBeInstanceOf(Error);
});
