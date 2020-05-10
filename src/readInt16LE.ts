import { take } from './take';
import { ParserFunction } from './BinaryPipe';

/**
 * Read two bytes as LE integer
 *
 * @see https://nodejs.org/api/buffer.html#buffer_buf_readint16le_offset
 *
 * @param formatter - formatter
 */
export function readInt16LE (): ParserFunction<number>;
export function readInt16LE<T> (formatter: (v: number) => T): ParserFunction<T>;
export function readInt16LE<T> (formatter?: (v: number) => T): ParserFunction<number | T> {
  return (generator) => {
    const buffer: Buffer = take(generator, 2);
    const int: number = buffer.readInt16LE(0);
    const formatted = formatter ? formatter(int) : int;
    return formatted;
  };
}
