# Modern JavaScript Quick Reference

A quick guide to modern JavaScript syntax, features, and best practices. Includes ES6+ operators, functions, classes, and frequently used patterns.

---

## Variable Declarations

### var, let, const

```javascript
var x = 10; // Function scoped
let y = 20; // Block scoped
const z = 30; // Constant, block scoped

// const with objects
const obj = { name: "John" };
obj.name = "Jane"; // ✅ Allowed
obj = {}; // ❌ Error
```

### Hoisting

```javascript
console.log(a); // undefined (var is hoisted)
console.log(b); // ReferenceError (let/const not initialized)
var a = 10;
let b = 20;
```

---

## Data Types

### Primitives

```javascript
// String
const str = "Hello";
const template = `Hello ${name}`;

// Number
const num = 42;
const bigInt = 9007199254740991n;

// Boolean
const isTrue = true;

// Null & Undefined
const empty = null;
const notDefined = undefined;

// Symbol
const sym = Symbol("unique");
```

### Objects & Arrays

```javascript
// Object literal
const person = {
  name: "John",
  age: 30,
  greet() {
    return `Hello, ${this.name}`;
  },
};

// Array
const numbers = [1, 2, 3];
const mixed = ["text", 42, true, {}];
```

---

## Destructuring

### Object Destructuring

```javascript
const user = { name: "John", age: 30, city: "NYC" };

// Basic
const { name, age } = user;

// Renaming
const { name: userName } = user;

// Default values
const { country = "USA" } = user;

// Nested
const {
  address: { street },
} = user;
```

### Array Destructuring

```javascript
const numbers = [1, 2, 3, 4, 5];

// Basic
const [first, second] = numbers;

// Skip elements
const [first, , third] = numbers;

// Rest operator
const [first, ...rest] = numbers;

// Default values
const [a = 10, b = 20] = [];
```

---

## Template Literals

### String Interpolation

```javascript
const name = "John";
const age = 30;

// Basic
const greeting = `Hello, ${name}!`;

// Expressions
const message = `${name} is ${age} years old.`;

// Multi-line
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Tagged templates
function tag(strings, ...values) {
  return strings[0] + values[0].toUpperCase();
}
tag`Hello ${name}`;
```

---

## Spread & Rest Operators

### Spread (...)

```javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a:1, b:2, c:3}

// Function arguments
Math.max(...numbers);
```

### Rest (...)

```javascript
// Function parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}

// Array destructuring
const [first, ...others] = [1, 2, 3, 4];

// Object destructuring
const { id, ...details } = user;
```

---

## Arrow Functions

### Syntax

```javascript
// Traditional
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// No parameters
const greet = () => "Hello!";

// Single parameter (optional parentheses)
const square = (x) => x * x;

// Multiple lines
const process = (x, y) => {
  const sum = x + y;
  return sum * 2;
};
```

### this Binding

```javascript
const person = {
  name: "John",
  traditional: function () {
    console.log(this.name); // 'John'
  },
  arrow: () => {
    console.log(this.name); // undefined (lexical this)
  },
};
```

---

## Array Methods

### Higher-Order Functions

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform
const doubled = numbers.map((n) => n * 2);

// filter - select
const evens = numbers.filter((n) => n % 2 === 0);

// reduce - accumulate
const sum = numbers.reduce((acc, n) => acc + n, 0);

// forEach - iterate
numbers.forEach((n) => console.log(n));

// find - search
const found = numbers.find((n) => n > 3);
```

### Other Useful Methods

```javascript
// Includes
numbers.includes(3); // true

// Some/Every
numbers.some((n) => n > 3); // true if any match
numbers.every((n) => n > 0); // true if all match

// Flat
const nested = [1, [2, [3]]];
nested.flat(2); // [1, 2, 3]

// FlatMap
numbers.flatMap((n) => [n, n * 2]);
```

---

## Object Methods

### Property Shorthand

```javascript
const name = "John";
const age = 30;

// ES5
const person = { name: name, age: age };

// ES6+
const person = { name, age };
```

### Computed Property Names

```javascript
const key = "name";
const value = "John";

const obj = {
  [key]: value, // Dynamic key
  ["get" + key.toUpperCase()]() {
    // Dynamic method name
    return this[key];
  },
};
```

### Object Methods

```javascript
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj); // ['a', 'b', 'c']
Object.values(obj); // [1, 2, 3]
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

Object.assign({}, obj, { d: 4 }); // Merge objects

// From entries (reverse of entries)
Object.fromEntries([
  ["a", 1],
  ["b", 2],
]);
```

---

## Classes

### Class Syntax

```javascript
class Person {
  // Constructor
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet() {
    return `Hello, ${this.name}`;
  }

  // Getter
  get birthYear() {
    return new Date().getFullYear() - this.age;
  }

  // Setter
  set nickname(value) {
    this._nickname = value;
  }

  // Static method
  static compare(a, b) {
    return a.age - b.age;
  }
}

// Inheritance
class Employee extends Person {
  constructor(name, age, title) {
    super(name, age);
    this.title = title;
  }
}
```

### Private Fields

```javascript
class BankAccount {
  #balance = 0; // Private field

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

---

## Promises & Async/Await

### Promises

```javascript
const promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    Math.random() > 0.5 ? resolve("Success!") : reject("Error!");
  }, 1000);
});

promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log("Done"));
```

### Promise Methods

```javascript
// Multiple promises
Promise.all([promise1, promise2]); // All must succeed
Promise.race([promise1, promise2]); // First to complete
Promise.any([promise1, promise2]); // First to succeed
Promise.allSettled([promise1, promise2]); // All complete
```

### Async/Await

```javascript
async function fetchData() {
  try {
    const response = await fetch("api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Async arrow function
const getData = async () => {
  const data = await fetchData();
  return data;
};
```

---

## Modules

### Export

```javascript
// Named exports
export const PI = 3.14159;
export function square(x) {
  return x * x;
}
export class Calculator {
  /* ... */
}

// Default export
export default function add(a, b) {
  return a + b;
}

// Export list
export { PI, square, Calculator };
```

### Import

```javascript
// Named imports
import { PI, square } from "./math.js";

// Rename imports
import { PI as piValue } from "./math.js";

// Default import
import add from "./math.js";

// All as namespace
import * as Math from "./math.js";

// Dynamic import
const module = await import("./math.js");
```

---

## Modern Features

### Optional Chaining

```javascript
const user = { profile: { name: "John" } };

// Safe access
const name = user?.profile?.name; // 'John'
const city = user?.address?.city; // undefined (no error)

// Function calls
user.getAddress?.(); // Only call if exists

// Array access
const firstItem = arr?.[0];
```

### Nullish Coalescing

```javascript
const value = null;
const result = value ?? "default"; // 'default'

// vs OR operator
const val = 0 || "default"; // 'default'
const val2 = 0 ?? "default"; // 0
```

### Logical Assignment

```javascript
let x = null;

// OR assignment
x ||= 10; // x = 10

// AND assignment
x &&= 20; // x = 20 (if truthy)

// Nullish assignment
x ??= 30; // x = 30 (if null/undefined)
```

---

## Built-in Objects

### Date

```javascript
const now = new Date();
now.getFullYear(); // 2024
now.getMonth(); // 0-11
now.getDate(); // 1-31
now.getDay(); // 0-6 (Sunday = 0)
now.toISOString(); // ISO format
```

### Math

```javascript
Math.PI; // 3.14159
Math.random(); // Random 0-1
Math.floor(4.7); // 4
Math.ceil(4.2); // 5
Math.round(4.5); // 5
Math.max(1, 2, 3); // 3
Math.min(1, 2, 3); // 1
```

### JSON

```javascript
const obj = { name: "John", age: 30 };

// Stringify
const json = JSON.stringify(obj);

// Parse
const parsed = JSON.parse(json);

// Reviver function
JSON.parse(json, (key, value) => {
  if (key === "date") return new Date(value);
  return value;
});
```

---

## Performance Tips

### Do:

- Use const by default
- Prefer template literals
- Use arrow functions for callbacks
- Destructure objects/arrays
- Use optional chaining
- Handle async with async/await

### Avoid:

- Using var
- Modifying prototypes
- Blocking the main thread
- Memory leaks
- Callback hell

### Best Practices:

```javascript
// Use strict equality
if (value === 42) {
} // Not ==

// Default parameters
function greet(name = "Guest") {}

// Use Set for unique values
const unique = new Set([1, 2, 2, 3]); // {1, 2, 3}

// Use Map for key-value pairs
const map = new Map([["key", "value"]]);
```

---

## Resources

### Documentation:

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [ECMAScript Spec](https://tc39.es/ecma262/)
- [JavaScript.info](https://javascript.info/)

### Tools:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Practice:

- [Codewars](https://www.codewars.com/)
- [LeetCode](https://leetcode.com/)
- [Exercism](https://exercism.io/)

---

## ES6+ Features Timeline

| Version | Year | Key Features                                    |
| ------- | ---- | ----------------------------------------------- |
| ES6     | 2015 | let/const, classes, modules, promises           |
| ES7     | 2016 | includes(), exponentiation operator             |
| ES8     | 2017 | async/await, Object.values/entries              |
| ES9     | 2018 | rest/spread for objects, finally()              |
| ES10    | 2019 | flat(), flatMap(), Object.fromEntries()         |
| ES11    | 2020 | BigInt, optional chaining, nullish coalescing   |
| ES12    | 2021 | replaceAll(), Promise.any(), logical assignment |
| ES13    | 2022 | at(), error.cause, top-level await              |

---

## Quick Reference Card

### Type Checking:

```javascript
typeof "hello"; // 'string'
typeof 42; // 'number'
typeof true; // 'boolean'
typeof {}; // 'object'
typeof []; // 'object'
typeof null; // 'object' (quirk!)
typeof undefined; // 'undefined'
typeof Symbol(); // 'symbol'
typeof 42n; // 'bigint'
```

### Type Conversion:

```javascript
String(123); // '123'
Number("123"); // 123
Boolean(1); // true
parseInt("10px"); // 10
parseFloat("3.14") + // 3.14
  "42"; // 42 (unary plus)
!!value; // Boolean conversion
```
