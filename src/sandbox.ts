import { TExtendFunction, BinaryPipe } from './BinaryPipe';
import { iterateBuffer } from './iterateBuffer';

function generator<T> (func: (val: string) => T): TExtendFunction<T> {
  return (b, previousValue) => ({
    ...previousValue,
    ...func('foobar'),
  });
}

function generator2<T> (func: (val: number) => T): TExtendFunction<T> {
  return (b, previousValue) => ({
    ...previousValue,
    ...func(123),
  });
}

const extender1 = generator((cur) => ({ test: cur }));
const extender2 = generator2((cur) => ({ test2: cur }));
const buffer = Buffer.from([1]);

console.log(BinaryPipe(buffer, { foobar: 'barfoo' }).pipe(extender1)); // { test: 'foobar' }
console.log(BinaryPipe(buffer).pipe(extender1, extender2)); // { test: 'foobar', test2: 'foobar' }
