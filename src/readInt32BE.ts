import { ParserFunction } from './BinaryPipe';
import { take } from './take';

/**
 * Read four bytes as BE integer
 *
 * @see https://nodejs.org/api/buffer.html#buffer_buf_readint32be_offset
 *
 * @param formatter - formatter
 */
export function readInt32BE (): ParserFunction<number>;
export function readInt32BE<T> (formatter: (v: number) => T): ParserFunction<T>;
export function readInt32BE<T> (formatter?: (v: number) => T): ParserFunction<number | T> {
  return (generator) => {
    const buffer: Buffer = take(generator, 4);
    const int: number = buffer.readInt32BE(0);
    const formatted = formatter ? formatter(int) : int;
    return formatted;
  };
}
