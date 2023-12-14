import MutationStrategy from '.';
import { rand } from '../utils/helpers';

class BitFlip implements MutationStrategy {
  apply(buf: Buffer): Buffer {
    if (buf.length <= 1) {
      return buf;
    }
    const pos = rand(buf.length);
    buf[pos] ^= 1 << rand(8);
    return buf;
  }
}

export default BitFlip;