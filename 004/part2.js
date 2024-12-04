const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	let rows = data.split('\n').filter((elem) => elem);
	let count = 0;

	for (let i = 0; i < rows.length - 2; i++) {
		for (let j = 0; j < rows[i].length - 2; j++) {
			const diagRight = rows[i][j] + rows[i + 1][j + 1] + rows[i + 2][j + 2];
			const diagLeft = rows[i][j + 2] + rows[i + 1][j + 1] + rows[i + 2][j];
			const valid = ['MAS', 'SAM'];

			if (valid.includes(diagRight) && valid.includes(diagLeft)) {
				count++;
			}
		}
	}
	console.log(count);
});
