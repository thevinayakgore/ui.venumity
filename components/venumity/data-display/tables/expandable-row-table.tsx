"use client";
import React, { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Download,
  Edit,
  Trash2,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  PieChart,
  FileText,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  name: string;
  client: string;
  clientInfo?: {
    email: string;
    phone: string;
    location: string;
    industry: string;
  };
  status: "Planning" | "Active" | "On Hold" | "Completed";
  priority: "Low" | "Medium" | "High" | "Critical";
  budget: number;
  spent: number;
  timeline: string;
  startDate: string;
  endDate: string;
  team: {
    name: string;
    role: string;
    avatar?: string;
  }[];
  description: string;
  milestones?: {
    name: string;
    completed: boolean;
    dueDate: string;
  }[];
  risks?: {
    type: string;
    severity: "Low" | "Medium" | "High";
    description: string;
  }[];
}

const statusColors = {
  Planning: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
    icon: Clock,
  },
  Active: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-500/20",
    icon: TrendingUp,
  },
  "On Hold": {
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-500/20",
    icon: AlertCircle,
  },
  Completed: {
    bg: "bg-slate-500/10",
    text: "text-slate-600",
    border: "border-slate-500/20",
    icon: CheckCircle2,
  },
};

const priorityColors = {
  Low: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  Medium: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  High: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Critical: "bg-rose-500/10 text-rose-600 border-rose-500/20",
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

export default function ExpandableRowTable() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [selectedView, setSelectedView] = useState<
    "all" | "active" | "completed"
  >("all");

  const projects: Project[] = [
    {
      id: 1,
      name: "Website Redesign",
      client: "TechCorp",
      clientInfo: {
        email: "contact@techcorp.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        industry: "Technology",
      },
      status: "Active",
      priority: "High",
      budget: 50000,
      spent: 32500,
      timeline: "3 months",
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      team: [
        { name: "John Smith", role: "Lead Designer" },
        { name: "Sarah Johnson", role: "Frontend Developer" },
        { name: "Mike Wilson", role: "Project Manager" },
      ],
      description:
        "Complete redesign of corporate website with modern UI/UX and improved performance. Includes responsive design, SEO optimization, and content migration.",
      milestones: [
        { name: "Design Approval", completed: true, dueDate: "2024-02-15" },
        { name: "Development Phase 1", completed: true, dueDate: "2024-03-01" },
        { name: "Testing", completed: false, dueDate: "2024-04-15" },
        { name: "Launch", completed: false, dueDate: "2024-05-01" },
      ],
      risks: [
        {
          type: "Technical",
          severity: "Medium",
          description: "Third-party API integration complexity",
        },
        {
          type: "Resource",
          severity: "Low",
          description: "Team availability during holiday season",
        },
      ],
    },
    {
      id: 2,
      name: "Mobile App",
      client: "StartupXYZ",
      clientInfo: {
        email: "info@startupxyz.com",
        phone: "+1 (555) 987-6543",
        location: "Austin, TX",
        industry: "Startup",
      },
      status: "Planning",
      priority: "Medium",
      budget: 75000,
      spent: 12000,
      timeline: "6 months",
      startDate: "2024-03-15",
      endDate: "2024-09-15",
      team: [
        { name: "Emma Davis", role: "Product Manager" },
        { name: "David Chen", role: "Mobile Developer" },
        { name: "Lisa Brown", role: "UX Designer" },
      ],
      description:
        "Cross-platform mobile application for customer engagement and sales. Features include push notifications, in-app purchases, and social sharing.",
      milestones: [
        { name: "Wireframes", completed: true, dueDate: "2024-04-01" },
        { name: "Prototype", completed: false, dueDate: "2024-05-15" },
        { name: "MVP Development", completed: false, dueDate: "2024-07-15" },
        { name: "Beta Testing", completed: false, dueDate: "2024-08-15" },
      ],
      risks: [
        {
          type: "Market",
          severity: "Medium",
          description: "Competitor launching similar app",
        },
        {
          type: "Technical",
          severity: "Low",
          description: "Cross-platform compatibility issues",
        },
      ],
    },
    {
      id: 3,
      name: "E-commerce Platform",
      client: "RetailCo",
      clientInfo: {
        email: "projects@retailco.com",
        phone: "+1 (555) 456-7890",
        location: "Chicago, IL",
        industry: "Retail",
      },
      status: "Active",
      priority: "Critical",
      budget: 120000,
      spent: 85000,
      timeline: "8 months",
      startDate: "2023-11-01",
      endDate: "2024-07-01",
      team: [
        { name: "Alex Turner", role: "Tech Lead" },
        { name: "Robert Garcia", role: "Backend Developer" },
        { name: "Anna Kim", role: "Frontend Developer" },
        { name: "Tom Harris", role: "QA Engineer" },
      ],
      description:
        "Full-featured e-commerce platform with inventory management and payment integration. Includes multi-vendor support, real-time tracking, and analytics dashboard.",
      milestones: [
        { name: "Database Design", completed: true, dueDate: "2023-12-01" },
        { name: "API Development", completed: true, dueDate: "2024-02-01" },
        {
          name: "Frontend Integration",
          completed: false,
          dueDate: "2024-04-01",
        },
        { name: "Payment Gateway", completed: false, dueDate: "2024-05-01" },
        { name: "Launch", completed: false, dueDate: "2024-07-01" },
      ],
      risks: [
        {
          type: "Security",
          severity: "High",
          description: "PCI compliance requirements",
        },
        {
          type: "Performance",
          severity: "Medium",
          description: "Scalability under peak load",
        },
      ],
    },
    {
      id: 4,
      name: "CRM System",
      client: "Enterprise Inc",
      clientInfo: {
        email: "enterprise@example.com",
        phone: "+1 (555) 234-5678",
        location: "New York, NY",
        industry: "Enterprise",
      },
      status: "On Hold",
      priority: "High",
      budget: 90000,
      spent: 45000,
      timeline: "5 months",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      team: [
        { name: "Michael Lee", role: "Solution Architect" },
        { name: "Sophia Patel", role: "Business Analyst" },
      ],
      description:
        "Custom CRM solution for sales team automation and customer relationship management. Integration with existing ERP and marketing tools.",
      milestones: [
        {
          name: "Requirements Analysis",
          completed: true,
          dueDate: "2024-02-15",
        },
        { name: "System Design", completed: true, dueDate: "2024-03-15" },
        { name: "Development", completed: false, dueDate: "2024-05-15" },
        { name: "Testing", completed: false, dueDate: "2024-06-01" },
      ],
      risks: [
        {
          type: "Integration",
          severity: "High",
          description: "Legacy system compatibility",
        },
        {
          type: "Scope",
          severity: "Medium",
          description: "Feature creep from stakeholders",
        },
      ],
    },
    {
      id: 5,
      name: "Analytics Dashboard",
      client: "DataWorks",
      clientInfo: {
        email: "hello@dataworks.com",
        phone: "+1 (555) 876-5432",
        location: "Seattle, WA",
        industry: "Analytics",
      },
      status: "Completed",
      priority: "Medium",
      budget: 40000,
      spent: 38000,
      timeline: "2 months",
      startDate: "2024-01-01",
      endDate: "2024-03-01",
      team: [
        { name: "Chris Evans", role: "Data Engineer" },
        { name: "Maria Rodriguez", role: "Frontend Developer" },
      ],
      description:
        "Real-time analytics dashboard with data visualization and reporting features. Includes custom widgets, export capabilities, and scheduled reports.",
      milestones: [
        { name: "Data Pipeline", completed: true, dueDate: "2024-01-15" },
        { name: "Dashboard Design", completed: true, dueDate: "2024-02-01" },
        { name: "Integration", completed: true, dueDate: "2024-02-15" },
        { name: "Deployment", completed: true, dueDate: "2024-03-01" },
      ],
      risks: [
        {
          type: "Data Quality",
          severity: "Low",
          description: "Inconsistent data sources",
        },
      ],
    },
    {
      id: 6,
      name: "Cloud Migration",
      client: "InnovateTech",
      clientInfo: {
        email: "cloud@innovatetech.com",
        phone: "+1 (555) 345-6789",
        location: "Denver, CO",
        industry: "Technology",
      },
      status: "Active",
      priority: "High",
      budget: 150000,
      spent: 65000,
      timeline: "4 months",
      startDate: "2024-02-15",
      endDate: "2024-06-15",
      team: [
        { name: "James Wilson", role: "Cloud Architect" },
        { name: "Patricia White", role: "DevOps Engineer" },
        { name: "Richard Brown", role: "Security Specialist" },
      ],
      description:
        "Migration of on-premise infrastructure to AWS cloud. Includes containerization, auto-scaling, and disaster recovery setup.",
      milestones: [
        { name: "Assessment", completed: true, dueDate: "2024-03-01" },
        {
          name: "Infrastructure Setup",
          completed: false,
          dueDate: "2024-04-15",
        },
        { name: "Data Migration", completed: false, dueDate: "2024-05-15" },
        { name: "Cutover", completed: false, dueDate: "2024-06-01" },
      ],
      risks: [
        {
          type: "Technical",
          severity: "Medium",
          description: "Data consistency during migration",
        },
        {
          type: "Operational",
          severity: "Low",
          description: "Team training on new platform",
        },
      ],
    },
    {
      id: 7,
      name: "Security Audit",
      client: "FinanceCorp",
      clientInfo: {
        email: "security@financecorp.com",
        phone: "+1 (555) 567-8901",
        location: "Boston, MA",
        industry: "Finance",
      },
      status: "Planning",
      priority: "Critical",
      budget: 60000,
      spent: 5000,
      timeline: "2 months",
      startDate: "2024-04-01",
      endDate: "2024-06-01",
      team: [
        { name: "Daniel Kim", role: "Security Lead" },
        { name: "Rachel Green", role: "Compliance Officer" },
      ],
      description:
        "Comprehensive security audit including penetration testing, vulnerability assessment, and compliance review for financial regulations.",
      milestones: [
        { name: "Scope Definition", completed: true, dueDate: "2024-04-15" },
        {
          name: "Penetration Testing",
          completed: false,
          dueDate: "2024-05-01",
        },
        { name: "Report Generation", completed: false, dueDate: "2024-05-15" },
        { name: "Remediation Plan", completed: false, dueDate: "2024-06-01" },
      ],
      risks: [
        {
          type: "Compliance",
          severity: "High",
          description: "Regulatory requirements changing",
        },
        {
          type: "Timeline",
          severity: "Medium",
          description: "Limited window for testing",
        },
      ],
    },
  ];

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const expandAll = () => {
    setExpandedRows(new Set(projects.map((p) => p.id)));
  };

  const collapseAll = () => {
    setExpandedRows(new Set());
  };

  const getProgress = (spent: number, budget: number) => {
    return Math.min(100, (spent / budget) * 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 50) return "bg-emerald-500";
    if (progress < 80) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getBudgetStatus = (spent: number, budget: number) => {
    const ratio = spent / budget;
    if (ratio < 0.5) return { text: "Under Budget", color: "text-emerald-600" };
    if (ratio < 0.8) return { text: "On Track", color: "text-blue-600" };
    if (ratio < 1) return { text: "Near Limit", color: "text-amber-600" };
    return { text: "Over Budget", color: "text-rose-600" };
  };

  const filteredProjects = projects.filter((project) => {
    if (selectedView === "active") return project.status === "Active";
    if (selectedView === "completed") return project.status === "Completed";
    return true;
  });

  const totalBudget = filteredProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = filteredProjects.reduce((sum, p) => sum + p.spent, 0);
  const overallProgress = (totalSpent / totalBudget) * 100;

  const allExpanded = expandedRows.size === projects.length;

  return (
    <main className="p-6 md:p-10">
      <Card className="w-full pt-0 shadow-none hover:shadow-xl/10 overflow-hidden transition-all duration-500">
        <CardHeader className="pt-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-4xl font-semibold">
                Project Portfolio
              </CardTitle>
              <p className="text-sm md:text-base text-foreground/60 mt-1">
                Click on rows to expand project details •{" "}
                {filteredProjects.length} projects
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={allExpanded ? collapseAll : expandAll}
                className="gap-2 cursor-pointer rounded-sm"
              >
                {allExpanded ? (
                  <>
                    <ChevronRight className="size-4" />
                    Collapse All
                  </>
                ) : (
                  <>
                    <ChevronDown className="size-4" />
                    Expand All
                  </>
                )}
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-500 cursor-pointer rounded-sm">
                <Briefcase className="size-4" />
                New Project
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold">
                    ${totalBudget.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="size-8 text-muted-foreground/30" />
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">
                    ${totalSpent.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="size-8 text-muted-foreground/30" />
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Overall Progress
                  </p>
                  <p className="text-2xl font-bold">
                    {overallProgress.toFixed(1)}%
                  </p>
                </div>
                <PieChart className="size-8 text-muted-foreground/30" />
              </div>
              <Progress value={overallProgress} className="h-1 mt-2" />
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Team Members</p>
                  <p className="text-2xl font-bold">
                    {projects.reduce((sum, p) => sum + p.team.length, 0)}
                  </p>
                </div>
                <Users className="size-8 text-muted-foreground/30" />
              </div>
            </div>
          </div>

          {/* View Tabs */}
          <Tabs
            value={selectedView}
            onValueChange={(v: string) => {
              if (v === "all" || v === "active" || v === "completed") {
                setSelectedView(v);
              }
            }}
            className="mt-4"
          >
            <TabsList>
              <TabsTrigger value="all" className="cursor-pointer">
                All Projects
              </TabsTrigger>
              <TabsTrigger value="active" className="cursor-pointer">
                Active
              </TabsTrigger>
              <TabsTrigger value="completed" className="cursor-pointer">
                Completed
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-6">
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-72">Project</TableHead>
                  <TableHead className="w-48">Client</TableHead>
                  <TableHead className="w-24">Status</TableHead>
                  <TableHead className="w-24">Priority</TableHead>
                  <TableHead className="w-32 text-right">Budget</TableHead>
                  <TableHead className="w-32 text-right">Spent</TableHead>
                  <TableHead className="w-48">Progress</TableHead>
                  <TableHead className="w-32">Timeline</TableHead>
                  <TableHead className="w-20 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="wait">
                  {filteredProjects.map((project) => {
                    const progress = getProgress(project.spent, project.budget);
                    const isExpanded = expandedRows.has(project.id);
                    const StatusIcon = statusColors[project.status].icon;
                    const budgetStatus = getBudgetStatus(
                      project.spent,
                      project.budget,
                    );

                    return (
                      <React.Fragment key={project.id}>
                        <TableRow
                          className={cn(
                            "group hover:bg-muted/50 transition-colors cursor-pointer",
                            isExpanded && "bg-muted/30 border-b-0",
                          )}
                          onClick={() => toggleRow(project.id)}
                        >
                          <TableCell className="py-4">
                            <motion.div
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="size-4 text-muted-foreground" />
                            </motion.div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-semibold">
                                {project.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                ID: PRJ-{project.id.toString().padStart(3, "0")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="size-4 text-muted-foreground" />
                              <span>{project.client}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                statusColors[project.status].bg,
                                statusColors[project.status].text,
                                statusColors[project.status].border,
                                "font-medium gap-1",
                              )}
                            >
                              <StatusIcon className="size-3" />
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                priorityColors[project.priority],
                                "font-medium",
                              )}
                            >
                              {project.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ${project.budget.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ${project.spent.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className={budgetStatus.color}>
                                  {budgetStatus.text}
                                </span>
                                <span>{progress.toFixed(1)}%</span>
                              </div>
                              <Progress
                                value={progress}
                                className={cn(
                                  "h-1",
                                  getProgressColor(progress),
                                )}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="size-4 text-muted-foreground" />
                              <span className="text-sm">
                                {project.timeline}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            className="text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
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
                                <DropdownMenuItem className="gap-2">
                                  <Download className="size-4" />
                                  Export
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-rose-600">
                                  <Trash2 className="size-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>

                        {isExpanded && (
                          <TableRow className="bg-muted/20 hover:bg-muted/20">
                            <TableCell colSpan={10} className="p-0 border-t-0">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-6">
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column - Project Details */}
                                    <div className="lg:col-span-2 space-y-6">
                                      {/* Description */}
                                      <div>
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                          <FileText className="size-4" />
                                          Description
                                        </h4>
                                        <p className="whitespace-pre-wrap text-muted-foreground">
                                          {project.description}
                                        </p>
                                      </div>

                                      {/* Milestones */}
                                      {project.milestones && (
                                        <div>
                                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <CheckCircle2 className="size-4" />
                                            Milestones
                                          </h4>
                                          <div className="space-y-3">
                                            {project.milestones.map(
                                              (milestone, idx) => (
                                                <div
                                                  key={idx}
                                                  className="flex items-center gap-3"
                                                >
                                                  <div
                                                    className={cn(
                                                      "w-2 h-1 rounded-full",
                                                      milestone.completed
                                                        ? "bg-emerald-500"
                                                        : "bg-amber-500",
                                                    )}
                                                  />
                                                  <div className="flex-1">
                                                    <div className="flex justify-between items-center">
                                                      <span className="font-medium">
                                                        {milestone.name}
                                                      </span>
                                                      <span className="text-xs text-muted-foreground">
                                                        Due:{" "}
                                                        {formatDate(
                                                          milestone.dueDate,
                                                        )}
                                                      </span>
                                                    </div>
                                                    <Badge
                                                      variant="outline"
                                                      className={cn(
                                                        "mt-1 text-xs",
                                                        milestone.completed
                                                          ? "bg-emerald-500/10 text-emerald-600"
                                                          : "bg-amber-500/10 text-amber-600",
                                                      )}
                                                    >
                                                      {milestone.completed
                                                        ? "Completed"
                                                        : "In Progress"}
                                                    </Badge>
                                                  </div>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Right Column - Additional Info */}
                                    <div className="space-y-6">
                                      {/* Client Information */}
                                      {project.clientInfo && (
                                        <div>
                                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <Building2 className="size-4" />
                                            Client Information
                                          </h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                              <Mail className="size-4" />
                                              {project.clientInfo.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                              <Phone className="size-4" />
                                              {project.clientInfo.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                              <MapPin className="size-4" />
                                              {project.clientInfo.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                              <Briefcase className="size-4" />
                                              {project.clientInfo.industry}
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* Team Members */}
                                      <div>
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                          <Users className="size-4" />
                                          Team ({project.team.length})
                                        </h4>
                                        <div className="space-y-3">
                                          {project.team.map((member, idx) => (
                                            <div
                                              key={idx}
                                              className="flex items-center gap-3"
                                            >
                                              <Avatar className="size-8 border-0 rounded-sm">
                                                <AvatarFallback
                                                  className={cn(
                                                    "text-white text-xs rounded-sm",
                                                    avatarColors[
                                                      idx % avatarColors.length
                                                    ],
                                                  )}
                                                >
                                                  {member.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                                </AvatarFallback>
                                              </Avatar>
                                              <div>
                                                <div className="font-medium text-sm">
                                                  {member.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                  {member.role}
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Risks */}
                                      {project.risks && (
                                        <div>
                                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <AlertCircle className="size-4" />
                                            Risks & Issues
                                          </h4>
                                          <div className="space-y-2">
                                            {project.risks.map((risk, idx) => (
                                              <div
                                                key={idx}
                                                className="border rounded-lg p-3"
                                              >
                                                <div className="flex items-center justify-between mb-1">
                                                  <span className="font-medium text-sm">
                                                    {risk.type}
                                                  </span>
                                                  <Badge
                                                    variant="outline"
                                                    className={cn(
                                                      "text-xs",
                                                      risk.severity === "Low" &&
                                                        "bg-emerald-500/10 text-emerald-600",
                                                      risk.severity ===
                                                        "Medium" &&
                                                        "bg-amber-500/10 text-amber-600",
                                                      risk.severity ===
                                                        "High" &&
                                                        "bg-rose-500/10 text-rose-600",
                                                    )}
                                                  >
                                                    {risk.severity}
                                                  </Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                  {risk.description}
                                                </p>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Financial Summary */}
                                      <div>
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                          <DollarSign className="size-4" />
                                          Financial Summary
                                        </h4>
                                        <div className="space-y-2">
                                          <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                              Budget:
                                            </span>
                                            <span className="font-semibold">
                                              ${project.budget.toLocaleString()}
                                            </span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                              Spent:
                                            </span>
                                            <span className="font-semibold">
                                              ${project.spent.toLocaleString()}
                                            </span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                              Remaining:
                                            </span>
                                            <span
                                              className={cn(
                                                "font-semibold",
                                                project.budget - project.spent <
                                                  0
                                                  ? "text-rose-600"
                                                  : "text-emerald-600",
                                              )}
                                            >
                                              $
                                              {(
                                                project.budget - project.spent
                                              ).toLocaleString()}
                                            </span>
                                          </div>
                                          <Separator className="my-2" />
                                          <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                              Utilization:
                                            </span>
                                            <span
                                              className={cn(
                                                "font-semibold",
                                                progress > 90
                                                  ? "text-rose-600"
                                                  : "text-emerald-600",
                                              )}
                                            >
                                              {progress.toFixed(1)}%
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Action Buttons */}
                                      <div className="flex gap-2 pt-2">
                                        <Button
                                          size="sm"
                                          className="flex-1 gap-2"
                                        >
                                          <Eye className="size-4" />
                                          View
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="flex-1 gap-2"
                                        >
                                          <Download className="size-4" />
                                          Report
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Briefcase className="size-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                Try changing your view filter or create a new project
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
