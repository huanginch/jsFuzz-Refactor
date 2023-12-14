import * as fs from "fs";
import * as path from "path";
import strategies from "./Strategies";
import {uint16, uint32} from "../math";
import BufferMutator from "./BufferMutator";
var crypto = require('crypto');

const INTERESTING8 = new Uint8Array([-128, -1, 0, 1, 16, 32, 64, 100, 127]);
const INTERESTING16 = new Uint16Array([-32768, -129, 128, 255, 256, 512, 1000, 1024, 4096, 32767, -128, -1, 0, 1, 16, 32, 64, 100, 127]);
const INTERESTING32 = new Uint32Array([-2147483648, -100663046, -32769, 32768, 65535, 65536, 100663045, 2147483647, -32768, -129, 128, 255, 256, 512, 1000, 1024, 4096, 32767, -128, -1, 0, 1, 16, 32, 64, 100, 127]);


export class Corpus {
    private inputs: Buffer[];
    private corpusPath: string | undefined;
    private maxInputSize: number;
    private seedLength: number;
    private readonly onlyAscii: boolean;

    constructor(dir: string[], onlyAscii: boolean) {
        this.inputs = [];
        this.onlyAscii = onlyAscii;
        this.maxInputSize = 4096;
        for (let i of dir) {
            if (!fs.existsSync(i)) {
                fs.mkdirSync(i);
            }
            if (fs.lstatSync(i).isDirectory()) {
                if (!this.corpusPath) {
                    this.corpusPath = i;
                }
                this.loadFiles(i)
            } else {
                this.inputs.push(fs.readFileSync(i));
            }
        }
        this.seedLength = this.inputs.length;

    }

    private loadFiles(dir: string): void {
        fs.readdirSync(dir).forEach(file => {
            const full_path = path.join(dir, file);
            this.inputs.push(fs.readFileSync(full_path))
        });
    }

    public getLength(): number {
        return this.inputs.length;
    }

    public generateInput(): Buffer {
        if (this.seedLength > 0) {
            this.seedLength -= 1;
            return this.inputs[this.seedLength];
        }
        if (this.inputs.length === 0) {
            const buf = Buffer.alloc(0, 0);
            this.putBuffer(buf);
            return buf;
        }
        const buffer = this.inputs[this.rand(this.inputs.length)];
        return this.mutate(buffer);
    }

    public putBuffer(buf: Buffer): void {
        this.inputs.push(buf);
        if (this.corpusPath) {
            const filename = crypto.createHash('sha256').update(buf).digest('hex');
            const filepath = path.join(this.corpusPath, filename);
            fs.writeFileSync(filepath, buf)
        }
    }

    private randBool(): boolean {
        return Math.random() >= 0.5;
    }

    private rand(n: number): number {
        return Math.floor(Math.random() * Math.floor(n));
    }

    private dec2bin(dec: number): string{
        const bin = dec.toString(2);
        return '0'.repeat(32 - bin.length) + bin;
    }

    // Exp2 generates n with probability 1/2^(n+1).
    private Exp2(): number {
        const bin = this.dec2bin(this.rand(2**32));
        let count = 0;
        for (let i=0; i<32; i++) {
            if(bin[i] === '0') {
                count += 1;
            } else {
                break;
            }
        }
        return count;
    }

    private chooseLen(n: number): number {
        const x = this.rand(100);
        if (x < 90) {
            return this.rand(Math.min(8, n)) + 1
        } else if (x < 99) {
            return this.rand(Math.min(32, n)) + 1
        } else {
            return this.rand(n) + 1;
        }
    }

    private toAscii(buf: Buffer): void {
        let x;
        for (let i = 0; i < buf.length; i++) {
            x = buf[i] & 127;
            if ((x < 0x20 || x > 0x7E) && x !== 0x09 && (x < 0xA || x > 0xD)) {
                buf[i] = 0x20;
            }
        }
    }

    private mutate(buf: Buffer): Buffer {
        let res = Buffer.allocUnsafe(buf.length);
        buf.copy(res, 0, 0, buf.length);
        const nm = 1 + this.Exp2(); 
        for (let i=0; i<nm; i++) {
            const bufferMutator = new BufferMutator(strategies);
            res = bufferMutator.mutate(res, this.inputs);
            if (Buffer.compare(buf, res) === 0) {
                i--;
                continue;
            }
        }

        if (res.length > this.maxInputSize) {
            res = res.slice(0, this.maxInputSize)
        }

        if (this.onlyAscii) {
            this.toAscii(res);
        }

        return res;
    }
}

