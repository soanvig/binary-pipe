/**
 * Takes buffer and returns it as a iterator.
 * Handles the problem of pipeline not knowning current buffer position.
 *
 * @param buffer - buffer to iterate over
 */
export function* iterateBuffer (buffer: Buffer): IterableIterator<number> {
  // If buffer is empty, after first .next() it will throw
  if (buffer.length === 0) {
    throw new EmptyIteratorBufferError();
  }

  const max: number = buffer.length - 1;
  let pos: number = 0;

  // Iterate over all buffer values but last
  while (pos < max) {
    yield buffer[pos];
    pos += 1;
  }

  // Return final buffer item (with done: true)
  return buffer[pos];
}

/**
 * Error about trying to iterate over empty buffer.
 */
export class EmptyIteratorBufferError extends Error {
  constructor () {
    super('Trying to iterate over empty buffer!');
    Error.captureStackTrace(this, this.constructor);
  }
}
