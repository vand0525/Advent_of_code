const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const rows = data.split('\n').filter((elem) => elem);

	const numSets = rows.map((row) => {
		return row.split(' ').map(Number);
	});

	function checkLevels(levels) {
		const isAscending = levels.every((num, index) => {
			return index === 0 || num > levels[index - 1];
		});
		const isDescending = levels.every((num, index) => {
			return index === 0 || num < levels[index - 1];
		});
		const validDifference = levels.every((num, index) => {
			return index === 0 || 
      (Math.abs(num - levels[index - 1]) >= 1 && Math.abs(num - levels[index - 1]) <= 3);
		});

    return (isAscending || isDescending) && validDifference;
	}

  const results = numSets.map(set => checkLevels(set));
  const trueCount = results.reduce((count, value) => count + (value ? 1 : 0), 0);

  console.log(trueCount);
});
