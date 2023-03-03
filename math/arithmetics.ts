import { After } from "../decorators/middleware";

function pushStep({ propertyKey, args }: { propertyKey: string; args: any[] }) {
  //@ts-ignore
  const that: Arithmetic = this;
  that._steps.push({ operation: propertyKey, args });
}

type ArithmeticStep = {
  operation: string;
  args: any[];
};
class Arithmetic {
  private _value: number = 0;
  _steps: ArithmeticStep[] = [];

  constructor(initialValue: number = 0) {
    this.setValue(initialValue);
  }

  value() {
    return this._value;
  }

  @After(pushStep)
  add(...args: number[]) {
    return this.setValue(args.reduce((prev, curr) => prev + curr, this._value));
  }

  @After(pushStep)
  multiply(...args: number[]) {
    return this.setValue(args.reduce((prev, curr) => prev * curr, this._value));
  }

  @After(pushStep)
  subtract(...args: number[]): this {
    return this.setValue(args.reduce((prev, curr) => prev - curr, this._value));
  }

  private setValue(value: any): this {
    this._value = isNaN(value) ? NaN : value;
    return this;
  }

  getSteps() {
    return this._steps;
  }
}

export const ar = (initialValue?: number) => {
  return new Arithmetic(initialValue);
};
