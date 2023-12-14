import MutationStrategy from '.';
import { rand } from '../utils/helpers';

class ReplaceAscii implements MutationStrategy {
  apply(buf: Buffer): Buffer {
    const digits = [];
    for (let k = 0; k < buf.length; k++) {
      if (buf[k] >= 48 && buf[k] <= 57) {
        digits.push(k)
      }
    }
    if (digits.length === 0) {
      return buf;
    }
    const pos = rand(digits.length);
    const was = buf[digits[pos]];
    let now = was;
    while (now === was) {
      now = rand(10) + 48 // '0' === 48
    }
    buf[digits[pos]] = now;
    return buf;
  }
}

export default ReplaceAscii;