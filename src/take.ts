/**
 * Returns N bytes as buffer from iterator.
 *
 * @param iterator - iterator to retrieve values from
 * @param count - number of values to take
 */
export function take (iterator: IterableIterator<number>, count: number): Buffer {
  const buffer: number[] = [];

  // Get `count` values from iterator.
  // for-of cannot be used:
  // @see https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Polecenia/for...of
  for (let i = 0; i < count; i += 1) {
    const byte = iterator.next().value;
    buffer.push(byte);
  }

  return Buffer.from(buffer);
}
