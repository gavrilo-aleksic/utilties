/**
 * Creates a generic Builder function which works based on Lombak's @Builder annotation.
 * Wraps the class with metadata about registered properties and allows chaining of the setters
 */

type BuilderWrapper<T> = {
  [key in keyof T]: (value: T[key]) => BuilderWrapper<T>;
} & { build: () => T };

export const Builder = <T>(Model: new () => T) => {
  const values: Record<string, any> = {};

  const wrapper: BuilderWrapper<T> = new Proxy(
    {
      build: () => {
        const newModel = new Model();
        Object.keys(values).forEach((key: string) => {
          // @ts-ignore
          newModel[key] = values[key];
        });
        return newModel;
      },
    } as BuilderWrapper<T>,
    {
      get(target: any, property: any) {
        if (target[property]) return target[property];
        if (values[property]) return values[property];
        return (value: any) => {
          values[property] = value;
          return wrapper;
        };
      },
    }
  );
  return wrapper;
};

export class SomeClass {
  public firstName: string = "";
  public lastName: string = "";
}

const classInstance = Builder(SomeClass)
  .firstName("Gavrilo")
  .lastName("Aleksic")
  .build();

console.log({ classInstance });
export default Builder;
