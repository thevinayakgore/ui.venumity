"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableToolbar,
  nextSortDirection,
  type SortDirection,
} from "./index";

interface Person {
  id: string;
  name: string;
  role: string;
  team: string;
  salary: number;
  status: "Active" | "On Leave" | "Terminated";
}

const PEOPLE: Person[] = [
  {
    id: "1",
    name: "Amara Okafor",
    role: "Staff Engineer",
    team: "Platform",
    salary: 148000,
    status: "Active",
  },
  {
    id: "2",
    name: "Ben Castellano",
    role: "Product Manager",
    team: "Growth",
    salary: 132000,
    status: "Active",
  },
  {
    id: "3",
    name: "Chen Wei",
    role: "Data Engineer",
    team: "ML Infra",
    salary: 141000,
    status: "Active",
  },
  {
    id: "4",
    name: "Diana Ruiz",
    role: "UX Designer",
    team: "Design",
    salary: 108000,
    status: "On Leave",
  },
  {
    id: "5",
    name: "Ethan Brooks",
    role: "Frontend Dev",
    team: "Web",
    salary: 122000,
    status: "Active",
  },
  {
    id: "6",
    name: "Fatima Al-Sayed",
    role: "Security Lead",
    team: "Platform",
    salary: 156000,
    status: "Active",
  },
  {
    id: "7",
    name: "Gabriel Petrov",
    role: "Backend Dev",
    team: "API",
    salary: 118000,
    status: "Terminated",
  },
  {
    id: "8",
    name: "Hana Sato",
    role: "Data Scientist",
    team: "ML Infra",
    salary: 138000,
    status: "Active",
  },
];

const statusColor = (s: Person["status"]) =>
  s === "Active"
    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
    : s === "On Leave"
      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
      : "bg-rose-500/15 text-rose-600 dark:text-rose-400";

export default function FilterableTable() {
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState<keyof Person | null>("name");
  const [sortDir, setSortDir] = React.useState<SortDirection>("asc");

  const toggleSort = (key: keyof Person) => {
    if (sortBy === key) setSortDir(nextSortDirection(sortDir));
    else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const filtered = React.useMemo(() => {
    let out = [...PEOPLE];
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.role.toLowerCase().includes(q) ||
          r.team.toLowerCase().includes(q),
      );
    }
    if (sortBy) {
      out.sort((a, b) => {
        const av = a[sortBy];
        const bv = b[sortBy];
        const cmp =
          typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv));
        return sortDir === "desc" ? -cmp : cmp;
      });
    }
    return out;
  }, [search, sortBy, sortDir]);

  return (
    <div className="flex flex-col gap-5 p-5 md:p-10 max-w-3xl w-full">
        <TableToolbar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search name, role, team…"
          actions={
            <button className="h-9 rounded-md bg-foreground px-3 text-xs font-semibold text-background">
              Add person
            </button>
          }
        />
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
                onSort={() => toggleSort("team")}
                sortDirection={sortBy === "team" ? sortDir : null}
              >
                Team
              </TableHead>
              <TableHead>Status</TableHead>
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
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.team}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-medium",
                      statusColor(p.status),
                    )}
                  >
                    {p.status}
                  </span>
                </TableCell>
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
