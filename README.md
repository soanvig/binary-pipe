# binary-pipe

**binary-pipe** is handy util, when it comes to reading (parsing) binary files.

<!-- TOC -->

- [binary-pipe](#binary-pipe)
  - [How it works](#how-it-works)
  - [Example](#example)
  - [Built-ins](#built-ins)
    - [Parsers](#parsers)
    - [Formatters](#formatters)
  - [API](#api)
    - [BinaryPipe](#binarypipe)
    - [Parsers](#parsers-1)
    - [Formatters](#formatters-1)

<!-- /TOC -->

## How it works

**binary-pipe** takes buffer, and provides pipeline for parsing.

Parser reads values from buffer, and returns them into callback function. Callback function (provided by the user) should return object with new value as some field's value (see [Example](#example)). Final object of pipeline is sum of objects returned from parsers' callbacks.

Each parser may (and should) accept formatting function. Providing formatter for parser is optional. Formatter converts value returned from parser into string or anything.

For parsing and formatting, you can use [one of the built-ins](#built-ins), or [create your owns](#api).

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

## Built-ins

This sections describes parsers and formatters built into library.

If you want to know how to create parser or formatter, see [API](#api).

### Parsers

Built-in parsers match [Node.js Buffer API](https://nodejs.org/api/buffer.html)

### Formatters

No formatters are created for now.

For creating formatters see [Formatters in API section](#formatters-1)

## API

### BinaryPipe

### Parsers

### Formatters

