/**
 * Method decorators for classes executed before/after/during the method execution
 */

export type MiddlewareCallbackProps = {
  /** Name of the method called */
  propertyKey: string;
  /** Original arguments of the called method */
  args: any[];
  /** Return value of the method of previous callback */
  value: any;
};

/** Decorator for executing callbacks argument after the function has been finished executing.
 * If last callback returns a value (non undefined), the original function's return will be replaced with that value.
 * Since TS does not yet support change of return value of method based on decorator, I suggest explicitly setting return type
 * of the callback to match the return type of the method
 */
export const After = (
  ...callbacks: ((props: MiddlewareCallbackProps) => any)[]
) => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const oldFunctionValue = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let that = this;
      const functionResult = oldFunctionValue.apply(that, [...args]);
      const callbacksResult = callbacks?.reduce(
        (prevCallbackValue, currentCallback) =>
          currentCallback?.call(that, {
            propertyKey,
            args: [...args],
            value: prevCallbackValue,
          }),
        functionResult
      );
      return callbacksResult !== undefined ? callbacksResult : functionResult;
    };
  };
};
