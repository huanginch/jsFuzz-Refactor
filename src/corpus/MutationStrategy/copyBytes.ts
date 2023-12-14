import MutationStrategy from '.';
import { rand, chooseLen } from '../utils/helpers';

class CopyBytes implements MutationStrategy {
  apply (buf: Buffer): Buffer {
    if (buf.length <= 1) {
      return buf;
    }
    const src = rand(buf.length);
    let dst = rand(buf.length);
    while (src === dst) {
      dst = rand(buf.length);
    }
    const n = chooseLen(buf.length - src);
    buf.copy(buf, dst, src, src + n);
    return buf;
  }
}

export default CopyBytes;