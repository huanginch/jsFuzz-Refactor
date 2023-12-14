import MutationStrategy from '.';
import { rand } from '../utils/helpers';

class SpliceInput implements MutationStrategy {
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
    // Find common prefix and suffix.
    let idx0 = 0;
    while (idx0 < buf.length && idx0 < other.length && buf[idx0] === other[idx0]) {
      idx0++;
    }
    let idx1 = 0;
    while (idx1 < buf.length && idx1 < other.length && buf[buf.length - idx1 - 1] === other[other.length - idx1 - 1]) {
      idx1++;
    }
    // If diffing parts are too small, there is no sense in splicing, rely on byte flipping.
    const diff = Math.min(buf.length - idx0 - idx1, other.length - idx0 - idx1);
    if (diff < 4) {
      return buf;
    }

    other.copy(buf, idx0, idx0, Math.min(other.length, idx0 + rand(diff - 2) + 1));
    return buf;
  }
}

export default SpliceInput;