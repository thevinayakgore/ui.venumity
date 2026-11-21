"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  nextSortDirection,
  type SortDirection,
} from "./index";

interface Person {
  name: string;
  role: string;
  team: string;
  salary: number;
}

const PEOPLE: Person[] = [
  {
    name: "Amara Okafor",
    role: "Staff Engineer",
    team: "Platform",
    salary: 148000,
  },
  {
    name: "Ben Castellano",
    role: "Product Manager",
    team: "Growth",
    salary: 132000,
  },
  { name: "Chen Wei", role: "Data Engineer", team: "ML Infra", salary: 141000 },
  { name: "Diana Ruiz", role: "UX Designer", team: "Design", salary: 108000 },
  { name: "Ethan Brooks", role: "Frontend Dev", team: "Web", salary: 122000 },
  {
    name: "Fatima Al-Sayed",
    role: "Security Lead",
    team: "Platform",
    salary: 156000,
  },
  { name: "Gabriel Petrov", role: "Backend Dev", team: "API", salary: 118000 },
  {
    name: "Hana Sato",
    role: "Data Scientist",
    team: "ML Infra",
    salary: 138000,
  },
];

export default function SortableTable() {
  const [sortBy, setSortBy] = React.useState<keyof Person>("name");
  const [sortDir, setSortDir] = React.useState<SortDirection>("asc");

  const toggleSort = (key: keyof Person) => {
    if (sortBy === key) setSortDir(nextSortDirection(sortDir));
    else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const sorted = React.useMemo(() => {
    return [...PEOPLE].sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "desc" ? -cmp : cmp;
    });
  }, [sortBy, sortDir]);

  return (
    <div className="p-5 md:p-10 max-w-3xl w-full">
      <Table className="border rounded-2xl">
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              onSort={() => toggleSort("name")}
              sortDirection={sortBy === "name" ? sortDir : null}
            >
              Name
            </TableHead>
            <TableHead
              sortable
              onSort={() => toggleSort("role")}
              sortDirection={sortBy === "role" ? sortDir : null}
            >
              Role
            </TableHead>
            <TableHead
              sortable
              onSort={() => toggleSort("team")}
              sortDirection={sortBy === "team" ? sortDir : null}
            >
              Team
            </TableHead>
            <TableHead
              sortable
              align="end"
              onSort={() => toggleSort("salary")}
              sortDirection={sortBy === "salary" ? sortDir : null}
            >
              Salary
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody animatedSort>
          {sorted.map((p, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{p.role}</TableCell>
              <TableCell>{p.team}</TableCell>
              <TableCell className="text-right">
                ${p.salary.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
