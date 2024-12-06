const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	let rows = data.split('\n').filter((elem) => elem);
	let count = 0;

	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < rows[i].length; j++) {
			if (rows[i][j] !== 'X') continue;

			let t = rows[i - 1]?.[j] + rows[i - 2]?.[j] + rows[i - 3]?.[j]; 
			let b = rows[i + 1]?.[j] + rows[i + 2]?.[j] + rows[i + 3]?.[j]; 
			let l = rows[i]?.[j - 1] + rows[i]?.[j - 2] + rows[i]?.[j - 3]; 
			let r = rows[i]?.[j + 1] + rows[i]?.[j + 2] + rows[i]?.[j + 3]; 
			let tr = rows[i - 1]?.[j + 1] + rows[i - 2]?.[j + 2] + rows[i - 3]?.[j + 3]; 
			let tl = rows[i - 1]?.[j - 1] + rows[i - 2]?.[j - 2] + rows[i - 3]?.[j - 3]; 
			let br = rows[i + 1]?.[j + 1] + rows[i + 2]?.[j + 2] + rows[i + 3]?.[j + 3]; 
			let bl = rows[i + 1]?.[j - 1] + rows[i + 2]?.[j - 2] + rows[i + 3]?.[j - 3]; 

			let coords = [t, b, l, r, tr, tl, br, bl];

			for (let dir of coords) {
				if (dir === 'MAS') {
					count++;
				}
			}
		}
	}

	console.log(count);
});
