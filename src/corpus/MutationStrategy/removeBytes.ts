import MutationStrategy from '.';
import { rand, chooseLen } from '../utils/helpers';

class RemoveByteStrategy implements MutationStrategy {
    apply(buf: Buffer): Buffer {
      if (buf.length <= 1) {
        return buf;
      }
      const pos0 = rand(buf.length);
      const pos1 = pos0 + chooseLen(buf.length - pos0);
      buf.copy(buf, pos0, pos1, buf.length);
      buf = buf.slice(0, buf.length - (pos1 - pos0));

      return buf;
    }
} 

export default RemoveByteStrategy;