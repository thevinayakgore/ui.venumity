import { createComponents } from "./component-utils";

// Updated to include folder paths (auto-generated) with icon support
export const COMPONENTS = createComponents([
  {
    category: "Feedbacks",
    icon: "messages-square",
    tags: ["ui", "feedback", "notifications", "interaction", "frontend"],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Alerts",
        description:
          "Alert UI components designed to deliver clear, immediate, and accessible feedback for system states, user actions, warnings, errors, and important application notifications.",
        tags: ["alert", "notifications", "banner", "action", "animated"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Standard Alert" },
          { itemName: "Banner Alert" },
          { itemName: "Action Alert" },
          { itemName: "Animated Alert" },
          { itemName: "Notification Bell" },
        ],
      },
      {
        name: "Popups",
        description:
          "Popup and modal UI components created to capture user attention for confirmations, forms, alerts, and critical interactions without navigating away from the current context.",
        tags: ["popup", "modal", "overlay", "interactive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Popup 1" }, { itemName: "Popup 2" }],
      },
      {
        name: "Modal Alerts",
        description:
          "Modal-based alert components intended for high-priority messages that require explicit user acknowledgment or confirmation before proceeding.",
        tags: ["modal", "critical", "confirmation", "blocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Standard Modal Alert" }],
      },
      {
        name: "Snackbars",
        description:
          "Snackbar UI components used to display brief, temporary, and auto-dismissable feedback related to user actions or background system events.",
        tags: ["snackbar", "temporary", "action", "nonblocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Snackbar 1" }, { itemName: "Snackbar 2" }],
      },
      {
        name: "Toasts",
        description:
          "Toast notification components optimized for lightweight, time-based feedback that informs users without interrupting their workflow.",
        tags: ["toast", "feedback", "ephemeral", "nonintrusive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Toast 1" }],
      },
    ],
  },
  {
    category: "Badges",
    icon: "badge-check",
    tags: ["ui", "feedback", "notifications", "interaction", "frontend"],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Status Badges",
        description:
          "Status badge components designed to visually communicate system states, progress, priorities, and user or connection statuses at a glance.",
        tags: ["status", "system", "connection", "priority"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Basic Status Badge" },
          { itemName: "Connection Status Badge" },
          { itemName: "Priority Status Badge" },
          { itemName: "Progress Status Badge" },
          { itemName: "System Status Badge" },
          { itemName: "User Status Badge" },
        ],
      },
    ],
  },
  {
    category: "Sections",
    icon: "layout-grid",
    tags: [
      "ui-components",
      "web-sections",
      "landing-page",
      "frontend-blocks",
      "responsive-design",
    ],
    techs: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    subcategories: [
      {
        name: "FAQ",
        description:
          "Accessible, SEO-friendly FAQ sections featuring smooth accordion transitions to resolve customer queries and improve UX.",
        tags: [
          "faq-component",
          "accordion",
          "customer-support",
          "schema-markup",
          "collapsible",
        ],
        techs: [
          "Next.js",
          "Tailwind CSS",
          "TypeScript",
          "Shadcn UI",
          "Lucide React",
        ],
        items: [{ itemName: "FAQ 1" }],
      },
      {
        name: "Testimonials",
        description:
          "Conversion-optimized testimonial sections designed to build brand authority and showcase social proof through various layouts.",
        tags: [
          "social-proof",
          "user-reviews",
          "trust-signals",
          "carousel",
          "grid-layout",
        ],
        techs: [
          "Next.js",
          "Tailwind CSS",
          "TypeScript",
          "Shadcn UI",
          "Framer Motion",
        ],
        items: [
          { itemName: "Minimal Testimonial" },
          { itemName: "Social Testimonial" },
          { itemName: "Standard Testimonial" },
          { itemName: "Glowing Testimonial" },
          { itemName: "Carousel Testimonial" },
        ],
      },
    ],
  },
  {
    category: "Layouts",
    icon: "layout-template",
    tags: [
      "app-shell",
      "dashboard-layout",
      "structure",
      "ux-architecture",
      "frontend",
    ],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Sidebars",
        description:
          "Highly functional navigation sidebars featuring collapsible states, mobile responsiveness, and nested routing support.",
        tags: [
          "admin-panel",
          "vertical-nav",
          "collapsible-sidebar",
          "dashboard-ui",
          "drawer",
        ],
        techs: [
          "Next.js",
          "Tailwind CSS",
          "TypeScript",
          "Shadcn UI",
          "Lucide React",
        ],
        items: [{ itemName: "Sidebar 1" }],
      },
    ],
  },
  {
    category: "Navigations",
    icon: "send",
    tags: [
      "site-navigation",
      "header-footer",
      "menus",
      "ux-design",
      "internal-links",
    ],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Footers",
        description:
          "Professional footer components with multi-column layouts, social links, and newsletter integration for improved site depth.",
        tags: [
          "footer-section",
          "sitemap",
          "bottom-nav",
          "legal-links",
          "branding",
        ],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [{ itemName: "Standard Footer" }],
      },
    ],
  },
  {
    category: "Commerce",
    icon: "indian-rupee",
    tags: [
      "ecommerce-ui",
      "saas-blocks",
      "conversion",
      "sales-funnel",
      "pricing",
    ],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Pricing Tables",
        description:
          "SaaS-ready pricing tables designed to highlight features, compare plans, and drive subscription conversions.",
        tags: [
          "pricing-plans",
          "comparison-table",
          "subscription-ui",
          "cta-blocks",
          "feature-list",
        ],
        techs: [
          "Next.js",
          "Tailwind CSS",
          "TypeScript",
          "Shadcn UI",
          "Framer Motion",
        ],
        items: [{ itemName: "Pricing Table 1" }],
      },
    ],
  },
  {
    category: "Charts",
    icon: "chart-pie",
    tags: [
      "data-visualization",
      "analytics",
      "dashboard-charts",
      "infographics",
      "d3-js",
    ],
    techs: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    subcategories: [
      {
        name: "Area Charts",
        description:
          "Visualise volume and trends over time with sleek, shaded area charts ideal for tracking growth and performance metrics.",
        tags: ["area-chart", "trend-analysis", "data-viz", "shaded-graph"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Area Chart" },
          { itemName: "Gradient Area Chart" },
          { itemName: "Multi Area Chart" },
          { itemName: "Percent Area Chart" },
          { itemName: "Spline Area Chart" },
          { itemName: "Stacked Area Chart" },
        ],
      },
      {
        name: "Bar Charts",
        description:
          "Compare categorical data with precision using vertical, horizontal, and stacked bar chart components.",
        tags: ["bar-graph", "comparison-chart", "histogram", "data-analytics"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Bar Chart" },
          { itemName: "Grouped Bar Chart" },
          { itemName: "Horizontal Bar Chart" },
          { itemName: "Mixed Bar Chart" },
          { itemName: "Stacked Bar Chart" },
        ],
      },
      {
        name: "Custom Charts",
        description:
          "Niche data visualizations like Bullet and Gauge charts for specialized KPI monitoring and performance tracking.",
        tags: ["kpi-dashboard", "gauge-chart", "bullet-graph", "custom-viz"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [{ itemName: "Bullet Chart" }, { itemName: "Gauge Chart" }],
      },
      {
        name: "Doughnut Charts",
        description:
          "Clean, circular visualizations with a central cutout, perfect for displaying percentage breakdowns and ratios.",
        tags: ["donut-chart", "percentage-viz", "radial-graph", "segment-data"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Doughnut Chart" },
          { itemName: "Semi-Doughnut Chart" },
        ],
      },
      {
        name: "Line Charts",
        description:
          "High-performance line graphs for tracking continuous data points and identifying cyclical patterns in datasets.",
        tags: ["line-graph", "time-series", "pattern-analysis", "data-points"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Area Line Chart" },
          { itemName: "Basic Line Chart" },
        ],
      },
      {
        name: "Pie Charts",
        description:
          "Classic proportional charts used to represent numerical proportions and categorical distribution at a glance.",
        tags: [
          "pie-graph",
          "proportional-data",
          "data-distribution",
          "segments",
        ],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Pie Chart" },
          { itemName: "Donut Pie Chart" },
        ],
      },
      {
        name: "Progress Graphs",
        description:
          "Visual indicators for task completion, loading states, and goal attainment using circular and linear progress bars.",
        tags: [
          "progress-bar",
          "status-indicator",
          "goal-tracking",
          "loading-ui",
        ],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
        items: [
          { itemName: "Circular Progress Graph" },
          { itemName: "Multiple Progress Bar" },
        ],
      },
      {
        name: "Radar Charts",
        description:
          "Spider-style charts for multivariate data comparison, ideal for skill analysis and feature benchmarking.",
        tags: [
          "radar-chart",
          "spider-graph",
          "multivariate-analysis",
          "skill-map",
        ],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Radar Chart" },
          { itemName: "Filled Radar Chart" },
        ],
      },
      {
        name: "Scatter Plots",
        description:
          "Highly detailed charts for identifying correlations and distribution patterns between two or more variables.",
        tags: [
          "scatter-plot",
          "dot-chart",
          "correlation-analysis",
          "statistical-viz",
        ],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Scatter Plot" },
          { itemName: "3D Scatter Plot" },
        ],
      },
      {
        name: "Sparklines",
        description:
          "Compact, lightweight charts designed to fit within dashboards or text to show general trends without axes.",
        tags: ["sparkline", "mini-chart", "inline-viz", "micro-analytics"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Area Sparkline" },
          { itemName: "Bar Sparkline" },
          { itemName: "Mini Line Sparkline" },
        ],
      },
    ],
  },
  {
    category: "Spinners",
    icon: "loader",
    tags: [
      "spinner",
      "loading",
      "progress-indicator",
      "ui-element",
      "animation",
    ],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Button Loaders",
        description:
          "Visualise volume and trends over time with sleek, shaded area charts ideal for tracking growth and performance metrics.",
        tags: ["area-chart", "trend-analysis", "data-viz", "shaded-graph"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Button Loader" },
          { itemName: "Animated Button Loader" },
          { itemName: "Outline Button Loader" },
          { itemName: "Standard Button Loader" },
          { itemName: "Premium Button Loader" },
        ],
      },
    ],
  },
  // Example of another category:
  // {
  //   category: "Forms",
  //   icon: "form-input", // Required category icon
  //   tags: ["form", "input", "validation"],
  //   techs: ["React Hook Form", "Zod"],
  //   subcategories: [
  //     {
  //       name: "Inputs",
  //       description: "Form input components",
  //       icon: "keyboard", // Optional subcategory icon
  //       tags: ["input", "text", "control"],
  //       techs: ["React", "Tailwind CSS"],
  //       items: [
  //         {
  //           itemName: "Text Input",
  //           description: "A text input field",
  //           tags: ["text", "input"],
  //         },
  //       ],
  //     },
  //   ],
  // },
]);
