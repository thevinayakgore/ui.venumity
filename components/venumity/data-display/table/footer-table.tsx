import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "./index";

interface Person {
  id: string;
  name: string;
  team: string;
  salary: number;
  performance: number;
}

const PEOPLE: Person[] = [
  { id: "1", name: "Amara Okafor", team: "Platform", salary: 148000, performance: 94 },
  { id: "2", name: "Ben Castellano", team: "Growth", salary: 132000, performance: 88 },
  { id: "3", name: "Chen Wei", team: "ML Infra", salary: 141000, performance: 91 },
  { id: "4", name: "Diana Ruiz", team: "Design", salary: 108000, performance: 84 },
  { id: "5", name: "Ethan Brooks", team: "Web", salary: 122000, performance: 86 },
  { id: "6", name: "Fatima Al-Sayed", team: "Platform", salary: 156000, performance: 97 },
];

export default function FooterTable() {
  const totalSalary = PEOPLE.reduce((s, p) => s + p.salary, 0);
  const avgPerf = PEOPLE.reduce((s, p) => s + p.performance, 0) / PEOPLE.length;

  return (
    <div className="p-5 md:p-10 max-w-2xl w-full">
      <Table className="border rounded-2xl">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead align="center">Salary</TableHead>
            <TableHead align="end">Performance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{p.team}</TableCell>
              <TableCell className="text-right">${p.salary.toLocaleString()}</TableCell>
              <TableCell className="text-right">{p.performance}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="font-semibold">Total ({PEOPLE.length})</TableCell>
            <TableCell>—</TableCell>
            <TableCell className="text-right font-semibold">${totalSalary.toLocaleString()}</TableCell>
            <TableCell className="text-right font-semibold">{avgPerf.toFixed(1)}%</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}