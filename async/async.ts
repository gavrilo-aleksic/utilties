const mockPromise = (val: any) => Promise.resolve(val);

/** Boring approach for reducing the result of multiple promises with async/await */
const withAsyncAwait = async () => {
    const first = await mockPromise(1);
    const second = await mockPromise(2);
    return first + second;
}

/** Call multiple Promises and reduce the result */
const withChaingingThen = () => {
    return mockPromise(1).then(res1 => mockPromise(2).then(res2 => res2 + res1))
}

/** Easier approach with Promise.all() (not sequential but parallel!) */
const withPromiseAll = () => {
    return Promise.all([mockPromise(1), mockPromise(2)]).then(([res1, res2]) => res1 + res2)
}

const chain = (chainedValue: Promise<any>): (prev: any) => Promise<[...any]> => {
    return (...prev: any) => new Promise(async resolve => resolve([...prev, await chainedValue].flat()))
}

(async function main() {
    const result = await mockPromise(1)
        .then(chain(mockPromise(2)))
        .then(chain(mockPromise(3)))
        .then(([res1, res2, res3]) => res1 + res2 + res3)
    console.log({ result })
})()