import { bufferGenerator } from './bufferGenerator';

export type ParserFunction<T> = (iter: IterableIterator<number>) => T;
export type Parser<T, kT extends string> = [kT, ParserFunction<T>];
export type ParserResult<T, kT extends string> = { [key in kT]: T };

export interface IBinaryPipe<T> {
  pipe<A, kA extends string> (p1: Parser<A, kA>): T & ParserResult<A, kA>;
  pipe<A, kA extends string, B, kB extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>): T & ParserResult<A, kA> & ParserResult<B, kB>;
  pipe<A, kA extends string, B, kB extends string, C, kC extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>): T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC>;
  pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>): T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD>;
  pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string, E, kE extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>, p5: Parser<E, kE>): T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD> & ParserResult<E, kE>;
  pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string, E, kE extends string, F, kF extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>, p5: Parser<E, kE>, p6: Parser<F, kF>): T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD> & ParserResult<E, kE> & ParserResult<F, kF>;
  pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string, E, kE extends string, F, kF extends string, G, kG extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>, p5: Parser<E, kE>, p6: Parser<F, kF>, p7: Parser<G, kG>): T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD> & ParserResult<E, kE> & ParserResult<F, kF> & ParserResult<G, kG>;
  pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string, E, kE extends string, F, kF extends string, G, kG extends string, H, kH extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>, p5: Parser<E, kE>, p6: Parser<F, kF>, p7: Parser<G, kG>, p8: Parser<H, kH>): T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD> & ParserResult<E, kE> & ParserResult<F, kF> & ParserResult<G, kG> & ParserResult<H, kH>;
  loop (count: number): {
    pipe<A, kA extends string> (p1: Parser<A, kA>): (T & ParserResult<A, kA>)[];
    pipe<A, kA extends string, B, kB extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>): (T & ParserResult<A, kA> & ParserResult<B, kB>)[];
    pipe<A, kA extends string, B, kB extends string, C, kC extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>): (T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC>)[];
    pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>): (T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD>)[];
    pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string, E, kE extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>, p5: Parser<E, kE>): (T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD> & ParserResult<E, kE>)[];
    pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string, E, kE extends string, F, kF extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>, p5: Parser<E, kE>, p6: Parser<F, kF>): (T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD> & ParserResult<E, kE> & ParserResult<F, kF>)[];
    pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string, E, kE extends string, F, kF extends string, G, kG extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>, p5: Parser<E, kE>, p6: Parser<F, kF>, p7: Parser<G, kG>): (T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD> & ParserResult<E, kE> & ParserResult<F, kF> & ParserResult<G, kG>)[];
    pipe<A, kA extends string, B, kB extends string, C, kC extends string, D, kD extends string, E, kE extends string, F, kF extends string, G, kG extends string, H, kH extends string> (p1: Parser<A, kA>, p2: Parser<B, kB>, p3: Parser<C, kC>, p4: Parser<D, kD>, p5: Parser<E, kE>, p6: Parser<F, kF>, p7: Parser<G, kG>, p8: Parser<H, kH>): (T & ParserResult<A, kA> & ParserResult<B, kB> & ParserResult<C, kC> & ParserResult<D, kD> & ParserResult<E, kE> & ParserResult<F, kF> & ParserResult<G, kG> & ParserResult<H, kH>)[];
  };
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
    pipe (...parsers: Parser<any, string>[]) {
      // Call each parser and merge returned value into one object
      return parsers.reduce((previousValue, parser) => {
        const result = parser[1](generator);
        return {
          ...previousValue,
          [parser[0]]: result,
        };
      }, initialObject);
    },

    /**
     * Returns special pipe function, which iterates `count` times over buffer,
     * returning array of results.
     *
     * @param count - number of times to iterate.
     */
    loop (count: number) {
      // save basePipe reference to avoid returned pipe calling itself
      const basePipe: Function = this.pipe;

      return {
        pipe (...parsers: Parser<any, string>[]) {
          const entries = [];

          // Call basePipe `count` times
          for (let i = 0; i < count; i += 1) {
            entries.push(basePipe(...parsers));
          }

          return entries as any;
        },
      };
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
      } while (!lastResult.done);

      return Buffer.from(buf);
    },
  };
}
