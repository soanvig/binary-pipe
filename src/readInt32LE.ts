import { TExtendFunction, TFormatter } from './BinaryPipe';
import { take } from './take';

/**
 * Read four bytes as LE integer
 */
export function readInt32LE<T> (func: (value: number) => T): TExtendFunction<T>;
export function readInt32LE<T, U> (func: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt32LE<T, U> (func: (value: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator, previousValue) => {
    const buffer: Buffer = take(generator, 4);
    const int: number = buffer.readInt32LE(0);
    const formatted = formatter ? formatter([int]) : int;
    return {
      ...previousValue,
      ...func(formatted),
    };
  };
}
