import { TExtendFunction, TFormatter } from './BinaryPipe';
import { take } from './take';

/**
 * Read four bytes as BE integer
 */
export function readInt32BE<T> (func: (byte: number) => T): TExtendFunction<T>;
export function readInt32BE<T, U> (func: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt32BE<T, U> (func: (byte: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator, previousValue) => {
    const buffer: Buffer = take(generator, 4);
    const int: number = buffer.readInt32BE(0);
    const formatted = formatter ? formatter([int]) : int;
    return {
      ...previousValue,
      ...func(formatted),
    };
  };
}
