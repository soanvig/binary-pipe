import { iterateBuffer, EmptyIteratorBufferError } from './iterateBuffer';

describe('iterateBuffer', () => {
  it('should return complete buffer already including done', () => {
    const iterator = iterateBuffer(Buffer.from([1, 2, 3]));

    expect(iterator.next()).toEqual({ value: 1, done: false });
    expect(iterator.next()).toEqual({ value: 2, done: false });
    expect(iterator.next()).toEqual({ value: 3, done: true });
  });

  it('should throw for empty buffer', () => {
    expect(() => {
      iterateBuffer(Buffer.from([])).next();
    }).toThrow(EmptyIteratorBufferError);
  });
});
