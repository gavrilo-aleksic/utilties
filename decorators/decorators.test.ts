import { TestClass } from "../mocks/TestClass"

describe('[Decorators]', () => {
  test('TryCatch decorator should catch error', () => {
    const testInstance = new TestClass();
    const result = testInstance.methodThatThrows();
    expect(result).toBeInstanceOf(Error);
  })
})