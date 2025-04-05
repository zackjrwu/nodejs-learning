const EventEmitter = require('events');
const util = require('util');

/*

create an custom Object
   ↓
custom Object extends from EventEmitter
   ↓
create a custom method inside do EventEmitter emit function (define a type)
   ↓
create an instance of the custom Object
   ↓
register an event listener and deine a type and a callback function

*/

// Functional inheritance
function Greetr() {
  this.greeting = 'Hello world!';
}

util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function (data) {
  console.log(this.greeting);
  this.emit('greet', data);
};

const greeter1 = new Greetr();

greeter1.on('greet', function (data) {
  console.log('Someone greeted!');
  console.log(data);
});

greeter1.greet('Zack');

//  Class version
class GreetrClass extends EventEmitter {
  constructor() {
    super();
    this.greeting = 'Hello world!';
  }

  greet(data) {
    console.log(this.greeting);
    this.emit('greet', data);
  }
}
const greeter2 = new GreetrClass();
greeter2.on('greet', function (data) {
  console.log('Someone greeted!');
  console.log(data);
});
greeter2.greet('Zack Wu');
