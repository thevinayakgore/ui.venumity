"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectCell,
  TablePagination,
} from "./index";

interface Person {
  id: string;
  name: string;
  role: string;
  team: string;
  performance: number;
}

const PEOPLE: Person[] = [
  {
    id: "1",
    name: "Amara Okafor",
    role: "Staff Engineer",
    team: "Platform",
    performance: 94,
  },
  {
    id: "2",
    name: "Ben Castellano",
    role: "Product Manager",
    team: "Growth",
    performance: 88,
  },
  {
    id: "3",
    name: "Chen Wei",
    role: "Data Engineer",
    team: "ML Infra",
    performance: 91,
  },
  {
    id: "4",
    name: "Diana Ruiz",
    role: "UX Designer",
    team: "Design",
    performance: 84,
  },
  {
    id: "5",
    name: "Ethan Brooks",
    role: "Frontend Dev",
    team: "Web",
    performance: 86,
  },
  {
    id: "6",
    name: "Fatima Al-Sayed",
    role: "Security Lead",
    team: "Platform",
    performance: 97,
  },
];

export default function SelectableTable() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const allSelected = selected.length === PEOPLE.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggle = (id: string) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  return (
    <div className="p-5 md:p-10 max-w-3xl w-full">
      <Table className="border rounded-2xl">
        <TableHeader>
          <TableRow>
            <TableSelectCell
              checked={allSelected}
              indeterminate={someSelected}
              onCheckedChange={(c) =>
                setSelected(c ? PEOPLE.map((r) => r.id) : [])
              }
              ariaLabel="Select all"
            />
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Team</TableHead>
            <TableHead align="end">Performance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((p) => (
            <TableRow
              key={p.id}
              selectable
              selected={selected.includes(p.id)}
              onSelectedChange={() => toggle(p.id)}
            >
              <TableSelectCell
                checked={selected.includes(p.id)}
                onCheckedChange={() => toggle(p.id)}
              />
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{p.role}</TableCell>
              <TableCell>{p.team}</TableCell>
              <TableCell className="text-right">{p.performance}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selected.length > 0 && (
        <TablePagination
          page={1}
          totalPages={1}
          pageSize={PEOPLE.length}
          total={PEOPLE.length}
          selectedCount={selected.length}
          onPageChange={() => {}}
        />
      )}
    </div>
  );
}
