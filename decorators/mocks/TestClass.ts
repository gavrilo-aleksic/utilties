import { After, TryCatch,MiddlewareCallbackProps } from "../middleware";

const callback = ({value}: MiddlewareCallbackProps) => value +1;
const callbackWithNoReturn = () => {}
export class TestClass {
  public error: Error | null = null;
  
  @TryCatch((e) => e)
  methodThatThrows() {
    throw new Error("Throwing Error");
  }

  @After(callback, callback, callback)
  methodWithAfterCallback(){
    return 0;
  }
  @After(callback, callback, callbackWithNoReturn)
  methodWithAfterCallbackNoReturn(){
    return 0;
  }

  @After(callback)
  @After(callback)
  @After(callback)
  methodWithMultipleAfterCallback(){
    return 0;
  }
}
