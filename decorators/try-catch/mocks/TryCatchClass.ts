import { TryCatch } from "../try-catch";

export class TryCatchClass {
  public error: Error | null = null;

  @TryCatch((e) => e)
  methodThatThrows() {
    throw new Error("Throwing Error");
  }
}
