const fs = require('fs');

const isValid = ([sum, ...values]) => {
	const fn = ([l, r, ...rest]) => (r === undefined ? l === sum : fn([l * r, ...rest]) || fn([l + r, ...rest]));
	return fn(values);
};

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const total = data
		.split('\n') // Split by lines
		.filter((line) => line.trim() !== '') // Remove empty lines
		.map((row) => row.split(/:? /).map(Number)) // Parse each line into numbers
		.filter(isValid) // Keep only valid rows
		.reduce((sum, [target]) => sum + target, 0); // Sum the first element of each valid row

	console.log(`Total of valid sums: ${total}`);
});
