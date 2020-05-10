import { take } from './take';
import { ParserFunction } from './BinaryPipe';

/**
 * Reads given number of bytes
 *
 * @param count - number of bytes to read
 * @param formatter - formatter
 */
export function readBytes (count: number): ParserFunction<number[]>;
export function readBytes<T> (count: number, formatter: (v: number[]) => T): ParserFunction<T>;
export function readBytes<T> (count: number, formatter?: (v: number[]) => T): ParserFunction<number[] | T> {
  return (generator) => {
    const bytes = Array.from(take(generator, count));
    const formatted = formatter ? formatter(bytes) : bytes;
    return formatted;
  };
}
