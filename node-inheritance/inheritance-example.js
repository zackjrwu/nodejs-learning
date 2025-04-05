// 📌 Node.js 傳統繼承寫法（使用 util.inherits）
const util = require('util');

// 父類別 constructor function
function Person() {
  this.firstName = 'Zack';
  this.lastName = 'Wu';
}

Person.prototype.greet = function () {
  console.log(`Hello ${this.firstName} ${this.lastName}`);
};

// 子類別 constructor function
function Employee() {
  // ❌ 沒有呼叫 Person.call(this)，this.firstName/lastName 將是 undefined
  this.jobTitle = 'Software Engineer';
}

// ✅ 繼承 Person 的 prototype 方法
util.inherits(Employee, Person);

// ❌ firstName 和 lastName 沒有被初始化，會是 undefined
const employee = new Employee();
employee.greet(); // Output: Hello undefined undefined

// ----------------------------------------

// ✅ 建議改成這樣（加上 constructor call）
function BetterEmployee() {
  Person.call(this); // 初始化父類別的屬性
  this.jobTitle = 'Engineer';
}
util.inherits(BetterEmployee, Person);

const better = new BetterEmployee();
better.greet(); // Output: Hello Zack Wu

// ----------------------------------------

// 📌 ES6 class 寫法（比較清楚、現代）
class ClassPerson {
  constructor() {
    this.firstName = 'Zack';
    this.lastName = 'Wu';
  }

  greet() {
    console.log(`Hello ${this.firstName} ${this.lastName}`);
  }
}

class ClassEmployee extends ClassPerson {
  constructor() {
    super(); // 呼叫父類別 constructor
    this.jobTitle = 'Software Engineer';
  }
}

const classEmp = new ClassEmployee();
classEmp.greet(); // Output: Hello Zack Wu
