import MutationStrategy from '.';
import { rand } from '../utils/helpers';

class SetByteRandom implements MutationStrategy {
  apply(buf: Buffer): Buffer {
    if (buf.length <= 1) {
      return buf;
    }
    const pos = rand(buf.length);
    buf[pos] ^= rand(255) + 1;
    return buf;
  }
}

export default SetByteRandom;