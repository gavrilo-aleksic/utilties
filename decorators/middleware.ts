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
 * If last callback returns a value (non undefined), the original function's return will be replace with that value
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

/** Wraps the method in try/catch block. If error is thrown, callback is executed and its returned value is returned as function value */
export const TryCatch =
  (errorCallback?: (error: any, ...originalArguments: any[]) => any) =>
  (
    classConstructor: any,
    methodName: string,
    propertyDescriptior: PropertyDescriptor
  ) => {
    const oldMethod = propertyDescriptior.value;
    propertyDescriptior.value = function (...args: any[]) {
      try {
        const functionReturnValue = oldMethod.apply(this, [...args]);
        return functionReturnValue;
      } catch (error) {
        if (errorCallback) {
          return errorCallback.apply(this, [error, ...args]);
        } else {
          throw error;
        }
      }
    };
    return propertyDescriptior;
  };
