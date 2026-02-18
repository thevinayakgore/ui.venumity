"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Download,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  UserCircle,
} from "lucide-react";

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  performance: number;
  status: "Active" | "On Leave" | "Terminated";
}

type SortField = keyof Employee;
type SortDirection = "asc" | "desc";

const avatarColors = [
  "bg-pink-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-rose-500",
  "bg-teal-500",
];

const employees: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    department: "Engineering",
    position: "Senior Developer",
    salary: 95000,
    hireDate: "2020-03-15",
    performance: 92,
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 85000,
    hireDate: "2019-07-22",
    performance: 88,
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Chen",
    department: "Engineering",
    position: "DevOps Engineer",
    salary: 105000,
    hireDate: "2021-01-10",
    performance: 95,
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Wilson",
    department: "HR",
    position: "HR Specialist",
    salary: 65000,
    hireDate: "2022-05-30",
    performance: 78,
    status: "On Leave",
  },
  {
    id: 5,
    name: "David Brown",
    department: "Sales",
    position: "Sales Director",
    salary: 120000,
    hireDate: "2018-11-05",
    performance: 91,
    status: "Active",
  },
  {
    id: 6,
    name: "Lisa Taylor",
    department: "Finance",
    position: "Financial Analyst",
    salary: 75000,
    hireDate: "2021-09-12",
    performance: 85,
    status: "Active",
  },
  {
    id: 7,
    name: "Robert Garcia",
    department: "Engineering",
    position: "Frontend Developer",
    salary: 80000,
    hireDate: "2023-02-18",
    performance: 82,
    status: "Active",
  },
  {
    id: 8,
    name: "Amanda Lee",
    department: "Marketing",
    position: "Content Strategist",
    salary: 70000,
    hireDate: "2020-08-25",
    performance: 89,
    status: "Terminated",
  },
  {
    id: 9,
    name: "Daniel Martinez",
    department: "Engineering",
    position: "Backend Developer",
    salary: 90000,
    hireDate: "2022-10-14",
    performance: 87,
    status: "Active",
  },
  {
    id: 10,
    name: "Priya Sharma",
    department: "Finance",
    position: "Senior Accountant",
    salary: 82000,
    hireDate: "2020-06-08",
    performance: 90,
    status: "Active",
  },
  {
    id: 11,
    name: "Ethan Walker",
    department: "Sales",
    position: "Account Executive",
    salary: 78000,
    hireDate: "2021-04-19",
    performance: 84,
    status: "Active",
  },
  {
    id: 12,
    name: "Sophia Nguyen",
    department: "Product",
    position: "Product Manager",
    salary: 110000,
    hireDate: "2019-12-02",
    performance: 93,
    status: "Active",
  },
  {
    id: 13,
    name: "Arjun Patel",
    department: "Engineering",
    position: "QA Engineer",
    salary: 70000,
    hireDate: "2023-01-11",
    performance: 79,
    status: "Active",
  },
  {
    id: 14,
    name: "Laura Kim",
    department: "Design",
    position: "UI/UX Designer",
    salary: 88000,
    hireDate: "2021-08-27",
    performance: 88,
    status: "Active",
  },
  {
    id: 15,
    name: "Marcus Thompson",
    department: "Operations",
    position: "Operations Manager",
    salary: 98000,
    hireDate: "2018-03-09",
    performance: 91,
    status: "Active",
  },
  {
    id: 16,
    name: "Isabella Rossi",
    department: "Marketing",
    position: "Growth Strategist",
    salary: 86000,
    hireDate: "2022-02-16",
    performance: 85,
    status: "Active",
  },
  {
    id: 17,
    name: "Noah Anderson",
    department: "Engineering",
    position: "Mobile Developer",
    salary: 92000,
    hireDate: "2020-09-21",
    performance: 89,
    status: "Active",
  },
  {
    id: 18,
    name: "Fatima Al-Zahra",
    department: "HR",
    position: "Talent Acquisition Lead",
    salary: 83000,
    hireDate: "2019-05-06",
    performance: 92,
    status: "Active",
  },
  {
    id: 19,
    name: "Oliver White",
    department: "Engineering",
    position: "Platform Engineer",
    salary: 97000,
    hireDate: "2021-06-14",
    performance: 88,
    status: "Active",
  },
  {
    id: 20,
    name: "Meera Nair",
    department: "Product",
    position: "Product Designer",
    salary: 89000,
    hireDate: "2020-11-03",
    performance: 90,
    status: "Active",
  },
  {
    id: 21,
    name: "Lucas Meyer",
    department: "Operations",
    position: "Operations Analyst",
    salary: 76000,
    hireDate: "2022-04-18",
    performance: 83,
    status: "Active",
  },
  {
    id: 22,
    name: "Aisha Khan",
    department: "HR",
    position: "HR Manager",
    salary: 91000,
    hireDate: "2019-02-27",
    performance: 94,
    status: "Active",
  },
  {
    id: 23,
    name: "Benjamin Scott",
    department: "Finance",
    position: "Finance Manager",
    salary: 102000,
    hireDate: "2018-09-10",
    performance: 92,
    status: "Active",
  },
  {
    id: 24,
    name: "Ritika Verma",
    department: "Marketing",
    position: "SEO Specialist",
    salary: 72000,
    hireDate: "2021-07-01",
    performance: 86,
    status: "Active",
  },
  {
    id: 25,
    name: "Chris Nolan",
    department: "Engineering",
    position: "Security Engineer",
    salary: 108000,
    hireDate: "2019-12-19",
    performance: 95,
    status: "Active",
  },
  {
    id: 26,
    name: "Yuki Tanaka",
    department: "Design",
    position: "Product Illustrator",
    salary: 81000,
    hireDate: "2022-01-25",
    performance: 84,
    status: "Active",
  },
  {
    id: 27,
    name: "Samuel Green",
    department: "Sales",
    position: "Sales Operations Lead",
    salary: 93000,
    hireDate: "2020-05-30",
    performance: 89,
    status: "Active",
  },
  {
    id: 28,
    name: "Nina Petrova",
    department: "Engineering",
    position: "Data Engineer",
    salary: 115000,
    hireDate: "2018-08-16",
    performance: 93,
    status: "Active",
  },
  {
    id: 29,
    name: "Carlos Mendes",
    department: "Support",
    position: "Customer Support Lead",
    salary: 68000,
    hireDate: "2021-10-07",
    performance: 82,
    status: "Active",
  },
  {
    id: 30,
    name: "Hannah Brooks",
    department: "Product",
    position: "Product Analyst",
    salary: 87000,
    hireDate: "2020-03-11",
    performance: 88,
    status: "Active",
  },
  {
    id: 31,
    name: "Ahmed Hassan",
    department: "Engineering",
    position: "Cloud Architect",
    salary: 125000,
    hireDate: "2017-06-20",
    performance: 96,
    status: "Active",
  },
  {
    id: 32,
    name: "Sofia Alvarez",
    department: "Marketing",
    position: "Brand Strategist",
    salary: 84000,
    hireDate: "2019-09-29",
    performance: 87,
    status: "Active",
  },
  {
    id: 33,
    name: "Tom Becker",
    department: "Finance",
    position: "Risk Analyst",
    salary: 79000,
    hireDate: "2022-06-05",
    performance: 81,
    status: "Active",
  },
  {
    id: 34,
    name: "Ananya Iyer",
    department: "Engineering",
    position: "AI Engineer",
    salary: 118000,
    hireDate: "2021-02-12",
    performance: 94,
    status: "Active",
  },
  {
    id: 35,
    name: "Victor Romanov",
    department: "Operations",
    position: "Logistics Manager",
    salary: 86000,
    hireDate: "2018-10-01",
    performance: 85,
    status: "Active",
  },
  {
    id: 36,
    name: "Grace Miller",
    department: "HR",
    position: "People Operations Partner",
    salary: 90000,
    hireDate: "2019-04-22",
    performance: 91,
    status: "Active",
  },
  {
    id: 37,
    name: "Leo Dupont",
    department: "Design",
    position: "Design Systems Lead",
    salary: 99000,
    hireDate: "2020-12-15",
    performance: 92,
    status: "Active",
  },
  {
    id: 38,
    name: "Pavel Ivanov",
    department: "Engineering",
    position: "Infrastructure Engineer",
    salary: 104000,
    hireDate: "2018-01-18",
    performance: 90,
    status: "Active",
  },
];

export default function SortableTable() {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 size-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 size-4" />
    ) : (
      <ArrowDown className="ml-2 size-4" />
    );
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
  const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);

  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600 border-green-500/60";
      case "On Leave":
        return "bg-yellow-400/10 text-yellow-400 border-yellow-400/60";
      case "Terminated":
        return "bg-red-500/10 text-rose-500 border-rose-500/60";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const departments = ["all", ...new Set(employees.map((e) => e.department))];

  return (
    <main className="p-6 md:p-10">
      <Card className="w-full pt-0 shadow-none hover:shadow-xl/10 overflow-hidden transition-all duration-500">
        <CardHeader className="pt-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-4xl font-semibold">
                Employee Directory
              </CardTitle>
              <p className="text-sm md:text-base text-foreground/60 mt-1">
                Manage and track employee information
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="gap-2 cursor-pointer rounded-sm"
              >
                <Download className="size-4" />
                Export
              </Button>
              <Button className="gap-2 bg-sky-500 hover:bg-sky-400 cursor-pointer rounded-sm">
                <Plus className="size-4" />
                Add Employee
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="cursor-pointer w-full md:w-45">
                <Filter className="size-4 mr-2" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem
                    key={dept}
                    value={dept}
                    className="cursor-pointer"
                  >
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead
                    className="cursor-pointer hover:bg-muted transition-colors w-62.5"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Employee
                      {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("department")}
                  >
                    <div className="flex items-center">
                      Department
                      {getSortIcon("department")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("position")}
                  >
                    <div className="flex items-center">
                      Position
                      {getSortIcon("position")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted transition-colors text-right"
                    onClick={() => handleSort("salary")}
                  >
                    <div className="flex items-center justify-end">
                      Salary
                      {getSortIcon("salary")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("hireDate")}
                  >
                    <div className="flex items-center">
                      Hire Date
                      {getSortIcon("hireDate")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("performance")}
                  >
                    <div className="flex items-center">
                      Performance
                      {getSortIcon("performance")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon("status")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="wait">
                  {paginatedEmployees.map((employee, index) => (
                    <motion.tr
                      key={employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group hover:bg-muted/50 transition-colors border-b last:border-0"
                    >
                      <TableCell className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10 border-0 rounded-sm">
                            <AvatarFallback
                              className={`${avatarColors[employee.id % avatarColors.length]} text-white rounded-sm`}
                            >
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{employee.name}</div>
                            <div className="text-xs text-muted-foreground">
                              ID : EMP-{employee.id.toString().padStart(3, "0")}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {employee.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {employee.position}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${employee.salary.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(employee.hireDate)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${employee.performance}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-full rounded-full ${
                                employee.performance >= 90
                                  ? "bg-green-500"
                                  : employee.performance >= 80
                                    ? "bg-blue-500"
                                    : "bg-amber-500"
                              }`}
                            />
                          </div>
                          <span className="text-sm font-semibold min-w-10">
                            {employee.performance}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(employee.status)} font-medium`}
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="size-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="size-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-rose-600">
                              <UserCircle className="size-4" />
                              Terminate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
            <div>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, sortedEmployees.length)}{" "}
              of {employees.length} employees
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="cursor-pointer"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="cursor-pointer"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
