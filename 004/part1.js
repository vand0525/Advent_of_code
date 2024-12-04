const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	let rows = data.split('\n').filter((elem) => elem);
	let cols = [];
	let diags = [];


	// rows ---> columns
	for (let i = 0; i < rows.length; i++) {
		let split = rows[i].split('');

		for (let j = 0; j < split.length; j++) {
			if (!cols[j]) cols[j] = '';
			cols[j] += split[j];
		}
	}


	// diagonals top left ---> bottom right
	for (let i = 0; i < rows.length; i++){
		for (let j = 0; j < rows[i].length; j++){
			if (i !== 0 && j !== 0) continue;
			let diag = '';
			let x = i;
			let y = j;

			while (x < rows.length && y < rows[x].length){
				diag += rows[x][y];
				x++;
				y++;
			}
			diags.push(diag);
		}
	}
	
	// diagonals top right ---> bottom left
	for (let i = 0; i < rows.length; i++) {
		for (let j =0; j < rows[i].length; j++){
			if (i !== 0 && j !== rows[i].length -1) continue;
			let diag = '';
			let x = i;
			let y = j;

			while ( x < rows.length && y >= 0) {
				diag += rows[x][y];
				x++;
				y--;
			}
			diags.push(diag);
		}
	}

	const allDirection = [...rows, ...cols, ...diags];
	const searchWord = 'XMAS'
	let count = 0;

	allDirection.forEach(line => {
		// search forwards
		let index = line.indexOf(searchWord);
		while (index !== -1){
			count++;
			index = line.indexOf(searchWord, index + 1);
		}
		// search backwards
		let reversedLine = line.split('').reverse().join('');
		index = reversedLine.indexOf(searchWord);
		while (index !== -1){
			count++;
			index = reversedLine.indexOf(searchWord, index + 1);
		}
	})

	console.log(count);

});
