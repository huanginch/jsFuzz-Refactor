import MutationStrategy from ".";
import { rand } from "../utils/helpers";

class SwapBytes implements MutationStrategy {
  apply(buf: Buffer): Buffer {
    if (buf.length <= 1) {
      return buf;
    }
    const src = rand(buf.length);
    let dst = rand(buf.length);
    while (src === dst) {
      dst = rand(buf.length);
    }
    [buf[src], buf[dst]] = [buf[dst], buf[src]]
    return buf;
  }
}

export default SwapBytes;