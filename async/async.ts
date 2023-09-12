const mockPromise = (val: any, reject?: boolean) => reject ? Promise.reject(val) : Promise.resolve(val);

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

export const chain = (chainedValue: any): (prev: any) => Promise<any> => {
    return (...prev: any) => new Promise((resolve) => resolve(chainedValue instanceof Promise ? chainedValue.then((curr => [...prev, curr].flat()))
        .catch(e => Promise.reject({ error: e, values: [...prev].flat() })) : [...prev, chainedValue].flat()))
}
