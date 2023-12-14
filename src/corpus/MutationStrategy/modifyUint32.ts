import { rand, randBool } from "../utils/helpers";
import { uint32 } from "../../math";
import MutationStrategy from ".";

class modifyUnit32 implements MutationStrategy {
  apply (buf: Buffer): Buffer {
    if (buf.length < 4) {
      return buf;
    }
    const pos = rand(buf.length - 3);
    let v = rand(35) + 1;
    if (randBool()) {
      v = 0 - v;
    }
    if (randBool()) {
      buf.writeUInt32BE(uint32(buf.readUInt32BE(pos) + v), pos)
    } else {
      buf.writeUInt32LE(uint32(buf.readUInt32LE(pos) + v), pos)
    }
    return buf;
  }
}

export default modifyUnit32;