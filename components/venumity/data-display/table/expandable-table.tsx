"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableExpandTriggerCell,
  TableExpandableContent,
} from "./index";
import { cn } from "@/lib/utils";

interface Person {
  id: string;
  name: string;
  role: string;
  team: string;
  salary: number;
  status: "Active" | "On Leave" | "Terminated";
  joined: string;
  performance: number;
}

const PEOPLE: Person[] = [
  {
    id: "1",
    name: "Amara Okafor",
    role: "Staff Engineer",
    team: "Platform",
    salary: 148000,
    status: "Active",
    joined: "2019-03-14",
    performance: 94,
  },
  {
    id: "2",
    name: "Ben Castellano",
    role: "Product Manager",
    team: "Growth",
    salary: 132000,
    status: "Active",
    joined: "2020-07-08",
    performance: 88,
  },
  {
    id: "3",
    name: "Chen Wei",
    role: "Data Engineer",
    team: "ML Infra",
    salary: 141000,
    status: "Active",
    joined: "2021-01-22",
    performance: 91,
  },
  {
    id: "4",
    name: "Diana Ruiz",
    role: "UX Designer",
    team: "Design",
    salary: 108000,
    status: "On Leave",
    joined: "2020-11-02",
    performance: 84,
  },
  {
    id: "5",
    name: "Ethan Brooks",
    role: "Frontend Dev",
    team: "Web",
    salary: 122000,
    status: "Active",
    joined: "2022-05-16",
    performance: 86,
  },
];

const statusColor = (s: Person["status"]) =>
  s === "Active"
    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
    : s === "On Leave"
      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
      : "bg-rose-500/15 text-rose-600 dark:text-rose-400";

export default function ExpandableTable() {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const toggle = (id: string) =>
    setExpanded((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  return (
    <div className="p-5 md:p-10 max-w-2xl w-full">
      <Table className="border rounded-2xl">
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((p) => (
            <React.Fragment key={p.id}>
              <TableRow
                expandable
                expanded={expanded.includes(p.id)}
                onExpandedChange={() => toggle(p.id)}
              >
                <TableExpandTriggerCell
                  expanded={expanded.includes(p.id)}
                  onToggle={() => toggle(p.id)}
                />
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.role}</TableCell>
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
              </TableRow>
              <TableExpandableContent
                colSpan={4}
                open={expanded.includes(p.id)}
              >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Team</div>
                    <div className="font-medium">{p.team}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Salary</div>
                    <div className="font-medium">
                      ${p.salary.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Joined</div>
                    <div className="font-medium">{p.joined}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Performance
                    </div>
                    <div className="font-medium">{p.performance}%</div>
                  </div>
                </div>
              </TableExpandableContent>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
