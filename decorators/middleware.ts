/** Decorator for executing callback argument after the function has been finished executing. */
export const After = (callback: (props: {propertyKey: string, args: any[]}) => any) => {
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
    };
  };
};

