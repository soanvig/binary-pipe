import { take } from './take';
import { ParserFunction } from './BinaryPipe';

/**
 * Read two bytes as BE integer
 *
 * @see https://nodejs.org/api/buffer.html#buffer_buf_readint16be_offset
 *
 * @param formatter - number formatter
 */
export function readInt16BE (): ParserFunction<number>;
export function readInt16BE<T> (formatter: (v: number) => T): ParserFunction<T>;
export function readInt16BE<T> (formatter?: (v: number) => T): ParserFunction<number | T> {
  return (generator) => {
    const buffer: Buffer = take(generator, 2);
    const int: number = buffer.readInt16BE(0);
    const formatted = formatter ? formatter(int) : int;

    return formatted;
  };
}
