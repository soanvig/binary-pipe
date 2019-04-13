import { TExtendFunction, TFormatter } from './BinaryPipe';
import { take } from './take';

/**
 * Reads given number of bytes
 *
 * @param count - number of bytes to read
 * @param callback - callback
 */
export function readBytes<T> (count: number, callback: (bytes: number[]) => T): TExtendFunction<T>;
export function readBytes<T, U> (count: number, callback: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readBytes<T, U> (count: number, callback: (bytes: number[] | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator, previousValue) => {
    const bytes = Array.from(take(generator, count));
    const formatted = formatter ? formatter(bytes) : bytes;
    return {
      ...previousValue,
      ...callback(formatted),
    };
  };
}
