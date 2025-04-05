const obj = {
  name: 'Zack Wu',
  greet: function (param) {
    console.log(`Hello ${this.name}`);
    if (param) {
      console.log(`Param: ${param}`);
    }
  },
};

obj.greet();
// Using call and apply to change the context of 'this'
obj.greet.call({ name: 'John Doe' });
// Using call with arguments
obj.greet.apply({ name: 'Jane Doe' }, ['Apple']);
