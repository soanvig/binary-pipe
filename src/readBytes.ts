import { TExtendFunction, TFormatter } from './BinaryPipe';
import { take } from './take';

/**
 * Reads given number of bytes
 */
export function readBytes<T> (count: number, func: (bytes: number[]) => T): TExtendFunction<T>;
export function readBytes<T, U> (count: number, func: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readBytes<T, U> (count: number, func: (bytes: number[] | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator, previousValue) => {
    const bytes = Array.from(take(generator, count));
    const formatted = formatter ? formatter(bytes) : bytes;
    return {
      ...previousValue,
      ...func(formatted),
    };
  };
}