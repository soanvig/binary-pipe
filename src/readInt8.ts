import { TExtendFunction, TFormatter } from './BinaryPipe';

/**
 * Read single byte
 *
 * @see https://nodejs.org/api/buffer.html#buffer_buf_readint8_offset
 *
 * @param callback - callback
 */
export function readInt8<T> (callback: (value: number) => T): TExtendFunction<T>;
export function readInt8<T, U> (callback: (value: U) => T, formatter: TFormatter<U>): TExtendFunction<T>;
export function readInt8<T, U> (callback: (value: number | U) => T, formatter?: TFormatter<U>): TExtendFunction<T> {
  return (generator) => {
    const byte = generator.next().value;
    const formatted = formatter ? formatter([byte]) : byte;
    return callback(formatted);
  };
}
