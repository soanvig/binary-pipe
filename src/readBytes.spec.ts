import { readBytes } from './readBytes';
import { BinaryPipe } from './BinaryPipe';

describe('readBytes', () => {
  it('should return given number of bytes', () => {
    const buffer = Buffer.from([1, 2, 3]);
    const result = BinaryPipe(buffer).pipe(
      ['bytes', readBytes(2)],
    );

    expect(result.bytes[0]).toBe(1);
    expect(result.bytes[1]).toBe(2);
    expect(result.bytes[2]).toBeUndefined();
  });
});
