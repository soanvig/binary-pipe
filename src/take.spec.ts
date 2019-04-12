import { iterateBuffer } from './iterateBuffer';
import { take } from './take';

describe('take', () => {
  it('should take given number of bytes from iterator', () => {
    const iterator = iterateBuffer(Buffer.from([1, 2, 3, 4, 5]));
    const result: Buffer = take(iterator, 2);
    const arrayedResult: number[] = Array.from(result);

    expect(result).toBeInstanceOf(Buffer);
    expect(arrayedResult[0]).toBe(1);
    expect(arrayedResult[1]).toBe(2);
    expect(arrayedResult[2]).toBeUndefined();
  });

  it('should not iterate more than necessary', () => {
    const iterator = iterateBuffer(Buffer.from([1, 2, 3, 4, 5]));
    take(iterator, 2);

    const nextValue: number = iterator.next().value;

    expect(nextValue).toBe(3);
  });
});
