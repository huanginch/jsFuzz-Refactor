import MutationStrategy from '.';
import { rand } from '../utils/helpers';

const INTERESTING8 = new Uint8Array([-128, -1, 0, 1, 16, 32, 64, 100, 127]);

class ReplaceByte implements MutationStrategy {
  apply (buf: Buffer): Buffer {
    if (buf.length === 0) {
      return buf;
    }
    const pos = rand(buf.length);
    buf[pos] = INTERESTING8[rand(INTERESTING8.length)];
    return buf;
  }
}

export default ReplaceByte;