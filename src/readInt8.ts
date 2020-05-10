import { ParserFunction } from './BinaryPipe';

/**
 * Read single byte
 *
 * @see https://nodejs.org/api/buffer.html#buffer_buf_readint8_offset
 *
 * @param formatter - number formatter
 */
export function readInt8 (): ParserFunction<number>;
export function readInt8<T> (formatter: (v: number) => T): ParserFunction<T>;
export function readInt8<T> (formatter?: (v: number) => T): ParserFunction<number | T> {
  return (generator) => {
    const byte = generator.next().value;
    const formatted = formatter ? formatter(byte) : byte;
    return formatted;
  };
}
