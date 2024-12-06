const fs = require('fs');

const printMap = (map) => {
	let fullMap = '';
	for (const line of map) {
		fullMap += line.join('') + '\n';
	}
	console.log(fullMap);
};

const padMap = (map) => {
	const boundary = '@';
	const paddedRow = new Array(map[0].length + 2).fill(boundary);
	map.unshift(paddedRow);
	map.push(paddedRow);

	for (let i = 1; i < map.length - 1; i++) {
		map[i] = [boundary, ...map[i], boundary];
	}

	return map;
};

const findGuard = (map) => {
	const guard = {
		y: 0,
		x: 0,
	};

	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === '^') {
				guard.y = i;
				guard.x = j;
			}
		}
	}

	return guard;
};

const getSquare = (map, pos) => {
	return map[pos.y][pos.x];
};

const setSquare = (map, pos, char) => {
	map[pos.y][pos.x] = char;
};

const count = (map) => {
	let count = 0;

    for (let row of map) {
        for (let cell of row) {
            if (cell === 'X') {
                count++;
            }
        }
    }

    return count;
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	let map = padMap(
		data
			.split('\n')
			.filter((elem) => elem)
			.map((line) => line.split(''))
	);

	const guard = findGuard(map);
	const moves = {
		up: (pos) => {pos.y--},
		right: (pos) => {pos.x++},
		down: (pos) => {pos.y++},
		left: (pos) => {pos.x--},
	}	
	
	const dirs = ['up', 'right', 'down', 'left']
	let dirIndex = 0;
	
	
	
	do {
		let move = moves[dirs[dirIndex]];
		const nextMove = {...guard};
		move(nextMove);

		setSquare(map, guard, 'X');

		if (getSquare(map, nextMove) === '#'){
			dirIndex = (dirIndex + 1) % dirs.length;
			move = moves[dirs[dirIndex]];
		}

		move(guard);
		// move();
		if (getSquare(map, guard) !== '@') {
			setSquare(map, guard, '^');
		}
	} while (getSquare(map, guard) !== '@');

	printMap(map);
	console.log(count(map));
});
