const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const regex = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;
	const instructions = data.match(regex);

	let run = true;
	let validInstructions = [];

	instructions.forEach(instruction => {
		if (instruction === `do()`) {
			run = true;		
		} else if (instruction === `don't()`) {
			run = false
		} else if ( run && instruction.startsWith('mul')){
			validInstructions.push(instruction);
		}
	})

	const calc = validInstructions.join('+');
	const results = eval(calc);

	console.log(results);
});

function mul(x , y){
	return x * y;
}