export type TExtendFunction<T extends Record<string, any>> =
  <U>(buffer: IterableIterator<number>, previousValue: U) => T & U;

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
}

/**
 * BinaryPipe pipes buffer through pipeline of functions.
 * Each function will fillup initialObject with returned object.
 *
 * @param buffer - buffer to parse
 * @param initialObject - object that should be filled-up with values
 */
export function BinaryPipe<T extends Record<string, any>> (
    buffer: IterableIterator<number>, initialObject: T = {} as T,
  ): IBinaryPipe<T> {
  return {
    /**
     * Pipes buffer through given functions.
     * It's up to function how many bytes it takes from buffer.
     * Each function should return new literal object, that will be merged to initialObject.
     *
     * @param functions - functions for pipeline
     */
    pipe (...functions: TExtendFunction<any>[]) {
      return functions.reduce((previousValue, func) => func(buffer, previousValue), initialObject);
    },
  };
}
