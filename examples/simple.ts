import { BinaryPipe, readInt8 } from '../src';

/**
 * This example presents basic usage of binary-pipe
 */

const buffer = Buffer.from([1, 2, 3]);
const result = BinaryPipe(buffer).pipe(
  readInt8((byte) => ({ firstByte: byte })),
  readInt8((byte) => ({ secondByte: byte })),
  readInt8((byte) => ({ thirdByte: byte })),
);

console.log(result); // { firstByte: 1, secondByte: 2, thirdByte: 3 }
