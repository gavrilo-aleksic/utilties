import { After, TryCatch,MiddlewareCallbackProps } from "../decorators/middleware";

const callback = ({value}: MiddlewareCallbackProps) => value +1;
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
}
