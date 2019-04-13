import { bufferGenerator } from './bufferGenerator';

export type TFormatter<T> = (bytes: number[]) => T;

export type TExtendFunction<T extends Record<string, any>> =
  <U>(buffer: IterableIterator<number>, previousValue: U) => T;

export interface IBinaryPipe<T> {
  pipe<A> (f1: TExtendFunction<A>): ReturnType<TExtendFunction<T & A>>;
  pipe<A, B> (f1: TExtendFunction<A>, f2: TExtendFunction<B>): ReturnType<TExtendFunction<T & A & B>>;
  pipe<A, B, C> (f1: TExtendFunction<A>, f2: TExtendFunction<B>, f3: TExtendFunction<C>): ReturnType<TExtendFunction<T & A & B & C>>;
  pipe<A, B, C, D> (f1: TExtendFunction<A>, f2: TExtendFunction<B>, f3: TExtendFunction<C>, f4: TExtendFunction<D>): ReturnType<TExtendFunction<T & A & B & C & D>>;
  pipe<A, B, C, D, E> (f1: TExtendFunction<A>, f2: TExtendFunction<B>, f3: TExtendFunction<C>, f4: TExtendFunction<D>, f5: TExtendFunction<E>): ReturnType<TExtendFunction<T & A & B & C & D & E>>;
  pipe<A, B, C, D, E, F> (f1: TExtendFunction<A>, f2: TExtendFunction<B>, f3: TExtendFunction<C>, f4: TExtendFunction<D>, f5: TExtendFunction<E>, f6: TExtendFunction<F>): ReturnType<TExtendFunction<T & A & B & C & D & E & F>>;
  pipe<A, B, C, D, E, F, H> (f1: TExtendFunction<A>, f2: TExtendFunction<B>, f3: TExtendFunction<C>, f4: TExtendFunction<D>, f5: TExtendFunction<E>, f6: TExtendFunction<F>, f7: TExtendFunction<H>): ReturnType<TExtendFunction<T & A & B & C & D & E & F & H>>;
  pipe<A, B, C, D, E, F, H, I> (f1: TExtendFunction<A>, f2: TExtendFunction<B>, f3: TExtendFunction<C>, f4: TExtendFunction<D>, f5: TExtendFunction<E>, f6: TExtendFunction<F>, f7: TExtendFunction<H>, f8: TExtendFunction<I>): ReturnType<TExtendFunction<T & A & B & C & D & E & F & H & I>>;
  pipe (...functions: TExtendFunction<any>[]): Record<string, any>;
  finish (): Buffer;
}

/**
 * BinaryPipe pipes buffer through pipeline of functions.
 * Each function will fillup initialObject with returned object.
 *
 * @param buffer - buffer to parse
 * @param initialObject - object that should be filled-up with values
 */
export function BinaryPipe<T extends Record<string, any>> (
  buffer: Buffer, initialObject: T = {} as T,
): IBinaryPipe<T> {
  const generator: IterableIterator<number> = bufferGenerator(buffer);
  return {
    /**
     * Pipes buffer through given parsers.
     * It's up to parser how many bytes it takes from buffer.
     * Each parser should return new literal object, that will be merged to previous object (or initialObject) by pipe.
     *
     * @param parsers - parsers for pipeline
     */
    pipe (...parsers: TExtendFunction<any>[]) {
      return parsers.reduce((previousValue, callback) => {
        const newObject = callback(generator, previousValue);
        return {
          ...previousValue,
          ...newObject,
        };
      }, initialObject);
    },

    /**
     * Returns buffer not parsed by pipe yet.
     * Closes generator, so no piping will be available after calling `finish`.
     */
    finish () {
      const buf: number[] = [];

      // Take all bytes and close generator
      let lastResult;
      do {
        lastResult = generator.next();
        buf.push(lastResult.value);
      } while (!lastResult.done)

      return Buffer.from(buf);
    },
  };
}
