import { skip } from './skip';
import { BinaryPipe } from './BinaryPipe';
import { readInt8 } from './readInt8';

describe('skip', () => {
  it('should skip desired number of values', () => {
    const buf = Buffer.from([1, 2, 3]);
    const result = BinaryPipe(buf).pipe(
      ['', skip(2)],
      ['byte', readInt8()],
    );

    expect(result.byte).toBe(3);
  });
});
