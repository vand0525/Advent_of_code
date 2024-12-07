const fs = require('fs');

const evaluateOperators = (result, expression) => {
	const operators = ['+', '*'];
	const numOperators = expression.length -1;

	const totalCombinations = 1 << numOperators;
	for (let combination = 0; combination < totalCombinations; combination++){
		let total = expression[0];
		let valid = true;

		for (let i = 0; i < numOperators; i++){
			const operator = (combination & (1 << i)) ? '*' : '+';

			if (operator === '+') {
				total += expression[i+1];
			} else if (operator === '*') {
				total *= expression[i+1];
			}

			if (total > result) {
				valid = false;
				break;
			}
		}

		if (valid && total == result){
			return total;
		}
	}
	return 0;
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const lines = data.split('\n').filter((line) => line);
	let total = 0;

	for (const equation of lines) {
		const [result, ...expression] = equation
			.split(/\s+/)
			.map((part) => part.replace(':', ''))
			.map(Number);

		total += evaluateOperators(result, expression);
	}

	console.log(total);
});
