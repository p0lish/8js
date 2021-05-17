import CPU from "./cpu.js";
import initMemory from "./memory.js";
import {MOV_R0, MOV_R1, ADD} from './instructions.js';

function buf2hex(buffer) {
    const res = {};
    [...new Uint8Array(buffer)].map((x, idx) => {
        let idxstr = idx.toString(16).toUpperCase();
        idxstr = idxstr.length === 1 ? `0${idxstr}` : idxstr;
        res[idxstr.padStart(2, '0')] = `0x${x.toString(16).padStart(2, '0')}`;
    });
    console.log('res :>> ', res);
    return res;
  }
  


const mem = initMemory(256);
const bytes = new Uint8Array(mem.buffer);

bytes[0] = MOV_R0;
bytes[1] = 0x12;
bytes[2] = MOV_R1;
bytes[3] = 0x34;

bytes[4] = ADD;

bytes[5] = 2;
bytes[6] = 3;

const cpu = new CPU(mem);

cpu.debug('initial values');
cpu.step();
cpu.debug('r0 value loaded');
cpu.step();
cpu.debug('r1 value loaded');
cpu.step();
cpu.debug('r0 and r1 are added into acc');

console.table(buf2hex(mem.buffer));