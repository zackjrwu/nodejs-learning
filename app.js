//  This is a simple event emitter example in Node.js
const Emitter = require('events');
const emtr = new Emitter();
const { events } = require('./config');
// Registering event listeners

emtr.on(events.GREET, function () {
  console.log('Somewhere, someone said hello.');
});

// Registering another event listener
emtr.on(events.GREET, function () {
  console.log('A greeting occurred!');
});

// Emitting the event
console.log('Hello!');

// Emit the event
emtr.emit(events.GREET);
