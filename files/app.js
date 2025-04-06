const fs = require('fs');

//  sync
const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');

console.log(greet);

//  async error-first callback means the first argument is an error object
// this pattern is called "error-first callback" or "node-style callback"
const greet2 = fs.readFile(__dirname + '/greet.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log('Hello~~~!');
