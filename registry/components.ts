import { createComponents } from "./component-utils";

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
          "Alert UI components for modern web design, delivering clear, immediate, and accessible feedback for system states, user actions, warnings, errors, and important notifications. Highly responsive, interactive, and optimized for frontend UX, dashboards, and web applications. Improve user engagement, accessibility, and overall performance in your visual design with these essential notification elements.",
        tags: ["alert", "notification", "banner", "action", "animated"],
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
          "Popup and modal UI components for interactive, responsive web design, capturing user attention for confirmations, forms, alerts, and critical interactions. Essential for modern frontend UX, interactive dashboards, and high-converting web apps. Seamlessly integrate popups for better engagement, usability, and conversion optimization in your UI projects.",
        tags: ["popup", "modal", "overlay", "interactive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Popup 1" }, { itemName: "Popup 2" }],
      },
      {
        name: "Modal Alerts",
        description:
          "Modal-based alert UI components for high-priority, interactive messages requiring user acknowledgment. Modern, accessible, and essential for responsive web applications, dashboards, and frontend UX. Enhance user workflows, ensure important actions are noticed, and maintain seamless, visually appealing interactions.",
        tags: ["modal", "critical", "confirmation", "blocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Standard Modal Alert" }],
      },
      {
        name: "Snackbars",
        description:
          "Snackbar UI components for visual, brief, and auto-dismissable feedback on user actions or system events. Lightweight, highly responsive, and optimized for modern frontend UX, interactive dashboards, and high-performance web apps. Improve notification delivery and user experience with these essential UI elements.",
        tags: ["snackbar", "temporary", "action", "nonblocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Snackbar 1" }, { itemName: "Snackbar 2" }],
      },
      {
        name: "Toasts",
        description:
          "Toast notification UI components for lightweight, time-based feedback. Nonintrusive, interactive, and ideal for modern responsive web and dashboard design. Enhance frontend performance, user engagement, and web app usability with visually appealing, accessible toasts.",
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
          "Status badge UI components for visual, responsive communication of system states, progress, priorities, and user statuses. Essential for modern web and dashboard interfaces, analytics, and interactive applications. Improve visual hierarchy, UX, and real-time feedback with these dynamic UI elements.",
        tags: ["status", "system", "connection", "priority", "user"],
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
    techs: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    subcategories: [
      {
        name: "FAQ",
        description:
          "Accessible, SEO-friendly FAQ UI components with smooth accordion transitions for interactive support sections. Perfect for modern web design, improving UX, and increasing engagement in responsive layouts. Enhance your site’s support, SEO ranking, and frontend performance with these well-structured FAQ blocks.",
        tags: ["faq", "accordion", "support", "schema", "collapsible"],
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
          "Conversion-optimized testimonial UI components for modern web projects. Showcase social proof, build brand authority, and utilize responsive layouts for enhanced UX, frontend design, and interactive user engagement. Boost trust and credibility in your web apps and landing pages with visually appealing testimonial blocks.",
        tags: ["testimonial", "social", "reviews", "trust", "carousel"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
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
        name: "Cards",
        description:
          "Card-based UI layout components for visually distinct, reusable sections. Perfect for dashboards, responsive web design, and modern frontend applications. Achieve modular layouts, improved content organization, and interactive visual design for web apps and analytics dashboards.",
        tags: ["card", "dashboard", "content", "layout", "responsive"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
        items: [{ itemName: "Interactive Card" }, { itemName: "Luxury Card" }],
      },
      {
        name: "Containers",
        description:
          "Container UI layout components for defining page width, spacing, alignment, and content boundaries. Responsive, modern, and essential for frontend structure, performance optimization, and visual consistency in web applications. Enhance your layouts with scalable, flexible container blocks.",
        tags: ["container", "page", "wrapper", "responsive", "structure"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [
          { itemName: "Basic Container" },
          { itemName: "Standard Container" },
          { itemName: "Premium Container" },
        ],
      },
      {
        name: "Sidebars",
        description:
          "Functional navigation sidebar UI components with collapsible states, mobile responsiveness, and nested routing. Modern, interactive, and optimized for web dashboards, analytics, and responsive layouts. Improve navigation, user workflow, and visual design in your web apps with these flexible sidebar patterns.",
        tags: ["sidebar", "admin", "navigation", "collapsible", "drawer"],
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
          "Professional footer UI components for modern web design and frontend projects. Multi-column layouts, social links, and newsletter integration for enhanced site depth, branding, SEO, and user experience. Optimize your site’s bottom navigation, legal, and branding sections with responsive, visually appealing footers.",
        tags: ["footer", "sitemap", "bottom", "legal", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [{ itemName: "Standard Footer" }],
      },
      {
        name: "Floating Menus",
        description:
          "Floating menu UI components for interactive, responsive navigation in modern web design. Enable quick access, improved frontend UX, and seamless integration for dashboards, web apps, and interactive user flows. Enhance usability and visual navigation with dynamic floating menus.",
        tags: ["menu", "dock", "speed", "radial", "navigation"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [
          { itemName: "Dock Menu" },
          { itemName: "Speed Dial Menu" },
          { itemName: "Radial Menu" },
        ],
      },
      {
        name: "Menu",
        description:
          "Menu UI components for modern web navigation, including dropdowns, mega menus, and command palettes. Interactive, responsive, and efficient for frontend UX, web apps, and dashboard navigation. Improve accessibility, performance, and visual design with advanced menu solutions.",
        tags: ["menu", "dropdown", "mega", "nav", "command"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [
          { itemName: "Dropdown Menu" },
          { itemName: "Mega Menu" },
          { itemName: "Nav Menu" },
          { itemName: "Command Palette" },
        ],
      },
      {
        name: "Navbars",
        description:
          "Navbar UI components for modern web and app navigation. Responsive, branded, and interactive design for improved frontend UX, performance, and seamless user journeys. Enhance your site’s navigation, branding, and visual consistency with these essential navbar patterns.",
        tags: ["navbar", "header", "navigation", "top", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [{ itemName: "Standard Navbar" }],
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
          "SaaS-ready pricing table UI components for modern web applications. Highlight features, compare plans, and drive conversions with responsive, interactive design. Optimize your sales funnel, enhance user decision-making, and improve visual appeal in ecommerce and SaaS dashboards.",
        tags: ["pricing", "comparison", "subscription", "cta", "features"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
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
          "Area chart UI components for visualizing volume and trends over time. Sleek, shaded, and highly responsive charts ideal for analytics, dashboards, performance metrics, and interactive data visualization in modern web apps. Improve your UX and frontend data analysis with these visually engaging components.",
        tags: ["area", "trend", "data", "shaded", "growth"],
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
          "Bar chart UI components for precise comparison of categorical data. Vertical, horizontal, and stacked designs for responsive analytics dashboards, web apps, and interactive performance tracking. Enhance your frontend visualizations with accessible, SEO-friendly bar charts.",
        tags: ["bar", "comparison", "histogram", "data", "analytics"],
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
        name: "Line Charts",
        description:
          "Line chart UI components for high-performance tracking of continuous data and cyclical patterns. Responsive, modern, and ideal for analytics dashboards, web applications, and real-time performance monitoring. Deliver clear, interactive data visualization for superior frontend UX.",
        tags: ["line", "time", "pattern", "graph", "data"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Area Line Chart" },
          { itemName: "Basic Line Chart" },
        ],
      },
      {
        name: "Pie Charts",
        description:
          "Pie chart UI components for classic, visual representation of numerical proportions and categorical distribution. Modern, responsive, and perfect for dashboards, analytics, and interactive web apps. Improve data storytelling and visual design with these engaging chart components.",
        tags: ["pie", "proportion", "distribution", "graph", "segments"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Pie Chart" },
          { itemName: "Donut Pie Chart" },
        ],
      },
      {
        name: "Radar Charts",
        description:
          "Radar chart UI components for multivariate data comparison and visual analysis. Spider-style, interactive, and ideal for skill analysis, benchmarking, analytics dashboards, and modern web applications. Enhance your frontend data visualization and UX with dynamic radar charts.",
        tags: ["radar", "spider", "analysis", "skill", "comparison"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Radar Chart" },
          { itemName: "Filled Radar Chart" },
        ],
      },
      {
        name: "Scatter Plots",
        description:
          "Scatter plot UI components for identifying correlations and distribution patterns. Detailed, responsive, and essential for analytics dashboards, interactive data analysis, and high-performance web apps. Improve your frontend visualizations and user engagement with these advanced scatter plots.",
        tags: ["scatter", "dot", "correlation", "statistic", "analysis"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Scatter Plot" },
          { itemName: "3D Scatter Plot" },
        ],
      },
      {
        name: "Sparklines",
        description:
          "Sparkline UI components for compact, lightweight trend visualization in dashboards, inline analytics, and modern responsive web design. Enhance performance, data density, and visual clarity in your frontend projects with these micro chart elements.",
        tags: ["sparkline", "mini", "inline", "micro", "trend"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [{ itemName: "Area Sparkline" }, { itemName: "Bar Sparkline" }],
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
          "Button loader UI components for interactive, responsive feedback on in-progress actions. Modern loading indicators for buttons in web and app design, enhancing UX, performance, and user trust. Integrate seamlessly into interactive dashboards and frontend workflows.",
        tags: ["button", "loader", "loading", "async", "feedback"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Button Loader" },
          { itemName: "Outline Button Loader" },
          { itemName: "Animated Button Loader" },
          { itemName: "Shiny Button Loader" },
        ],
      },
      {
        name: "Custom Loaders",
        description:
          "Custom loader UI components with flexible, animated loading indicators. Ideal for pages, cards, and sections in modern responsive web design, interactive dashboards, and web apps. Improve perceived performance and UX with visually engaging, customizable loaders.",
        tags: ["loader", "animation", "progress", "custom", "ui"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Loader" },
          { itemName: "Simple Round Loader" },
          { itemName: "Gradient Loader" },
          { itemName: "Grid Loader" },
          { itemName: "Wave Loader" },
        ],
      },
      {
        name: "Inline Loaders",
        description:
          "Inline loader UI components for compact, responsive indication of background processing within text or small UI areas. Optimized for modern frontend UX, interactive web apps, and visually consistent loading states. Enhance user feedback and performance perception with inline loaders.",
        tags: ["inline", "loader", "text", "micro", "compact"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Inline Loader" },
          { itemName: "Pulse Inline Loader" },
          { itemName: "Text Inline Loader" },
        ],
      },
      {
        name: "Page Loaders",
        description:
          "Full-page loader UI components for modern web apps. Responsive loading screens during route changes, app loads, or blocking operations for improved UX, performance, and visual continuity. Essential for web dashboards, interactive apps, and seamless user journeys.",
        tags: ["page", "loader", "fullscreen", "route", "blocking"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Centered Page Loader" },
          { itemName: "Full Page Loader" },
          { itemName: "Logo Page Loader" },
        ],
      },
      {
        name: "Progress Bars",
        description:
          "Progress bar UI components for visualizing task completion and loading progress. Linear and segmented, responsive for modern web, dashboard design, and interactive applications. Enhance performance feedback, UX, and visual design with these dynamic progress indicators.",
        tags: ["progress", "loading", "status", "completion", "linear"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Progress Bar" },
          { itemName: "Animated Progress Bar" },
          { itemName: "Segmented Progress Bar" },
        ],
      },
      {
        name: "Pulse Loaders",
        description:
          "Pulse loader UI components with animated, subtle indicators for activity or waiting states. Modern, responsive, and essential for interactive web UX, dashboards, and high-performance applications. Improve user feedback, engagement, and visual consistency with pulse loaders.",
        tags: ["pulse", "loader", "activity", "animation", "waiting"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Pulse Loader" },
          { itemName: "Multi Pulse Loader" },
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
