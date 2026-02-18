"use client";
import type { DateRange } from "react-day-picker";
import { useState, useMemo } from "react";
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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Mail,
  CalendarIcon,
  X,
  Users,
  Globe,
  ShoppingBag,
  DollarSign,
  Clock,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Customer {
  id: string;
  name: string;
  email: string;
  country: string;
  joinDate: string;
  orders: number;
  totalSpent: number;
  status: "Active" | "Inactive" | "Suspended" | "New";
  lastOrderDate: string;
  segment: "Premium" | "Standard" | "New";
}

const countryFlags: Record<string, string> = {
  USA: "🇺🇸",
  Spain: "🇪🇸",
  China: "🇨🇳",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Japan: "🇯🇵",
  Brazil: "🇧🇷",
  India: "🇮🇳",
  Italy: "🇮🇹",
  Netherlands: "🇳🇱",
  Singapore: "🇸🇬",
  SouthKorea: "🇰🇷",
  Mexico: "🇲🇽",
};

const avatarColors = [
  "bg-rose-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-purple-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

const baseCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "John Smith",
    email: "john.smith@example.com",
    country: "USA",
    joinDate: "2023-01-15",
    orders: 12,
    totalSpent: 2899.99,
    status: "Active" as const,
    lastOrderDate: "2024-01-10",
    segment: "Premium" as const,
  },
  {
    id: "CUST-002",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    country: "Spain",
    joinDate: "2023-02-20",
    orders: 8,
    totalSpent: 1549.5,
    status: "Active" as const,
    lastOrderDate: "2024-01-05",
    segment: "Standard" as const,
  },
  {
    id: "CUST-003",
    name: "Chen Wei",
    email: "chen.wei@example.com",
    country: "China",
    joinDate: "2023-03-10",
    orders: 5,
    totalSpent: 899.99,
    status: "Inactive" as const,
    lastOrderDate: "2023-11-20",
    segment: "Standard" as const,
  },
  {
    id: "CUST-004",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    country: "UK",
    joinDate: "2023-04-05",
    orders: 15,
    totalSpent: 3299.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-12",
    segment: "Premium" as const,
  },
  {
    id: "CUST-005",
    name: "David Miller",
    email: "david.miller@example.com",
    country: "Canada",
    joinDate: "2023-01-30",
    orders: 3,
    totalSpent: 450.0,
    status: "Suspended" as const,
    lastOrderDate: "2023-10-15",
    segment: "Standard" as const,
  },
  {
    id: "CUST-006",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    country: "Australia",
    joinDate: "2023-05-12",
    orders: 20,
    totalSpent: 4899.99,
    status: "Active" as const,
    lastOrderDate: "2024-01-15",
    segment: "Premium" as const,
  },
  {
    id: "CUST-007",
    name: "Alex Brown",
    email: "alex.brown@example.com",
    country: "USA",
    joinDate: "2023-06-18",
    orders: 7,
    totalSpent: 1299.5,
    status: "Active" as const,
    lastOrderDate: "2023-12-28",
    segment: "Standard" as const,
  },
  {
    id: "CUST-008",
    name: "Lisa Taylor",
    email: "lisa.t@example.com",
    country: "Germany",
    joinDate: "2023-02-28",
    orders: 10,
    totalSpent: 2100.0,
    status: "Inactive" as const,
    lastOrderDate: "2023-11-05",
    segment: "Standard" as const,
  },
  {
    id: "CUST-009",
    name: "Jean Dupont",
    email: "jean.d@example.com",
    country: "France",
    joinDate: "2023-07-22",
    orders: 14,
    totalSpent: 3450.75,
    status: "Active" as const,
    lastOrderDate: "2024-01-08",
    segment: "Premium" as const,
  },
  {
    id: "CUST-010",
    name: "Yuki Tanaka",
    email: "yuki.t@example.com",
    country: "Japan",
    joinDate: "2023-08-14",
    orders: 6,
    totalSpent: 1875.25,
    status: "Active" as const,
    lastOrderDate: "2023-12-20",
    segment: "Standard" as const,
  },
  {
    id: "CUST-011",
    name: "Carlos Oliveira",
    email: "carlos.o@example.com",
    country: "Brazil",
    joinDate: "2023-04-30",
    orders: 11,
    totalSpent: 2150.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-03",
    segment: "Standard" as const,
  },
  {
    id: "CUST-012",
    name: "Priya Sharma",
    email: "priya.s@example.com",
    country: "India",
    joinDate: "2023-09-05",
    orders: 4,
    totalSpent: 675.5,
    status: "Inactive" as const,
    lastOrderDate: "2023-10-30",
    segment: "New" as const,
  },
  {
    id: "CUST-013",
    name: "Marco Rossi",
    email: "marco.r@example.com",
    country: "Italy",
    joinDate: "2023-03-18",
    orders: 9,
    totalSpent: 1650.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-07",
    segment: "Standard" as const,
  },
  {
    id: "CUST-014",
    name: "Anna Kowalski",
    email: "anna.k@example.com",
    country: "Germany",
    joinDate: "2023-10-10",
    orders: 3,
    totalSpent: 445.99,
    status: "New" as const,
    lastOrderDate: "2023-12-15",
    segment: "New" as const,
  },
  {
    id: "CUST-015",
    name: "James Wilson",
    email: "james.w@example.com",
    country: "UK",
    joinDate: "2023-05-25",
    orders: 16,
    totalSpent: 4100.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-14",
    segment: "Premium" as const,
  },
  {
    id: "CUST-016",
    name: "Sofia Lopez",
    email: "sofia.l@example.com",
    country: "Spain",
    joinDate: "2023-07-08",
    orders: 7,
    totalSpent: 1420.5,
    status: "Active" as const,
    lastOrderDate: "2023-12-22",
    segment: "Standard" as const,
  },
  {
    id: "CUST-017",
    name: "Wei Zhang",
    email: "wei.z@example.com",
    country: "China",
    joinDate: "2023-09-19",
    orders: 5,
    totalSpent: 890.0,
    status: "Suspended" as const,
    lastOrderDate: "2023-09-30",
    segment: "Standard" as const,
  },
  {
    id: "CUST-018",
    name: "Emma Thompson",
    email: "emma.t@example.com",
    country: "Australia",
    joinDate: "2023-02-12",
    orders: 13,
    totalSpent: 2875.5,
    status: "Active" as const,
    lastOrderDate: "2024-01-09",
    segment: "Premium" as const,
  },
  {
    id: "CUST-019",
    name: "Lucas van Dijk",
    email: "lucas.v@example.com",
    country: "Netherlands",
    joinDate: "2023-08-01",
    orders: 8,
    totalSpent: 1750.25,
    status: "Active" as const,
    lastOrderDate: "2023-12-18",
    segment: "Standard" as const,
  },
  {
    id: "CUST-020",
    name: "Rachel Tan",
    email: "rachel.t@example.com",
    country: "Singapore",
    joinDate: "2023-11-15",
    orders: 2,
    totalSpent: 299.99,
    status: "New" as const,
    lastOrderDate: "2023-12-05",
    segment: "New" as const,
  },
  {
    id: "CUST-021",
    name: "Michael Chen",
    email: "michael.c@example.com",
    country: "Canada",
    joinDate: "2023-04-17",
    orders: 11,
    totalSpent: 2150.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-06",
    segment: "Standard" as const,
  },
  {
    id: "CUST-022",
    name: "Isabelle Martin",
    email: "isabelle.m@example.com",
    country: "France",
    joinDate: "2023-06-28",
    orders: 9,
    totalSpent: 1675.5,
    status: "Active" as const,
    lastOrderDate: "2024-01-02",
    segment: "Standard" as const,
  },
  {
    id: "CUST-023",
    name: "Robert Kim",
    email: "robert.k@example.com",
    country: "SouthKorea",
    joinDate: "2023-10-22",
    orders: 5,
    totalSpent: 750.0,
    status: "Inactive" as const,
    lastOrderDate: "2023-11-28",
    segment: "Standard" as const,
  },
  {
    id: "CUST-024",
    name: "Maria Schmidt",
    email: "maria.s@example.com",
    country: "Germany",
    joinDate: "2023-03-03",
    orders: 14,
    totalSpent: 3250.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-11",
    segment: "Premium" as const,
  },
  {
    id: "CUST-025",
    name: "Hiroshi Nakamura",
    email: "hiroshi.n@example.com",
    country: "Japan",
    joinDate: "2023-07-31",
    orders: 7,
    totalSpent: 1680.25,
    status: "Active" as const,
    lastOrderDate: "2023-12-24",
    segment: "Standard" as const,
  },
  {
    id: "CUST-026",
    name: "Ana Silva",
    email: "ana.s@example.com",
    country: "Brazil",
    joinDate: "2023-09-08",
    orders: 6,
    totalSpent: 1120.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-04",
    segment: "Standard" as const,
  },
  {
    id: "CUST-027",
    name: "Thomas Anderson",
    email: "thomas.a@example.com",
    country: "USA",
    joinDate: "2023-01-20",
    orders: 18,
    totalSpent: 4250.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-13",
    segment: "Premium" as const,
  },
  {
    id: "CUST-028",
    name: "Laura Bianchi",
    email: "laura.b@example.com",
    country: "Italy",
    joinDate: "2023-05-03",
    orders: 8,
    totalSpent: 1350.5,
    status: "Active" as const,
    lastOrderDate: "2023-12-30",
    segment: "Standard" as const,
  },
  {
    id: "CUST-029",
    name: "Raj Patel",
    email: "raj.p@example.com",
    country: "India",
    joinDate: "2023-11-28",
    orders: 1,
    totalSpent: 129.99,
    status: "New" as const,
    lastOrderDate: "2023-12-10",
    segment: "New" as const,
  },
  {
    id: "CUST-030",
    name: "Elena Popov",
    email: "elena.p@example.com",
    country: "Germany",
    joinDate: "2023-08-19",
    orders: 7,
    totalSpent: 1430.0,
    status: "Active" as const,
    lastOrderDate: "2023-12-27",
    segment: "Standard" as const,
  },
  {
    id: "CUST-031",
    name: "William Lee",
    email: "william.l@example.com",
    country: "Australia",
    joinDate: "2023-02-25",
    orders: 12,
    totalSpent: 2650.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-08",
    segment: "Premium" as const,
  },
  {
    id: "CUST-032",
    name: "Carmen Flores",
    email: "carmen.f@example.com",
    country: "Spain",
    joinDate: "2023-06-05",
    orders: 6,
    totalSpent: 980.5,
    status: "Inactive" as const,
    lastOrderDate: "2023-10-12",
    segment: "Standard" as const,
  },
  {
    id: "CUST-033",
    name: "Kenji Sato",
    email: "kenji.s@example.com",
    country: "Japan",
    joinDate: "2023-09-16",
    orders: 4,
    totalSpent: 650.0,
    status: "Active" as const,
    lastOrderDate: "2023-12-08",
    segment: "New" as const,
  },
  {
    id: "CUST-034",
    name: "Monica Turner",
    email: "monica.t@example.com",
    country: "UK",
    joinDate: "2023-04-08",
    orders: 13,
    totalSpent: 2980.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-07",
    segment: "Premium" as const,
  },
  {
    id: "CUST-035",
    name: "Pedro Santos",
    email: "pedro.s@example.com",
    country: "Brazil",
    joinDate: "2023-10-30",
    orders: 3,
    totalSpent: 450.0,
    status: "Active" as const,
    lastOrderDate: "2023-12-15",
    segment: "New" as const,
  },
  {
    id: "CUST-036",
    name: "Nina Kowalski",
    email: "nina.k@example.com",
    country: "Germany",
    joinDate: "2023-07-14",
    orders: 9,
    totalSpent: 1840.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-02",
    segment: "Standard" as const,
  },
  {
    id: "CUST-037",
    name: "Giuseppe Romano",
    email: "giuseppe.r@example.com",
    country: "Italy",
    joinDate: "2023-03-22",
    orders: 11,
    totalSpent: 2250.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-05",
    segment: "Standard" as const,
  },
  {
    id: "CUST-038",
    name: "Mei Lin",
    email: "mei.l@example.com",
    country: "China",
    joinDate: "2023-11-03",
    orders: 2,
    totalSpent: 320.0,
    status: "New" as const,
    lastOrderDate: "2023-12-12",
    segment: "New" as const,
  },
  {
    id: "CUST-039",
    name: "Oliver Schmidt",
    email: "oliver.s@example.com",
    country: "Germany",
    joinDate: "2023-05-29",
    orders: 14,
    totalSpent: 3150.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-09",
    segment: "Premium" as const,
  },
  {
    id: "CUST-040",
    name: "Sophie Dubois",
    email: "sophie.d@example.com",
    country: "France",
    joinDate: "2023-08-07",
    orders: 7,
    totalSpent: 1240.5,
    status: "Active" as const,
    lastOrderDate: "2023-12-20",
    segment: "Standard" as const,
  },
  {
    id: "CUST-041",
    name: "Daniel Park",
    email: "daniel.p@example.com",
    country: "SouthKorea",
    joinDate: "2023-09-25",
    orders: 5,
    totalSpent: 890.0,
    status: "Active" as const,
    lastOrderDate: "2023-12-28",
    segment: "Standard" as const,
  },
  {
    id: "CUST-042",
    name: "Fatima Al-Sayed",
    email: "fatima.a@example.com",
    country: "USA",
    joinDate: "2023-06-11",
    orders: 10,
    totalSpent: 2150.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-10",
    segment: "Standard" as const,
  },
  {
    id: "CUST-043",
    name: "Victor Hugo",
    email: "victor.h@example.com",
    country: "France",
    joinDate: "2023-04-19",
    orders: 9,
    totalSpent: 1760.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-03",
    segment: "Standard" as const,
  },
  {
    id: "CUST-044",
    name: "Li Na",
    email: "li.n@example.com",
    country: "China",
    joinDate: "2023-12-01",
    orders: 1,
    totalSpent: 89.99,
    status: "New" as const,
    lastOrderDate: "2023-12-01",
    segment: "New" as const,
  },
  {
    id: "CUST-045",
    name: "Paolo Conti",
    email: "paolo.c@example.com",
    country: "Italy",
    joinDate: "2023-02-08",
    orders: 15,
    totalSpent: 3520.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-12",
    segment: "Premium" as const,
  },
  {
    id: "CUST-046",
    name: "Megan Foster",
    email: "megan.f@example.com",
    country: "Australia",
    joinDate: "2023-07-27",
    orders: 8,
    totalSpent: 1670.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-04",
    segment: "Standard" as const,
  },
  {
    id: "CUST-047",
    name: "Hans Weber",
    email: "hans.w@example.com",
    country: "Germany",
    joinDate: "2023-05-15",
    orders: 12,
    totalSpent: 2780.0,
    status: "Active" as const,
    lastOrderDate: "2024-01-08",
    segment: "Premium" as const,
  },
  {
    id: "CUST-048",
    name: "Catherine Green",
    email: "catherine.g@example.com",
    country: "UK",
    joinDate: "2023-10-05",
    orders: 4,
    totalSpent: 680.0,
    status: "Inactive" as const,
    lastOrderDate: "2023-11-15",
    segment: "Standard" as const,
  },
  {
    id: "CUST-049",
    name: "Andre Silva",
    email: "andre.s@example.com",
    country: "Brazil",
    joinDate: "2023-08-22",
    orders: 6,
    totalSpent: 1130.0,
    status: "Active" as const,
    lastOrderDate: "2023-12-18",
    segment: "Standard" as const,
  },
  {
    id: "CUST-050",
    name: "Yuna Kim",
    email: "yuna.k@example.com",
    country: "SouthKorea",
    joinDate: "2023-11-19",
    orders: 2,
    totalSpent: 295.0,
    status: "New" as const,
    lastOrderDate: "2023-12-22",
    segment: "New" as const,
  },
];

type FiltersState = {
  status: "all" | Customer["status"];
  country: string | "all";
  segment: "all" | Customer["segment"];
  minOrders: number;
  maxOrders: number;
  minSpent: number;
  maxSpent: number;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  activeOnly: boolean;
};

export default function FiltersTable() {
  const [customers] = useState<Customer[]>(
    [...baseCustomers].sort((a, b) => a.id.localeCompare(b.id)),
  );

  const [filters, setFilters] = useState<FiltersState>({
    status: "all",
    country: "all",
    segment: "all",
    minOrders: 0,
    maxOrders: 20,
    minSpent: 0,
    maxSpent: 5000,
    dateRange: {
      from: undefined,
      to: undefined,
    },
    activeOnly: false,
  });

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [view, setView] = useState<"grid" | "table">("table");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const countries = useMemo(
    () => Array.from(new Set(customers.map((c) => c.country))).sort(),
    [customers],
  );

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      if (
        search &&
        !customer.name.toLowerCase().includes(search.toLowerCase()) &&
        !customer.email.toLowerCase().includes(search.toLowerCase()) &&
        !customer.id.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (filters.status !== "all" && customer.status !== filters.status) {
        return false;
      }
      if (filters.country !== "all" && customer.country !== filters.country) {
        return false;
      }
      if (filters.segment !== "all" && customer.segment !== filters.segment) {
        return false;
      }
      if (
        customer.orders < filters.minOrders ||
        customer.orders > filters.maxOrders
      ) {
        return false;
      }
      if (
        customer.totalSpent < filters.minSpent ||
        customer.totalSpent > filters.maxSpent
      ) {
        return false;
      }
      if (filters.dateRange.from || filters.dateRange.to) {
        const joinDate = new Date(customer.joinDate);
        if (filters.dateRange.from && joinDate < filters.dateRange.from)
          return false;
        if (filters.dateRange.to && joinDate > filters.dateRange.to)
          return false;
      }
      if (filters.activeOnly && customer.status !== "Active") return false;

      return true;
    });
  }, [customers, search, filters]);

  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCustomers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCustomers, currentPage]);

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600 border-green-500/60";
      case "Inactive":
        return "bg-amber-500/10 text-amber-600 border-amber-500/60";
      case "Suspended":
        return "bg-rose-500/10 text-rose-600 border-rose-500/60";
    }
  };

  const getSegmentColor = (segment: Customer["segment"]) => {
    switch (segment) {
      case "Premium":
        return "bg-purple-500/10 text-purple-600 border-purple-500/60";
      case "Standard":
        return "bg-blue-500/10 text-blue-600 border-blue-500/60";
      case "New":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/60";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const resetFilters = () => {
    setFilters({
      status: "all",
      country: "all",
      segment: "all",
      minOrders: 0,
      maxOrders: 20,
      minSpent: 0,
      maxSpent: 5000,
      dateRange: { from: undefined, to: undefined },
      activeOnly: false,
    });
    setSearch("");
    setCurrentPage(1);
  };

  const toggleCustomer = (id: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedCustomers.length === paginatedCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(paginatedCustomers.map((c) => c.id));
    }
  };

  const activeFilterCount =
    Object.entries(filters).filter(([key, value]) => {
      if (key === "dateRange" && typeof value === "object") {
        return value.from || value.to;
      }
      if (key === "activeOnly") {
        return value;
      }
      if (typeof value === "number") {
        return key === "minOrders" ? value > 0 : value > 0;
      }
      return value !== "all";
    }).length + (search ? 1 : 0);

  return (
    <main className="p-6 md:p-10">
      <Card className="w-full pt-0 shadow-none hover:shadow-xl/10 overflow-hidden transition-all duration-500">
        <CardHeader className="pt-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-4xl font-semibold">
                Customer Database
              </CardTitle>
              <p className="text-sm md:text-base text-foreground/60 mt-1">
                {filteredCustomers.length} customers found • {customers.length}{" "}
                total
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 cursor-pointer rounded-sm"
              >
                <SlidersHorizontal className="size-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-sm px-1.5">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="gap-2 cursor-pointer rounded-sm"
              >
                <RefreshCw className="size-4" />
                Reset
              </Button>
              <Button
                variant="outline"
                className="gap-2 cursor-pointer rounded-sm"
              >
                <Download className="size-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="size-4" />
                <span className="text-xs">Active</span>
              </div>
              <div className="text-2xl font-semibold">
                {customers.filter((c) => c.status === "Active").length}
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Globe className="size-4" />
                <span className="text-xs">Countries</span>
              </div>
              <div className="text-2xl font-semibold">{countries.length}</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <ShoppingBag className="size-4" />
                <span className="text-xs">Total Orders</span>
              </div>
              <div className="text-2xl font-semibold">
                {customers
                  .reduce((acc, c) => acc + c.orders, 0)
                  .toLocaleString()}
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="size-4" />
                <span className="text-xs">Total Revenue</span>
              </div>
              <div className="text-2xl font-semibold">
                $
                {customers
                  .reduce((acc, c) => acc + c.totalSpent, 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Filters Section */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-6"
              >
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Filter className="size-4" />
                      Advanced Filters
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="h-8 text-xs"
                    >
                      Clear all
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                      <Label className="text-xs mb-2 block">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="Name, email, or ID..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <Label className="text-xs mb-2 block">Status</Label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) =>
                          setFilters({
                            ...filters,
                            status: value as FiltersState["status"],
                          })
                        }
                      >
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Country */}
                    <div>
                      <Label className="text-xs mb-2 block">Country</Label>
                      <Select
                        value={filters.country}
                        onValueChange={(value) =>
                          setFilters({ ...filters, country: value })
                        }
                      >
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="All Countries" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Countries</SelectItem>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {countryFlags[country]} {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Segment */}
                    <div>
                      <Label className="text-xs mb-2 block">
                        Customer Segment
                      </Label>
                      <Select
                        value={filters.segment}
                        onValueChange={(value) =>
                          setFilters({
                            ...filters,
                            segment: value as FiltersState["segment"],
                          })
                        }
                      >
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="All Segments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Segments</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="New">New</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Orders Range */}
                    <div>
                      <Label className="text-xs mb-2 block">
                        Orders: {filters.minOrders} - {filters.maxOrders}
                      </Label>
                      <div className="px-2">
                        <Slider
                          min={0}
                          max={20}
                          step={1}
                          value={[filters.minOrders, filters.maxOrders]}
                          onValueChange={([min, max]) =>
                            setFilters({
                              ...filters,
                              minOrders: min,
                              maxOrders: max,
                            })
                          }
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Spent Range */}
                    <div>
                      <Label className="text-xs mb-2 block">
                        Spent: ${filters.minSpent} - ${filters.maxSpent}
                      </Label>
                      <div className="px-2">
                        <Slider
                          min={0}
                          max={5000}
                          step={100}
                          value={[filters.minSpent, filters.maxSpent]}
                          onValueChange={([min, max]) =>
                            setFilters({
                              ...filters,
                              minSpent: min,
                              maxSpent: max,
                            })
                          }
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Join Date Range */}
                    <div>
                      <Label className="text-xs mb-2 block">Join Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !filters.dateRange.from &&
                                !filters.dateRange.to &&
                                "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {filters.dateRange.from ? (
                              filters.dateRange.to ? (
                                <>
                                  {format(filters.dateRange.from, "LLL dd, y")}{" "}
                                  - {format(filters.dateRange.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(filters.dateRange.from, "LLL dd, y")
                              )
                            ) : (
                              "Pick a date range"
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={filters.dateRange.from}
                            selected={filters.dateRange as DateRange}
                            onSelect={(range) =>
                              setFilters({
                                ...filters,
                                dateRange: {
                                  from: range?.from,
                                  to: range?.to,
                                },
                              })
                            }
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Active Only */}
                    <div className="flex items-end">
                      <div className="flex items-center space-x-2 pb-1">
                        <Checkbox
                          id="activeOnly"
                          checked={filters.activeOnly}
                          onCheckedChange={(checked) =>
                            setFilters({
                              ...filters,
                              activeOnly: checked as boolean,
                            })
                          }
                        />
                        <Label
                          htmlFor="activeOnly"
                          className="text-sm cursor-pointer"
                        >
                          Show only active customers
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Toggle */}
          <div className="flex justify-between items-center mb-4">
            <Tabs
              value={view}
              onValueChange={(v) => setView(v as "grid" | "table")}
            >
              <TabsList>
                <TabsTrigger value="table" className="cursor-pointer">
                  Table View
                </TabsTrigger>
                <TabsTrigger value="grid" className="cursor-pointer">
                  Grid View
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedCustomers.length} selected
              </span>
            </div>
          </div>

          {/* Table View */}
          {view === "table" && (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedCustomers.length ===
                            paginatedCustomers.length &&
                          paginatedCustomers.length > 0
                        }
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead className="w-72">
                      <div className="flex items-center gap-2">
                        <Users className="size-4" />
                        Customer
                      </div>
                    </TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="wait">
                    {paginatedCustomers.map((customer, index) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={cn(
                          "group hover:bg-muted/50 transition-colors border-b last:border-0",
                          selectedCustomers.includes(customer.id) &&
                            "bg-muted/30",
                        )}
                      >
                        <TableCell className="p-3">
                          <Checkbox
                            checked={selectedCustomers.includes(customer.id)}
                            onCheckedChange={() => toggleCustomer(customer.id)}
                          />
                        </TableCell>
                        <TableCell className="p-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-10 border-0 rounded-sm">
                              <AvatarFallback
                                className={`${avatarColors[parseInt(customer.id.split("-")[1]) % avatarColors.length]} text-white rounded-sm`}
                              >
                                {customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">
                                {customer.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {customer.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{customer.email}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {countryFlags[customer.country]} {customer.country}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(customer.joinDate)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="size-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {customer.orders}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold">
                          ${customer.totalSpent.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${getSegmentColor(customer.segment)} font-medium`}
                          >
                            {customer.segment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(customer.status)} font-medium`}
                          >
                            {customer.status}
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
                                <Mail className="size-4" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-rose-600">
                                <X className="size-4" />
                                Suspend
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
          )}

          {/* Grid View */}
          {view === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="wait">
                {paginatedCustomers.map((customer, index) => (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "border rounded-lg p-4 hover:shadow-lg transition-all duration-300",
                      selectedCustomers.includes(customer.id) &&
                        "ring-2 ring-primary",
                    )}
                    onClick={() => toggleCustomer(customer.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-12 border-0 rounded-sm">
                          <AvatarFallback
                            className={`${avatarColors[parseInt(customer.id.split("-")[1]) % avatarColors.length]} text-white rounded-sm`}
                          >
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{customer.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {customer.id}
                          </p>
                        </div>
                      </div>
                      <Checkbox
                        checked={selectedCustomers.includes(customer.id)}
                      />
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="size-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="size-4" />
                        {countryFlags[customer.country]} {customer.country}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="size-4" />
                        Joined {formatDate(customer.joinDate)}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Orders</p>
                        <p className="font-semibold">{customer.orders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Spent
                        </p>
                        <p className="font-bold">
                          ${customer.totalSpent.toFixed(2)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={getStatusColor(customer.status)}
                      >
                        {customer.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No customers found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={resetFilters} variant="outline">
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredCustomers.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <div>
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredCustomers.length,
                )}{" "}
                of {filteredCustomers.length} customers
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
          )}
        </CardContent>
      </Card>
    </main>
  );
}
