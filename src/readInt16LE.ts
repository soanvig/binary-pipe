import { TExtendFunction, TFormatter } from './BinaryPipe';
import { take } from './take';

/**
 * Read two bytes as LE integer
 */
export function readInt16LE<T> (func: (value: number) => T): TExtendFunction<T>;
export function readInt16LE<T, U> (func: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt16LE<T, U> (func: (value: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator, previousValue) => {
    const buffer: Buffer = take(generator, 2);
    const int: number = buffer.readInt16LE(0);
    const formatted = formatter ? formatter([int]) : int;
    return {
      ...previousValue,
      ...func(formatted),
    };
  };
}