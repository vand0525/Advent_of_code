const fs = require('fs');

function evaluateOperators(result, expression) {
	const numOperators = expression.length - 1;
	const totalCombinations = Math.pow(3, numOperators);

	for (let combination = 0; combination < totalCombinations; combination++) {
		let total = expression[0];
		let valid = true;
		let currentCombination = combination;

		for (let i = 0; i < numOperators; i++) {
			const operatorCode = currentCombination % 3;
			currentCombination = Math.floor(currentCombination / 3);

			const operator = operatorCode === 0 ? '+' : operatorCode === 1 ? '*' : '||';

			if (operator === '+') {
				total += expression[i + 1];
			} else if (operator === '*') {
				total *= expression[i + 1];
			} else if (operator === '||') {
				total = Number(`${total}${expression[i + 1]}`);
			}

			if (total > result) {
				valid = false;
				break;
			}
		}

		if (valid && total === result) {
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
