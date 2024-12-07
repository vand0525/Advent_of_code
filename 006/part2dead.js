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
};

const simulatePatrol = (map, guard, moves, dirs) => {
	const visitedStates = [];
	let dirIndex = 0;
	let stuckInLoop = false;

	while (true) {
		// Record the current state (position + direction)
		const state = `${guard.y},${guard.x},${dirs[dirIndex]}`;
		visitedStates.push(state);

		// Check if the current state has been repeated
		const occurrences = visitedStates.filter((s) => s === state).length;
		if (occurrences > 1) {
			// If the state has occurred more than once, check if it forms a repeating pattern
			const lastIndex = visitedStates.lastIndexOf(state);
			const firstIndex = visitedStates.indexOf(state);
			const cycleLength = lastIndex - firstIndex;
			if (cycleLength > 0 && visitedStates.slice(firstIndex, lastIndex).every((s, i) => s === visitedStates[firstIndex + i])) {
				stuckInLoop = true;
				break;
			}
		}

		// Determine the next move
		let move = moves[dirs[dirIndex]];
		const nextMove = { ...guard };
		move(nextMove);

		// Mark the current position as visited
		setSquare(map, guard, 'X');

		// Check for obstacles
		if (getSquare(map, nextMove) === '#') {
			// Turn right if there's an obstacle
			dirIndex = (dirIndex + 1) % dirs.length;
			move = moves[dirs[dirIndex]];
		}

		// Move the guard
		move(guard);

		// Stop if the guard moves out of bounds
		if (getSquare(map, guard) === '@') {
			break;
		}
	}

	return stuckInLoop;
};

fs.readFile('./sample.txt', 'utf8', (err, data) => {
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
		up: (pos) => {
			pos.y--;
		},
		right: (pos) => {
			pos.x++;
		},
		down: (pos) => {
			pos.y++;
		},
		left: (pos) => {
			pos.x--;
		},
	};

	const dirs = ['up', 'right', 'down', 'left'];

	let possiblePositions = 0;

	for (let i = 1; i < map.length - 1; i++) {
		for (let j = 1; j < map[i].length - 1; j++) {
			if (map[i][j] === '.') {
				let testMap = map.map((row) => [...row]);
				testMap[i][j] = '#';

				const testGuard = { ...guard };
				if (simulatePatrol(testMap, testGuard, moves, dirs)) {
					possiblePositions++;
					console.log(`Obstruction at (${i}, ${j}) causes a loop`);
				} else {
					console.log(`Obstruction at (${i}, ${j}) does NOT cause a loop`);
				}
			}
		}
	}

	console.log(possiblePositions);
});
