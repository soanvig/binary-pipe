export type IExtendFunction<T extends Record<string, any>> = <U>(buffer: Buffer, previousValue: U) => T & U;

export interface IBinaryPipe<T> {
  pipe<A> (f1: IExtendFunction<A>): ReturnType<IExtendFunction<T & A>>;
  pipe<A, B> (f1: IExtendFunction<A>, f2: IExtendFunction<B>): ReturnType<IExtendFunction<T & A & B>>;
  pipe<A, B, C> (f1: IExtendFunction<A>, f2: IExtendFunction<B>, f3: IExtendFunction<C>): ReturnType<IExtendFunction<T & A & B & C>>;
  pipe<A, B, C, D> (f1: IExtendFunction<A>, f2: IExtendFunction<B>, f3: IExtendFunction<C>, f4: IExtendFunction<D>): ReturnType<IExtendFunction<T & A & B & C & D>>;
  pipe<A, B, C, D, E> (f1: IExtendFunction<A>, f2: IExtendFunction<B>, f3: IExtendFunction<C>, f4: IExtendFunction<D>, f5: IExtendFunction<E>): ReturnType<IExtendFunction<T & A & B & C & D & E>>;
  pipe<A, B, C, D, E, F> (f1: IExtendFunction<A>, f2: IExtendFunction<B>, f3: IExtendFunction<C>, f4: IExtendFunction<D>, f5: IExtendFunction<E>, f6: IExtendFunction<F>): ReturnType<IExtendFunction<T & A & B & C & D & E & F>>;
  pipe<A, B, C, D, E, F, H> (f1: IExtendFunction<A>, f2: IExtendFunction<B>, f3: IExtendFunction<C>, f4: IExtendFunction<D>, f5: IExtendFunction<E>, f6: IExtendFunction<F>, f7: IExtendFunction<H>): ReturnType<IExtendFunction<T & A & B & C & D & E & F & H>>;
  pipe<A, B, C, D, E, F, H, I> (f1: IExtendFunction<A>, f2: IExtendFunction<B>, f3: IExtendFunction<C>, f4: IExtendFunction<D>, f5: IExtendFunction<E>, f6: IExtendFunction<F>, f7: IExtendFunction<H>, f8: IExtendFunction<I>): ReturnType<IExtendFunction<T & A & B & C & D & E & F & H & I>>;
  pipe (...functions: IExtendFunction<any>[]): Record<string, any>;
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
  return {
    /**
     * Pipes buffer through given functions.
     * It's up to function how many bytes it takes from buffer.
     * Each function should return new literal object, that will be merged to initialObject.
     *
     * @param functions - functions for pipeline
     */
    pipe (...functions: IExtendFunction<any>[]) {
      return functions.reduce((previousValue, func) => func(buffer, previousValue), initialObject);
    },
  };
}
