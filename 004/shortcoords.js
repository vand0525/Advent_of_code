const fs = require('fs');

fs.readFile('./testinput.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const rows = data.split('\n').filter((elem) => elem);
	const i = 3;
	const j = 6;

	// Top (upward, no reverse needed)
	let t = [1, 2, 3].map(offset => rows[i - offset]?.[j]).join('') || '';
	// Bottom (downward, reversed)
	let b = [1, 2, 3].map(offset => rows[i + offset]?.[j]).reverse().join('') || '';
	// Left (use slice and reverse for clarity)
	let l = rows[i]?.slice(Math.max(0, j - 3), j).reverse().join('') || '';
	// Right (use slice directly, no reverse needed)
	let r = rows[i]?.slice(j + 1, j + 4).join('') || '';
	// Top-Right diagonal (upward diagonal, no reverse needed)
	let tr = [1, 2, 3].map(offset => rows[i - offset]?.[j + offset]).join('') || '';
	// Top-Left diagonal (upward diagonal, no reverse needed)
	let tl = [1, 2, 3].map(offset => rows[i - offset]?.[j - offset]).join('') || '';
	// Bottom-Right diagonal (downward diagonal, reversed)
	let br = [1, 2, 3].map(offset => rows[i + offset]?.[j + offset]).reverse().join('') || '';
	// Bottom-Left diagonal (downward diagonal, reversed)
	let bl = [1, 2, 3].map(offset => rows[i + offset]?.[j - offset]).reverse().join('') || '';
});
