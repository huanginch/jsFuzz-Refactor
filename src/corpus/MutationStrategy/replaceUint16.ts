import MutationStrategy from '.';
import { rand, randBool } from '../utils/helpers';

const INTERESTING16 = new Uint16Array([-32768, -129, 128, 255, 256, 512, 1000, 1024, 4096, 32767, -128, -1, 0, 1, 16, 32, 64, 100, 127]);
const INTERESTING8 = new Uint8Array([-128, -1, 0, 1, 16, 32, 64, 100, 127]);

class ReplaceUint16 implements MutationStrategy {
  apply (buf: Buffer): Buffer {
    if (buf.length < 2) {
      return buf;
    }
    const pos = rand(buf.length - 1);
    if (randBool()) {
      buf.writeUInt16BE(INTERESTING16[rand(INTERESTING8.length)], pos);
    } else {
      buf.writeUInt16LE(INTERESTING16[rand(INTERESTING8.length)], pos);
    }
    return buf;
  }
}

export default ReplaceUint16;