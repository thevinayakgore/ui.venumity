# Static Typing for JavaScript

An at-a-glance reference for TypeScript types, interfaces, and generics. Covers core language features, type annotations, and common patterns.

---

## Basic Types

### Primitives

```typescript
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
let unique: symbol = Symbol("id");
let big: bigint = 100n;
```

### Type Inference

```typescript
let inferredString = "Hello"; // Type: string
let inferredNumber = 42; // Type: number
let inferredArray = [1, 2, 3]; // Type: number[]
```

### Type Annotations

```typescript
// Explicit typing
let score: number = 100;

// Union types
let id: string | number = 123;

// Literal types
let direction: "north" | "south" | "east" | "west";
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;

// Tuple
let person: [string, number] = ["John", 30];
```

---

## Object Types

### Interfaces

```typescript
interface User {
  readonly id: number; // Read-only property
  name: string;
  age?: number; // Optional property
  email: string;

  // Method signature
  greet(): string;

  // Index signature
  [key: string]: any;
}

// Implementing interface
const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  greet() {
    return `Hello, ${this.name}`;
  },
};
```

### Type Aliases

```typescript
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

type Callback = (data: string) => void;

type Pair<T> = [T, T];
```

### Differences

```typescript
// Interface can be extended
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type alias can use unions
type Status = "success" | "error" | "loading";
```

---

## Functions

### Function Types

```typescript
// Function declaration
function add(x: number, y: number): number {
  return x + y;
}

// Arrow function
const multiply = (x: number, y: number): number => x * y;

// Optional parameters
function greet(name: string, title?: string): string {
  return title ? `Hello, ${title} ${name}` : `Hello, ${name}`;
}

// Default parameters
function createUser(name: string, isAdmin: boolean = false) {
  return { name, isAdmin };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

### Function Overloads

```typescript
function process(data: string): string;
function process(data: number): number;
function process(data: string | number): string | number {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  return data * 2;
}
```

---

## Classes

### Basic Class

```typescript
class Person {
  // Properties
  name: string;
  private age: number;
  protected email: string;
  readonly id: number;

  // Static property
  static species = "Human";

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.email = "";
    this.id = Date.now();
  }

  // Method
  greet(): string {
    return `Hello, ${this.name}`;
  }

  // Getter
  get isAdult(): boolean {
    return this.age >= 18;
  }

  // Setter
  set updateEmail(value: string) {
    this.email = value;
  }

  // Static method
  static createAnonymous(): Person {
    return new Person("Anonymous", 0);
  }
}
```

### Inheritance

```typescript
class Employee extends Person {
  department: string;

  constructor(name: string, age: number, department: string) {
    super(name, age);
    this.department = department;
  }

  // Override method
  override greet(): string {
    return `${super.greet()} from ${this.department}`;
  }
}
```

### Access Modifiers

```typescript
class Example {
  public publicProp = "accessible everywhere";
  private privateProp = "only within class";
  protected protectedProp = "class and subclasses";
  #privateField = "ECMAScript private field";
}
```

---

## Generics

### Basic Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface Box<T> {
  value: T;
}

// Generic class
class Container<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}
```

### Constraints

```typescript
// Constraint with extends
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Multiple constraints
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

// Default type parameters
function createArray<T = string>(length: number): T[] {
  return new Array(length);
}
```

### Utility Types

```typescript
type PartialUser = Partial<User>; // All optional
type RequiredUser = Required<User>; // All required
type ReadonlyUser = Readonly<User>; // Readonly
type UserNames = Pick<User, "name" | "email">; // Pick properties
type UserWithoutId = Omit<User, "id">; // Omit properties
type Nullable<T> = T | null; // Custom utility
```

---

## Advanced Types

### Union & Intersection

```typescript
// Union type
type Status = "success" | "error" | "loading";

// Intersection type
type Admin = User & { permissions: string[] };

// Type guard
function isString(value: any): value is string {
  return typeof value === "string";
}
```

### Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;
type StringOrNumber<T> = T extends string ? string : number;

// Infer keyword
type ElementType<T> = T extends Array<infer U> ? U : never;
```

### keyof & typeof

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"

const user = { name: "John", age: 30 };
type UserType = typeof user; // { name: string; age: number }

// Indexed access
type UserName = User["name"]; // string
```

---

## Type Assertions

### Type Assertions

```typescript
// Angle bracket syntax
let value: any = "hello";
let strLength: number = (<string>value).length;

// As syntax
let strLength2: number = (value as string).length;

// Non-null assertion
function getElement(id: string): HTMLElement {
  return document.getElementById(id)!;
}

// Const assertion
const config = {
  api: "https://api.example.com",
  timeout: 5000,
} as const;
```

### Type Guards

```typescript
// typeof guard
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + value;
  }
  return padding + value;
}

// instanceof guard
function processError(error: Error | string) {
  if (error instanceof Error) {
    return error.message;
  }
  return error;
}

// Custom type guard
interface Bird {
  fly(): void;
}

function isBird(pet: any): pet is Bird {
  return (pet as Bird).fly !== undefined;
}
```

---

## Modules

### Export

```typescript
// Named exports
export const PI = 3.14159;
export function calculateArea(radius: number): number {
  return PI * radius * radius;
}
export interface Circle {
  radius: number;
}

// Default export
export default class Calculator {
  // ...
}

// Re-export
export { PI, calculateArea } from "./math";
```

### Import

```typescript
// Named imports
import { PI, calculateArea } from "./math";

// Default import
import Calculator from "./calculator";

// Import everything
import * as Math from "./math";

// Type-only imports
import type { User } from "./types";

// Dynamic import
const module = await import("./math");
```

---

## Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Strict Mode Flags

```json
{
  "compilerOptions": {
    "strict": true, // Enables all strict options

    // Individual strict options
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true
  }
}
```

---

## Decorators

### Class Decorators

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}
```

### Method Decorators

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(x: number, y: number): number {
    return x + y;
  }
}
```

---

## Utility Types

### Common Utilities

```typescript
// Partial - Make all properties optional
type PartialUser = Partial<User>;

// Required - Make all properties required
type RequiredUser = Required<User>;

// Readonly - Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Record - Create object type with specific keys
type Pages = Record<string, { title: string; content: string }>;

// Pick - Select properties
type UserPreview = Pick<User, "id" | "name">;

// Omit - Exclude properties
type UserWithoutId = Omit<User, "id">;

// Exclude - Exclude types from union
type NonString = Exclude<string | number | boolean, string>;

// Extract - Extract types from union
type StringsOnly = Extract<string | number | boolean, string>;

// NonNullable - Exclude null and undefined
type NoNulls = NonNullable<string | null | undefined>;
```

### ReturnType & Parameters

```typescript
function getUser(id: number): User {
  return { id, name: "John" };
}

type UserReturn = ReturnType<typeof getUser>; // User
type UserParams = Parameters<typeof getUser>; // [number]
```

---

## Error Handling

### Try-Catch

```typescript
try {
  // Risky operation
  const data = JSON.parse(jsonString);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("Invalid JSON:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
} finally {
  console.log("Cleanup");
}
```

### Custom Errors

```typescript
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateUser(user: User) {
  if (!user.name) {
    throw new ValidationError("Name is required", "name");
  }
}
```

---

## Best Practices

### Do:

- Use strict mode
- Enable noImplicitAny
- Use interfaces for objects
- Prefer const over let
- Use readonly where possible
- Add type annotations for complex functions
- Use generic constraints
- Handle undefined/null properly

### Avoid:

- Using any type
- Type assertions without validation
- Overusing type assertions
- Mixing null and undefined
- Complex type logic
- Ignoring compiler warnings

### Type Design:

```typescript
// Use union types for states
type LoadingState = { state: "loading" };
type SuccessState = { state: "success"; data: string };
type ErrorState = { state: "error"; error: Error };
type State = LoadingState | SuccessState | ErrorState;

// Use discriminated unions
function handleState(state: State) {
  switch (state.state) {
    case "loading":
      return "Loading...";
    case "success":
      return state.data;
    case "error":
      return state.error.message;
  }
}
```

---

## Resources

### Learning:

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [TypeScript Exercises](https://typescript-exercises.github.io/)

### Tools:

- [TypeScript Playground](https://www.typescriptlang.org/play)
- [ts-node](https://typestrong.org/ts-node/) - Run TypeScript directly
- [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html) - TypeScript compiler

### Advanced:

- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Utility Types Source](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)

---

## TypeScript vs JavaScript

| Feature         | JavaScript  | TypeScript              |
| --------------- | ----------- | ----------------------- |
| Typing          | Dynamic     | Static                  |
| Compilation     | Interpreted | Compiled to JS          |
| Type Safety     | Runtime     | Compile-time            |
| Tooling         | Basic       | Advanced (IntelliSense) |
| Learning Curve  | Easy        | Moderate                |
| Error Detection | Runtime     | Compile-time            |

---

## Quick Reference

### Type Declarations:

```typescript
let str: string = "text";
let num: number = 42;
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let tuple: [string, number] = ["text", 1];
let anyValue: any = "anything";
let unknownValue: unknown; // Safer than any
let neverValue: never; // For functions that never return
```

### Type Operators:

```typescript
typeof value    // Type query
keyof T         // Keys of type T
T[K]            // Property access type
T extends U ? X : Y  // Conditional type
infer U         // Type inference in conditional types
```
