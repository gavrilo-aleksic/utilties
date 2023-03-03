import { After } from "../decorators/middleware";
class Arithmetic {
  private _value: number = 0;
  private _steps: { operation: string; args: any[] }[] = [];

  constructor(initialValue: number = 0) {
    this.setValue(initialValue);
  }

  getValue() {
    return this._value;
  }

  add(...args: number[]) {
    const newValue = args.reduce((prev, curr) => prev + curr, this._value);
    this.setValue(newValue);
    return this;
  }

  multiply(...args: number[]) {
    const newValue = args.reduce((prev, curr) => prev * curr, this._value);
    this.setValue(newValue);
    return this;
  }

  @After(function ({ propertyKey, args }) {
    // @ts-ignore
    const that: Arithmetic = this;
    that._steps.push({ operation: propertyKey, args });
  })
  subtract(...args: number[]) {
    return this.setValue(args.reduce((prev, curr) => prev - curr, this._value));
  }

  private setValue(value: any) {
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
