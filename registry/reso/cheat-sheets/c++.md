# Quick Reference Guide

A compact reference for C++ syntax, data types, and key STL features. Covers essential operators, loops, classes, and common programming patterns.

---

## Basic Syntax

### Hello World

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

### Data Types

```c
int x = 10;           // Integer
float y = 3.14;       // Floating point
double z = 3.14159;   // Double precision
char c = 'A';         // Character
bool flag = true;     // Boolean (C99+)
```

```cpp
auto x = 10;          // Type inference
int& ref = x;         // Reference
```

### Variables & Constants

```c
const int MAX = 100;  // Constant
static int count = 0; // Static variable
extern int global;    // External variable
```

```cpp
constexpr int SIZE = 100;     // Compile-time constant
constinit static int init;    // Constant initialization
```

---

## Control Flow

### If-Else

```c
if (x > 0) {
    printf("Positive\n");
} else if (x < 0) {
    printf("Negative\n");
} else {
    printf("Zero\n");
}
```

### Loops

```c
// For loop
for (int i = 0; i < 10; i++) {
    printf("%d\n", i);
}

// While loop
while (x > 0) {
    x--;
}

// Do-while loop
do {
    printf("%d\n", x);
    x++;
} while (x < 10);
```

### Switch

```c
switch (grade) {
    case 'A':
        printf("Excellent\n");
        break;
    case 'B':
        printf("Good\n");
        break;
    default:
        printf("Invalid\n");
}
```

---

## Arrays & Strings

### Arrays

```c
int arr[5] = {1, 2, 3, 4, 5};  // Declaration
arr[0] = 10;                    // Access
int size = sizeof(arr)/sizeof(arr[0]);  // Length
```

```cpp
std::array<int, 5> arr = {1, 2, 3, 4, 5};
arr.size();  // Get size
```

### Strings

```c
char str[20] = "Hello";        // Character array
char *ptr = "World";           // String literal
strcpy(str, "New");            // Copy string
strlen(str);                   // Get length
strcat(str, " World");         // Concatenate
```

```cpp
std::string s = "Hello";
s.length();                    // Get length
s.append(" World");            // Append
s.substr(0, 5);                // Substring
```

---

## Functions

### Basic Function

```c
// Function declaration
int add(int a, int b);

// Function definition
int add(int a, int b) {
    return a + b;
}

// Call function
int result = add(5, 3);
```

### Function Types

```c
// Void function
void greet() {
    printf("Hello\n");
}

// Function with pointer
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Recursive function
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

### C++ Specific

```cpp
// Function overloading
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

// Lambda function
auto square = [](int x) { return x * x; };
```

---

## Structures & Classes

### Structures (C/C++)

```c
struct Point {
    int x;
    int y;
};

struct Point p1 = {10, 20};
p1.x = 30;
```

### Classes (C++)

```cpp
class Rectangle {
private:
    int width, height;

public:
    // Constructor
    Rectangle(int w, int h) : width(w), height(h) {}

    // Method
    int area() {
        return width * height;
    }

    // Getter
    int getWidth() const { return width; }

    // Setter
    void setWidth(int w) { width = w; }
};

Rectangle rect(10, 20);
int area = rect.area();
```

---

## Pointers & Memory

### Pointers

```c
int x = 10;
int *ptr = &x;      // Pointer declaration
*ptr = 20;          // Dereference

int arr[5] = {1, 2, 3, 4, 5};
int *arrPtr = arr;  // Array to pointer decay
```

### Dynamic Memory

```c
// C style
int *ptr = (int*)malloc(sizeof(int) * 10);
free(ptr);

// C++ style
int *ptr = new int[10];
delete[] ptr;
```

### References (C++)

```cpp
int x = 10;
int &ref = x;      // Reference
ref = 20;          // Changes x
```

---

## File Handling

### File Operations

```c
FILE *file = fopen("test.txt", "w");
if (file != NULL) {
    fprintf(file, "Hello World\n");
    fclose(file);
}
```

```cpp
#include <fstream>
std::ofstream file("test.txt");
file << "Hello World" << std::endl;
file.close();
```

### Read/Write

```c
// Writing
fprintf(file, "Number: %d\n", 42);

// Reading
int num;
fscanf(file, "Number: %d\n", &num);
```

```cpp
// Writing
file << "Number: " << 42 << std::endl;

// Reading
int num;
file >> num;
```

---

## Common Functions

### Math Functions

```c
#include <math.h>

sqrt(x);      // Square root
pow(x, y);    // Power
abs(x);       // Absolute value
sin(x);       // Sine
cos(x);       // Cosine
log(x);       // Natural log
```

### String Functions

```c
#include <string.h>

strlen(s);           // String length
strcpy(dest, src);   // Copy string
strcat(dest, src);   // Concatenate
strcmp(s1, s2);      // Compare
strchr(s, 'c');      // Find character
```

### STL Containers (C++)

```cpp
#include <vector>
#include <map>
#include <set>
#include <queue>

std::vector<int> vec = {1, 2, 3};
std::map<std::string, int> scores;
std::set<int> unique;
std::queue<int> q;
```

---

## Quick Reference

### Format Specifiers

```
%d    - Integer
%f    - Float
%lf   - Double
%c    - Character
%s    - String
%p    - Pointer
%x    - Hexadecimal
```

### Operators

```
+ - * / %    // Arithmetic
++ --        // Increment/Decrement
== !=        // Relational
&& || !      // Logical
& | ^ ~      // Bitwise
<< >>        // Shift
```

### Common Errors

```c
// Segmentation fault
int *ptr = NULL;
*ptr = 10;  // ERROR!
```

```c
// Memory leak
int *ptr = new int[100];
// Forgot to delete
```

```c
// Buffer overflow
char str[10];
strcpy(str, "Very long string");  // ERROR!
```

---

## Best Practices

### Do:

- Initialize variables
- Check pointer validity
- Free allocated memory
- Use const where possible
- Add comments
- Handle errors

### Avoid:

- Using magic numbers
- Global variables
- Raw pointers (C++)
- Unbounded loops
- Memory leaks

---

## Resources

### Learning:

- [C Reference](https://en.cppreference.com/w/c)
- [C++ Reference](https://en.cppreference.com/w/cpp)
- [Learn C](https://www.learn-c.org/)
- [Learn C++](https://www.learncpp.com/)

### Tools:

- GCC/G++ Compiler
- Visual Studio Code
- CLion IDE
- GDB Debugger

---

## C vs C++ Comparison

| Feature           | C          | C++                     |
| ----------------- | ---------- | ----------------------- |
| Paradigm          | Procedural | Multi-paradigm          |
| Classes           | No         | Yes                     |
| Templates         | No         | Yes                     |
| Exceptions        | No         | Yes                     |
| STL               | No         | Yes                     |
| Memory Management | Manual     | Manual + Smart pointers |

---

## Essential Libraries

### C Standard Library:

```
stdio.h    - Input/Output
stdlib.h   - Standard functions
string.h   - String operations
math.h     - Math functions
time.h     - Time functions
ctype.h    - Character handling
```

### C++ Standard Library:

```
iostream   - Input/Output
vector     - Dynamic array
string     - String class
algorithm  - Algorithms
fstream    - File streams
memory     - Smart pointers
```
