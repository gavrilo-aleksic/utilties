/**
 * Creates a generic Builder function which works based on Lombak's @Builder annotation.
 * Wraps the class with metadata about registered properties and allows chaining of the setters
 */

type BuilderWrapper<T> = {
  [key in keyof T]: (value: T[key]) => BuilderWrapper<T>;
} & { build: () => T };

const RESERVED_PROPERTY_NAMES = ["build"];
const getHiddenPropertyName = (property: string) => `__${property}__`;
const getPropertyNameFromHidden = (hiddenName: string) =>
  hiddenName.slice(2, -2);
const isHiddenPropertyName = (propertyName: string) =>
  propertyName.slice(0, 2) == "__" && propertyName.slice(-2) == "__";

export const Builder = <T>(Model: new () => T) => {
  const hiddenKeys: Symbol[] = [];

  const wrapper: BuilderWrapper<T> = new Proxy(
    {
      build: () => {
        const newModel = new Model();
        Object.keys(wrapper).forEach((hiddenKey: string) => {
          if (isHiddenPropertyName(hiddenKey))
            // @ts-ignore
            newModel[getPropertyNameFromHidden(hiddenKey)] =
              // @ts-ignore
              wrapper[hiddenKey];
        });
        return newModel;
      },
    } as BuilderWrapper<T>,
    {
      get(target: any, property: any) {
        if (RESERVED_PROPERTY_NAMES.includes(property.toString()))
          return target[property];
        if (isHiddenPropertyName(property)) return target[property];
        return (value: any) => {
          target[getHiddenPropertyName(property)] = value;
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
