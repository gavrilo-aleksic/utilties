import { TryCatch } from "../try-catch";

/** Setting return type adds as more stability in expected return value of the method */
type ReturnType = Error | undefined;
export class TryCatchClass {
  public error: Error | null = null;

  @TryCatch((e: Error): ReturnType => new Error("Caught Error"))
  methodThatThrows(): ReturnType {
    throw new Error("Throwing Error");
  }
}
