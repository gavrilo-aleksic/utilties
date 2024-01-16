import "reflect-metadata";

/**
 * Creates a generic Builder function which works based on Lombak's @Builder annotation.
 * Wraps the class with metadata about registered properties and allows chaining of the setters
 */

interface BuilderMeta {
  fields: BuilderField[];
}
type BuilderWrapper<T> = {
  [key in keyof T]: (value: T[key]) => BuilderWrapper<T>;
} & { build: () => T };

interface BuilderField {
  key: string;
}

const BUILDER_META = Symbol("builder-meta");
const RESERVED_PROPERTY_NAMES = ["build"];

const createBuilderMeta = (modelConstructor: any) =>
  (modelConstructor[BUILDER_META] = { fields: [] } as BuilderMeta);

export const Builder = <T>(Model: new () => T) => {
  // @ts-ignore
  const ModelMeta: BuilderMeta = Model[BUILDER_META];

  if (!ModelMeta)
    throw new Error(
      `Class ${Model.name} is not equipped with @Prop() decorators`
    );
  const wrapper: BuilderWrapper<T> = new Proxy(
    {
      build: () => {
        const newModel = new Model();
        ModelMeta.fields.forEach(
          (field: BuilderField) =>
            // @ts-ignore
            (newModel[field.key] = wrapper[`_${field.key}`])
        );
        return newModel;
      },
    } as BuilderWrapper<T>,
    {
      get(target, property) {
        //@ts-ignore
        return target[property];
      },
    }
  );

  ModelMeta.fields.forEach((field: BuilderField) => {
    let keyofT = field.key as keyof T;
    // @ts-ignore
    wrapper[keyofT] = (value: T[typeof keyofT]) => {
      // @ts-ignore
      wrapper[`_${keyofT}`] = value;
      return wrapper;
    };
  });

  return wrapper;
};

const Prop = () => (target: any, propertyKey: string) => {
  if (!target.constructor[BUILDER_META]) createBuilderMeta(target.constructor);
  if (RESERVED_PROPERTY_NAMES.includes(propertyKey))
    throw new Error('Property named "build" is reserved keyword');
  target.constructor[BUILDER_META].fields.push({ key: propertyKey });
};

export class SomeClass {
  @Prop()
  public firstName: string = "";

  @Prop()
  public lastName: string = "";
}

const classInstance = Builder(SomeClass)
  .firstName("Gavrilo")
  .lastName("Aleksic")
  .build();

console.log({ classInstance });
export default Builder;
