import { BinaryPipe } from './BinaryPipe';
import { readInt16LE } from './readInt16LE';

describe('readInt16LE', () => {
  it('should read two bytes as LE integer', () => {
    const buffer1 = Buffer.from([0, 5]);
    const result1 = BinaryPipe(buffer1).pipe(
      ['integer', readInt16LE()],
    );
    expect(result1.integer).toBe(1280);

    const buffer2 = Buffer.from([5, 0]);
    const result2 = BinaryPipe(buffer2).pipe(
      ['integer', readInt16LE()],
    );
    expect(result2.integer).toBe(5);
  });
});
