import { bufferGenerator } from './bufferGenerator';
import { take } from './take';

describe('take', () => {
  it('should take given number of bytes from generator', () => {
    const generator = bufferGenerator(Buffer.from([1, 2, 3, 4, 5]));
    const result: Buffer = take(generator, 2);
    const arrayedResult: number[] = Array.from(result);

    expect(result).toBeInstanceOf(Buffer);
    expect(arrayedResult[0]).toBe(1);
    expect(arrayedResult[1]).toBe(2);
    expect(arrayedResult[2]).toBeUndefined();
  });

  it('should not iterate more than necessary', () => {
    const generator = bufferGenerator(Buffer.from([1, 2, 3, 4, 5]));
    take(generator, 2);

    const nextValue: number = generator.next().value;

    expect(nextValue).toBe(3);
  });
});
