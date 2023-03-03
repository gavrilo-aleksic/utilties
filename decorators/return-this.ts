/** Simple decorator which returns "this" value at the end of execution of a class method */
const ReturnThis = () => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const oldFunctionValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
      let that = this;
      oldFunctionValue.apply(that, [...args]);
      return that;
    };
  };
};