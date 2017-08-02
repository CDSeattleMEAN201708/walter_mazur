var mylib = require('./mathlib');
var math = new mylib();

var a = 2;
var b = 10;

console.log("Add: " + math.add(a, b));
console.log("Multiply: "+math.multiply(a, b));
console.log("Square: "+math.square(a));
console.log("Random: "+math.random(a, b));
