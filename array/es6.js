/*
 * ES6 (ECMAScript 2015) - a beginner-friendly guide
 *
 * ES6 is a major version of JavaScript. It added modern syntax and useful
 * built-in features that make JavaScript easier to read and write.
 *
 * Run this file with:
 *     node array/es6.js
 */

// ---------------------------------------------------------------------------
// 1. let and const
// ---------------------------------------------------------------------------

// `let` creates a variable whose value can change.
let age = 20;
age = 21;

// `const` creates a variable whose binding cannot be reassigned.
const name = "Ayan";

// const objects and arrays can still be changed internally:
const user = { name: "Ayan" };
user.name = "Sam";

const colors = ["red"];
colors.push("blue");

// Prefer const by default. Use let only when reassignment is needed.
console.log("1.", age, name, user, colors);

// `let` and `const` are block-scoped: they exist inside `{ }`.
{
  const message = "I only exist in this block";
  console.log(message);
}

// ---------------------------------------------------------------------------
// 2. Template literals
// ---------------------------------------------------------------------------

const firstName = "Ayan";
const language = "JavaScript";

// Backticks allow variables and expressions inside `${ }`.
const introduction = `Hello, ${firstName}! Welcome to ${language}.`;
const calculation = `2 + 3 = ${2 + 3}`;

console.log("2.", introduction);
console.log(calculation);

// They also support multiple lines.
const paragraph = `
  This is a string
  written on multiple lines.
`;
console.log(paragraph.trim());

// ---------------------------------------------------------------------------
// 3. Default parameters
// ---------------------------------------------------------------------------

function greet(person = "friend") {
  return `Hello, ${person}!`;
}

console.log("3.", greet());
console.log(greet("Mina"));

// The default is used only when the argument is undefined.
function calculateTotal(price, tax = 0.1) {
  return price + price * tax;
}

console.log(calculateTotal(100));
console.log(calculateTotal(100, 0.2));

// ---------------------------------------------------------------------------
// 4. Arrow functions
// ---------------------------------------------------------------------------

// Traditional function:
function square(number) {
  return number * number;
}

// Arrow function with one parameter and an implicit return:
const double = number => number * 2;

// Parentheses are needed for zero or multiple parameters.
const add = (a, b) => a + b;

// Use braces when the function has more than one statement.
const makeMessage = name => {
  const message = `Welcome, ${name}`;
  return message;
};

console.log("4.", square(4), double(4), add(2, 3), makeMessage("Mina"));

// Arrow functions do not create their own `this`.
// This is useful in callbacks because they keep `this` from the outer scope.
const team = {
  members: ["Ayan", "Mina"],
  printMembers() {
    this.members.forEach(member => {
      console.log(`Member: ${member}`);
    });
  }
};
team.printMembers();

// ---------------------------------------------------------------------------
// 5. Enhanced object literals
// ---------------------------------------------------------------------------

const city = "Kathmandu";
const country = "Nepal";

// Property shorthand: { city } means { city: city }.
const location = { city, country };

const person = {
  name: "Mina",
  age: 22,

  // Method shorthand:
  introduce() {
    return `I am ${this.name}.`;
  }
};

console.log("5.", location, person.introduce());

// Computed property names:
const property = "email";
const contact = {
  [property]: "mina@example.com"
};
console.log(contact);

// ---------------------------------------------------------------------------
// 6. Destructuring
// ---------------------------------------------------------------------------

// Array destructuring copies values by position.
const numbers = [10, 20, 30];
const [first, second, third] = numbers;
console.log("6.", first, second, third);

// Skip values and provide a default.
const [one, , three, four = 40] = numbers;
console.log(one, three, four);

// Swap two variables without a temporary variable.
let left = "left";
let right = "right";
[left, right] = [right, left];
console.log(left, right);

// Object destructuring copies values by property name.
const product = { title: "Book", price: 15 };
const { title, price } = product;
console.log(title, price);

// Rename a property and provide a default.
const { title: productTitle, stock = 0 } = product;
console.log(productTitle, stock);

// Destructuring is common in function parameters.
function showProduct({ title: itemTitle, price: itemPrice }) {
  return `${itemTitle} costs $${itemPrice}.`;
}
console.log(showProduct(product));

// ---------------------------------------------------------------------------
// 7. Rest parameters
// ---------------------------------------------------------------------------

// Rest gathers remaining arguments into an array.
function sum(...values) {
  return values.reduce((total, value) => total + value, 0);
}

console.log("7.", sum(1, 2, 3, 4));

const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);

// ---------------------------------------------------------------------------
// 8. Spread syntax
// ---------------------------------------------------------------------------

// Spread expands an array into individual values.
const oldNumbers = [1, 2, 3];
const newNumbers = [0, ...oldNumbers, 4];
console.log("8.", newNumbers);

// It is useful for copying and combining arrays.
const copiedNumbers = [...oldNumbers];
const combinedNumbers = [...oldNumbers, ...[4, 5]];
console.log(copiedNumbers, combinedNumbers);

// Spread also copies enumerable object properties.
const basicUser = { name: "Ayan", role: "student" };
const updatedUser = { ...basicUser, role: "developer" };
console.log(updatedUser);

// Spread is a shallow copy: nested objects are still shared.

// ---------------------------------------------------------------------------
// 9. for...of
// ---------------------------------------------------------------------------

// `for...of` reads values from an iterable such as an array or string.
const word = "ES6";
for (const character of word) {
  console.log("9.", character);
}

for (const number of [1, 2, 3]) {
  console.log(number * 2);
}

// `for...in` is generally used for object keys, not array values.
for (const key in product) {
  console.log(key, product[key]);
}

// ---------------------------------------------------------------------------
// 10. Useful array methods
// ---------------------------------------------------------------------------

const scores = [10, 20, 30, 40];

const doubledScores = scores.map(score => score * 2);
const passingScores = scores.filter(score => score >= 25);
const totalScore = scores.reduce((total, score) => total + score, 0);
const hasPerfectScore = scores.includes(100);
const scorePosition = scores.findIndex(score => score === 30);

console.log("10.", doubledScores);
console.log(passingScores, totalScore, hasPerfectScore, scorePosition);

// `Array.from` creates an array from an iterable or array-like value.
const letters = Array.from("hello");
console.log(letters);

// ---------------------------------------------------------------------------
// 11. Set - a collection of unique values
// ---------------------------------------------------------------------------

const uniqueNumbers = new Set([1, 2, 2, 3, 3]);
uniqueNumbers.add(4);
uniqueNumbers.delete(1);

console.log("11.", uniqueNumbers);
console.log(uniqueNumbers.has(2), uniqueNumbers.size);

// Convert a Set back to an array.
const uniqueArray = [...uniqueNumbers];
console.log(uniqueArray);

// ---------------------------------------------------------------------------
// 12. Map - key/value data with keys of any type
// ---------------------------------------------------------------------------

const scoresByStudent = new Map();
scoresByStudent.set("Ayan", 90);
scoresByStudent.set("Mina", 95);

console.log("12.", scoresByStudent.get("Ayan"));
console.log(scoresByStudent.has("Mina"), scoresByStudent.size);

for (const [student, score] of scoresByStudent) {
  console.log(student, score);
}

// A Map can use an object as a key.
const account = { id: 1 };
const accountNames = new Map([[account, "Ayan"]]);
console.log(accountNames.get(account));

// ---------------------------------------------------------------------------
// 13. Classes
// ---------------------------------------------------------------------------

// A class is a reusable blueprint for objects.
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound.`;
  }

  static category() {
    return "living thing";
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}

const dog = new Dog("Buddy");
console.log("13.", dog.speak());
console.log(Animal.category());

// `super` calls a parent constructor or method.
class Puppy extends Dog {
  speak() {
    return `${super.speak()} It is a puppy.`;
  }
}
console.log(new Puppy("Max").speak());

// ---------------------------------------------------------------------------
// 14. Promises
// ---------------------------------------------------------------------------

// A Promise represents a future result:
// pending -> fulfilled (success) or rejected (failure).
function wait(milliseconds) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Finished waiting"), milliseconds);
  });
}

wait(10)
  .then(result => console.log("14.", result))
  .catch(error => console.error("Promise error:", error))
  .finally(() => console.log("Promise completed"));

// ---------------------------------------------------------------------------
// 15. Modules
// ---------------------------------------------------------------------------

// Modules allow code to be split across files.
// In a file named math.js:
//
//     export const PI = 3.14159;
//     export function multiply(a, b) {
//       return a * b;
//     }
//
// In another file:
//
//     import { PI, multiply } from "./math.js";
//
// A default export can be imported with any name:
//
//     export default function sayHello() {}
//     import sayHello from "./hello.js";
//
// Node.js uses modules when package.json contains:
//     { "type": "module" }

// ---------------------------------------------------------------------------
// 16. Symbols
// ---------------------------------------------------------------------------

// A Symbol is a unique primitive value, often used as a special object key.
const id = Symbol("id");
const record = {
  [id]: 123,
  name: "Ayan"
};

console.log("16.", record[id]);
console.log(Symbol("id") === Symbol("id")); // false: every Symbol is unique

// ---------------------------------------------------------------------------
// 17. Iterators and generators
// ---------------------------------------------------------------------------

// A generator pauses at `yield` and continues when `next()` is called.
function* countToTwo() {
  yield 1;
  yield 2;
}

const counter = countToTwo();
console.log("17.", counter.next());
console.log(counter.next());
console.log(counter.next()); // { value: undefined, done: true }

// ---------------------------------------------------------------------------
// 18. Optional chaining and nullish coalescing
// ---------------------------------------------------------------------------

// These were added after ES6, but are commonly taught with modern JavaScript.
const settings = { profile: { username: "Ayan" } };
console.log("18.", settings.profile?.username);
console.log(settings.account?.email); // undefined instead of an error

const displayName = settings.profile?.username ?? "Guest";
const missingName = settings.account?.username ?? "Guest";
console.log(displayName, missingName);

// ---------------------------------------------------------------------------
// 19. Quick ES6 checklist
// ---------------------------------------------------------------------------

/*
 * Remember:
 * - Use const by default and let when a variable must change.
 * - Use template literals for readable strings with variables.
 * - Use arrow functions for short callbacks.
 * - Use destructuring to extract values from arrays and objects.
 * - Use rest to collect values and spread to expand/copy values.
 * - Use map, filter, and reduce for common array transformations.
 * - Use Set for unique values and Map for flexible key/value pairs.
 * - Use classes when objects share data and behavior.
 * - Use Promises for asynchronous work.
 * - Use modules to organize large applications.
 *
 * Note: async/await, optional chaining, and nullish coalescing are newer
 * additions than ES6, but they build directly on ES6's modern style.
 */
