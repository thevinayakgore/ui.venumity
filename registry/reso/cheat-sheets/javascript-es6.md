# JavaScript ES6+ Complete Cheat Sheet

ES6, also known as ECMAScript 2015, introduced major modern JavaScript features such as `let`, `const`, arrow functions, template literals, destructuring, classes, modules, Promises, and more. Later versions added features such as optional chaining, nullish coalescing, async/await improvements, and top-level `await`.

Modern JavaScript is essential for React, Next.js, Node.js, and frontend development. ES6+ features improve readability, reduce boilerplate, and make asynchronous code easier to manage.

---

## 1. Variables: `var`, `let`, `const`

```js
var oldWay = "function scoped";
let changeable = "block scoped";
const fixed = "block scoped and cannot be reassigned";
```

### Comparison

| Keyword | Scope | Reassign | Redeclare | Hoisting |
|---|---|---|---|---|
| `var` | Function scope | Yes | Yes | Hoisted as `undefined` |
| `let` | Block scope | Yes | No | Hoisted but not initialized |
| `const` | Block scope | No | No | Hoisted but not initialized |

### Examples

```js
if (true) {
  let x = 10;
  const y = 20;
}

// console.log(x); // ReferenceError
// console.log(y); // ReferenceError
```

### `const` objects and arrays

`const` prevents reassignment, but does not make objects or arrays immutable.

```js
const user = { name: "Aman" };

user.name = "Riya"; // Allowed
// user = {};       // Error
```

```js
const numbers =;[1][2][3]

numbers.push(4); // Allowed
// numbers = []; // Error
```

---

## 2. Arrow Functions

Arrow functions provide a shorter syntax for writing functions and do not have their own `this`, `arguments`, `super`, or `new.target` binding. [244]

### Traditional function

```js
function add(a, b) {
  return a + b;
}
```

### Arrow function

```js
const add = (a, b) => a + b;
```

### Variations

```js
const square = (x) => x * x;

const greet = () => console.log("Hello");

const getUser = () => ({
  name: "Aman",
  age: 22,
});
```

### Arrow function with multiple lines

```js
const calculate = (a, b) => {
  const sum = a + b;
  const product = a * b;

  return { sum, product };
};
```

### `this` behavior

```js
const user = {
  name: "Aman",

  regularFunction() {
    console.log(this.name); // Aman
  },

  arrowFunction: () => {
    // console.log(this.name); // Does not refer to user
  },
};
```

Arrow functions are ideal for callbacks, array methods, and short utility functions.

---

## 3. Template Literals

Template literals use backticks and support string interpolation and multiline strings.

```js
const name = "Aman";
const age = 22;

const message = `My name is ${name} and I am ${age} years old.`;
```

### Multiline string

```js
const html = `
  <div>
    <h1>Hello</h1>
    <p>Welcome</p>
  </div>
`;
```

### Expression inside template

```js
const price = 100;
const tax = price * 0.18;

console.log(`Total price: ${price + tax}`);
```

---

## 4. Destructuring

Destructuring extracts values from arrays or properties from objects into variables. [246][251]

### Array destructuring

```js
const numbers =;[1][2][3]

const [first, second, third] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(third);  // 3
```

### Skip values

```js
const [a, , c] =;[1][2][3]

console.log(a); // 1
console.log(c); // 3
```

### Default values

```js
const [x = 10, y = 20] = ;

console.log(x); // 5
console.log(y); // 20
```

### Rest elements

```js
const [firstValue, ...rest] =;[1][2][3][4]

console.log(firstValue); // 1
console.log(rest);       //[2][3][4]
```

### Object destructuring

```js
const user = {
  name: "Aman",
  age: 22,
  city: "Delhi",
};

const { name, age, city } = user;
```

### Rename variables

```js
const { name: userName, age: userAge } = user;
```

### Default values

```js
const { country = "India" } = user;
```

### Nested destructuring

```js
const profile = {
  user: {
    name: "Aman",
    address: {
      city: "Delhi",
    },
  },
};

const {
  user: {
    name,
    address: { city },
  },
} = profile;
```

### Function parameter destructuring

```js
function displayUser({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

displayUser({ name: "Aman", age: 22 });
```

---

## 5. Spread Operator

The spread operator `...` expands arrays, objects, or iterable values.

### Copy array

```js
const original =;[1][2][3]
const copy = [...original];
```

### Merge arrays

```js
const a =;[1][2]
const b =;[3][4]

const merged = [...a, ...b];
//[1][2][3][4]
```

### Copy object

```js
const user = { name: "Aman", age: 22 };
const userCopy = { ...user };
```

### Merge objects

```js
const defaults = { theme: "light", language: "en" };
const userSettings = { theme: "dark" };

const settings = { ...defaults, ...userSettings };
// { theme: "dark", language: "en" }
```

### Function arguments

```js
const numbers =;[1][2][3]

const sum = (a, b, c) => a + b + c;

console.log(sum(...numbers));
```

---

## 6. Rest Parameters

Rest parameters collect multiple arguments into an array.

```js
function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

### Rest with other parameters

```js
function display(first, ...others) {
  console.log(first);
  console.log(others);
}

display(1, 2, 3, 4);
// 1
//[2][3][4]
```

### Spread vs Rest

| Operator | Position | Purpose |
|---|---|---|
| Spread `...` | Function call or array/object literal | Expands values |
| Rest `...` | Function parameter or destructuring | Collects values |

---

## 7. Default Parameters

```js
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

console.log(greet());        // Hello, Guest
console.log(greet("Aman")); // Hello, Aman
```

### Default parameter with expression

```js
function createUser(name, role = "user") {
  return { name, role };
}
```

---

## 8. Enhanced Object Literals

```js
const name = "Aman";
const age = 22;

const user = {
  name,
  age,

  greet() {
    console.log(`Hello, ${this.name}`);
  },
};
```

### Computed property names

```js
const key = "email";

const user = {
  name: "Aman",
  [key]: "aman@example.com",
};
```

---

## 9. Shorthand Properties

```js
const name = "Aman";
const age = 22;

const user = { name, age };

// Same as:
// const user = { name: name, age: age };
```

---

## 10. Classes

ES6 introduced class syntax for object-oriented JavaScript.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

const person = new Person("Aman", 22);
person.greet();
```

### Inheritance

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog("Tommy");
dog.speak();
```

### `super`

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
```

### Getters and setters

```js
class User {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}

const user = new User("Aman");
user.name = "Riya";

console.log(user.name);
```

### Static methods

```js
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtils.add(2, 3));
```

### Private fields

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

---

## 11. Modules

ES modules allow code to be split across files and imported where needed.

### Export

```js
// utils.js

export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export default function multiply(a, b) {
  return a * b;
}
```

### Import

```js
// main.js

import multiply, { PI, add } from "./utils.js";

console.log(PI);
console.log(add(2, 3));
console.log(multiply(2, 3));
```

### Rename imports

```js
import { add as sum } from "./utils.js";
```

### Import all

```js
import * as utils from "./utils.js";

console.log(utils.PI);
console.log(utils.add(2, 3));
```

### Dynamic import

```js
const module = await import("./utils.js");
```

---

## 12. Promises

A Promise represents the eventual completion or failure of an asynchronous operation. [247][254]

### Create a Promise

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success");
  }, 1000);
});
```

### Consume a Promise

```js
promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log("Done"));
```

### Promise example

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

delay(1000).then(() => {
  console.log("Waited for 1 second");
});
```

### Promise states

| State | Meaning |
|---|---|
| Pending | Initial state |
| Fulfilled | Operation completed successfully |
| Rejected | Operation failed |

---

## 13. Async / Await

`async/await` makes asynchronous code look and behave more like synchronous code.

```js
async function getUser() {
  try {
    const response = await fetch("[https://api.example.com/user](https://api.example.com/user)");

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Request finished");
  }
}
```

### Async function always returns a Promise

```js
async function getValue() {
  return 10;
}

getValue().then((value) => console.log(value)); // 10
```

### Sequential execution

```js
async function run() {
  const first = await fetch("/api/first");
  const second = await fetch("/api/second");
}
```

### Parallel execution

```js
async function run() {
  const [first, second] = await Promise.all([
    fetch("/api/first"),
    fetch("/api/second"),
  ]);
}
```

### `Promise.all`

```js
const results = await Promise.all([promise1, promise2, promise3]);
```

Fails if any Promise rejects.

### `Promise.allSettled`

```js
const results = await Promise.allSettled([promise1, promise2]);
```

Waits for all Promises, whether fulfilled or rejected.

### `Promise.race`

```js
const result = await Promise.race([promise1, promise2]);
```

Returns the first settled Promise.

### `Promise.any`

```js
const result = await Promise.any([promise1, promise2]);
```

Returns the first fulfilled Promise.

---

## 14. Map, Filter, Reduce

### `map`

Transforms each element and returns a new array.

```js
const numbers =;[1][2][3]

const doubled = numbers.map((number) => number * 2);
//[2][4][6]
```

### `filter`

Returns elements that pass a condition.

```js
const numbers =;[1][2][3][4][5]

const evenNumbers = numbers.filter((number) => number % 2 === 0);
//[2][4]
```

### `reduce`

Reduces an array to a single value.

```js
const numbers =;[1][2][3][4]

const total = numbers.reduce((sum, number) => sum + number, 0);
// 10
```

### `find`

Returns the first matching element.

```js
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" },
];

const user = users.find((user) => user.id === 2);
```

### `findIndex`

```js
const index = users.findIndex((user) => user.id === 2);
```

### `some`

Returns `true` if at least one element matches.

```js
const hasAdult = users.some((user) => user.age >= 18);
```

### `every`

Returns `true` if all elements match.

```js
const allAdults = users.every((user) => user.age >= 18);
```

### `forEach`

Executes a function for each element.

```js
numbers.forEach((number) => {
  console.log(number);
});
```

### `includes`

```js
const numbers =;[1][2][3]

console.log(numbers.includes(2)); // true
```

### `flat`

```js
const nested = [1, [2, ]];[3][4]

console.log(nested.flat(2));
//[1][2][3][4]
```

### `flatMap`

```js
const numbers =;[1][2][3]

const result = numbers.flatMap((number) => [number, number * 2]);
//[1][2][3][4][6]
```

---

## 15. Objects

### Object methods

```js
const user = {
  name: "Aman",
  age: 22,
};

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));
```

### `Object.assign`

```js
const target = { a: 1 };
const source = { b: 2 };

const merged = Object.assign({}, target, source);
```

### Object freeze

```js
const user = Object.freeze({ name: "Aman" });

user.name = "Riya"; // Silently fails in non-strict mode
```

### Optional chaining

Optional chaining `?.` safely accesses nested properties or calls functions. If the value is `null` or `undefined`, it returns `undefined` instead of throwing an error. [243][245]

```js
const user = {
  profile: {
    address: {
      city: "Delhi",
    },
  },
};

console.log(user?.profile?.address?.city);
```

### Optional function call

```js
user?.greet?.();
```

### Optional array access

```js
const firstItem = users?.;
```

### Optional chaining with default value

```js
const city = user?.profile?.address?.city ?? "Unknown";
```

---

## 16. Nullish Coalescing

The nullish coalescing operator `??` returns the right-hand value only when the left-hand value is `null` or `undefined`. [245]

```js
const value = null ?? "default";
console.log(value); // default
```

### Difference from `||`

```js
const count = 0;

console.log(count || 10); // 10
console.log(count ?? 10); // 0
```

```js
const isActive = false;

console.log(isActive || true);  // true
console.log(isActive ?? true);  // false
```

Use `??` when `0`, `false`, or empty string should be treated as valid values.

---

## 17. Logical Assignment Operators

```js
let a = null;
a ??= "default";
// a = "default"

let b = 0;
b ||= 10;
// b = 10

let c = 5;
c &&= 20;
// c = 20
```

| Operator | Meaning |
|---|---|
| `??=` | Assign only if value is `null` or `undefined` |
| `||=` | Assign only if value is falsy |
| `&&=` | Assign only if value is truthy |

---

## 18. Sets

A `Set` stores unique values.

```js
const numbers = new Set();[1][2][3]

console.log(numbers); // {1, 2, 3}
```

### Set methods

```js
const set = new Set();

set.add(1);
set.add(2);
set.add(2);

console.log(set.has(1)); // true
console.log(set.size);   // 2

set.delete(1);
set.clear();
```

### Remove duplicates from array

```js
const numbers =;[1][2][3]

const unique = [...new Set(numbers)];
//[1][2][3]
```

---

## 19. Maps

A `Map` stores key-value pairs and allows any data type as a key.

```js
const map = new Map();

map.set("name", "Aman");
map.set(1, "number key");
map.set(true, "boolean key");

console.log(map.get("name"));
console.log(map.has(1));
console.log(map.size);

map.delete("name");
map.clear();
```

### Iterate a Map

```js
for (const [key, value] of map) {
  console.log(key, value);
}
```

### Map vs Object

| Feature | Map | Object |
|---|---|---|
| Key types | Any type | String or Symbol |
| Order | Insertion order | Mostly insertion order |
| Size | `.size` | Manual |
| Iteration | Directly iterable | Requires `Object.entries()` |

---

## 20. Symbols

A Symbol creates a unique and immutable identifier.

```js
const id = Symbol("id");

const user = {
  [id]: 123,
  name: "Aman",
};

console.log(user[id]);
```

Symbols are not included in `for...in` loops or `Object.keys()`.

---

## 21. Iterators and Generators

### Generator function

```js
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generateNumbers();

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
```

### Generator with loop

```js
function* countdown(number) {
  while (number > 0) {
    yield number;
    number--;
  }
}

for (const value of countdown(3)) {
  console.log(value);
}
```

---

## 22. Array and Object Copying

### Shallow copy

```js
const original = { name: "Aman", address: { city: "Delhi" } };

const copy = { ...original };

copy.address.city = "Mumbai";

console.log(original.address.city); // Mumbai
```

### Deep copy

```js
const deepCopy = structuredClone(original);

deepCopy.address.city = "Goa";

console.log(original.address.city); // Delhi
```

### JSON deep copy limitation

```js
const copy = JSON.parse(JSON.stringify(original));
```

This fails for functions, `undefined`, `Symbol`, `Date`, `Map`, `Set`, and circular references.

---

## 23. String Methods

```js
const text = "  JavaScript ES6+  ";

console.log(text.trim());
console.log(text.trimStart());
console.log(text.trimEnd());

console.log(text.toUpperCase());
console.log(text.toLowerCase());

console.log(text.includes("Script"));
console.log(text.startsWith("  Java"));
console.log(text.endsWith("+  "));

console.log(text.replace("JavaScript", "JS"));
console.log(text.replaceAll("a", "A"));

console.log(text.padStart(25, "*"));
console.log(text.padEnd(25, "*"));

console.log(text.split(" "));
```

### `at()`

```js
const value = "JavaScript";

console.log(value.at(0));   // J
console.log(value.at(-1));  // t
```

---

## 24. Number and Math Methods

```js
console.log(Number.isInteger(10));
console.log(Number.isFinite(10));
console.log(Number.isNaN(NaN));

console.log(parseInt("42"));
console.log(parseFloat("42.5"));

console.log((10.567).toFixed(2));
```

### Math methods

```js
console.log(Math.max(1, 2, 3));
console.log(Math.min(1, 2, 3));
console.log(Math.round(4.5));
console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
console.log(Math.abs(-10));
console.log(Math.pow(2, 3));
console.log(Math.sqrt(16));
console.log(Math.random());
```

### Random integer

```js
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

## 25. Array Methods Reference

| Method | Returns | Mutates Original |
|---|---|---|
| `map()` | New array | No |
| `filter()` | New array | No |
| `reduce()` | Single value | No |
| `find()` | Element or `undefined` | No |
| `findIndex()` | Index or `-1` | No |
| `some()` | Boolean | No |
| `every()` | Boolean | No |
| `forEach()` | `undefined` | No |
| `push()` | New length | Yes |
| `pop()` | Removed element | Yes |
| `shift()` | Removed element | Yes |
| `unshift()` | New length | Yes |
| `splice()` | Removed elements | Yes |
| `slice()` | New array | No |
| `sort()` | Sorted array | Yes |
| `reverse()` | Reversed array | Yes |
| `flat()` | New array | No |
| `flatMap()` | New array | No |
| `includes()` | Boolean | No |
| `join()` | String | No |

---

## 26. Object Methods Reference

| Method | Purpose |
|---|---|
| `Object.keys()` | Returns array of keys |
| `Object.values()` | Returns array of values |
| `Object.entries()` | Returns array of key-value pairs |
| `Object.assign()` | Copies properties |
| `Object.freeze()` | Prevents modifications |
| `Object.hasOwn()` | Checks own property |
| `structuredClone()` | Deep copies value |

---

## 27. Error Handling

```js
try {
  throw new Error("Something went wrong");
} catch (error) {
  console.error(error.message);
} finally {
  console.log("Always runs");
}
```

### Custom error

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid input");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
```

---

## 28. Regular Expressions

```js
const text = "Hello World 123";

console.log(text.match(/\d+/));
console.log(text.replace(/\d+/, "Number"));
console.log(text.search(/World/));
console.log(/\d+/.test(text));
```

### Common regex patterns

| Pattern | Meaning |
|---|---|
| `\d` | Digit |
| `\w` | Word character |
| `\s` | Whitespace |
| `.` | Any character |
| `^` | Start |
| `$` | End |
| `*` | Zero or more |
| `+` | One or more |
| `?` | Zero or one |
| `{n}` | Exactly n times |
| `[abc]` | Any one of a, b, c |
| `[^abc]` | Not a, b, or c |

---

## 29. Date and Time

```js
const date = new Date();

console.log(date.getFullYear());
console.log(date.getMonth()); // 0-based
console.log(date.getDate());
console.log(date.getDay());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
```

### Format date

```js
const formatted = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
}).format(date);

console.log(formatted); // Oct 30, 2026
```

---

## 30. JSON

### Convert object to JSON

```js
const user = { name: "Aman", age: 22 };

const json = JSON.stringify(user);
```

### Convert JSON to object

```js
const parsed = JSON.parse(json);
```

---

## 31. Timers

```js
setTimeout(() => {
  console.log("Runs after 1 second");
}, 1000);

const intervalId = setInterval(() => {
  console.log("Runs every second");
}, 1000);

clearInterval(intervalId);
```

---

## 32. DOM Basics

```js
const element = document.querySelector("#title");
const elements = document.querySelectorAll(".item");

element.textContent = "Updated";
element.innerHTML = "<strong>Hello</strong>";
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("visible");

element.setAttribute("data-id", "10");
element.getAttribute("data-id");

element.style.color = "red";
```

### Create and append element

```js
const div = document.createElement("div");

div.textContent = "Hello";
div.className = "box";

document.body.appendChild(div);
```

### Event listener

```js
button.addEventListener("click", (event) => {
  console.log("Button clicked", event.target);
});
```

### Remove event listener

```js
function handleClick() {
  console.log("Clicked");
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

---

## 33. Common Interview Questions

### 1. What is ES6?

ES6, or ECMAScript 2015, is a major JavaScript update that introduced `let`, `const`, arrow functions, template literals, destructuring, classes, modules, Promises, and more. [246][247]

### 2. What is the difference between `var`, `let`, and `const`?

`var` is function-scoped and can be redeclared. `let` is block-scoped and can be reassigned. `const` is block-scoped and cannot be reassigned.

### 3. What is an arrow function?

An arrow function is a shorter function syntax that does not have its own `this`, `arguments`, or `prototype`. [244]

### 4. What is destructuring?

Destructuring extracts values from arrays or properties from objects into variables. [246][251]

### 5. What is the spread operator?

The spread operator `...` expands arrays, objects, or function arguments.

### 6. What are rest parameters?

Rest parameters collect multiple arguments into an array.

### 7. What is the difference between spread and rest?

Spread expands values; rest collects values.

### 8. What is a template literal?

A template literal is a string using backticks that supports interpolation and multiline text.

### 9. What is a Promise?

A Promise represents the eventual completion or failure of an asynchronous operation. [247][254]

### 10. What are Promise states?

A Promise can be pending, fulfilled, or rejected.

### 11. What is async/await?

`async/await` is syntax for handling Promises in a cleaner, synchronous-looking way.

### 12. What is optional chaining?

Optional chaining `?.` safely accesses nested properties or calls methods, returning `undefined` instead of throwing an error when the value is `null` or `undefined`. [243]

### 13. What is nullish coalescing?

Nullish coalescing `??` returns the right-hand value only when the left-hand value is `null` or `undefined`. [245]

### 14. What is the difference between `??` and `||`?

`||` returns the right value for any falsy value. `??` returns the right value only for `null` or `undefined`.

### 15. What is a closure?

A closure is a function that remembers variables from its outer lexical scope even after the outer function has finished executing.

### 16. What is hoisting?

Hoisting is JavaScript behavior where declarations are moved to the top of their scope during compilation.

### 17. What is the difference between `==` and `===`?

`==` compares values after type coercion. `===` compares both value and type.

### 18. What is the event loop?

The event loop manages asynchronous callbacks and allows JavaScript to remain single-threaded while handling non-blocking operations.

### 19. What is a callback function?

A callback is a function passed as an argument to another function and executed later.

### 20. What is callback hell?

Callback hell occurs when multiple nested callbacks make asynchronous code difficult to read and maintain.

### 21. What is a generator?

A generator is a function that can pause and resume execution using `yield`.

### 22. What is a Symbol?

A Symbol creates a unique and immutable identifier, often used as an object property key.

### 23. What is a Map?

A Map stores key-value pairs and allows any data type as a key.

### 24. What is a Set?

A Set stores unique values of any type.

### 25. What is the difference between shallow copy and deep copy?

A shallow copy copies only the top-level structure. A deep copy recursively copies nested objects and arrays.

### 26. What is `this` in JavaScript?

`this` refers to the context in which a function is executed. Its value depends on how the function is called.

### 27. What is prototypal inheritance?

Prototypal inheritance allows objects to inherit properties and methods from other objects through prototypes.

### 28. What is event delegation?

Event delegation attaches one event listener to a parent element and handles events from child elements using event bubbling.

### 29. What is event bubbling?

Event bubbling is when an event starts at the target element and propagates upward through its ancestors.

### 30. What is event capturing?

Event capturing is when an event propagates from the outermost ancestor down to the target element.

---

## 34. Best Practices

- Use `const` by default.
- Use `let` only when reassignment is needed.
- Avoid `var` in modern code.
- Use arrow functions for callbacks.
- Use template literals instead of string concatenation.
- Use destructuring for cleaner data access.
- Use optional chaining for safe nested access.
- Use `??` when `0`, `false`, or `""` are valid values.
- Prefer `async/await` for readable asynchronous code.
- Use `Promise.all` for independent parallel requests.
- Avoid mutating function arguments.
- Use meaningful variable and function names.
- Keep functions small and focused.
- Use modules to organize code.
- Handle errors explicitly.

---

## Summary

ES6+ transformed JavaScript into a modern, expressive language suitable for large frontend and backend applications. The most important features are `let` and `const`, arrow functions, template literals, destructuring, spread and rest operators, classes, modules, Promises, async/await, optional chaining, and nullish coalescing. [246][247]

For interviews, focus on scoping, closures, `this`, hoisting, Promises, async/await, event loop, array methods, destructuring, spread/rest, optional chaining, and nullish coalescing.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to MDN Web Docs for detailed and current JavaScript guidance.