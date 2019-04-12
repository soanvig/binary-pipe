import { TExtendFunction, TFormatter } from './BinaryPipe';

/**
 * Read single byte
 */
export function readInt8<T> (func: (byte: number) => T): TExtendFunction<T>;
export function readInt8<T, U> (func: (byte: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt8<T, U> (func: (byte: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (b, previousValue) => {
    const byte = b.next().value;
    const formatted = formatter ? formatter([byte]) : byte;
    return {
      ...previousValue,
      ...func(formatted),
    };
  };
}
