const fs = require('fs');

const compare = (a, b, rules) => {
	if (rules.has(`${a}|${b}`)) return -1;
	if (rules.has(`${b}|${a}`)) return 1;
	return 0;
};

const processUpdates = (rules, updates) => {
	let totalMiddlePages = 0;
	let totalSortedMiddlePages = 0;

	updates.forEach((update, index) => {
		const sortedUpdate = [...update].sort((a, b) => compare(a, b, rules));
		const isValid = JSON.stringify(update) === JSON.stringify(sortedUpdate);

		if (isValid) {
			const middlePage = update[Math.floor(update.length / 2)];
			console.log(`Update ${index + 1} is valid. Middle page: ${middlePage}`);
			totalMiddlePages += middlePage;
		} else {
			console.log(`Update ${index + 1} is invalid.`);
			const middlePage = sortedUpdate[Math.floor(update.length / 2)];
			totalSortedMiddlePages += middlePage;
		}
	});

	return [totalMiddlePages, totalSortedMiddlePages];
};

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const [rulesRaw, updatesRaw] = data.split('\n\n').map((section) => section.split('\n').filter((line) => line.trim() !== ''));

	const rules = new Set(rulesRaw);
	const updates = updatesRaw.map((line) => line.split(',').map((num) => parseInt(num, 10)));

	const [totalMiddlePages, totalSortedMiddlePages] = processUpdates(rules, updates);

	console.log('Total of middle pages:', totalSortedMiddlePages);
});
