import MutationStrategy from ".";
import { rand, randBool } from "../utils/helpers";

class modifyByte implements MutationStrategy {
  apply (buf: Buffer): Buffer {
    if (buf.length === 0) {
      return buf;
    }
    const pos = rand(buf.length);
    const v = rand(35) + 1;
    if (randBool()) {
      buf[pos] += v;
    } else {
      buf[pos] -= v;
    }
    return buf;
  }
}

export default modifyByte;