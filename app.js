//  This is a simple event emitter example in Node.js
const Emitter = require('./emitter.js');
const emtr = new Emitter();
// Registering event listeners

emtr.on('greet', function () {
  console.log('Somewhere, someone said hello.');
});

// Registering another event listener
emtr.on('greet', function () {
  console.log('A greeting occurred!');
});

// Emitting the event
console.log('Hello!');

// Emit the event
emtr.emit('greet');
