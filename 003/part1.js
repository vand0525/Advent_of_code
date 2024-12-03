const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const regex = /mul\(\d{1,3},\d{1,3}\)/g;
	const calc = data.match(regex).join('+');

	const result = eval(calc);
	
	console.log(result);	
});

function mul(x , y){
	return x * y;
}