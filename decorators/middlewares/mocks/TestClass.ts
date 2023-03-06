import { After, MiddlewareCallbackProps } from "../middlewares";

const callback = ({ value }: MiddlewareCallbackProps): number => value + 1;
const callbackWithNoReturn = () => {};

export class TestClass {
  @After(callback, callback, callback)
  methodWithAfterCallback() {
    return 0;
  }
  @After(callback, callback, callbackWithNoReturn)
  methodWithAfterCallbackNoReturn() {
    return 0;
  }

  @After(callback)
  @After(callback)
  @After(callback)
  methodWithMultipleAfterCallback() {
    return 0;
  }
}
