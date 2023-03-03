/**
 * Method decorators for classes executed before/after the method execution
 */


type MiddlewareCallbackProps = {
  /** Name of the method called */
  propertyKey: string;
  /** Original arguments of the called method */
  args: any[]
}

/** Decorator for executing callback argument after the function has been finished executing. */
export const After = (callback: (props: MiddlewareCallbackProps) => any) => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const oldFunctionValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
      let that = this;
      oldFunctionValue.apply(that, [...args]);
      callback.call(that, {propertyKey, args: [...args]});
      return that;
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
