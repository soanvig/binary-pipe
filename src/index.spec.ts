import { IExtendFunction, BinaryTransformer } from './index';

describe('BinaryTransformer', () => {
  function generator1<T> (func: (val: string) => T): IExtendFunction<T> {
    return (buffer, previousValue) => ({
      ...previousValue,
      ...func('foobar'),
    });
  }

  function generator2<T> (func: (val: number) => T): IExtendFunction<T> {
    return (buffer, previousValue) => ({
      ...previousValue,
      ...func(666),
    });
  }

  describe('pipe', () => {
    const parser1 = generator1((value) => ({ foobar: value }));
    const parser = generator2((value) => ({ number: value }));

    it('should return value from first parser', () => {
      expect(BinaryTransformer(null).pipe(parser1)).toEqual({ foobar: 'foobar' });
    });

    it('should return value from parser and second parser', () => {
      expect(BinaryTransformer(null).pipe(parser1, parser)).toEqual({ foobar: 'foobar', number: 666 });
    });

    it('should return value respecting initial value', () => {
      expect(BinaryTransformer(null, { test: 'test' }).pipe(parser1)).toEqual({ test: 'test', foobar: 'foobar' });
    });
  });
});
