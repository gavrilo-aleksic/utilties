import { TryCatch } from "../decorators/middleware";

export class TestClass {
  public error: Error | null = null;

  @TryCatch((e) => e)
  methodThatThrows() {
    throw new Error("Throwing Error");
  }
}
