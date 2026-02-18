"use client";
import { useState, useMemo } from "react";
import type { DateRange } from "react-day-picker";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  CalendarIcon,
  CheckCircle2,
  Circle,
  Clock,
  Filter,
  Flag,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Tag,
  User,
  Users,
  Save,
  Trash2,
  Eye,
  Edit,
  Copy,
  Archive,
  AlertTriangle,
  Zap,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type DateRangeFilter = {
  from?: Date;
  to?: Date;
};

type FiltersState = {
  status: "all" | Task["status"];
  priority: "all" | Task["priority"];
  assignee: "all" | string;
  search: string;
  dueDateRange: DateRangeFilter;
  showCompleted: boolean;
  tags: string[];
};

interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Todo" | "In Progress" | "Review" | "Done";
  dueDate: string;
  tags: string[];
  description?: string;
  attachments?: number;
  comments?: number;
  progress?: number;
}

interface SavedView {
  id: string;
  name: string;
  filters: Partial<FiltersState>;
  icon?: React.ReactNode;
}

const priorityColors = {
  Low: {
    bg: "bg-slate-500/10",
    text: "text-slate-600",
    border: "border-slate-500/20",
    icon: Circle,
  },
  Medium: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
    icon: Flag,
  },
  High: {
    bg: "bg-orange-500/10",
    text: "text-orange-600",
    border: "border-orange-500/20",
    icon: AlertTriangle,
  },
  Urgent: {
    bg: "bg-rose-500/10",
    text: "text-rose-600",
    border: "border-rose-500/20",
    icon: Zap,
  },
};

const statusColors = {
  Todo: {
    bg: "bg-slate-500/10",
    text: "text-slate-600",
    border: "border-slate-500/20",
    icon: Circle,
  },
  "In Progress": {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
    icon: Clock,
  },
  Review: {
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-500/20",
    icon: Eye,
  },
  Done: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-500/20",
    icon: CheckCircle2,
  },
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
];

export default function FilterableTableWithSavedViews() {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design Homepage",
      assignee: "John Doe",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-04-20",
      tags: ["Design", "Web"],
      description: "Create responsive homepage design with modern UI",
      attachments: 3,
      comments: 5,
      progress: 65,
    },
    {
      id: 2,
      title: "Fix Login Bug",
      assignee: "Sarah Smith",
      priority: "Urgent",
      status: "Todo",
      dueDate: "2024-04-16",
      tags: ["Bug", "Auth"],
      description: "Users unable to login with Google OAuth",
      attachments: 1,
      comments: 8,
      progress: 0,
    },
    {
      id: 3,
      title: "Write Documentation",
      assignee: "Mike Johnson",
      priority: "Medium",
      status: "Review",
      dueDate: "2024-04-25",
      tags: ["Docs", "API"],
      description: "Complete API documentation with examples",
      attachments: 5,
      comments: 2,
      progress: 90,
    },
    {
      id: 4,
      title: "Deploy to Production",
      assignee: "John Doe",
      priority: "High",
      status: "Todo",
      dueDate: "2024-04-18",
      tags: ["DevOps", "Deployment"],
      description: "Deploy v2.0.0 to production servers",
      attachments: 2,
      comments: 3,
      progress: 0,
    },
    {
      id: 5,
      title: "User Testing",
      assignee: "Emily Wilson",
      priority: "Medium",
      status: "In Progress",
      dueDate: "2024-04-22",
      tags: ["Testing", "UX"],
      description: "Conduct user testing sessions for new features",
      attachments: 4,
      comments: 6,
      progress: 45,
    },
    {
      id: 6,
      title: "Update Dependencies",
      assignee: "Alex Brown",
      priority: "Low",
      status: "Done",
      dueDate: "2024-04-15",
      tags: ["Maintenance"],
      description: "Update all npm packages to latest versions",
      attachments: 0,
      comments: 1,
      progress: 100,
    },
    {
      id: 7,
      title: "Create Marketing Materials",
      assignee: "Lisa Taylor",
      priority: "Medium",
      status: "Todo",
      dueDate: "2024-04-30",
      tags: ["Marketing", "Design"],
      description: "Design social media graphics and email templates",
      attachments: 6,
      comments: 4,
      progress: 0,
    },
    {
      id: 8,
      title: "Security Audit",
      assignee: "David Miller",
      priority: "Urgent",
      status: "Review",
      dueDate: "2024-04-17",
      tags: ["Security", "Audit"],
      description: "Perform comprehensive security audit",
      attachments: 3,
      comments: 7,
      progress: 85,
    },
    {
      id: 9,
      title: "Optimize Database Queries",
      assignee: "Sarah Smith",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-04-21",
      tags: ["Database", "Performance"],
      description: "Optimize slow running queries",
      attachments: 2,
      comments: 3,
      progress: 30,
    },
    {
      id: 10,
      title: "Create Onboarding Guide",
      assignee: "Mike Johnson",
      priority: "Medium",
      status: "Todo",
      dueDate: "2024-04-28",
      tags: ["Docs", "Onboarding"],
      description: "Write comprehensive onboarding guide for new users",
      attachments: 4,
      comments: 1,
      progress: 0,
    },
    {
      id: 11,
      title: "Fix Responsive Issues",
      assignee: "Emily Wilson",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-04-19",
      tags: ["Design", "Bug"],
      description: "Fix mobile responsive issues on dashboard",
      attachments: 2,
      comments: 4,
      progress: 50,
    },
    {
      id: 12,
      title: "Implement Analytics",
      assignee: "Alex Brown",
      priority: "Medium",
      status: "Review",
      dueDate: "2024-04-23",
      tags: ["Analytics", "Feature"],
      description: "Add analytics tracking to key user actions",
      attachments: 1,
      comments: 2,
      progress: 95,
    },
    {
      id: 13,
      title: "Update Privacy Policy",
      assignee: "Lisa Taylor",
      priority: "High",
      status: "Todo",
      dueDate: "2024-04-26",
      tags: ["Legal", "Docs"],
      description: "Update privacy policy for GDPR compliance",
      attachments: 2,
      comments: 0,
      progress: 0,
    },
    {
      id: 14,
      title: "Performance Testing",
      assignee: "David Miller",
      priority: "Medium",
      status: "In Progress",
      dueDate: "2024-04-24",
      tags: ["Testing", "Performance"],
      description: "Run load tests on API endpoints",
      attachments: 3,
      comments: 5,
      progress: 60,
    },
    {
      id: 15,
      title: "Refactor Components",
      assignee: "John Doe",
      priority: "Low",
      status: "Todo",
      dueDate: "2024-05-01",
      tags: ["Code", "Refactor"],
      description: "Refactor class components to functional",
      attachments: 0,
      comments: 2,
      progress: 0,
    },
    {
      id: 16,
      title: "Setup CI/CD Pipeline",
      assignee: "Sarah Smith",
      priority: "High",
      status: "Done",
      dueDate: "2024-04-14",
      tags: ["DevOps", "CI/CD"],
      description: "Configure GitHub Actions for automated deployment",
      attachments: 2,
      comments: 4,
      progress: 100,
    },
    {
      id: 17,
      title: "Create Component Library",
      assignee: "Emily Wilson",
      priority: "Medium",
      status: "Review",
      dueDate: "2024-04-27",
      tags: ["Design", "Code"],
      description: "Build reusable component library with Storybook",
      attachments: 5,
      comments: 3,
      progress: 80,
    },
    {
      id: 18,
      title: "Write Unit Tests",
      assignee: "Alex Brown",
      priority: "Medium",
      status: "In Progress",
      dueDate: "2024-04-29",
      tags: ["Testing", "Code"],
      description: "Increase test coverage to 80%",
      attachments: 1,
      comments: 2,
      progress: 40,
    },
    {
      id: 19,
      title: "Accessibility Audit",
      assignee: "Lisa Taylor",
      priority: "High",
      status: "Todo",
      dueDate: "2024-05-02",
      tags: ["Accessibility", "Audit"],
      description: "WCAG 2.1 compliance audit",
      attachments: 0,
      comments: 0,
      progress: 0,
    },
    {
      id: 20,
      title: "API Rate Limiting",
      assignee: "David Miller",
      priority: "Medium",
      status: "Todo",
      dueDate: "2024-05-03",
      tags: ["API", "Security"],
      description: "Implement rate limiting for API endpoints",
      attachments: 1,
      comments: 2,
      progress: 0,
    },
  ]);

  const [filters, setFilters] = useState<FiltersState>({
    status: "all",
    priority: "all",
    assignee: "all",
    search: "",
    dueDateRange: {
      from: undefined,
      to: undefined,
    },
    showCompleted: true,
    tags: [],
  });

  const [savedViews, setSavedViews] = useState<SavedView[]>([
    {
      id: "1",
      name: "My Tasks",
      filters: { status: "all", priority: "all", assignee: "John Doe" },
      icon: <User className="size-3" />,
    },
    {
      id: "2",
      name: "Urgent Tasks",
      filters: { status: "all", priority: "Urgent", assignee: "all" },
      icon: <Zap className="size-3" />,
    },
    {
      id: "3",
      name: "In Progress",
      filters: { status: "In Progress", priority: "all", assignee: "all" },
      icon: <Clock className="size-3" />,
    },
    {
      id: "4",
      name: "Due This Week",
      filters: { status: "all", priority: "all", assignee: "all" },
      icon: <CalendarIcon className="size-3" />,
    },
  ]);

  const [viewName, setViewName] = useState("");
  const [activeView, setActiveView] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "board">("table");

  const assignees = Array.from(new Set(tasks.map((t) => t.assignee)));
  const allTags = Array.from(new Set(tasks.flatMap((t) => t.tags)));

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (
        filters.search &&
        !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !task.description?.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (filters.status !== "all" && task.status !== filters.status) {
        return false;
      }

      if (filters.priority !== "all" && task.priority !== filters.priority) {
        return false;
      }

      if (filters.assignee !== "all" && task.assignee !== filters.assignee) {
        return false;
      }

      if (!filters.showCompleted && task.status === "Done") {
        return false;
      }

      if (
        filters.tags.length > 0 &&
        !filters.tags.some((tag) => task.tags.includes(tag))
      ) {
        return false;
      }

      if (filters.dueDateRange.from || filters.dueDateRange.to) {
        const dueDate = new Date(task.dueDate);
        if (filters.dueDateRange.from && dueDate < filters.dueDateRange.from)
          return false;
        if (filters.dueDateRange.to && dueDate > filters.dueDateRange.to)
          return false;
      }

      return true;
    });
  }, [tasks, filters]);

  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "Todo").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      review: tasks.filter((t) => t.status === "Review").length,
      done: tasks.filter((t) => t.status === "Done").length,
      urgent: tasks.filter((t) => t.priority === "Urgent").length,
    };
  }, [tasks]);

  const applyView = (view: SavedView) => {
    setFilters((prev) => ({
      ...prev,
      ...view.filters,
    }));
    setActiveView(view.id);
  };

  const saveCurrentView = () => {
    if (!viewName.trim()) return;

    const newView: SavedView = {
      id: Date.now().toString(),
      name: viewName,
      filters: {
        status: filters.status,
        priority: filters.priority,
        assignee: filters.assignee,
        search: filters.search,
        dueDateRange: filters.dueDateRange,
        showCompleted: filters.showCompleted,
        tags: filters.tags,
      },
      icon: <Sparkles className="size-3" />,
    };

    setSavedViews([...savedViews, newView]);
    setViewName("");
    setActiveView(newView.id);
  };

  const deleteView = (id: string) => {
    setSavedViews(savedViews.filter((view) => view.id !== id));
    if (activeView === id) {
      setActiveView(null);
    }
  };

  const toggleTask = (id: number) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map((t) => t.id));
    }
  };

  const getDueDateStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 0) return "overdue";
    if (diffDays === 0) return "today";
    if (diffDays <= 3) return "soon";
    return "normal";
  };

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "dueDateRange" && typeof value === "object" && value !== null) {
      return Boolean(
        (value as DateRangeFilter).from || (value as DateRangeFilter).to,
      );
    }

    if (key === "tags" && Array.isArray(value)) {
      return value.length > 0;
    }

    if (key === "showCompleted") {
      return value === false;
    }

    if (typeof value === "string") {
      return value !== "all" && value !== "";
    }

    return false;
  }).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="p-6 md:p-10">
      <Card className="w-full pt-0 shadow-none hover:shadow-xl/10 overflow-hidden transition-all duration-500">
        <CardHeader className="pt-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-4xl font-semibold">
                Task Management
              </CardTitle>
              <p className="text-sm md:text-base text-foreground/60 mt-1">
                {filteredTasks.length} tasks found • {taskStats.done} completed
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer rounded-sm"
              >
                <Archive className="size-4" />
                Archive
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-500 cursor-pointer rounded-sm">
                <Plus className="size-4" />
                New Task
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            {[
              {
                label: "Total",
                value: taskStats.total,
                icon: Users,
                color: "blue",
              },
              {
                label: "To Do",
                value: taskStats.todo,
                icon: Circle,
                color: "slate",
              },
              {
                label: "In Progress",
                value: taskStats.inProgress,
                icon: Clock,
                color: "blue",
              },
              {
                label: "Review",
                value: taskStats.review,
                icon: Eye,
                color: "amber",
              },
              {
                label: "Urgent",
                value: taskStats.urgent,
                icon: Zap,
                color: "rose",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
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
                    {stat.value}
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
          {/* Saved Views */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Star className="size-4" />
                Saved Views
              </h3>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="View name..."
                  value={viewName}
                  onChange={(e) => setViewName(e.target.value)}
                  className="h-8 w-40 text-sm"
                />
                <Button
                  size="sm"
                  onClick={saveCurrentView}
                  disabled={!viewName.trim()}
                  className="h-8 gap-1"
                >
                  <Save className="size-3" />
                  Save
                </Button>
              </div>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex gap-2">
                {savedViews.map((view) => (
                  <div key={view.id} className="flex items-center shrink-0">
                    <Button
                      variant={activeView === view.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => applyView(view)}
                      className={cn(
                        "rounded-r-none gap-2",
                        activeView === view.id &&
                          "bg-blue-600 hover:bg-blue-500",
                      )}
                    >
                      {view.icon}
                      {view.name}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteView(view.id)}
                      className="rounded-l-none border-l-0 px-2"
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

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
                    status: "all",
                    priority: "all",
                    assignee: "all",
                    search: "",
                    dueDateRange: { from: undefined, to: undefined },
                    showCompleted: true,
                    tags: [],
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
                    placeholder="Search tasks..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
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
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div>
                <Label className="text-xs mb-2 block">Priority</Label>
                <Select
                  value={filters.priority}
                  onValueChange={(value) =>
                    setFilters({
                      ...filters,
                      priority: value as FiltersState["priority"],
                    })
                  }
                >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="All Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assignee */}
              <div>
                <Label className="text-xs mb-2 block">Assignee</Label>
                <Select
                  value={filters.assignee}
                  onValueChange={(value) =>
                    setFilters({
                      ...filters,
                      assignee: value as FiltersState["assignee"],
                    })
                  }
                >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="All Assignees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    {assignees.map((assignee) => (
                      <SelectItem key={assignee} value={assignee}>
                        {assignee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date Range */}
              <div>
                <Label className="text-xs mb-2 block">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.dueDateRange.from &&
                          !filters.dueDateRange.to &&
                          "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {filters.dueDateRange.from ? (
                        filters.dueDateRange.to ? (
                          <>
                            {format(filters.dueDateRange.from, "MMM d")} -{" "}
                            {format(filters.dueDateRange.to, "MMM d")}
                          </>
                        ) : (
                          format(filters.dueDateRange.from, "MMM d")
                        )
                      ) : (
                        "Select range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={filters.dueDateRange as DateRange}
                      onSelect={(range) =>
                        setFilters({
                          ...filters,
                          dueDateRange: { from: range?.from, to: range?.to },
                        })
                      }
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Tags */}
              <div>
                <Label className="text-xs mb-2 block">Tags</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Tag className="mr-2 size-4" />
                      {filters.tags.length > 0
                        ? `${filters.tags.length} selected`
                        : "Select tags"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-50 p-0">
                    <Command>
                      <CommandInput placeholder="Search tags..." />
                      <CommandList>
                        <CommandEmpty>No tags found.</CommandEmpty>
                        <CommandGroup>
                          {allTags.map((tag) => (
                            <CommandItem
                              key={tag}
                              onSelect={() => {
                                setFilters({
                                  ...filters,
                                  tags: filters.tags.includes(tag)
                                    ? filters.tags.filter((t) => t !== tag)
                                    : [...filters.tags, tag],
                                });
                              }}
                            >
                              <Checkbox
                                checked={filters.tags.includes(tag)}
                                className="mr-2"
                              />
                              {tag}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Show Completed */}
              <div className="flex items-end">
                <div className="flex items-center space-x-2 pb-1">
                  <Checkbox
                    id="showCompleted"
                    checked={filters.showCompleted}
                    onCheckedChange={(checked) =>
                      setFilters({
                        ...filters,
                        showCompleted: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="showCompleted"
                    className="text-sm cursor-pointer"
                  >
                    Show completed tasks
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle and Selection */}
          <div className="flex justify-between items-center mb-4">
            <Tabs
              value={viewMode}
              onValueChange={(v) => setViewMode(v as "table" | "board")}
            >
              <TabsList>
                <TabsTrigger value="table" className="cursor-pointer">
                  Table View
                </TabsTrigger>
                <TabsTrigger value="board" className="cursor-pointer">
                  Board View
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              {selectedTasks.length > 0 && (
                <>
                  <span className="text-sm text-muted-foreground">
                    {selectedTasks.length} selected
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <Button variant="ghost" size="sm" className="h-8">
                    <Edit className="size-4 mr-2" />
                    Bulk Edit
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Table View */}
          {viewMode === "table" && (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedTasks.length === filteredTasks.length &&
                          filteredTasks.length > 0
                        }
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead className="w-72">Task</TableHead>
                    <TableHead className="w-32">Assignee</TableHead>
                    <TableHead className="w-24">Priority</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="w-28">Due Date</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="w-32">Progress</TableHead>
                    <TableHead className="w-20 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="wait">
                    {filteredTasks.map((task, index) => {
                      const PriorityIcon = priorityColors[task.priority].icon;
                      const StatusIcon = statusColors[task.status].icon;
                      const dueStatus = getDueDateStatus(task.dueDate);

                      return (
                        <motion.tr
                          key={task.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          className={cn(
                            "group hover:bg-muted/50 transition-colors border-b last:border-0",
                            selectedTasks.includes(task.id) && "bg-muted/30",
                          )}
                        >
                          <TableCell className="py-3">
                            <Checkbox
                              checked={selectedTasks.includes(task.id)}
                              onCheckedChange={() => toggleTask(task.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-semibold">{task.title}</div>
                              {task.description && (
                                <div className="text-xs text-muted-foreground truncate max-w-50">
                                  {task.description}
                                </div>
                              )}
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                {task.attachments ? (
                                  <span>📎 {task.attachments}</span>
                                ) : null}
                                {task.comments ? (
                                  <span>💬 {task.comments}</span>
                                ) : null}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="size-6 border-0 rounded-sm">
                                <AvatarFallback
                                  className={cn(
                                    "text-white text-xs rounded-sm",
                                    avatarColors[task.id % avatarColors.length],
                                  )}
                                >
                                  {task.assignee
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{task.assignee}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                priorityColors[task.priority].bg,
                                priorityColors[task.priority].text,
                                priorityColors[task.priority].border,
                                "font-medium gap-1",
                              )}
                            >
                              <PriorityIcon className="size-3" />
                              {task.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                statusColors[task.status].bg,
                                statusColors[task.status].text,
                                statusColors[task.status].border,
                                "font-medium gap-1",
                              )}
                            >
                              <StatusIcon className="size-3" />
                              {task.status === "In Progress"
                                ? "Progress"
                                : task.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={cn(
                                      "font-mono text-sm px-2 py-1 rounded",
                                      dueStatus === "overdue" &&
                                        "bg-rose-500/10 text-rose-600",
                                      dueStatus === "today" &&
                                        "bg-amber-500/10 text-amber-600",
                                      dueStatus === "soon" &&
                                        "bg-blue-500/10 text-blue-600",
                                    )}
                                  >
                                    {formatDate(task.dueDate)}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {dueStatus === "overdue" && "Overdue"}
                                  {dueStatus === "today" && "Due today"}
                                  {dueStatus === "soon" && "Due soon"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="bg-muted/50 text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={task.progress}
                                className="w-16 h-1"
                              />
                              <span className="text-xs font-medium">
                                {task.progress}%
                              </span>
                            </div>
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
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Edit className="size-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Copy className="size-4" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-rose-600">
                                  <Trash2 className="size-4" />
                                  Delete
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

          {/* Board View */}
          {viewMode === "board" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["Todo", "In Progress", "Review", "Done"].map((status) => (
                <div key={status} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          status === "Todo" && "bg-slate-500",
                          status === "In Progress" && "bg-blue-500",
                          status === "Review" && "bg-amber-500",
                          status === "Done" && "bg-emerald-500",
                        )}
                      />
                      <h3 className="font-semibold">{status}</h3>
                      <Badge variant="outline" className="ml-2">
                        {
                          filteredTasks.filter((t) => t.status === status)
                            .length
                        }
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="size-3" />
                    </Button>
                  </div>

                  <ScrollArea className="h-125 pr-4">
                    <div className="space-y-3">
                      <AnimatePresence mode="wait">
                        {filteredTasks
                          .filter((task) => task.status === status)
                          .map((task, index) => (
                            <motion.div
                              key={task.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.02,
                              }}
                              className="bg-white dark:bg-slate-950 rounded-lg p-3 shadow-sm border hover:shadow-md transition-all cursor-pointer"
                              onClick={() => toggleTask(task.id)}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    priorityColors[task.priority].bg,
                                    priorityColors[task.priority].text,
                                    "text-xs",
                                  )}
                                >
                                  {task.priority}
                                </Badge>
                                <Checkbox
                                  checked={selectedTasks.includes(task.id)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                              <h4 className="font-medium text-sm mb-2">
                                {task.title}
                              </h4>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Avatar className="size-5 border-0 rounded-sm">
                                    <AvatarFallback
                                      className={cn(
                                        "text-[10px] text-white rounded-sm",
                                        avatarColors[
                                          task.id % avatarColors.length
                                        ],
                                      )}
                                    >
                                      {task.assignee
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{task.assignee}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="size-3" />
                                  <span
                                    className={cn(
                                      getDueDateStatus(task.dueDate) ===
                                        "overdue" && "text-rose-600",
                                    )}
                                  >
                                    {formatDate(task.dueDate)}
                                  </span>
                                </div>
                              </div>
                              {task.progress && task.progress > 0 && (
                                <div className="mt-2">
                                  <Progress
                                    value={task.progress}
                                    className="h-1"
                                  />
                                </div>
                              )}
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredTasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or create a new task
              </p>
              <Button
                onClick={() =>
                  setFilters({
                    status: "all",
                    priority: "all",
                    assignee: "all",
                    search: "",
                    dueDateRange: { from: undefined, to: undefined },
                    showCompleted: true,
                    tags: [],
                  })
                }
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
