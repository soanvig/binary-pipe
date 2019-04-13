import { BinaryPipe } from '../src';
import { readBytes } from '../src/readBytes';
import { readInt32LE } from '../src/readInt32LE';

/**
 * This example presents reading header of `key` file from Infinity Engine
 * https://gibberlings3.github.io/iesdp/file_formats/ie_formats/key_v1.htm
 */
const inputBuffer: Buffer = Buffer.from([
  75, 69, 89, 32,
  86, 49, 32, 32,
  80, 0, 0, 0,
  129, 144, 0, 0,
  24, 0, 0, 0,
  6, 9, 0, 0,
]);

/**
 * Custom formatter, that takes bytes and converts them to ASCII chars.
 *
 * @param bytes - bytes array
 */
function formatString (bytes: number[]): string {
  const buffer = Buffer.from(bytes);
  return buffer.toString();
}

const header = BinaryPipe(inputBuffer).pipe(
  // Read 4 bytes (signature is typed as `string`, because formatString returns `string`)
  readBytes(4, (signature) => ({ signature }), formatString),
  readBytes(4, (version) => ({ version }), formatString),
  // Read 8 bytes of LE format
  readInt32LE((bifEntriesCount) => ({ bifEntriesCount })),
  readInt32LE((resourceEntriesCount) => ({ resourceEntriesCount })),
  readInt32LE((bifEntriesOffset) => ({ bifEntriesOffset })),
  readInt32LE((resourceEntriesOffset) => ({ resourceEntriesOffset })),
);

// Each field of the `header` has properly recognized type and name
console.log(header);
/**
 * {
 *   signature: 'KEY ',
 *   version: 'V1  ',
 *   bifEntriesCount: 80,
 *   resourceEntriesCount: 36993,
 *   bifEntriesOffset: 24,
 *   resourceEntriesOffset: 2320
 * }
 */
