const fs = require('fs');

const buildGraph = (rules) => {
	const adjList = {}; // Adjacency list
	const inDegree = {}; // in degree map

	rules.forEach((rule) => {
		const [from, to] = rule.split('|').map(Number); // split on |, map ensure results are numbers

		// Initialize adjacency list and in-degree map (if not exists)
		if (!adjList[from]) adjList[from] = [];
		if (!adjList[to]) adjList[to] = [];
		if (inDegree[from] === undefined) inDegree[from] = 0;
		if (inDegree[to] === undefined) inDegree[to] = 0;

		// add the directed edge and update in-degree
		adjList[from].push(to);
		inDegree[to]++;
	});
	return { adjList, inDegree };
};

const isValidOrder = (adjList, inDegree) => {
	const queue = [];
	const sortedOrder = [];

	// Step 1: add all nodes with inDegree = 0 to the queue
	for (const node in inDegree) {
		if (inDegree[node] === 0) {
			queue.push(Number(node));
		}
	}

	// Step 2: Process the Queue
	while (queue.length > 0) {
		const current = queue.shift(); // get the next node
		sortedOrder.push(current); // add to sorted order

		// Reduce the in-degree of all neighbors {
		if (adjList[current]) {
			adjList[current].forEach((neighbor) => {
				inDegree[neighbor]--;
				if (inDegree[neighbor] === 0) {
					queue.push(neighbor); // Add to queue if no dependencies left
				}
			});
		}
	}

	// step 3:P Check for cycles
	if (sortedOrder.length !== Object.keys(inDegree).length) {
		return null; // invalid order
	}

	return sortedOrder;
};

const filterGraph = (adjList, inDegree, update) => {
	const subAdjList = {};
	const subInDegree = {};

	// Initialize adjacency list and reset in-degree
	update.forEach((page) => {
		subAdjList[page] = adjList[page]
			? adjList[page].filter((neighbor) => update.includes(neighbor)) // Keep only edges within the update
			: [];
		subInDegree[page] = 0; // Start with 0
	});

	// Recalculate in-degrees based on the filtered adjacency list
	for (const [node, neighbors] of Object.entries(subAdjList)) {
		neighbors.forEach((neighbor) => {
			subInDegree[neighbor]++; // Increment in-degree for local edges
		});
	}

	return { subAdjList, subInDegree };
};

const arraysAreEqual = (array1, array2) => {
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }

    return true;
};

const processUpdates = (updates, adjList, inDegree) => {
	let totalMiddlePages = 0;
	let totalUnordered = 0;

	updates.forEach((line, index) => {
		const update = line.split(',').map(Number); // Split update into array of numbers

		// Generate subgraph for this update
		const { subAdjList, subInDegree } = filterGraph(adjList, inDegree, update);

		// validate the update
		const sortedOrder = isValidOrder(subAdjList, subInDegree);

		

		if (arraysAreEqual(update, sortedOrder)) {
			const middlePage = sortedOrder[Math.floor(sortedOrder.length / 2)];
			totalMiddlePages += middlePage;
		} else {
			const middlePage = sortedOrder[Math.floor(sortedOrder.length / 2)];
			totalUnordered += middlePage;
		} 
	});

	return totalUnordered;
};

fs.readFile('./sample.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}
	const [rules, updates] = data.split('\n\n').map((section) => section.split('\n').filter((line) => line.trim() !== ''));
	const { adjList, inDegree } = buildGraph(rules);

	const total = processUpdates(updates, adjList, inDegree);
	console.log('Total for middle page number:', total);
});
