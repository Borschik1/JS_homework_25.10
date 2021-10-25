let fs = require("fs");
let arg = process.argv;
let readlineSync = require('readline-sync');

let progText = fs.readFileSync('programm.txt').toString();

let ram = new Array();
ram = progText.split(/\s+/);
let ip = 0, size;
let zeroFlag = false;
size = ram.length;
while (ip < size) {
	switch(ram[ip]) {
		case 'input':
			ram[ram[ip + 1]] = readlineSync.question();
			ip += 2
			break;
		case 'set':
			ram[ram[ip + 1]] = ram[ip + 2];
			ip += 3;
			break;
		case 'jz':
			if (zeroFlag) {
				ip = parseInt(ram[ip + 1]);
				break;
			}
			ip += 2;
			break;
		case 'jnz':
			if (!zeroFlag) {
				ip = parseInt(ram[ip + 1]);
				break;
			}
			ip += 2;
		case 'equ':
			if (ram[ram[ip + 1]] == ram[ram[ip + 2]]) {
				zeroFlag = true;
				ip += 3;
				break;
			}
			ip += 3;
			break;
		case 'gre':
			if (ram[ram[ip + 1]] > ram[ram[ip + 2]]) {
				zeroFlag = true;
				ip += 3;
				break;
			}
			ip += 3;
			break;
		case 'les':
			if (ram[ram[ip + 1]] < ram[ram[ip + 2]]) {
				zeroFlag = true;
				ip += 3;
				break;
			}
			ip += 3;
			break;
		case 'output':
			console.log(ram[ram[ip + 1]]);
			ip += 2;
			break;
		case 'add':;
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) + parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		case 'sub':
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) - parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		case 'mul':
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) * parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		case 'div':
			if (ram[ram[ip + 2]] == '0') {
				console.log('Error. Division by 0.');
				process.exit('0');
			}
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) / parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		case 'mod':
			if (ram[ram[ip + 2]] == '0') {
				console.log('Error. Division by 0.');
				process.exit('0');
			}
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) % parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		default:
			console.log('Error. Unknown operation.');
			process.exit('0');
	}
}
