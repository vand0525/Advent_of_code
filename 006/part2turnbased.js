const fs = require('fs');

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

const trackDefaultPath = (map, guard, moves, dirs) => {
	let dirIndex = 0;
	const visitedPositions = new Set();

	while (true) {
		visitedPositions.add(`${guard.y},${guard.x}`);

		let nextMove = { ...guard };
		moves[dirs[dirIndex]](nextMove);

		if (getSquare(map, nextMove) === '#' || getSquare(map, nextMove) === 'O') {
			dirIndex = (dirIndex + 1) % dirs.length;
		}

		moves[dirs[dirIndex]](guard);

		if (getSquare(map, guard) === '@') {
			break;
		}
	}

	return visitedPositions;
};

const simulatePatrolWithTurnTracking = (map, guard, moves, dirs) => {
    let dirIndex = 0;
    const turnHistory = new Set();

    while (true) {
        let nextMove = { ...guard };
        moves[dirs[dirIndex]](nextMove);

        if (getSquare(map, nextMove) === '#' || getSquare(map, nextMove) === 'O') {
			
            const turnState = `${guard.y},${guard.x},${dirs[dirIndex]}`;
            if (turnHistory.has(turnState)) {
                return true;
            }
            
            turnHistory.add(turnState);
            
            dirIndex = (dirIndex + 1) % dirs.length;
        } else {
            guard = nextMove;
        }

        if (getSquare(map, guard) === '@') {
            return false; // No loop detected, guard exited the map
        }
    }
};

console.time('Simulation with Turn Tracking');
fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    let originalMap = padMap(
        data
            .split('\n')
            .filter((elem) => elem)
            .map((line) => line.split(''))
    );

    const guard = findGuard(originalMap);
    const moves = {
        up: (pos) => { pos.y-- },
        right: (pos) => { pos.x++ },
        down: (pos) => { pos.y++ },
        left: (pos) => { pos.x-- },
    };

    const dirs = ['up', 'right', 'down', 'left'];
    let possiblePositions = 0;

    const defaultPath = trackDefaultPath(originalMap, { ...guard }, moves, dirs);

    for (let position of defaultPath) {
        const [y, x] = position.split(',').map(Number);

        if (originalMap[y][x] === '^' || originalMap[y][x] === '#') {
            continue; // Not a valid place to put an obstruction
        }

        let map = originalMap.map(row => [...row]);
        map[y][x] = 'O';

        const guardCopy = { ...guard };

        if (simulatePatrolWithTurnTracking(map, guardCopy, moves, dirs)) {
            possiblePositions++;
        }
    }
	console.log(possiblePositions);
	console.timeEnd('Simulation with Turn Tracking');
});