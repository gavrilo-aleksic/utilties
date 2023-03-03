import {After} from '../decorators/middleware';

const operations = {
  add: { name: "add" },
  multiply: { name: "multiply" },
} as const;

class Arithmetic {
  private _value: number = 0;
  private _steps: { operation: string, args: any[] }[] = [];

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

  @After(function({propertyKey, args}){
    const that: Arithmetic = this;
    that._steps.push({operation: propertyKey, args})
  })
  subtract(...args: number[]) {
    const newValue = args.reduce((prev, curr) => prev - curr, this._value);
    this.setValue(newValue);
    console.log({thisValue: this})
    return this;
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
