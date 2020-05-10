import { ParserFunction } from './BinaryPipe';

/**
 * Skips `count` bytes.
 *
 * @param count - count of bytes to skip.
 */
export function skip (count: number): ParserFunction<{}> {
  return (generator) => {
    // Take `count` values and do nothing with them
    for (let i = 0; i < count; i += 1) {
      generator.next();
    }

    return {};
  };
}
