import { TExtendFunction, TFormatter } from './BinaryPipe';

/**
 * Read single byte
 */
export function readInt8<T> (func: (value: number) => T): TExtendFunction<T>;
export function readInt8<T, U> (func: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt8<T, U> (func: (value: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator, previousValue) => {
    const byte = generator.next().value;
    const formatted = formatter ? formatter([byte]) : byte;
    return {
      ...previousValue,
      ...func(formatted),
    };
  };
}
