import MutationStrategy from '.';
import { rand, chooseLen } from '../utils/helpers';

/**
 * Duplicate bytes in a buffer at random position, shuffle the bytes in between
 */
class dupilcateByts implements MutationStrategy {
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
    const tmp = Buffer.alloc(n, 0);
    buf.copy(tmp, 0, src);
    buf = Buffer.concat([buf, Buffer.alloc(n, 0)]);
    buf.copy(buf, dst + n, dst);
    for (let k = 0; k < n; k++) {
      buf[dst + k] = tmp[k]
    }
    return buf;
  }

}
export default dupilcateByts;