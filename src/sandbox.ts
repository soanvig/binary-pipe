import { TExtendFunction, BinaryPipe } from './BinaryPipe';

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

type TFormatter<T> = (bytes: number[]) => T;

function readInt8<T> (func: (val: number) => T): TExtendFunction<T>;
function readInt8<T, U> (func: (val: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
function readInt8<T, U> (func: (val: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (b, previousValue) => {
    const byte = b.next().value;
    const formatted = formatter ? formatter([byte]) : byte;
    return {
      ...previousValue,
      ...func(formatted),
    };
  };
}

function testFormatter (bytes: number[]): string {
  return bytes[0].toString();
}

// Now val is string instead of number
readInt8((val) => ({}), testFormatter);
