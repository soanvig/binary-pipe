import { TExtendFunction, TFormatter } from './BinaryPipe';
import { take } from './take';

/**
 * Read two bytes as BE integer
 */
export function readInt16BE<T> (func: (byte: number) => T): TExtendFunction<T>;
export function readInt16BE<T, U> (func: (byte: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt16BE<T, U> (func: (byte: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (iterator, previousValue) => {
    const buffer: Buffer = take(iterator, 2);
    const int: number = buffer.readInt16BE(0);
    const formatted = formatter ? formatter([int]) : int;
    return {
      ...previousValue,
      ...func(formatted),
    };
  };
}
