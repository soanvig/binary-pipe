# binary-pipe

**binary-pipe** is handy util, when it comes to reading (parsing) binary files.

<!-- TOC -->

- [binary-pipe](#binary-pipe)
  - [How it works](#how-it-works)
  - [Example](#example)
  - [Documentation](#documentation)
    - [BinaryPipe](#binarypipe)
    - [Parsers and formatters](#parsers-and-formatters)
  - [Custom](#custom)
    - [Parser](#parser)
    - [Formatter](#formatter)

<!-- /TOC -->

## How it works

**binary-pipe** takes buffer, and provides pipeline for parsing.

Parser reads values from buffer, and returns them into callback function. Callback function (provided by the user) should return object with new value as some field's value (see [Example](#example)). Final object of pipeline is sum of objects returned from parsers' callbacks.

Each parser may (and should) accept formatting function. Providing formatter for parser is optional. Formatter converts value returned from parser into string or anything.

For parsing and formatting, you can use [one of the built-ins](#documentation), or [create your owns](#custom).

## Example

```ts
import { BinaryPipe, readInt8 } from 'binary-pipe';

const buffer = Buffer.from([1, 2, 3]);
const result = BinaryPipe(buffer).pipe(
  readInt8((byte) => ({ firstByte: byte })),
  readInt8((byte) => ({ secondByte: byte })),
  readInt8((byte) => ({ thirdByte: byte })),
);

console.log(result); // { firstByte: 1, secondByte: 2, thirdByte: 3 }
```

The example above takes simple three-value buffer, and pipes it through three functions: parsers.

Each of these parsers takes single byte (int8), and accepts callback. The callback accepts read byte, and returns new object. Each object is merged into previous one, so the final object is sum of all three, what is shown in `console.log` line.

Because **binary-pipe** operates on real literal objects, and provides TS typing, it's **type-safe**: even the last object returned has proper typing.

If user wants to use formatter function, which returns some interface, `Array`, `String` or `Boolean` - fine. Final object will have proper typing even so.

## Documentation

This sections describe built-in functions. For creating your own function see [Custom](#custom) section.

Complete documentation can be found here: [...](...)
### BinaryPipe

```ts
/**
 * BinaryPipe pipes buffer through pipeline of functions.
 * Each function will fillup initialObject with returned object.
 *
 * @param buffer - buffer to parse
 * @param initialObject - object that should be filled-up with values
 */
function BinaryPipe(buffer: Buffer, initialObject: = {})
```

BinaryPipe returns object, with `pipe` method.

```ts
/**
 * Pipes buffer through given parsers.
 * It's up to parser how many bytes it takes from buffer.
 * Each parser should return new literal object, that will be merged to previous object (or initialObject).
 *
 * @param parsers - parsers for pipeline
 */
pipe (...parsers)
```

Each parser given to pipe will then take buffer given in `BinaryPipe`, take out some values from it, and return them in some way to parser's callback function.

From callback function value can be saved in new object, which will be merged into previous object.

### Parsers and formatters

See all parsers (starting from name `read`) and formatters (starting from name `format`) here: [...](...)

## Custom

### Parser

### Formatter

