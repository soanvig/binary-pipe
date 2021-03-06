import { BinaryPipe } from './BinaryPipe';
import { readInt8 } from './readInt8';

describe('BinaryPipe', () => {
  function parser1 () {
    return 'foobar';
  }

  function parser2 () {
    return 666;
  }

  describe('pipe', () => {
    const buffer = Buffer.from([1]);

    it('should return value from first parser', () => {
      expect(BinaryPipe(buffer).pipe(
        ['foobar', parser1],
      )).toEqual({ foobar: 'foobar' });
    });

    it('should return value from parser and second parser', () => {
      expect(BinaryPipe(buffer).pipe(
        ['foobar', parser1],
        ['number', parser2],
      )).toEqual({ foobar: 'foobar', number: 666 });
    });

    it('should return value respecting initial value', () => {
      expect(BinaryPipe(buffer, { test: 'test' }).pipe(
        ['foobar', parser1],
      )).toEqual({ test: 'test', foobar: 'foobar' });
    });
  });

  describe('loop', () => {
    it('should iterate given times over buffer', () => {
      const buffer = Buffer.from([1, 2, 3]);
      const result = BinaryPipe(buffer).loop(3).pipe(
        ['value', (iterator) => iterator.next().value],
      );

      expect(result).toHaveLength(3);

      expect(result[0].value).toBe(1);
      expect(result[1].value).toBe(2);
      expect(result[2].value).toBe(3);
    });
  });

  describe('finish', () => {
    const buffer = Buffer.from([1, 2]);

    it('should return buffer leftover', () => {
      const result = Array.from(BinaryPipe(buffer).finish());

      expect(result[0]).toBe(1);
      expect(result[1]).toBe(2);
      expect(result[2]).toBe(undefined);
    });
  });
});
