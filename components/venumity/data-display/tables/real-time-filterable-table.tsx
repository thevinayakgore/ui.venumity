"use client";
import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bug,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Info,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
  XCircle,
  Terminal,
  Globe,
  Database,
  Lock,
  Mail,
  Shield,
  Cpu,
  Wifi,
  CreditCardIcon,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "debug";
  source: string;
  message: string;
  user: string;
  ip?: string;
  duration?: number;
}

const sourceIcons: Record<string, LucideIcon> = {
  "API Server": Globe,
  Database: Database,
  "Auth Service": Lock,
  "Web Server": Globe,
  "Cache Service": Cpu,
  "Payment Gateway": CreditCardIcon,
  "Email Service": Mail,
  Security: Shield,
  Network: Wifi,
};

const levelColors = {
  info: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
    icon: Info,
  },
  warning: {
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-500/20",
    icon: AlertTriangle,
  },
  error: {
    bg: "bg-rose-500/10",
    text: "text-rose-600",
    border: "border-rose-500/20",
    icon: XCircle,
  },
  debug: {
    bg: "bg-slate-500/10",
    text: "text-slate-600",
    border: "border-slate-500/20",
    icon: Bug,
  },
};

import { forwardRef } from "react";

const CreditCard = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <svg
    ref={ref}
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
));
CreditCard.displayName = "CreditCard";

type DateRangeFilter = {
  from?: Date;
  to?: Date;
};

type FiltersState = {
  level: "all" | LogEntry["level"];
  source: string | "all";
  search: string;
  timeRange: "all" | "last5" | "last15" | "last30" | "last60";
  dateRange: DateRangeFilter;
  minDuration: number;
  maxDuration: number;
  showOnlyErrors: boolean;
};

export default function RealTimeFilterableTable() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2024-04-15 14:30:25",
      level: "info",
      source: "API Server",
      message: "User login successful",
      user: "john.doe",
      ip: "192.168.1.100",
      duration: 45,
    },
    {
      id: "2",
      timestamp: "2024-04-15 14:31:10",
      level: "error",
      source: "Database",
      message: "Connection timeout after 30s",
      user: "system",
      ip: "127.0.0.1",
      duration: 30000,
    },
    {
      id: "3",
      timestamp: "2024-04-15 14:32:45",
      level: "warning",
      source: "Auth Service",
      message: "Failed login attempt from suspicious IP",
      user: "unknown",
      ip: "45.123.45.67",
      duration: 120,
    },
    {
      id: "4",
      timestamp: "2024-04-15 14:33:20",
      level: "info",
      source: "Web Server",
      message: "Page loaded successfully",
      user: "visitor",
      ip: "10.0.0.45",
      duration: 234,
    },
    {
      id: "5",
      timestamp: "2024-04-15 14:34:05",
      level: "debug",
      source: "Cache Service",
      message: "Cache miss for key: user_123",
      user: "system",
      ip: "127.0.0.1",
      duration: 5,
    },
    {
      id: "6",
      timestamp: "2024-04-15 14:35:30",
      level: "error",
      source: "Payment Gateway",
      message: "Payment processing failed: insufficient funds",
      user: "customer_456",
      ip: "192.168.1.150",
      duration: 1500,
    },
    {
      id: "7",
      timestamp: "2024-04-15 14:36:15",
      level: "info",
      source: "Email Service",
      message: "Email sent successfully",
      user: "marketing",
      ip: "10.0.0.23",
      duration: 890,
    },
    {
      id: "8",
      timestamp: "2024-04-15 14:37:00",
      level: "warning",
      source: "Security",
      message: "Multiple failed attempts detected from IP",
      user: "unknown",
      ip: "78.45.23.12",
      duration: 0,
    },
  ]);

  const [filters, setFilters] = useState<FiltersState>({
    level: "all",
    source: "all",
    search: "",
    timeRange: "all",
    dateRange: {
      from: undefined,
      to: undefined,
    },
    minDuration: 0,
    maxDuration: 30000,
    showOnlyErrors: false,
  });

  const [autoRefresh, setAutoRefresh] = useState(true);
  const [view, setView] = useState<"table" | "compact">("table");
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({
    info: 0,
    warning: 0,
    error: 0,
    debug: 0,
  });

  const filteredLogs = logs.filter((log) => {
    if (
      filters.search &&
      !log.message.toLowerCase().includes(filters.search.toLowerCase()) &&
      !log.source.toLowerCase().includes(filters.search.toLowerCase()) &&
      !log.user.toLowerCase().includes(filters.search.toLowerCase()) &&
      !log.ip?.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    if (filters.level !== "all" && log.level !== filters.level) {
      return false;
    }

    if (filters.source !== "all" && log.source !== filters.source) {
      return false;
    }

    if (filters.showOnlyErrors && log.level !== "error") {
      return false;
    }

    if (filters.minDuration > 0 || filters.maxDuration < 30000) {
      const duration = log.duration || 0;
      if (duration < filters.minDuration || duration > filters.maxDuration) {
        return false;
      }
    }

    if (filters.timeRange !== "all") {
      const logTime = new Date(log.timestamp).getTime();
      const now = new Date().getTime();
      const minutes = (now - logTime) / (1000 * 60);

      switch (filters.timeRange) {
        case "last5":
          if (minutes > 5) return false;
          break;
        case "last15":
          if (minutes > 15) return false;
          break;
        case "last30":
          if (minutes > 30) return false;
          break;
        case "last60":
          if (minutes > 60) return false;
          break;
      }
    }

    if (filters.dateRange.from || filters.dateRange.to) {
      const logDate = new Date(log.timestamp);
      if (filters.dateRange.from && logDate < filters.dateRange.from)
        return false;
      if (filters.dateRange.to && logDate > filters.dateRange.to) return false;
    }

    return true;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const newStats = logs.reduce(
        (acc, log) => {
          acc[log.level]++;
          return acc;
        },
        { info: 0, warning: 0, error: 0, debug: 0 },
      );
      setStats(newStats);
    }, 0);

    return () => clearTimeout(timer);
  }, [logs]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const levels: LogEntry["level"][] = ["info", "warning", "error", "debug"];
      const sources = [
        "API Server",
        "Database",
        "Auth Service",
        "Web Server",
        "Cache Service",
        "Payment Gateway",
        "Email Service",
        "Security",
      ];
      const messages = [
        "New user registered",
        "Database query executed",
        "Cache updated",
        "API request processed",
        "Security scan completed",
        "Backup started",
        "System maintenance",
        "Performance metrics collected",
        "Rate limit exceeded",
        "SSL certificate renewed",
        "Load balancer health check",
        "Container started",
      ];
      const users = [
        "system",
        "admin",
        "user_123",
        "visitor",
        "api_client",
        "batch_job",
      ];
      const ips = [
        "192.168.1.1",
        "10.0.0.1",
        "172.16.0.1",
        "45.123.45.67",
        "78.45.23.12",
        "127.0.0.1",
      ];

      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        level: levels[Math.floor(Math.random() * levels.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        user: users[Math.floor(Math.random() * users.length)],
        ip: ips[Math.floor(Math.random() * ips.length)],
        duration: Math.floor(Math.random() * 5000),
      };

      setLogs((prev) => {
        const updated = [newLog, ...prev];
        return updated.slice(0, 100); // Keep last 100 logs
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const clearLogs = () => {
    setLogs([]);
    setSelectedLogs([]);
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `logs_${new Date().toISOString()}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const sources = Array.from(new Set(logs.map((log) => log.source)));

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "dateRange" && typeof value === "object" && value !== null) {
      return value.from || value.to;
    }

    if (key === "showOnlyErrors") {
      return value === true;
    }

    if (key === "minDuration" && typeof value === "number") {
      return value > 0;
    }

    if (key === "maxDuration" && typeof value === "number") {
      return value < 30000;
    }

    if (typeof value === "string") {
      return value !== "all" && value !== "";
    }

    return false;
  }).length;

  return (
    <main className="p-6 md:p-10">
      <Card className="w-full pt-0 shadow-none hover:shadow-xl/10 overflow-hidden transition-all duration-500">
        <CardHeader className="pt-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <CardTitle className="text-4xl font-semibold">
                  System Logs
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-600 border-green-500/20"
                >
                  <Activity className="size-3 mr-1 animate-pulse" />
                  LIVE
                </Badge>
              </div>
              <p className="text-sm md:text-base text-foreground/60 mt-1">
                Real-time monitoring and filtering • {filteredLogs.length} logs
                shown
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-muted/30 px-3 py-1 rounded-lg">
                <Switch
                  id="auto-refresh"
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
                <Label
                  htmlFor="auto-refresh"
                  className="text-sm cursor-pointer"
                >
                  Auto-refresh
                </Label>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={exportLogs}
                className="gap-2 cursor-pointer rounded-sm"
              >
                <Download className="size-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearLogs}
                className="gap-2 cursor-pointer rounded-sm text-rose-600 hover:text-rose-700 hover:bg-rose-500/10"
              >
                <Trash2 className="size-4" />
                Clear
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              {
                level: "info",
                label: "Info",
                count: stats.info,
                icon: Info,
                color: "blue",
              },
              {
                level: "warning",
                label: "Warnings",
                count: stats.warning,
                icon: AlertTriangle,
                color: "amber",
              },
              {
                level: "error",
                label: "Errors",
                count: stats.error,
                icon: XCircle,
                color: "rose",
              },
              {
                level: "debug",
                label: "Debug",
                count: stats.debug,
                icon: Bug,
                color: "slate",
              },
            ].map((stat) => (
              <motion.div
                key={stat.level}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "rounded-lg p-3 border",
                  `bg-${stat.color}-500/5 border-${stat.color}-500/20`,
                )}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "text-2xl font-bold",
                      `text-${stat.color}-600`,
                    )}
                  >
                    {stat.count}
                  </div>
                  <stat.icon
                    className={cn("size-5", `text-${stat.color}-500`)}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Filters */}
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="size-4" />
                <h3 className="font-semibold">Filters</h3>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount} active
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setFilters({
                    level: "all",
                    source: "all",
                    search: "",
                    timeRange: "all",
                    dateRange: { from: undefined, to: undefined },
                    minDuration: 0,
                    maxDuration: 30000,
                    showOnlyErrors: false,
                  })
                }
                className="h-8 text-xs"
              >
                Clear all
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <Label className="text-xs mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Log Level */}
              <div>
                <Label className="text-xs mb-2 block">Log Level</Label>
                <Select
                  value={filters.level}
                  onValueChange={(value) =>
                    setFilters({
                      ...filters,
                      level: value as FiltersState["level"],
                    })
                  }
                >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Source */}
              <div>
                <Label className="text-xs mb-2 block">Source</Label>
                <Select
                  value={filters.source}
                  onValueChange={(value) =>
                    setFilters({ ...filters, source: value })
                  }
                >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {sources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Range */}
              <div>
                <Label className="text-xs mb-2 block">Time Range</Label>
                <Select
                  value={filters.timeRange}
                  onValueChange={(value) =>
                    setFilters({
                      ...filters,
                      timeRange: value as FiltersState["timeRange"],
                    })
                  }
                >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last5">Last 5 minutes</SelectItem>
                    <SelectItem value="last15">Last 15 minutes</SelectItem>
                    <SelectItem value="last30">Last 30 minutes</SelectItem>
                    <SelectItem value="last60">Last 1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration Range */}
              <div className="lg:col-span-2">
                <Label className="text-xs mb-2 block">
                  Duration: {filters.minDuration}ms - {filters.maxDuration}ms
                </Label>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={30000}
                    step={100}
                    value={[filters.minDuration, filters.maxDuration]}
                    onValueChange={([min, max]) =>
                      setFilters({
                        ...filters,
                        minDuration: min,
                        maxDuration: max,
                      })
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <Label className="text-xs mb-2 block">Custom Date Range</Label>
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
                      <Clock className="mr-2 size-4" />
                      {filters.dateRange.from ? (
                        filters.dateRange.to ? (
                          <>
                            {filters.dateRange.from.toLocaleDateString()} -{" "}
                            {filters.dateRange.to.toLocaleDateString()}
                          </>
                        ) : (
                          filters.dateRange.from.toLocaleDateString()
                        )
                      ) : (
                        "Select date range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={filters.dateRange as DateRange}
                      onSelect={(range) =>
                        setFilters({
                          ...filters,
                          dateRange: { from: range?.from, to: range?.to },
                        })
                      }
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Show Only Errors */}
              <div className="flex items-end">
                <div className="flex items-center space-x-2 pb-1">
                  <Switch
                    id="showOnlyErrors"
                    checked={filters.showOnlyErrors}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, showOnlyErrors: checked })
                    }
                  />
                  <Label
                    htmlFor="showOnlyErrors"
                    className="text-sm cursor-pointer"
                  >
                    Show only errors
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle and Actions */}
          <div className="flex justify-between items-center mb-4">
            <Tabs
              value={view}
              onValueChange={(v) => setView(v as "table" | "compact")}
            >
              <TabsList>
                <TabsTrigger value="table" className="cursor-pointer">
                  <Terminal className="size-4 mr-2" />
                  Detailed
                </TabsTrigger>
                <TabsTrigger value="compact" className="cursor-pointer">
                  <Activity className="size-4 mr-2" />
                  Compact
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              {autoRefresh && (
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-600 animate-pulse"
                >
                  <RefreshCw className="size-3 mr-1" />
                  Live
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {selectedLogs.length} selected
              </span>
            </div>
          </div>

          {/* Table View */}
          {view === "table" && (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-48">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4" />
                        Timestamp
                      </div>
                    </TableHead>
                    <TableHead className="w-24">Level</TableHead>
                    <TableHead className="w-32">Source</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="w-32">User</TableHead>
                    <TableHead className="w-32">IP Address</TableHead>
                    <TableHead className="w-24 text-right">Duration</TableHead>
                    <TableHead className="w-20 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredLogs.map((log, index) => {
                      const LevelIcon = levelColors[log.level].icon;
                      const SourceIcon = sourceIcons[log.source] || Terminal;

                      return (
                        <motion.tr
                          key={log.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          className={cn(
                            "group hover:bg-muted/50 transition-colors border-b last:border-0",
                            log.level === "error" && "bg-rose-500/5",
                          )}
                        >
                          <TableCell className="py-3 font-mono text-sm">
                            {log.timestamp}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                levelColors[log.level].bg,
                                levelColors[log.level].text,
                                levelColors[log.level].border,
                                "font-medium gap-1",
                              )}
                            >
                              <LevelIcon className="size-3" />
                              {log.level.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <SourceIcon className="size-4 text-muted-foreground" />
                              <span className="text-sm">{log.source}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-mono text-sm">
                              {log.message}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {log.user}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground font-mono">
                              {log.ip || "N/A"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {log.duration ? (
                              <span className="text-sm font-mono">
                                {log.duration}ms
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                -
                              </span>
                            )}
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
                                  <AlertCircle className="size-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <CheckCircle2 className="size-4" />
                                  Mark as Reviewed
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          )}

          {/* Compact View */}
          {view === "compact" && (
            <div className="space-y-2">
              <AnimatePresence>
                {filteredLogs.map((log, index) => {
                  const LevelIcon = levelColors[log.level].icon;

                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-lg border",
                        levelColors[log.level].bg,
                        levelColors[log.level].border,
                        "hover:shadow-md transition-all",
                      )}
                    >
                      <LevelIcon
                        className={cn("size-5", levelColors[log.level].text)}
                      />
                      <div className="font-mono text-xs text-muted-foreground w-32">
                        {log.timestamp}
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(levelColors[log.level].text)}
                      >
                        {log.source}
                      </Badge>
                      <div className="flex-1 font-mono text-sm truncate">
                        {log.message}
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">
                        {log.user}
                      </Badge>
                      {log.duration && (
                        <span className="text-xs text-muted-foreground">
                          {log.duration}ms
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {filteredLogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Terminal className="size-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No logs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or wait for new logs
              </p>
              <Button
                onClick={() =>
                  setFilters({
                    level: "all",
                    source: "all",
                    search: "",
                    timeRange: "all",
                    dateRange: { from: undefined, to: undefined },
                    minDuration: 0,
                    maxDuration: 30000,
                    showOnlyErrors: false,
                  })
                }
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Footer */}
          {filteredLogs.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <div>
                Showing {filteredLogs.length} of {logs.length} logs
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>Info</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Error</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse" />
                  <span>Debug</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
