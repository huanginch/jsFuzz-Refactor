import MutationStrategy from ".";
import { rand, randBool } from "../utils/helpers";

const INTERESTING8 = new Uint8Array([-128, -1, 0, 1, 16, 32, 64, 100, 127]);
const INTERESTING32 = new Uint32Array([-2147483648, -100663046, -32769, 32768, 65535, 65536, 100663045, 2147483647, -32768, -129, 128, 255, 256, 512, 1000, 1024, 4096, 32767, -128, -1, 0, 1, 16, 32, 64, 100, 127]);

class replaceUint32 implements MutationStrategy {
   apply (buf: Buffer): Buffer {
    if (buf.length < 4) {
      return buf;
    }
    const pos = rand(buf.length - 3);
    if (randBool()) {
      buf.writeUInt32BE(INTERESTING32[rand(INTERESTING8.length)], pos);
    } else {
      buf.writeUInt32LE(INTERESTING32[rand(INTERESTING8.length)], pos);
    }
    return buf;
  }
}

export default replaceUint32;