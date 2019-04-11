import { TExtendFunction, BinaryPipe } from './BinaryPipe';

function generator<T> (func: (val: string) => T): TExtendFunction<T> {
  return (buffer, previousValue) => ({
    ...previousValue,
    ...func('foobar'),
  });
}

function generator2<T> (func: (val: number) => T): TExtendFunction<T> {
  return (buffer, previousValue) => ({
    ...previousValue,
    ...func(123),
  });
}

const extender1 = generator((cur) => ({ test: cur }));
const extender2 = generator2((cur) => ({ test2: cur }));
const iterator = bufferGenerator(Buffer.from([1]));

console.log(BinaryPipe(iterator, { foobar: 'barfoo' }).pipe(extender1)); // { test: 'foobar' }
console.log(BinaryPipe(iterator).pipe(extender1, extender2)); // { test: 'foobar', test2: 'foobar' }
