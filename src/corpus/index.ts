import * as fs from "fs";
import * as path from "path";
import strategies from "./Strategies";
import BufferMutator from "./BufferMutator";
import { rand } from "./utils/helpers";
var crypto = require('crypto');


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
        const buffer = this.inputs[rand(this.inputs.length)];
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

    private dec2bin(dec: number): string{
        const bin = dec.toString(2);
        return '0'.repeat(32 - bin.length) + bin;
    }

    // Exp2 generates n with probability 1/2^(n+1).
    private Exp2(): number {
        const bin = this.dec2bin(rand(2**32));
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
            if (Buffer.compare(buf, res) === 0) { // if the mutation is the same as the original input, then discard it
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

