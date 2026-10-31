# C++ Complete Cheat Sheet

C++ is a high-performance, general-purpose programming language used for system programming, game development, embedded systems, competitive programming, and performance-critical applications. It supports procedural, object-oriented, and generic programming.

Modern C++ emphasizes RAII, smart pointers, STL containers, algorithms, templates, lambdas, and move semantics. The C++ Standard Library provides containers, iterators, algorithms, strings, smart pointers, I/O, and concurrency utilities. [230][234]

---

## 1. Basic Program

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}
```

### Compile and run

```bash
g++ main.cpp -o app
./app
```

### With C++ standard

```bash
g++ -std=c++20 main.cpp -o app
./app
```

---

## 2. Comments

```cpp
// Single-line comment

/*
Multi-line
comment
*/
```

---

## 3. Data Types

| Type | Example | Size, typical |
|---|---|---|
| `int` | `int age = 25;` | 4 bytes |
| `float` | `float price = 10.5f;` | 4 bytes |
| `double` | `double value = 10.5;` | 8 bytes |
| `char` | `char grade = 'A';` | 1 byte |
| `bool` | `bool isActive = true;` | 1 byte |
| `long long` | `long long big = 10000000000LL;` | 8 bytes |
| `unsigned int` | `unsigned int count = 10;` | 4 bytes |
| `std::string` | `std::string name = "Aman";` | Dynamic |

### Type modifiers

```cpp
short int smallNumber;
long int largeNumber;
long long int veryLargeNumber;
unsigned int positiveOnly;
signed int negativeAllowed;
```

### Type sizes

```cpp
#include <iostream>

int main() {
    std::cout << sizeof(int) << "\n";
    std::cout << sizeof(double) << "\n";
    std::cout << sizeof(char) << "\n";
}
```

---

## 4. Variables and Constants

```cpp
int age = 25;
double price = 99.99;
char grade = 'A';
bool isActive = true;

const double PI = 3.14159;
constexpr int MAX_USERS = 100;
```

### `const` vs `constexpr`

```cpp
const int a = 10;       // Runtime or compile-time constant
constexpr int b = 20;   // Compile-time constant
```

---

## 5. Input and Output

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name;
    int age;

    std::cout << "Enter name: ";
    std::cin >> name;

    std::cout << "Enter age: ";
    std::cin >> age;

    std::cout << "Name: " << name << ", Age: " << age << "\n";

    return 0;
}
```

### Read full line

```cpp
std::string line;
std::getline(std::cin, line);
```

---

## 6. Operators

### Arithmetic operators

```cpp
int a = 10, b = 3;

int sum = a + b;
int difference = a - b;
int product = a * b;
int quotient = a / b;
int remainder = a % b;
```

### Assignment operators

```cpp
int x = 10;

x += 5;  // x = x + 5
x -= 3;  // x = x - 3
x *= 2;  // x = x * 2
x /= 4;  // x = x / 4
x %= 3;  // x = x % 3
```

### Comparison operators

```cpp
a == b
a != b
a > b
a < b
a >= b
a <= b
```

### Logical operators

```cpp
bool result = (a > 5 && b < 10);
bool result2 = (a > 5 || b < 2);
bool result3 = !(a > 5);
```

### Increment and decrement

```cpp
int i = 5;

i++;  // Post-increment
++i;  // Pre-increment
i--;  // Post-decrement
--i;  // Pre-decrement
```

---

## 7. Conditional Statements

### if / else if / else

```cpp
int score = 85;

if (score >= 90) {
    std::cout << "Grade A";
} else if (score >= 80) {
    std::cout << "Grade B";
} else {
    std::cout << "Grade C";
}
```

### Ternary operator

```cpp
int number = 10;
std::string result = number % 2 == 0 ? "Even" : "Odd";
```

### switch

```cpp
int day = 3;

switch (day) {
    case 1:
        std::cout << "Monday";
        break;
    case 2:
        std::cout << "Tuesday";
        break;
    default:
        std::cout << "Invalid day";
}
```

---

## 8. Loops

### for loop

```cpp
for (int i = 0; i < 5; i++) {
    std::cout << i << "\n";
}
```

### while loop

```cpp
int i = 0;

while (i < 5) {
    std::cout << i << "\n";
    i++;
}
```

### do-while loop

```cpp
int i = 0;

do {
    std::cout << i << "\n";
    i++;
} while (i < 5);
```

### Range-based for loop

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

for (int number : numbers) {
    std::cout << number << "\n";
}
```

### Loop control

```cpp
for (int i = 0; i < 10; i++) {
    if (i == 3) continue;  // Skip current iteration
    if (i == 7) break;     // Exit loop

    std::cout << i << "\n";
}
```

---

## 9. Functions

### Basic function

```cpp
int add(int a, int b) {
    return a + b;
}

int main() {
    std::cout << add(2, 3);
}
```

### Function with default argument

```cpp
int power(int base, int exponent = 2) {
    int result = 1;

    for (int i = 0; i < exponent; i++) {
        result *= base;
    }

    return result;
}
```

### Function overloading

```cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}
```

### Pass by value

```cpp
void changeValue(int x) {
    x = 100;  // Does not affect original variable
}
```

### Pass by reference

```cpp
void changeValue(int &x) {
    x = 100;  // Affects original variable
}
```

### Pass by pointer

```cpp
void changeValue(int *x) {
    *x = 100;
}
```

---

## 10. Arrays

### Static array

```cpp
int numbers = {1, 2, 3, 4, 5};

std::cout << numbers;
std::cout << numbers;
```

### Array size

```cpp
int arr[] = {10, 20, 30};
int size = sizeof(arr) / sizeof(arr);
```

### 2D array

```cpp
int matrix = {
    {1, 2, 3},
    {4, 5, 6}
};
```

---

## 11. Strings

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name = "C++";

    name += " Programming";
    std::cout << name << "\n";

    std::cout << name.length() << "\n";
    std::cout << name.substr(0, 3) << "\n";
    std::cout << name.find("Programming") << "\n";

    return 0;
}
```

### Common string methods

| Method | Example |
|---|---|
| `length()` | `s.length()` |
| `size()` | `s.size()` |
| `empty()` | `s.empty()` |
| `substr()` | `s.substr(0, 3)` |
| `find()` | `s.find("abc")` |
| `append()` | `s.append("xyz")` |
| `push_back()` | `s.push_back('a')` |
| `pop_back()` | `s.pop_back()` |
| `c_str()` | `s.c_str()` |

---

## 12. Pointers

```cpp
int number = 10;
int *ptr = &number;

std::cout << number << "\n";   // 10
std::cout << &number << "\n";  // Address
std::cout << ptr << "\n";      // Address
std::cout << *ptr << "\n";     // 10
```

### Null pointer

```cpp
int *ptr = nullptr;

if (ptr != nullptr) {
    std::cout << *ptr;
}
```

### Pointer arithmetic

```cpp
int arr[] = {10, 20, 30};
int *ptr = arr;

std::cout << *ptr << "\n";       // 10
std::cout << *(ptr + 1) << "\n"; // 20
```

---

## 13. References

```cpp
int number = 10;
int &ref = number;

ref = 20;

std::cout << number;  // 20
```

### Reference vs pointer

| Reference | Pointer |
|---|---|
| Must be initialized | Can be null |
| Cannot be reassigned | Can be reassigned |
| No pointer arithmetic | Supports pointer arithmetic |
| Cleaner syntax | More flexible |

---

## 14. Dynamic Memory

### Raw pointers

```cpp
int *ptr = new int(10);

std::cout << *ptr;

delete ptr;
```

### Dynamic array

```cpp
int *arr = new int;

arr = 10;

delete[] arr;
```

### Prefer smart pointers

Modern C++ recommends smart pointers over raw `new` and `delete` because they automatically manage object lifetime and help prevent memory leaks. [232]

```cpp
#include <memory>

auto unique = std::make_unique<int>(10);
auto shared = std::make_shared<int>(20);
```

---

## 15. Smart Pointers

### `unique_ptr`

Single ownership. Cannot be copied.

```cpp
#include <memory>
#include <iostream>

int main() {
    auto ptr = std::make_unique<int>(10);

    std::cout << *ptr << "\n";

    return 0;
}
```

### `shared_ptr`

Shared ownership. Reference count decreases when owners are destroyed.

```cpp
#include <memory>
#include <iostream>

int main() {
    auto ptr1 = std::make_shared<int>(10);
    auto ptr2 = ptr1;

    std::cout << ptr1.use_count() << "\n";  // 2

    return 0;
}
```

### `weak_ptr`

Non-owning reference to a `shared_ptr`.

```cpp
#include <memory>

int main() {
    auto shared = std::make_shared<int>(10);
    std::weak_ptr<int> weak = shared;

    if (auto locked = weak.lock()) {
        int value = *locked;
    }

    return 0;
}
```

| Smart Pointer | Ownership | Copyable | Use |
|---|---|---|---|
| `unique_ptr` | Single owner | No | Default choice |
| `shared_ptr` | Shared owner | Yes | Multiple owners |
| `weak_ptr` | Non-owning | Yes | Break circular references |

---

## 16. Classes and Objects

```cpp
#include <iostream>
#include <string>

class Student {
private:
    std::string name;
    int age;

public:
    Student(std::string name, int age) {
        this->name = name;
        this->age = age;
    }

    void display() {
        std::cout << name << " - " << age << "\n";
    }
};

int main() {
    Student student("Aman", 22);
    student.display();

    return 0;
}
```

### Access specifiers

| Specifier | Meaning |
|---|---|
| `private` | Accessible only inside the class |
| `public` | Accessible from anywhere |
| `protected` | Accessible inside class and derived classes |

---

## 17. Constructors and Destructors

```cpp
class Student {
private:
    std::string name;

public:
    Student() {
        name = "Unknown";
    }

    Student(std::string name) {
        this->name = name;
    }

    Student(const Student &other) {
        name = other.name;
    }

    ~Student() {
        std::cout << "Destructor called\n";
    }
};
```

### Constructor types

| Constructor | Purpose |
|---|---|
| Default constructor | Creates object without arguments |
| Parameterized constructor | Creates object with arguments |
| Copy constructor | Copies one object to another |
| Move constructor | Transfers resources from another object |
| Destructor | Cleans up when object is destroyed |

---

## 18. Inheritance

```cpp
class Animal {
public:
    void eat() {
        std::cout << "Eating\n";
    }
};

class Dog : public Animal {
public:
    void bark() {
        std::cout << "Barking\n";
    }
};

int main() {
    Dog dog;
    dog.eat();
    dog.bark();
}
```

### Inheritance types

| Type | Meaning |
|---|---|
| `public` | Public and protected members retain access levels |
| `protected` | Public and protected become protected |
| `private` | Public and protected become private |

---

## 19. Polymorphism

### Function overriding

```cpp
class Animal {
public:
    virtual void speak() {
        std::cout << "Animal sound\n";
    }

    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void speak() override {
        std::cout << "Woof\n";
    }
};

int main() {
    Animal *animal = new Dog();
    animal->speak();  // Woof

    delete animal;
}
```

### Pure virtual function

```cpp
class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double radius) : radius(radius) {}

    double area() const override {
        return 3.14159 * radius * radius;
    }
};
```

---

## 20. Encapsulation and Abstraction

```cpp
class BankAccount {
private:
    double balance;

public:
    BankAccount() : balance(0) {}

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    double getBalance() const {
        return balance;
    }
};
```

- **Encapsulation:** Hide internal data using `private`.
- **Abstraction:** Expose only necessary behavior through public methods.

---

## 21. Static Members

```cpp
class Counter {
public:
    static int count;

    Counter() {
        count++;
    }

    static int getCount() {
        return count;
    }
};

int Counter::count = 0;

int main() {
    Counter a;
    Counter b;
    Counter c;

    std::cout << Counter::getCount();  // 3
}
```

---

## 22. Templates

### Function template

```cpp
template <typename T>
T add(T a, T b) {
    return a + b;
}

int main() {
    std::cout << add(2, 3) << "\n";
    std::cout << add(2.5, 3.5) << "\n";
}
```

### Class template

```cpp
template <typename T>
class Box {
private:
    T value;

public:
    Box(T value) : value(value) {}

    T getValue() {
        return value;
    }
};

int main() {
    Box<int> intBox(10);
    Box<std::string> stringBox("Hello");

    std::cout << intBox.getValue() << "\n";
    std::cout << stringBox.getValue() << "\n";
}
```

Templates allow generic, type-safe code for functions and classes. [234]

---

## 23. STL Containers

The C++ Standard Library provides type-safe containers such as `vector`, `list`, `map`, `set`, and `unordered_map`. [231]

### `vector`

Dynamic array.

```cpp
#include <vector>

std::vector<int> v = {1, 2, 3};

v.push_back(4);
v.pop_back();
v.insert(v.begin(), 0);
v.erase(v.begin());

std::cout << v.size();
std::cout << v;
std::cout << v.at(0);
```

### `array`

Fixed-size array.

```cpp
#include <array>

std::array<int, 5> arr = {1, 2, 3, 4, 5};

std::cout << arr.size();
std::cout << arr;
```

### `list`

Doubly linked list.

```cpp
#include <list>

std::list<int> l = {1, 2, 3};

l.push_back(4);
l.push_front(0);
l.remove(2);
```

### `deque`

Double-ended queue.

```cpp
#include <deque>

std::deque<int> dq = {1, 2, 3};

dq.push_front(0);
dq.push_back(4);
dq.pop_front();
dq.pop_back();
```

### `stack`

LIFO container.

```cpp
#include <stack>

std::stack<int> s;

s.push(1);
s.push(2);
s.push(3);

std::cout << s.top();
s.pop();
```

### `queue`

FIFO container.

```cpp
#include <queue>

std::queue<int> q;

q.push(1);
q.push(2);
q.push(3);

std::cout << q.front();
q.pop();
```

### `priority_queue`

Max heap by default.

```cpp
#include <queue>

std::priority_queue<int> pq;

pq.push(10);
pq.push(30);
pq.push(20);

std::cout << pq.top();  // 30
pq.pop();
```

### Min heap

```cpp
#include <queue>
#include <vector>

std::priority_queue<
    int,
    std::vector<int>,
    std::greater<int>
> minHeap;

minHeap.push(30);
minHeap.push(10);
minHeap.push(20);

std::cout << minHeap.top();  // 10
```

### `set`

Sorted unique values.

```cpp
#include <set>

std::set<int> s = {3, 1, 2};

s.insert(4);
s.erase(2);

if (s.count(3)) {
    std::cout << "Found";
}
```

### `unordered_set`

Hash-based unique values.

```cpp
#include <unordered_set>

std::unordered_set<int> us = {1, 2, 3};

us.insert(4);

if (us.find(3) != us.end()) {
    std::cout << "Found";
}
```

### `map`

Sorted key-value pairs.

```cpp
#include <map>
#include <string>

std::map<std::string, int> ages;

ages["Aman"] = 22;
ages["Riya"] = 20;

std::cout << ages["Aman"];
```

### `unordered_map`

Hash-based key-value pairs.

```cpp
#include <unordered_map>
#include <string>

std::unordered_map<std::string, int> scores;

scores["math"] = 90;
scores["science"] = 85;

if (scores.count("math")) {
    std::cout << scores["math"];
}
```

### Container comparison

| Container | Order | Duplicate Values | Typical Lookup |
|---|---|---|---|
| `vector` | Insertion order | Yes | Index access |
| `list` | Insertion order | Yes | Sequential |
| `set` | Sorted | No | `O(log n)` |
| `unordered_set` | No order | No | Average `O(1)` |
| `map` | Sorted by key | Unique keys | `O(log n)` |
| `unordered_map` | No order | Unique keys | Average `O(1)` |

---

## 24. Iterators

```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3};

    for (auto it = v.begin(); it != v.end(); ++it) {
        std::cout << *it << "\n";
    }

    return 0;
}
```

### Reverse iterator

```cpp
for (auto it = v.rbegin(); it != v.rend(); ++it) {
    std::cout << *it << "\n";
}
```

---

## 25. STL Algorithms

The algorithms library provides functions for searching, sorting, counting, and manipulating ranges. [233]

### Sort

```cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {5, 2, 8, 1};

std::sort(v.begin(), v.end());
```

### Sort descending

```cpp
std::sort(v.begin(), v.end(), std::greater<int>());
```

### Reverse

```cpp
std::reverse(v.begin(), v.end());
```

### Find

```cpp
auto it = std::find(v.begin(), v.end(), 3);

if (it != v.end()) {
    std::cout << "Found";
}
```

### Count

```cpp
int count = std::count(v.begin(), v.end(), 3);
```

### Max and min

```cpp
auto maxValue = *std::max_element(v.begin(), v.end());
auto minValue = *std::min_element(v.begin(), v.end());
```

### Sum

```cpp
#include <numeric>

int sum = std::accumulate(v.begin(), v.end(), 0);
```

### Remove duplicates

```cpp
std::sort(v.begin(), v.end());
v.erase(std::unique(v.begin(), v.end()), v.end());
```

### Transform

```cpp
std::vector<int> result(v.size());

std::transform(
    v.begin(),
    v.end(),
    result.begin(),
    [](int x) {
        return x * 2;
    }
);
```

---

## 26. Lambda Functions

```cpp
auto add = [](int a, int b) {
    return a + b;
};

std::cout << add(2, 3);
```

### Capture variables

```cpp
int factor = 3;

auto multiply = [factor](int x) {
    return x * factor;
};
```

### Capture by reference

```cpp
int counter = 0;

auto increment = [&counter]() {
    counter++;
};
```

### Lambda syntax

```cpp
[capture](parameters) -> return_type {
    body
}
```

---

## 27. Pairs and Tuples

### Pair

```cpp
#include <utility>

std::pair<int, std::string> p = {1, "Aman"};

std::cout << p.first << "\n";
std::cout << p.second << "\n";
```

### Tuple

```cpp
#include <tuple>

std::tuple<int, std::string, double> person = {1, "Aman", 22.5};

std::cout << std::get<0>(person) << "\n";
std::cout << std::get<1>(person) << "\n";
std::cout << std::get<2>(person) << "\n";
```

---

## 28. Exception Handling

```cpp
#include <iostream>
#include <stdexcept>

int divide(int a, int b) {
    if (b == 0) {
        throw std::invalid_argument("Division by zero");
    }

    return a / b;
}

int main() {
    try {
        std::cout << divide(10, 0);
    } catch (const std::exception &error) {
        std::cout << error.what();
    }

    return 0;
}
```

### Custom exception

```cpp
class CustomError : public std::exception {
private:
    std::string message;

public:
    CustomError(std::string message) : message(message) {}

    const char *what() const noexcept override {
        return message.c_str();
    }
};
```

---

## 29. File Handling

### Write to file

```cpp
#include <fstream>

int main() {
    std::ofstream file("data.txt");

    file << "Hello, file!";

    file.close();

    return 0;
}
```

### Read from file

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("data.txt");
    std::string line;

    while (std::getline(file, line)) {
        std::cout << line << "\n";
    }

    file.close();

    return 0;
}
```

### File modes

| Mode | Meaning |
|---|---|
| `std::ios::in` | Read |
| `std::ios::out` | Write |
| `std::ios::app` | Append |
| `std::ios::binary` | Binary mode |
| `std::ios::trunc` | Clear existing content |

---

## 30. Structs and Enums

### Struct

```cpp
struct Student {
    std::string name;
    int age;
};

int main() {
    Student student = {"Aman", 22};

    std::cout << student.name;
}
```

### Enum

```cpp
enum Color {
    RED,
    GREEN,
    BLUE
};

int main() {
    Color color = GREEN;

    if (color == GREEN) {
        std::cout << "Green selected";
    }
}
```

### Enum class

```cpp
enum class Status {
    Active,
    Inactive,
    Pending
};

int main() {
    Status status = Status::Active;

    if (status == Status::Active) {
        std::cout << "Active";
    }
}
```

---

## 31. Type Conversion

```cpp
int a = 10;
double b = static_cast<double>(a);

double x = 10.9;
int y = static_cast<int>(x);
```

### Cast types

| Cast | Use |
|---|---|
| `static_cast` | Normal safe conversion |
| `dynamic_cast` | Safe downcasting in polymorphism |
| `const_cast` | Add or remove `const` |
| `reinterpret_cast` | Low-level bit reinterpretation |

---

## 32. Move Semantics

```cpp
#include <iostream>
#include <string>
#include <utility>

int main() {
    std::string a = "Hello";
    std::string b = std::move(a);

    std::cout << b << "\n";

    return 0;
}
```

Move semantics transfer resources instead of copying them, improving performance for large objects.

---

## 33. RAII

RAII means **Resource Acquisition Is Initialization**. Resources are acquired in constructors and released in destructors.

```cpp
#include <fstream>

class FileHandler {
private:
    std::ofstream file;

public:
    FileHandler(const std::string &path) {
        file.open(path);
    }

    ~FileHandler() {
        if (file.is_open()) {
            file.close();
        }
    }
};
```

RAII is one of the most important modern C++ patterns for safe resource management.

---

## 34. Concurrency Basics

```cpp
#include <iostream>
#include <thread>

void printNumbers() {
    for (int i = 1; i <= 5; i++) {
        std::cout << i << "\n";
    }
}

int main() {
    std::thread thread(printNumbers);
    thread.join();

    return 0;
}
```

### Mutex

```cpp
#include <mutex>

std::mutex mutex;
int counter = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mutex);
    counter++;
}
```

### Async

```cpp
#include <future>
#include <iostream>

int compute() {
    return 10 * 10;
}

int main() {
    std::future<int> result = std::async(compute);

    std::cout << result.get();
}
```

---

## 35. Common Competitive Programming Patterns

### Fast input/output

```cpp
#include <iostream>

int main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);

    int n;
    std::cin >> n;
}
```

### Sort vector of pairs

```cpp
#include <algorithm>
#include <vector>

std::vector<std::pair<int, int>> v;

std::sort(v.begin(), v.end(), [](const auto &a, const auto &b) {
    return a.second < b.second;
});
```

### Frequency count

```cpp
#include <unordered_map>
#include <vector>

std::unordered_map<int, int> frequency;

for (int number : numbers) {
    frequency[number]++;
}
```

### Binary search

```cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {1, 2, 3, 4, 5};

bool exists = std::binary_search(v.begin(), v.end(), 3);
```

### Lower bound and upper bound

```cpp
auto lower = std::lower_bound(v.begin(), v.end(), 3);
auto upper = std::upper_bound(v.begin(), v.end(), 3);
```

---

## 36. Common Interview Questions

### 1. What is C++?

C++ is a compiled, general-purpose programming language that supports procedural, object-oriented, and generic programming.

### 2. What is the difference between C and C++?

C is procedural, while C++ supports procedural, object-oriented, and generic programming. C++ also provides classes, templates, exceptions, STL, and smart pointers.

### 3. What is OOP?

Object-Oriented Programming organizes code around objects that contain data and behavior. Its main principles are encapsulation, abstraction, inheritance, and polymorphism.

### 4. What is a class?

A class is a blueprint for creating objects. It defines data members and member functions.

### 5. What is an object?

An object is an instance of a class.

### 6. What is a constructor?

A constructor is a special member function that initializes an object when it is created.

### 7. What is a destructor?

A destructor is a special member function that cleans up an object when it goes out of scope or is deleted.

### 8. What is inheritance?

Inheritance allows a class to acquire properties and behavior from another class.

### 9. What is polymorphism?

Polymorphism allows the same function or operator to behave differently based on context. It includes compile-time and runtime polymorphism.

### 10. What is encapsulation?

Encapsulation hides internal data and exposes controlled access through public methods.

### 11. What is abstraction?

Abstraction hides implementation details and exposes only necessary functionality.

### 12. What is a virtual function?

A virtual function enables runtime polymorphism by allowing derived-class functions to override base-class behavior.

### 13. What is a pure virtual function?

A pure virtual function has no implementation in the base class and makes the class abstract.

```cpp
virtual void draw() const = 0;
```

### 14. What is an abstract class?

An abstract class contains at least one pure virtual function and cannot be instantiated directly.

### 15. What is a pointer?

A pointer stores the memory address of another variable.

### 16. What is a reference?

A reference is an alias for another variable.

### 17. What is the difference between pointer and reference?

A pointer can be null and reassigned, while a reference must be initialized and cannot be reassigned.

### 18. What is a smart pointer?

A smart pointer automatically manages dynamically allocated memory and helps prevent memory leaks. [232][239]

### 19. What is `unique_ptr`?

`unique_ptr` provides exclusive ownership of a dynamically allocated object.

### 20. What is `shared_ptr`?

`shared_ptr` allows multiple owners through reference counting.

### 21. What is `weak_ptr`?

`weak_ptr` references a `shared_ptr` without increasing its ownership count. It helps prevent circular references.

### 22. What is RAII?

RAII means Resource Acquisition Is Initialization. Resources are acquired in constructors and released automatically in destructors.

### 23. What is a template?

A template enables generic programming by allowing functions and classes to work with multiple data types. [234]

### 24. What is STL?

STL stands for Standard Template Library. It provides containers, iterators, algorithms, and function objects. [230][231]

### 25. What is a vector?

`std::vector` is a dynamic array that can grow and shrink at runtime.

### 26. What is the difference between vector and array?

`std::vector` has dynamic size, while `std::array` has fixed size.

### 27. What is the difference between map and unordered_map?

`map` stores keys in sorted order using a balanced tree, while `unordered_map` uses hashing and has no guaranteed order.

### 28. What is the difference between set and unordered_set?

`set` stores unique values in sorted order, while `unordered_set` stores unique values using hashing.

### 29. What is a lambda function?

A lambda is an anonymous inline function, commonly used for short callbacks and STL algorithms.

### 30. What is move semantics?

Move semantics transfer ownership of resources from one object to another instead of copying them.

### 31. What is the difference between stack and heap?

Stack memory is used for local variables and automatic storage. Heap memory is used for dynamic allocation.

### 32. What is memory leak?

A memory leak occurs when dynamically allocated memory is not released.

### 33. What is dangling pointer?

A dangling pointer points to memory that has already been freed.

### 34. What is segmentation fault?

A segmentation fault occurs when a program accesses invalid memory.

### 35. What is the difference between `new` and `malloc`?

`new` allocates memory and calls the constructor. `malloc` allocates raw memory and does not call constructors.

---

## 37. Best Practices

- Prefer `std::vector` over raw arrays.
- Prefer smart pointers over raw `new` and `delete`.
- Use `const` and `constexpr` where possible.
- Use references instead of pointers when null is not needed.
- Use RAII for resource management.
- Prefer range-based for loops.
- Use STL algorithms instead of manual loops when possible.
- Avoid global mutable variables.
- Initialize variables when declaring them.
- Use `override` when overriding virtual functions.
- Mark destructors `virtual` in polymorphic base classes.
- Avoid raw ownership pointers in modern code.
- Use `auto` carefully for readability.
- Compile with warnings enabled.

```bash
g++ -std=c++20 -Wall -Wextra -Werror main.cpp -o app
```

---

## Summary

C++ is a powerful language for performance-critical software. This cheat sheet covers the essential syntax, OOP concepts, pointers, references, smart pointers, templates, STL containers, algorithms, file handling, exceptions, and concurrency.

For interviews, focus on OOP, pointers, references, virtual functions, constructors, destructors, STL containers, time complexity, smart pointers, RAII, templates, and move semantics.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to official C++ documentation and cppreference for detailed and current language guidance.