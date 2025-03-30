function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function (event, listener) {
  this.events[event] = this.events[event] || [];
  this.events[event].push(listener);
};

Emitter.prototype.emit = function (type) {
  if (this.events[type]) {
    this.events[type].forEach(function (listener) {
      listener();
    });
  }
};

module.exports = Emitter;
