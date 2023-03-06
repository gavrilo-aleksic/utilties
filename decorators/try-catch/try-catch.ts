/** Wraps the method in try/catch block. If error is thrown, callback is executed and its returned value is returned as function value */
export const TryCatch =
  (errorCallback?: (error: any, ...originalArguments: any[]) => any | void) =>
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
