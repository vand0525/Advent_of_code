const fs = require('fs');

fs.readFile('/Users/theodorevandusen/Documents/advent_calendar/001/input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const rows = data.split('\n').filter(elem => elem);

  let arr1 = [];
  let arr2 = [];
  
  rows.forEach(row => {
    const parts = row.split(' ').filter(part => /\d/.test(part));
    arr1.push(Number(parts[0]));
    arr2.push(Number(parts[1]));
  });

  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  function similarityCalc(i, arr1, arr2){
    if (i >= arr1.length) return 0
    
    let num = arr1[i];
    let match = 0;
    arr2.forEach(val => {
      if (val === num) match++;
    })

    return similarityCalc(i+1, arr1, arr2) + match * num;
  }

  console.log(similarityCalc(0, arr1, arr2));
});
