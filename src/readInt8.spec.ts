import { BinaryPipe } from './BinaryPipe';
import { readInt8 } from './readInt8';

describe('readInt8', () => {
  it('should read one byte', () => {
    const buffer = Buffer.from([1, 2, 3]);
    const result = BinaryPipe(buffer).pipe(readInt8((byte) => ({ byte })));

    expect(result.byte).toBe(1);
  });
});
