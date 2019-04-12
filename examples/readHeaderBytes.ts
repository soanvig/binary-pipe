import { BinaryPipe } from '../src';
import { readBytes } from '../src/readBytes';
import { readInt32LE } from '../src/readInt32LE';

/**
 * This example presents reading header of `key` file from Infinity Engine
 * https://gibberlings3.github.io/iesdp/file_formats/ie_formats/key_v1.htm
 */
const inputBuffer: Buffer = Buffer.from([
  0x45, 0x4b, 0x20, 0x59, // signature
  0x31, 0x56, 0x20, 0x20, // version
  0x00, 0x50, 0x00, 0x00, // count of bif entries
  0x90, 0x81, 0x00, 0x00, // count of resource entries
  0x00, 0x18, 0x00, 0x00, // offset to bif entries
  0x09, 0x10, 0x00, 0x00, // offset to resource entries
]);

/**
 * Custom formatter, that takes bytes and converts them to ASCII chars.
 * Performs swap16 on bytes
 *
 * @param bytes - bytes array
 */
function formatStringWithSwap (bytes: number[]): string {
  const buffer = Buffer.from(bytes);

  // Swap is performed, because that's how chars are saved in Infinity Engine
  return buffer.swap16().toString();
}

const header = BinaryPipe(inputBuffer).pipe(
  // Read 4 bytes (signature is typed as `string`, because formatString returns `string`)
  readBytes(4, (signature) => ({ signature }), formatStringWithSwap),
  readBytes(4, (version) => ({ version }), formatStringWithSwap),
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
 *   bifEntriesCount: 20480,
 *   resourceEntriesCount: 33168,
 *   bifEntriesOffset: 6144,
 *   resourceEntriesOffset: 4105
 * }
 */
