import {MOV_R0, MOV_R1, ADD} from './instructions.js';
import initMemory from './memory.js';

class CPU {
    constructor(memory) {
        this.memory = memory;
        this.registernames = [
            'ip',
            'acc',
            'r0',
            'r1',
            'r2',
            'r3',
            'r4',
            'r5',
            'r6',
            'r7',
        ];
        this.registers = initMemory(this.registernames.length);
        this.registerMap = this.registernames.reduce((map, name, i) => {
            map[name] = i;
            return map;
        }, {});
    }

    instructionSet = {
        // move literal to r0 register
        [MOV_R0]: () => {
            const literal = this.fetch();
            this.setRegister('r0', literal);
            return;
        },
        // move literal to r1 register
        [MOV_R1]: () => {
            const literal = this.fetch();
            this.setRegister('r1', literal);
            return;
        },
        // add r0 and r1 register 
        [ADD]: () => {
            const r0 = this.fetch();
            const r1 = this.fetch();
            const val1 = this.registers.getUint8(r0);
            const val2 = this.registers.getUint8(r1);
            this.setRegister('acc', val1 + val2);
        }


    }

    getRegister(name) {
        if (!(name in this.registerMap)){
            throw new Error(`no such register ${name}`)
        }
        return this.registers.getUint8(this.registerMap[name]);
    }
    
    setRegister(name, value) {
        if (!(name in this.registerMap)){
            throw new Error(`no such register ${name}`)
        }
        return this.registers.setUint8(this.registerMap[name], value);
    }

    fetch() {
        const nextAddr = this.getRegister('ip');
        const ins = this.memory.getUint8(nextAddr);
        this.setRegister('ip', nextAddr + 1);
        return ins;
    }

    exec(ins) {
        this.instructionSet[ins]();
    }

    step() {
        const inst = this.fetch();
        return this.exec(inst);
    }

    debug(text) {
       const result = {}
       this.registernames.map(reg =>{
           result[reg] = `0x${this.getRegister(reg).toString(16).padStart(2, '0')}`;
       })
       console.log('Description :>> ', text);
       console.table(result);
    }
}

export default CPU;