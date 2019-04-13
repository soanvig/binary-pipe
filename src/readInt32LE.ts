import { TExtendFunction, TFormatter } from './BinaryPipe';
import { take } from './take';

/**
 * Read four bytes as LE integer
 *
 * @see https://nodejs.org/api/buffer.html#buffer_buf_readint32le_offset
 *
 * @param callback - callback
 */
export function readInt32LE<T> (callback: (value: number) => T): TExtendFunction<T>;
export function readInt32LE<T, U> (callback: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt32LE<T, U> (callback: (value: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator, previousValue) => {
    const buffer: Buffer = take(generator, 4);
    const int: number = buffer.readInt32LE(0);
    const formatted = formatter ? formatter([int]) : int;
    return {
      ...previousValue,
      ...callback(formatted),
    };
  };
}
