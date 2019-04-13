import { TExtendFunction, TFormatter } from './BinaryPipe';
import { take } from './take';

/**
 * Read two bytes as BE integer
 *
 * @see https://nodejs.org/api/buffer.html#buffer_buf_readint16be_offset
 *
 * @param callback - callback
 */
export function readInt16BE<T> (callback: (value: number) => T): TExtendFunction<T>;
export function readInt16BE<T, U> (callback: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt16BE<T, U> (callback: (value: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator) => {
    const buffer: Buffer = take(generator, 2);
    const int: number = buffer.readInt16BE(0);
    const formatted = formatter ? formatter([int]) : int;
    return callback(formatted);
  };
}
