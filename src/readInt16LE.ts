import { TExtendFunction, TFormatter } from './BinaryPipe';
import { take } from './take';

/**
 * Read two bytes as LE integer
 *
 * @see https://nodejs.org/api/buffer.html#buffer_buf_readint16le_offset
 *
 * @param callback - callback
 */
export function readInt16LE<T> (callback: (value: number) => T): TExtendFunction<T>;
export function readInt16LE<T, U> (callback: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt16LE<T, U> (callback: (value: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator) => {
    const buffer: Buffer = take(generator, 2);
    const int: number = buffer.readInt16LE(0);
    const formatted = formatter ? formatter([int]) : int;
    return callback(formatted);
  };
}
