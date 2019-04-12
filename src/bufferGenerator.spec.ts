import { bufferGenerator, EmptyIteratorBufferError } from './bufferGenerator';

describe('bufferGenerator', () => {
  it('should return complete buffer already including done', () => {
    const generator = bufferGenerator(Buffer.from([1, 2, 3]));

    expect(generator.next()).toEqual({ value: 1, done: false });
    expect(generator.next()).toEqual({ value: 2, done: false });
    expect(generator.next()).toEqual({ value: 3, done: true });
  });

  it('should throw for empty buffer', () => {
    expect(() => {
      bufferGenerator(Buffer.from([])).next();
    }).toThrow(EmptyIteratorBufferError);
  });
});
