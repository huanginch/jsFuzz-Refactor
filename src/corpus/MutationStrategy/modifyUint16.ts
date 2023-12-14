import { rand, randBool } from "../utils/helpers";
import { uint16 } from "../../math";
import MutationStrategy from ".";

class modifyUnit16 implements MutationStrategy {
  apply (buf: Buffer): Buffer {
    if (buf.length < 2) {
      return buf;
    }
    const pos = rand(buf.length - 1);
    let v = rand(35) + 1;
    if (randBool()) {
      v = 0 - v;
    }
    if (randBool()) {
      buf.writeUInt16BE(uint16(buf.readUInt16BE(pos) + v), pos)
    } else {
      buf.writeUInt16LE(uint16(buf.readUInt16LE(pos) + v), pos)
    }

    return buf;
  }
}

export default modifyUnit16;