import { BinaryPipe } from './BinaryPipe';
import { readInt32BE } from './readInt32BE';

describe('readInt16BE', () => {
  it('should read two bytes as BE integer', () => {
    const buffer1 = Buffer.from([0, 0, 0, 5]);
    const result1 = BinaryPipe(buffer1).pipe(
      ['integer', readInt32BE()],
    );
    expect(result1.integer).toBe(5);

    const buffer2 = Buffer.from([5, 0, 0, 0]);
    const result2 = BinaryPipe(buffer2).pipe(
      ['integer', readInt32BE()],
    );
    expect(result2.integer).toBe(83886080);
  });
});
