import { BinaryPipe, readInt8 } from '../src';

/**
 * This example presents basic usage of binary-pipe
 */

const buffer = Buffer.from([1, 2, 3]);
const result = BinaryPipe(buffer).pipe(
  ['firstByte', readInt8()],
  ['secondByte', readInt8()],
  ['thirdByte', readInt8()],
);

console.log(result); // { firstByte: 1, secondByte: 2, thirdByte: 3 }
