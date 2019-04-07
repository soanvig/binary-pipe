import { IExtendFunction, BinaryTransformer } from '~/index.ts';

function generator<T> (func: (val: string) => T): IExtendFunction<T> {
  return (buffer, previousValue) => ({
    ...previousValue,
    ...func('foobar'),
  });
}

function generator2<T> (func: (val: number) => T): IExtendFunction<T> {
  return (buffer, previousValue) => ({
    ...previousValue,
    ...func(123),
  });
}

const extender1 = generator((cur) => ({ test: cur }));
const extender2 = generator2((cur) => ({ test2: cur }));

console.log(BinaryTransformer(null, { foobar: 'barfoo' }).pipe(extender1)); // { test: 'foobar' }
console.log(BinaryTransformer(null).pipe(extender1, extender2)); // { test: 'foobar', test2: 'foobar' }
