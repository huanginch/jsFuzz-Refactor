import BitFlip from "./MutationStrategy/BitFlip";
import CopyBytes from "./MutationStrategy/CopyBytes";
import DupilcateByts from "./MutationStrategy/DuplicateBytes";
import InsertBytes from "./MutationStrategy/InsertBytes";
import ModifyByte from "./MutationStrategy/ModifyByte";
import ModifyUnit16 from "./MutationStrategy/ModifyUint16";
import ModifyUnit32 from "./MutationStrategy/ModifyUint32";
import RemoveByte from "./MutationStrategy/RemoveBytes";
import ReplaceAscii from "./MutationStrategy/ReplaceAscii";
import ReplaceByte from "./MutationStrategy/ReplaceByte";
import ReplaceUint16 from "./MutationStrategy/ReplaceUint16";
import ReplaceUint32 from "./MutationStrategy/ReplaceUint32";
import SetByteRandom from "./MutationStrategy/SetByteRadom";
import SwapBytes from "./MutationStrategy/SwapBytes";
import InsertOtherInput from "./MutationStrategy/InsertOtherInput";
import SpliceInput from "./MutationStrategy/SpliceInput";


const bitFlip = new BitFlip();
const copyBytes = new CopyBytes();
const duplicateBytes = new DupilcateByts();
const insertBytes = new InsertBytes();
const modifyByte = new ModifyByte();
const modifyUint16 = new ModifyUnit16();
const modifyUint32 = new ModifyUnit32();
const removeByte = new RemoveByte();
const replaceAscii = new ReplaceAscii();
const replaceByte = new ReplaceByte();
const replaceUint16 = new ReplaceUint16();
const replaceUint32 = new ReplaceUint32();
const setByteRandom = new SetByteRandom();
const swapBytes = new SwapBytes();
const insertOtherInput = new InsertOtherInput();
const spliceInput = new SpliceInput();

const strategies = [
  bitFlip,
  copyBytes,
  duplicateBytes,
  insertBytes,
  modifyByte,
  modifyUint16,
  modifyUint32,
  removeByte,
  replaceAscii,
  replaceByte,
  replaceUint16,
  replaceUint32,
  setByteRandom,
  swapBytes,
  insertOtherInput,
  spliceInput
];

export default strategies;