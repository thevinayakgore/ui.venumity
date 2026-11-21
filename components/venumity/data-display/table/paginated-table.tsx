"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TablePagination,
} from "./index";

interface Person {
  id: string;
  name: string;
  role: string;
  joined: string;
  salary: number;
}

const PEOPLE: Person[] = [
  { id: "1", name: "Amara Okafor", role: "Staff Engineer", joined: "2019-03-14", salary: 148000 },
  { id: "2", name: "Ben Castellano", role: "Product Manager", joined: "2020-07-08", salary: 132000 },
  { id: "3", name: "Chen Wei", role: "Data Engineer", joined: "2021-01-22", salary: 141000 },
  { id: "4", name: "Diana Ruiz", role: "UX Designer", joined: "2020-11-02", salary: 108000 },
  { id: "5", name: "Ethan Brooks", role: "Frontend Dev", joined: "2022-05-16", salary: 122000 },
  { id: "6", name: "Fatima Al-Sayed", role: "Security Lead", joined: "2018-09-10", salary: 156000 },
  { id: "7", name: "Gabriel Petrov", role: "Backend Dev", joined: "2021-03-30", salary: 118000 },
  { id: "8", name: "Hana Sato", role: "Data Scientist", joined: "2020-02-11", salary: 138000 },
  { id: "9", name: "Ibrahim Khalil", role: "iOS Engineer", joined: "2022-08-04", salary: 126000 },
  { id: "10", name: "Jia Li", role: "DevOps Engineer", joined: "2019-06-19", salary: 130000 },
];

export default function PaginatedTable() {
  const [page, setPage] = React.useState(1);
  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(PEOPLE.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = PEOPLE.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="p-5 md:p-10 max-w-2xl w-full">
      <Table className="border rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead align="end">Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{p.role}</TableCell>
              <TableCell>{p.joined}</TableCell>
              <TableCell className="text-right">${p.salary.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        page={safePage}
        totalPages={totalPages}
        pageSize={pageSize}
        total={PEOPLE.length}
        onPageChange={setPage}
      />
    </div>
  );
}