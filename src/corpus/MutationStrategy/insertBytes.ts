import MutationStrategy from '.';
import { rand, chooseLen } from '../utils/helpers';

class insertBytes implements MutationStrategy {
  apply(buf: Buffer): Buffer {
    const pos = rand(buf.length + 1);
    const n = chooseLen(10);
    buf = Buffer.concat([buf, Buffer.alloc(n, 0)], buf.length + n);
    buf.copy(buf, pos + n, pos);
    for (let k = 0; k < n; k++) {
      buf[pos + k] = rand(256)
    }
    return buf;
  }
}

export default insertBytes;