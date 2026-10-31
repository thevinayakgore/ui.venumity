# TypeScript Complete Cheat Sheet

TypeScript is a strongly typed superset of JavaScript that adds static types, interfaces, generics, enums, type inference, and advanced type utilities. It compiles to JavaScript and helps catch errors during development instead of at runtime.

TypeScript is widely used in React, Next.js, Node.js, Angular, and large-scale frontend or backend applications. It improves code reliability, editor autocomplete, refactoring safety, and team collaboration. [258][259]

---

## 1. Installation and Setup

```bash
npm install -D typescript
```

### Initialize TypeScript

```bash
npx tsc --init
```

### Compile TypeScript

```bash
npx tsc
```

### Compile a single file

```bash
npx tsc index.ts
```

### Watch mode

```bash
npx tsc --watch
```

### Run TypeScript directly

```bash
npx tsx index.ts
```

---

## 2. Basic Types

```ts
let name: string = "Aman";
let age: number = 22;
let isActive: boolean = true;
let id: bigint = 100n;
let symbolId: symbol = Symbol("id");
let nothing: undefined = undefined;
let empty: null = null;
```

### Type inference

TypeScript can infer types automatically.

```ts
let username = "Aman";       // string
let count = 10;              // number
let isActive = true;         // boolean
```

### Explicit annotation

```ts
let username: string = "Aman";
let count: number = 10;
let isActive: boolean = true;
```

---

## 3. Arrays

```ts
const numbers: number[] =;[1][2][3]

const names: Array<string> = ["Aman", "Riya"];

const mixed: (string | number)[] = ["Aman", 22, "Riya"];
```

### Readonly array

```ts
const values: readonly number[] =;[1][2][3]

// values.push(4); // Error
```

### Tuple

A tuple has a fixed length and known types at each position.

```ts
let user: [string, number] = ["Aman", 22];

let optionalUser: [string, number?] = ["Aman"];
```

---

## 4. Objects

```ts
const user: {
  name: string;
  age: number;
  isAdmin?: boolean;
} = {
  name: "Aman",
  age: 22,
};
```

### Readonly properties

```ts
const config: {
  readonly apiUrl: string;
} = {
  apiUrl: "[https://api.example.com](https://api.example.com)",
};

// config.apiUrl = "new-url"; // Error
```

### Index signature

```ts
const scores: {
  [subject: string]: number;
} = {
  math: 90,
  science: 85,
};
```

---

## 5. `any`, `unknown`, `void`, `never`

| Type | Meaning |
|---|---|
| `any` | Disables type checking |
| `unknown` | Safe version of `any`; must be narrowed before use |
| `void` | Function returns nothing |
| `never` | Value that never occurs |
| `null` | Intentional absence of value |
| `undefined` | Value not assigned yet |

### `any`

```ts
let value: any = "hello";

value = 10;
value = true;
```

### `unknown`

```ts
let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

### `void`

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

### `never`

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

---

## 6. Functions

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

### Arrow function

```ts
const multiply = (a: number, b: number): number => a * b;
```

### Optional parameters

```ts
function greet(name: string, age?: number): string {
  return age ? `${name}, ${age}` : name;
}
```

### Default parameters

```ts
function createUser(name: string, role: string = "user") {
  return { name, role };
}
```

### Rest parameters

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}
```

### Function type

```ts
type Operation = (a: number, b: number) => number;

const subtract: Operation = (a, b) => a - b;
```

### `void` return type

```ts
const log = (message: string): void => {
  console.log(message);
};
```

### Async function

```ts
async function getUser(): Promise<User> {
  const response = await fetch("/api/user");
  return response.json();
}
```

---

## 7. Type Aliases

A type alias creates a reusable name for any type.

```ts
type ID = string | number;

type User = {
  id: ID;
  name: string;
  age: number;
};

const user: User = {
  id: "abc123",
  name: "Aman",
  age: 22,
};
```

### Union type

```ts
type Status = "active" | "inactive" | "pending";

let status: Status = "active";
```

### Intersection type

```ts
type Name = {
  name: string;
};

type Age = {
  age: number;
};

type Person = Name & Age;

const person: Person = {
  name: "Aman",
  age: 22,
};
```

---

## 8. Interfaces

An interface defines the shape of an object.

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

const user: User = {
  id: 1,
  name: "Aman",
};
```

### Interface inheritance

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: string;
}

const employee: Employee = {
  name: "Aman",
  employeeId: "EMP-1",
};
```

### Function interface

```ts
interface Calculator {
  (a: number, b: number): number;
}

const add: Calculator = (a, b) => a + b;
```

### Interface vs Type

| Feature | `interface` | `type` |
|---|---|---|
| Object shape | Yes | Yes |
| Union type | No | Yes |
| Intersection | Yes, using `extends` | Yes, using `&` |
| Declaration merging | Yes | No |
| Extending | `extends` | `&` |
| Best for | Public object contracts | Unions, primitives, computed types |

---

## 9. Literal Types

```ts
let direction: "up" | "down" | "left" | "right";

direction = "up";
```

### Literal object type

```ts
type Theme = "light" | "dark";

let theme: Theme = "dark";
```

### Numeric literal

```ts
let dice: 1 | 2 | 3 | 4 | 5 | 6;

dice = 4;
```

---

## 10. Enums

```ts
enum Status {
  Active,
  Inactive,
  Pending,
}

let status: Status = Status.Active;

console.log(status); // 0
```

### String enum

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

let role: Role = Role.Admin;
```

### Const enum

```ts
const const enum Direction {
  Up,
  Down,
}
```

### Union type instead of enum

Many modern TypeScript codebases prefer union types:

```ts
type Role = "admin" | "user" | "guest";

let role: Role = "admin";
```

---

## 11. Type Assertions

Type assertion tells TypeScript to treat a value as a specific type.

```ts
const value = "hello" as unknown as number;
```

### Common syntax

```ts
const input = document.querySelector("#name") as HTMLInputElement;

input.value = "Aman";
```

### Angle bracket syntax

```ts
const value = <string>someValue;
```

### Non-null assertion

```ts
const user = users.find((user) => user.id === 1)!;

console.log(user.name);
```

Use assertions carefully. They disable TypeScript’s ability to verify correctness.

---

## 12. Type Narrowing

Narrowing makes a broad type more specific inside conditional blocks. [264][270]

### `typeof`

```ts
function process(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

### Truthiness narrowing

```ts
function printName(name?: string) {
  if (name) {
    console.log(name.toUpperCase());
  }
}
```

### Equality narrowing

```ts
function compare(value: string | number) {
  if (value === "hello") {
    console.log(value.toUpperCase());
  }
}
```

### `in` operator

```ts
type Bird = {
  fly: () => void;
};

type Fish = {
  swim: () => void;
};

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

### `instanceof`

```ts
class Dog {
  bark() {}
}

class Cat {
  meow() {}
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

---

## 13. Type Guards

### Custom type guard

```ts
type Cat = {
  meow: () => void;
};

type Dog = {
  bark: () => void;
};

function isCat(animal: Cat | Dog): animal is Cat {
  return "meow" in animal;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow();
  } else {
    animal.bark();
  }
}
```

### Discriminated union

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;

    case "square":
      return shape.side ** 2;

    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}
```

---

## 14. Generics

Generics allow reusable, type-safe functions, interfaces, and classes. [263][267]

### Generic function

```ts
function identity<T>(value: T): T {
  return value;
}

const numberValue = identity<number>(10);
const stringValue = identity<string>("Aman");
```

### Generic arrow function

```ts
const firstElement = <T>(items: T[]): T | undefined => {
  return items;
};
```

### Generic interface

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "Aman",
  },
};
```

### Generic constraints

```ts
interface HasId {
  id: number;
}

function getById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}
```

### Multiple generics

```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const result = pair<string, number>("age", 22);
```

### Generic class

```ts
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(10);
const stringBox = new Box<string>("Hello");
```

---

## 15. Utility Types

TypeScript provides built-in utility types to transform existing types. [263][269]

| Utility Type | Purpose |
|---|---|
| `Partial<T>` | Makes all properties optional |
| `Required<T>` | Makes all properties required |
| `Readonly<T>` | Makes all properties readonly |
| `Pick<T, K>` | Selects specific properties |
| `Omit<T, K>` | Removes specific properties |
| `Record<K, V>` | Creates object with specified keys and values |
| `Exclude<T, U>` | Removes types from a union |
| `Extract<T, U>` | Keeps matching types from a union |
| `NonNullable<T>` | Removes `null` and `undefined` |
| `ReturnType<T>` | Extracts function return type |
| `Parameters<T>` | Extracts function parameter types |
| `Awaited<T>` | Unwraps Promise type |
| `InstanceType<T>` | Gets instance type of a class |

### `Partial`

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

type UpdateUser = Partial<User>;

const update: UpdateUser = {
  name: "Aman",
};
```

### `Required`

```ts
type CompleteUser = Required<User>;
```

### `Readonly`

```ts
const user: Readonly<User> = {
  id: 1,
  name: "Aman",
  age: 22,
};

// user.name = "Riya"; // Error
```

### `Pick`

```ts
type UserPreview = Pick<User, "id" | "name">;

const preview: UserPreview = {
  id: 1,
  name: "Aman",
};
```

### `Omit`

```ts
type PublicUser = Omit<User, "age">;

const publicUser: PublicUser = {
  id: 1,
  name: "Aman",
};
```

### `Record`

```ts
const scores: Record<string, number> = {
  math: 90,
  science: 85,
};
```

### `Exclude`

```ts
type Status = "active" | "inactive" | "pending";

type ActiveStatus = Exclude<Status, "inactive" | "pending">;
// "active"
```

### `Extract`

```ts
type Allowed = Extract<"a" | "b" | "c", "a" | "c">;
// "a" | "c"
```

### `NonNullable`

```ts
type Value = string | null | undefined;

type SafeValue = NonNullable<Value>;
// string
```

### `ReturnType`

```ts
function getUser() {
  return {
    id: 1,
    name: "Aman",
  };
}

type User = ReturnType<typeof getUser>;
```

### `Parameters`

```ts
function createUser(name: string, age: number) {}

type CreateUserArgs = Parameters<typeof createUser>;
// [name: string, age: number]
```

### `Awaited`

```ts
async function fetchData(): Promise<User> {
  return Promise.resolve({
    id: 1,
    name: "Aman",
    age: 22,
  });
}

type UserData = Awaited<ReturnType<typeof fetchData>>;
```

---

## 16. Mapped Types

```ts
type User = {
  id: number;
  name: string;
};

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
```

### Optional mapped type

```ts
type OptionalUser = {
  [K in keyof User]?: User[K];
};
```

### Custom mapped type

```ts
type BooleanProperties<T> = {
  [K in keyof T]: boolean;
};
```

---

## 17. Conditional Types

```ts
type IsString<T> = T extends string ? true : false;

type Result1 = IsString<string>; // true
type Result2 = IsString<number>; // false
```

### Conditional type with `infer`

```ts
type ElementType<T> = T extends Array<infer U> ? U : never;

type ItemType = ElementType<string[]>; // string
```

### Unwrap Promise

```ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type UserType = UnwrapPromise<Promise<User>>; // User
```

---

## 18. Template Literal Types

```ts
type World = "world";

type Greeting = `hello ${World}`;
// "hello world"
```

### Union in template literal

```ts
type Language = "en" | "hi";
type Page = "home" | "about";

type Route = `/${Language}/${Page}`;
```

### Built-in string utilities

| Utility Type | Example |
|---|---|
| `Uppercase<T>` | `"hello"` → `"HELLO"` |
| `Lowercase<T>` | `"HELLO"` → `"hello"` |
| `Capitalize<T>` | `"hello"` → `"Hello"` |
| `Uncapitalize<T>` | `"Hello"` → `"hello"` |

---

## 19. Classes in TypeScript

```ts
class User {
  private id: number;
  public name: string;
  protected role: string;

  constructor(id: number, name: string, role: string) {
    this.id = id;
    this.name = name;
    this.role = role;
  }

  getDetails(): string {
    return `${this.id} - ${this.name}`;
  }
}
```

### Parameter properties

```ts
class User {
  constructor(
    private id: number,
    public name: string,
    protected role: string
  ) {}
}
```

### Inheritance

```ts
class Animal {
  constructor(public name: string) {}

  speak(): void {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak(): void {
    console.log(`${this.name} barks`);
  }
}
```

### Abstract class

```ts
abstract class Shape {
  abstract area(): number;

  describe(): string {
    return `Area: ${this.area()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

### Implementing interfaces

```ts
interface Serializable {
  serialize(): string;
}

class User implements Serializable {
  constructor(public name: string) {}

  serialize(): string {
    return JSON.stringify(this);
  }
}
```

---

## 20. Access Modifiers

| Modifier | Access |
|---|---|
| `public` | Anywhere |
| `private` | Only inside the class |
| `protected` | Inside class and subclasses |
| `readonly` | Cannot be reassigned after initialization |

```ts
class Product {
  public name: string;
  private price: number;
  protected category: string;
  readonly id: number;

  constructor(id: number, name: string, price: number, category: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }
}
```

---

## 21. Modules

### Export

```ts
// utils.ts

export const PI = 3.14159;

export function add(a: number, b: number): number {
  return a + b;
}

export default function multiply(a: number, b: number): number {
  return a * b;
}
```

### Import

```ts
// main.ts

import multiply, { PI, add } from "./utils";

console.log(PI);
console.log(add(2, 3));
console.log(multiply(2, 3));
```

### Type-only imports

```ts
import type { User } from "./types";
```

### Re-export

```ts
export { User } from "./types";
export type { ApiResponse } from "./types";
```

---

## 22. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### Important compiler options

| Option | Purpose |
|---|---|
| `target` | JavaScript version output |
| `module` | Module system |
| `strict` | Enables strict type checking |
| `noImplicitAny` | Prevents implicit `any` |
| `strictNullChecks` | Enforces null and undefined checks |
| `outDir` | Output folder |
| `rootDir` | Source folder |
| `esModuleInterop` | Improves CommonJS compatibility |

---

## 23. React + TypeScript

### Component props

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button({
  label,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### useState

```tsx
import { useState } from "react";

const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```

### useEffect

```tsx
import { useEffect, useState } from "react";

useEffect(() => {
  async function fetchUser() {
    const response = await fetch("/api/user");
    const data: User = await response.json();

    setUser(data);
  }

  fetchUser();
}, []);
```

### Event types

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}

function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log("Clicked");
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}
```

### Generic component

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
```

---

## 24. Common Interview Questions

### 1. What is TypeScript?

TypeScript is a strongly typed superset of JavaScript that adds static types and compiles to JavaScript.

### 2. What are the benefits of TypeScript?

It catches errors early, improves autocomplete, makes refactoring safer, documents code through types, and scales better in large projects.

### 3. What is type inference?

Type inference is TypeScript’s ability to determine a variable’s type automatically from its assigned value.

### 4. What is the difference between `interface` and `type`?

`interface` is mainly used for object shapes and supports declaration merging. `type` supports unions, intersections, primitives, mapped types, and conditional types.

### 5. What is a union type?

A union type allows a value to be one of several types.

```ts
type ID = string | number;
```

### 6. What is an intersection type?

An intersection type combines multiple types into one.

```ts
type A = { name: string };
type B = { age: number };

type Person = A & B;
```

### 7. What is a generic?

A generic allows functions, classes, and interfaces to work with multiple types while preserving type safety.

### 8. What is `unknown`?

`unknown` is a safe alternative to `any`. You must narrow it before using type-specific operations.

### 9. What is `any`?

`any` disables type checking for a value. Avoid using it unless necessary.

### 10. What is `never`?

`never` represents a value that never occurs, such as a function that always throws or an impossible type after exhaustive checks.

### 11. What is type narrowing?

Type narrowing makes a broad type more specific using checks such as `typeof`, `instanceof`, `in`, equality checks, or custom type guards. [264][270]

### 12. What is a type guard?

A type guard is a check that narrows a value’s type within a conditional block. [264][270]

### 13. What is a discriminated union?

A discriminated union uses a common literal property, often called `kind` or `type`, to identify which variant of a union is being used.

### 14. What are utility types?

Utility types are built-in generic types that transform existing types, such as `Partial`, `Pick`, `Omit`, `Record`, and `ReturnType`. [263][269]

### 15. What is `Partial<T>`?

`Partial<T>` makes all properties of `T` optional.

### 16. What is `Pick<T, K>`?

`Pick<T, K>` creates a new type using only selected properties from `T`.

### 17. What is `Omit<T, K>`?

`Omit<T, K>` creates a new type by removing selected properties from `T`.

### 18. What is `Record<K, V>`?

`Record<K, V>` creates an object type with keys of type `K` and values of type `V`.

### 19. What is a tuple?

A tuple is an array with a fixed length and specific types at each position.

```ts
let user: [string, number] = ["Aman", 22];
```

### 20. What is an enum?

An enum defines named constants. Modern TypeScript often uses union literal types instead.

### 21. What is type assertion?

Type assertion tells TypeScript to treat a value as a specific type.

```ts
const value = someValue as string;
```

### 22. What is the difference between `interface` merging and type alias?

Interfaces with the same name merge automatically. Type aliases with the same name cause an error.

### 23. What is `readonly`?

`readonly` prevents reassignment of a property after initialization.

### 24. What is `as const`?

`as const` makes a value deeply readonly and infers literal types.

```ts
const config = {
  theme: "dark",
  version: 1,
} as const;
```

### 25. What is strict mode?

Strict mode enables stricter type-checking options, including `strictNullChecks` and `noImplicitAny`.

---

## 25. Senior-Level Interview Questions

### 1. How does TypeScript work?

TypeScript performs static type checking during development and compilation, then emits JavaScript code that browsers or Node.js execute.

### 2. What is structural typing?

TypeScript checks compatibility based on shape, not explicit inheritance. If an object has the required properties and types, it satisfies the type.

### 3. What is declaration merging?

Interfaces with the same name automatically merge their members.

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```

### 4. What are conditional types?

Conditional types choose a type based on a condition.

```ts
type IsString<T> = T extends string ? true : false;
```

### 5. What is `infer`?

`infer` extracts a type from another type inside a conditional type.

```ts
type ElementType<T> = T extends Array<infer U> ? U : never;
```

### 6. What is a mapped type?

A mapped type creates a new type by transforming each property of an existing type.

```ts
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
```

### 7. What is `keyof`?

`keyof` creates a union of an object type’s keys.

```ts
type UserKeys = keyof User;
```

### 8. What is `typeof` in TypeScript?

`typeof` extracts the type of a variable or function.

```ts
const user = { name: "Aman" };

type UserType = typeof user;
```

### 9. What is `satisfies`?

`satisfies` checks that a value matches a type while preserving its inferred literal type.

```ts
const config = {
  theme: "dark",
} satisfies Record<string, string>;
```

### 10. How would you type an API response?

Use a generic response type.

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

type UsersResponse = ApiResponse<User[]>;
```

---

## 26. Best Practices

- Enable `"strict": true`.
- Avoid `any`; prefer `unknown`.
- Use `interface` for object contracts.
- Use `type` for unions, intersections, and utility types.
- Prefer union literal types over enums when possible.
- Use generics for reusable logic.
- Use `readonly` for values that should not change.
- Use discriminated unions for complex state.
- Avoid unnecessary type assertions.
- Use `unknown` instead of `any` for external data.
- Type API responses and component props.
- Keep types close to the code that uses them.
- Use `import type` for type-only imports.
- Let TypeScript infer simple types.
- Use utility types before writing custom types.

---

## Summary

TypeScript makes JavaScript safer and more maintainable by adding static types, interfaces, generics, narrowing, utility types, and advanced type-level programming. It is especially valuable in large React, Next.js, and Node.js codebases. [258][259]

For beginners, focus on basic types, arrays, objects, functions, interfaces, type aliases, unions, and generics. For interviews, focus on `any` vs `unknown`, interfaces vs types, generics, narrowing, type guards, discriminated unions, mapped types, conditional types, and utility types.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to the official TypeScript documentation for detailed and current guidance.