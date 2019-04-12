import { BinaryPipe } from './BinaryPipe';
import { readInt32LE } from './readInt32LE';

describe('readInt16BE', () => {
  it('should read two bytes as BE integer', () => {
    const buffer1 = Buffer.from([0, 0, 0, 5]);
    const result1 = BinaryPipe(buffer1).pipe(readInt32LE((integer) => ({ integer })));
    expect(result1.integer).toBe(83886080);

    const buffer2 = Buffer.from([5, 0, 0, 0]);
    const result2 = BinaryPipe(buffer2).pipe(readInt32LE((integer) => ({ integer })));
    expect(result2.integer).toBe(5);
  });
});
