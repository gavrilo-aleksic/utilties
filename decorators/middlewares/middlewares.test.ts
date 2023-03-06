import { TestClass } from "./mocks/TestClass"

describe('[Decorators]', () => {
  test('After decorator should execute callbacks in the expected order', () => {
    const testInstance = new TestClass();
    const result = testInstance.methodWithAfterCallback();
    expect(result).toBe(3);
  })
  test('After decorator should execute callbacks and return their return value if they are passed in separate After decorator', () => {
    const testInstance = new TestClass();
    const result = testInstance.methodWithMultipleAfterCallback();
    expect(result).toBe(3);
  })
  test('After decorator should return original functions return value if last callback doesnt return anything', () => {
    const testInstance = new TestClass();
    const result = testInstance.methodWithAfterCallbackNoReturn();
    expect(result).toBe(0);
  })
})