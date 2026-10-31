## Lesson 1 : What Is a Database ?

A database is a structured collection of data managed by a Database Management System, or DBMS. The DBMS allows applications to store, query, update, and secure data efficiently.

### Basic application flow

```text
User interacts with frontend
        ↓
Frontend sends API request
        ↓
Backend processes request
        ↓
Backend queries database
        ↓
Database returns data
        ↓
Backend sends response to frontend
```

### Example

When a user opens an e-commerce product page:

```text
GET /api/products/123
        ↓
Backend queries database
        ↓
SELECT * FROM products WHERE id = 123;
        ↓
Database returns product details
        ↓
Frontend displays product
```

### Database vs DBMS

| Term | Meaning |
|---|---|
| Database | Organized collection of data |
| DBMS | Software used to manage the database |
| Table | Structured collection of related data |
| Row | A single record |
| Column | A single data field |
| Query | Request to read or modify data |

---

## Lesson 2 : SQL vs NoSQL Databases

Databases are commonly divided into SQL and NoSQL systems.

| Feature | SQL Database | NoSQL Database |
|---|---|---|
| Data model | Tables, rows, columns | Documents, key-value, graph, wide-column |
| Schema | Fixed and structured | Flexible or schema-less |
| Relationships | Strong relational support | Depends on database type |
| Query language | SQL | Database-specific query language |
| Transactions | Strong ACID support | Varies by database |
| Examples | PostgreSQL, MySQL, SQLite | MongoDB, Redis, DynamoDB, Cassandra |
| Best for | Structured and relational data | Flexible, high-scale, or cache-heavy data |

### SQL databases

SQL databases are relational databases. Data is stored in tables with rows and columns, and relationships are defined using keys.

Examples:

- PostgreSQL
- MySQL
- MariaDB
- SQLite
- Microsoft SQL Server

### NoSQL databases

NoSQL databases store data in non-relational formats.

| Type | Example | Use Case |
|---|---|---|
| Document database | MongoDB | Product catalogs, user profiles, CMS content |
| Key-value database | Redis, DynamoDB | Caching, sessions, rate limiting |
| Wide-column database | Cassandra | Time-series and high-write workloads |
| Graph database | Neo4j | Social networks and relationship-heavy data |

---

## Lesson 3 : Relational Database Concepts

Relational databases organize data into tables and connect tables using relationships.

### Example tables

```text
users
┌────┬───────┬───────────────────┐
│ id │ name  │ email             │
├────┼───────┼───────────────────┤
│ 1  │ Aman  │ aman@example.com  │
│ 2  │ Riya  │ riya@example.com  │
└────┴───────┴───────────────────┘

posts
┌────┬─────────┬───────────────┬─────────┐
│ id │ user_id │ title         │ content │
├────┼─────────┼───────────────┼─────────┤
│ 10 │ 1       │ First Post    │ Hello   │
│ 11 │ 1       │ Second Post   │ World   │
│ 12 │ 2       │ Riya’s Post   │ Hi      │
└────┴─────────┴───────────────┴─────────┘
```

### Keys

| Key | Purpose |
|---|---|
| Primary key | Uniquely identifies each row |
| Foreign key | Links a row in one table to a row in another table |
| Composite key | Uses multiple columns together as a unique identifier |
| Unique key | Ensures a column value is unique |
| Candidate key | Any column or combination that can uniquely identify a row |

### Relationships

| Relationship | Example |
|---|---|
| One-to-one | One user has one profile |
| One-to-many | One user has many posts |
| Many-to-many | Many students enroll in many courses |

---

## Lesson 4 : SQL Fundamentals

SQL, or Structured Query Language, is used to communicate with relational databases.

### Create a table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Insert data

```sql
INSERT INTO users (name, email)
VALUES ('Aman', 'aman@example.com');
```

### Read data

```sql
SELECT id, name, email
FROM users
WHERE email = 'aman@example.com';
```

### Update data

```sql
UPDATE users
SET name = 'Aman Kumar'
WHERE id = 1;
```

### Delete data

```sql
DELETE FROM users
WHERE id = 1;
```

### SQL command categories

| Category | Purpose | Examples |
|---|---|---|
| DDL | Define structure | `CREATE`, `ALTER`, `DROP` |
| DML | Modify data | `INSERT`, `UPDATE`, `DELETE` |
| DQL | Read data | `SELECT` |
| DCL | Control access | `GRANT`, `REVOKE` |
| TCL | Manage transactions | `BEGIN`, `COMMIT`, `ROLLBACK` |

---

## Lesson 5 : SQL Queries and Clauses

### Filtering with WHERE

```sql
SELECT *
FROM products
WHERE price > 1000;
```

### Sorting with ORDER BY

```sql
SELECT *
FROM products
ORDER BY price DESC;
```

### Limiting results

```sql
SELECT *
FROM products
ORDER BY created_at DESC
LIMIT 10;
```

### Pagination

```sql
SELECT *
FROM products
ORDER BY id
LIMIT 10 OFFSET 20;
```

### Aggregations

```sql
SELECT COUNT(*) AS total_products
FROM products;

SELECT category, AVG(price) AS average_price
FROM products
GROUP BY category;
```

### HAVING

```sql
SELECT category, COUNT(*) AS total
FROM products
GROUP BY category
HAVING COUNT(*) > 5;
```

### SQL execution order

```text
FROM
  ↓
JOIN
  ↓
WHERE
  ↓
GROUP BY
  ↓
HAVING
  ↓
SELECT
  ↓
ORDER BY
  ↓
LIMIT
```

---

## Lesson 6 : Joins

A JOIN combines rows from two or more tables based on a related column. [221]

### INNER JOIN

Returns only matching rows from both tables.

```sql
SELECT users.name, posts.title
FROM users
INNER JOIN posts ON posts.user_id = users.id;
```

### LEFT JOIN

Returns all rows from the left table and matching rows from the right table.

```sql
SELECT users.name, posts.title
FROM users
LEFT JOIN posts ON posts.user_id = users.id;
```

### RIGHT JOIN

Returns all rows from the right table and matching rows from the left table.

```sql
SELECT users.name, posts.title
FROM users
RIGHT JOIN posts ON posts.user_id = users.id;
```

### FULL OUTER JOIN

Returns rows from both tables, including unmatched rows.

```sql
SELECT users.name, posts.title
FROM users
FULL OUTER JOIN posts ON posts.user_id = users.id;
```

### Join comparison

| Join Type | Result |
|---|---|
| `INNER JOIN` | Only matching rows |
| `LEFT JOIN` | All left rows plus matching right rows |
| `RIGHT JOIN` | All right rows plus matching left rows |
| `FULL OUTER JOIN` | All rows from both tables |

---

## Lesson 7 : Database Schema Design

A schema defines the structure of a database, including tables, columns, data types, relationships, and constraints.

### E-commerce example

```text
users
 ├── id
 ├── name
 ├── email

products
 ├── id
 ├── name
 ├── price
 ├── stock

orders
 ├── id
 ├── user_id
 ├── total
 ├── status

order_items
 ├── id
 ├── order_id
 ├── product_id
 ├── quantity
 └── price
```

### Good schema design principles

- Use meaningful table and column names.
- Use primary keys for every table.
- Use foreign keys for relationships.
- Avoid storing duplicate data.
- Use correct data types.
- Add constraints for data integrity.
- Normalize data where appropriate.
- Design for common query patterns.

---

## Lesson 8 : Normalization

Normalization organizes data to reduce redundancy and improve data integrity. It divides large tables into smaller related tables and establishes relationships between them. [221][227]

### Unnormalized data

```text
orders
┌────────┬──────────┬──────────────┬──────────────────┐
│ order  │ customer │ product      │ customer_email   │
├────────┼──────────┼──────────────┼──────────────────┤
│ 1      │ Aman     │ Laptop       │ aman@example.com │
│ 2      │ Aman     │ Mouse        │ aman@example.com │
└────────┴──────────┴──────────────┴──────────────────┘
```

The customer email is repeated, creating redundancy.

### Normalized design

```text
customers
┌────┬───────┬──────────────────┐
│ id │ name  │ email            │
├────┼───────┼──────────────────┤
│ 1  │ Aman  │ aman@example.com │
└────┴───────┴──────────────────┘

orders
┌────┬─────────────┐
│ id │ customer_id │
├────┼─────────────┤
│ 1  │ 1           │
│ 2  │ 1           │
└────┴─────────────┘
```

### Normal forms

| Normal Form | Purpose |
|---|---|
| 1NF | Remove repeating groups and ensure atomic values |
| 2NF | Remove partial dependency on a composite primary key |
| 3NF | Remove transitive dependencies |
| BCNF | Stronger version of 3NF |

### Denormalization

Denormalization intentionally adds some redundancy to reduce joins and improve read performance.

```text
Normalized schema → Better data integrity
Denormalized schema → Faster reads in some cases
```

Use denormalization carefully, especially for reporting tables, caches, and read-heavy systems.

---

## Lesson 9 : Indexes

An index is a data structure that improves data retrieval speed by allowing the database to locate rows without scanning the entire table. [218][221]

### Without index

```text
Database scans every row
      ↓
Finds matching rows
```

### With index

```text
Database uses index lookup
      ↓
Jumps directly to matching rows
```

### Create an index

```sql
CREATE INDEX idx_posts_user_id
ON posts(user_id);
```

### Unique index

```sql
CREATE UNIQUE INDEX idx_users_email
ON users(email);
```

### Composite index

```sql
CREATE INDEX idx_orders_user_status
ON orders(user_id, status);
```

### When to add indexes

- Columns used in `WHERE` clauses
- Columns used in `JOIN` conditions
- Columns used in `ORDER BY`
- Foreign key columns
- Frequently searched columns

### Index trade-offs

| Benefit | Cost |
|---|---|
| Faster reads | Slower writes |
| Better query performance | More storage |
| Faster sorting and filtering | Extra maintenance overhead |

Indexes are usually implemented using structures such as B-trees, which store indexed values in sorted order with pointers to table rows. [219]

---

## Lesson 10 : Transactions

A transaction is a sequence of one or more database operations executed as a single logical unit of work. [221]

### Example

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 500
WHERE id = 1;

UPDATE accounts
SET balance = balance + 500
WHERE id = 2;

COMMIT;
```

If the second update fails, roll back:

```sql
ROLLBACK;
```

### ACID properties

ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties ensure reliable transaction processing. [218][221]

| Property | Meaning |
|---|---|
| Atomicity | All operations succeed or none are applied |
| Consistency | Database moves from one valid state to another |
| Isolation | Concurrent transactions do not interfere incorrectly |
| Durability | Committed data survives failures or crashes |

### Transaction example

For a money transfer:

```text
Deduct ₹500 from Account A
      ↓
Add ₹500 to Account B
      ↓
Both succeed, or both fail
```

If only the first operation succeeds, money would disappear. Transactions prevent this.

---

## Lesson 11 : Concurrency and Isolation Levels

Concurrency means multiple users or processes access the database at the same time.

### Common problems

| Problem | Description |
|---|---|
| Dirty read | Reading uncommitted data from another transaction |
| Non-repeatable read | Same query returns different results within one transaction |
| Phantom read | New rows appear during a transaction |
| Lost update | One update overwrites another update |

### Isolation levels

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| Read Uncommitted | Possible | Possible | Possible |
| Read Committed | Prevented | Possible | Possible |
| Repeatable Read | Prevented | Prevented | Possible |
| Serializable | Prevented | Prevented | Prevented |

Higher isolation provides stronger correctness but can reduce performance and concurrency.

---

## Lesson 12 : Query Optimization

Query optimization improves database performance by reducing unnecessary work.

### Bad query

```sql
SELECT *
FROM orders;
```

### Better query

```sql
SELECT id, status, total
FROM orders
WHERE user_id = 123
ORDER BY created_at DESC
LIMIT 20;
```

### Optimization techniques

- Select only required columns.
- Use indexes for filters and joins.
- Avoid `SELECT *` in production.
- Use pagination instead of loading all rows.
- Avoid N+1 queries.
- Use database connection pooling.
- Analyze slow queries with `EXPLAIN`.
- Cache repeated expensive results.
- Use read replicas for read-heavy workloads.

### EXPLAIN example

```sql
EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE user_id = 123;
```

This shows how the database executes the query and whether it uses an index.

---

## Lesson 13 : Replication

Replication copies data from one database server to one or more other servers.

### Primary-replica model

```text
Writes → Primary Database
              ↓
       Replication
              ↓
Read Replica 1 / Read Replica 2
```

### Benefits

- Scales read traffic.
- Improves availability.
- Provides failover capability.
- Reduces load on the primary database.

### Replication types

| Type | Behavior |
|---|---|
| Synchronous replication | Primary waits for replica confirmation |
| Asynchronous replication | Primary commits without waiting for replica |
| Semi-synchronous replication | Waits for at least one replica confirmation |

Replication keeps copies of data on multiple servers. A common model uses one primary for writes and read replicas for read traffic. [219][226]

---

## Lesson 14 : Sharding

Sharding splits a large database into smaller pieces called shards, distributed across multiple servers or nodes. It improves scalability and performance for very large datasets. [218]

### Example

```text
Shard 1 → Users A to M
Shard 2 → Users N to Z
Shard 3 → Users based on region
```

### Sharding benefits

- Scales writes and storage.
- Reduces load on a single database.
- Improves performance for large datasets.
- Supports distributed architecture.

### Sharding challenges

- Complex queries across shards.
- Difficult transactions across shards.
- Uneven data distribution.
- More operational complexity.
- Harder backups and migrations.

### Sharding vs Replication

| Sharding | Replication |
|---|---|
| Splits data across servers | Copies data across servers |
| Scales storage and writes | Scales reads and availability |
| More complex | Comparatively simpler |
| Different data on each shard | Same data on multiple servers |

---

## Lesson 15 : Connection Pooling

Opening a new database connection for every request is expensive. Connection pooling reuses a set of open database connections.

### Without pooling

```text
Request 1 → Open connection → Query → Close
Request 2 → Open connection → Query → Close
```

### With pooling

```text
Request 1 → Reuse connection → Query
Request 2 → Reuse connection → Query
```

### Benefits

- Lower latency.
- Fewer database connections.
- Better performance under load.
- Prevents connection exhaustion.

---

## Lesson 16 : ORMs and Query Builders

An ORM, or Object-Relational Mapper, lets developers interact with databases using programming-language objects instead of raw SQL.

### Prisma example

```js
const users = await prisma.user.findMany({
  where: {
    email: {
      contains: "@example.com",
    },
  },
  include: {
    posts: true,
  },
});
```

### SQL equivalent

```sql
SELECT users.*, posts.*
FROM users
LEFT JOIN posts ON posts.user_id = users.id
WHERE users.email LIKE '%@example.com%';
```

### ORM benefits

- Faster development.
- Type safety with TypeScript.
- Easier database migrations.
- Protection from many SQL injection issues.
- Cleaner application code.

### ORM limitations

- Complex queries can be harder to express.
- May generate inefficient queries.
- Developers still need SQL knowledge.
- Debugging requires understanding generated SQL.

---

## Lesson 17 : Database Security

Database security protects data from unauthorized access, modification, or loss.

### Security practices

- Use strong authentication.
- Apply least-privilege access.
- Never expose database credentials in frontend code.
- Use environment variables and secret managers.
- Encrypt sensitive data at rest and in transit.
- Use parameterized queries.
- Keep database software updated.
- Restrict network access.
- Take regular backups.
- Audit sensitive operations.

### Role-based access example

```sql
CREATE USER readonly_user WITH PASSWORD 'secure_password';

GRANT SELECT ON products TO readonly_user;
```

---

## Lesson 18 : Backups and Recovery

Backups protect data from accidental deletion, corruption, hardware failure, and attacks.

### Backup types

| Type | Description |
|---|---|
| Full backup | Complete copy of database |
| Incremental backup | Only changes since last backup |
| Differential backup | Changes since last full backup |
| Point-in-time recovery | Restore database to a specific moment |

### Backup best practices

- Automate backups.
- Store backups in a separate location.
- Encrypt backups.
- Test restoration regularly.
- Define retention policies.
- Monitor backup success and failure.

---

## Lesson 19 : Advantages of Databases

- Centralized and organized data storage.
- Fast searching, filtering, and sorting.
- Data integrity through constraints.
- Reliable transactions.
- Concurrent access for multiple users.
- Security and access control.
- Scalability through replication and sharding.
- Backup and disaster recovery support.

---

## Lesson 20 : Disadvantages and Challenges

| Challenge | Explanation |
|---|---|
| Complexity | Schema design and query optimization require skill |
| Cost | Managed databases and large-scale systems can be expensive |
| Performance issues | Bad indexes or queries can slow applications |
| Scaling difficulty | Write-heavy systems can be hard to scale |
| Security risk | Misconfigured databases can leak sensitive data |
| Maintenance | Backups, upgrades, and monitoring are required |
| Data consistency | Distributed databases introduce consistency challenges |

---

## Lesson 21 : Most Important Interview Questions

### 1. What is a database?

A database is an organized collection of data managed by a DBMS, allowing applications to store, retrieve, update, and delete data efficiently.

### 2. What is a DBMS?

A DBMS is software that manages databases, such as PostgreSQL, MySQL, MongoDB, or Redis.

### 3. What is SQL?

SQL, or Structured Query Language, is used to query and manage relational databases.

### 4. What is the difference between SQL and NoSQL?

SQL databases use structured tables and relationships. NoSQL databases use flexible models such as documents, key-value pairs, graphs, or wide columns.

### 5. What is a primary key?

A primary key uniquely identifies each row in a table.

### 6. What is a foreign key?

A foreign key creates a relationship between rows in two tables.

### 7. What is normalization?

Normalization organizes data to reduce redundancy and improve integrity by dividing data into related tables. [218][221]

### 8. What is denormalization?

Denormalization adds controlled redundancy to reduce joins and improve read performance.

### 9. What is an index?

An index is a data structure that improves data retrieval speed by allowing faster lookup of specific column values. [218][221]

### 10. What is a composite index?

A composite index is created on two or more columns, useful for queries filtering or sorting by those columns together.

### 11. What is a transaction?

A transaction is a sequence of database operations executed as one logical unit of work. [221]

### 12. What is ACID?

ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties ensure reliable transaction processing. [218][221]

### 13. What is the difference between DELETE, TRUNCATE, and DROP?

| Command | Effect |
|---|---|
| `DELETE` | Removes selected rows |
| `TRUNCATE` | Removes all rows from a table |
| `DROP` | Removes the entire table structure |

### 14. What is the difference between WHERE and HAVING?

`WHERE` filters individual rows before grouping. `HAVING` filters grouped results after `GROUP BY`.

### 15. What is a JOIN?

A JOIN combines rows from two or more tables based on a related column. [221]

### 16. What is the difference between INNER JOIN and LEFT JOIN?

`INNER JOIN` returns only matching rows. `LEFT JOIN` returns all rows from the left table plus matching rows from the right table. [219]

### 17. What is replication?

Replication copies data from one database server to another, improving read scalability and availability. [219][226]

### 18. What is sharding?

Sharding splits data across multiple servers or nodes to improve scalability and performance. [218][226]

### 19. What is connection pooling?

Connection pooling reuses database connections instead of opening a new connection for every request.

### 20. What is an ORM?

An ORM maps database tables to programming-language objects, allowing developers to query databases using code instead of raw SQL.

### 21. What is a stored procedure?

A stored procedure is a saved set of SQL statements stored in the database and executed as a unit.

### 22. What is a view?

A view is a virtual table based on a SQL query. It does not store data itself unless it is materialized.

### 23. What is a trigger?

A trigger is database code that runs automatically when a specific event occurs, such as inserting or updating a row.

### 24. What is a deadlock?

A deadlock occurs when two or more transactions wait for each other to release locks, preventing progress.

### 25. What is CAP theorem?

CAP theorem states that a distributed data system can prioritize only two of three guarantees at once: Consistency, Availability, and Partition tolerance.

---

## Lesson 22 : Senior-Level Interview Questions

### 1. How would you optimize a slow SQL query?

Use `EXPLAIN ANALYZE`, add indexes for filters and joins, select only required columns, paginate large results, avoid N+1 queries, optimize joins, and cache repeated expensive results.

### 2. When would you choose PostgreSQL over MongoDB?

Choose PostgreSQL when data is relational, transactions are important, and strong consistency is required. Choose MongoDB when data is document-oriented, schema evolves frequently, or horizontal document scaling is more important.

### 3. How would you scale a read-heavy database?

Use caching, read replicas, CDN for static content, query optimization, and connection pooling.

### 4. How would you scale a write-heavy database?

Use batching, queues, sharding, partitioning, optimized indexes, and asynchronous processing where appropriate.

### 5. What is the difference between replication and sharding?

Replication copies the same data to multiple servers for availability and read scaling. Sharding splits different data across servers to scale storage and writes. [219][226]

### 6. What is replication lag?

Replication lag is the delay between a write occurring on the primary database and becoming visible on a read replica. [224]

### 7. How would you design a many-to-many relationship?

Use a junction table with foreign keys to both related tables.

```sql
CREATE TABLE student_courses (
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);
```

### 8. What is database partitioning?

Partitioning divides one logical table into smaller physical pieces, often within the same database system. Sharding distributes data across separate database servers.

### 9. What is eventual consistency?

Eventual consistency means that after a write, all replicas will eventually become consistent, though they may temporarily return different data.

### 10. How would you prevent data loss?

Use automated backups, replication, point-in-time recovery, monitoring, access controls, and tested disaster-recovery procedures.

---

## Lesson 23 : Best Practices

- Use meaningful table and column names.
- Always define primary keys.
- Use foreign keys to protect relationships.
- Use appropriate data types.
- Add indexes based on real query patterns.
- Avoid `SELECT *` in production.
- Use pagination for large datasets.
- Use parameterized queries or ORM.
- Back up databases automatically.
- Test backup restoration regularly.
- Monitor slow queries.
- Use least-privilege database users.
- Keep credentials in environment variables.
- Use migrations for schema changes.
- Design indexes and schema for real access patterns.

---

## Summary

Databases are the foundation of backend systems. They store and manage application data, support reliable transactions, enable fast queries, and scale through indexing, replication, caching, and sharding.

For beginners, start with SQL basics, tables, keys, relationships, joins, filtering, and simple schema design. For interviews, focus on normalization, indexing, ACID transactions, joins, query optimization, replication, sharding, connection pooling, and database security.

This content is provided for learning purposes only. While we aim to keep it accurate and