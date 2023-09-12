import { chain } from "./async";

const mockPromise = (val: any, reject?: boolean) => reject ? Promise.reject(val) : Promise.resolve(val);

describe("[Async chain]", () => {
    test("Should correctly chain async result and resolve all of them", async () => {
        const result = await mockPromise(1)
            .then(chain(mockPromise(2)))
            .then(chain(mockPromise(3)))
        expect(result).toMatchObject([1, 2, 3])
    });

    test("Should correctly catch rejected promises", async () => {
        const result = await mockPromise(1)
            .then(chain(mockPromise(2)))
            .then(chain(mockPromise('Rejected', true)))
            .catch(e => e)

        expect(result).toMatchObject({ error: "Rejected", values: [1, 2] })
    });

    test("Should correctly work with non-promises", async () => {
        const result = await mockPromise(1)
            .then(chain(2))

        expect(result).toMatchObject([1, 2])
    });
});
