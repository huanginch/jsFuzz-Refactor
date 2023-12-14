import MutationStrategy from '.';
import { rand, chooseLen } from '../utils/helpers';

class insertOtherInput implements MutationStrategy {
  apply(buf: Buffer, inputs?: Buffer[]): Buffer {
    if(inputs === undefined) {
      return buf;
    }
    if (buf.length < 4 || inputs.length < 2) {
      return buf;
    }
    const other = inputs[rand(inputs.length)];
    if (other.length < 4) {
      return buf;
    }
    const pos0 = rand(buf.length + 1);
    const pos1 = rand(other.length - 2);
    const n = chooseLen(other.length - pos1 - 2) + 2;
    buf = Buffer.concat([buf, Buffer.alloc(n, 0)], buf.length + n);
    buf.copy(buf, pos0 + n, pos0);
    for (let k = 0; k < n; k++) {
      buf[pos0 + k] = other[pos1 + k]
    }
    return buf;
  }
}

export default insertOtherInput;