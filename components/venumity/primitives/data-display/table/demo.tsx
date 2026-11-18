import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
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
  {
    name: "Chen Wei",
    role: "Data Engineer",
    team: "ML Infra",
    salary: 141000,
  },
  {
    name: "Diana Ruiz",
    role: "UX Designer",
    team: "Design",
    salary: 108000,
  },
  {
    name: "Ethan Brooks",
    role: "Frontend Dev",
    team: "Web",
    salary: 122000,
  },
  {
    name: "Fatima Al-Rashid",
    role: "Backend Engineer",
    team: "Platform",
    salary: 136000,
  },
];

export default function BasicTable() {
  return (
    <div className="p-5 md:p-10 max-w-3xl w-full">
      <Table className="border rounded-2xl">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Team</TableHead>
            <TableHead  align="end">Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEOPLE.map((p, idx) => (
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
        <TableCaption>
          Team members — glide your cursor across rows.
        </TableCaption>
      </Table>
    </div>
  );
}
