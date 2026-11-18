"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./index";
import { cn } from "@/lib/utils";

interface Person {
  id: string;
  name: string;
  role: string;
  team: string;
  salary: number;
}

const SEED: Person[] = [
  { id: "1", name: "Amara Okafor", role: "Staff Engineer", team: "Platform", salary: 148000 },
  { id: "2", name: "Ben Castellano", role: "Product Manager", team: "Growth", salary: 132000 },
  { id: "3", name: "Chen Wei", role: "Data Engineer", team: "ML Infra", salary: 141000 },
  { id: "4", name: "Diana Ruiz", role: "UX Designer", team: "Design", salary: 108000 },
  { id: "5", name: "Ethan Brooks", role: "Frontend Dev", team: "Web", salary: 122000 },
];

export default function EditableTable() {
  const [people, setPeople] = React.useState<Person[]>(SEED);
  const [editing, setEditing] = React.useState<{ id: string; key: keyof Person } | null>(null);
  const [editValue, setEditValue] = React.useState<string>("");

  const commitEdit = () => {
    if (!editing) return;
    setPeople((prev) =>
      prev.map((p) => (p.id === editing.id ? { ...p, [editing.key]: editValue } : p)),
    );
    setEditing(null);
  };

  const start = (id: string, key: keyof Person, value: string) => {
    setEditing({ id, key });
    setEditValue(value);
  };

  return (
    <div className="p-5 md:p-10 max-w-2xl w-full">
      <Table className="border rounded-2xl">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Team</TableHead>
            <TableHead align="end">Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((p) => {
            const cell = (key: keyof Person, align: "left" | "right" = "left") => {
              const isEditing = editing?.id === p.id && editing.key === key;
              const display =
                key === "salary" ? `$${Number(p[key]).toLocaleString()}` : String(p[key]);
              if (isEditing) {
                return (
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit();
                      if (e.key === "Escape") setEditing(null);
                    }}
                    className="px-2 py-1.5 bg-background text-sm border outline-none rounded-sm"
                  />
                );
              }
              return (
                <button
                  type="button"
                  onClick={() => start(p.id, key, String(p[key]))}
                  className={cn(
                    "hover:bg-background",
                    align === "right" && "text-right",
                  )}
                >
                  {display}
                </button>
              );
            };
            return (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{cell("name")}</TableCell>
                <TableCell>{cell("role")}</TableCell>
                <TableCell>{cell("team")}</TableCell>
                <TableCell className="text-right">{cell("salary", "right")}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}