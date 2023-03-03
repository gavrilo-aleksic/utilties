import { TryCatch } from "../decorators/try-catch";

export class TestClass {
  public error: Error | null = null;

  @TryCatch((e) => e)
  methodThatThrows() {
    throw new Error("Throwing Error");
  }
}
