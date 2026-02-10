import { createComponents } from "./component-utils";

export const COMPONENTS = createComponents([
  {
    category: "AI Features",
    icon: "bot",
    tags: ["ui", "feedback", "notifications", "interaction", "frontend"],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "AI Analytics",
        description:
          "Boost data-driven decision making with our smart AI analytics dashboard components. These featured UI elements deliver real-time insights, predictive metrics, and performance visualization that accelerate business growth. Engineered for SaaS platforms, enterprise dashboards, and AI-powered applications seeking actionable intelligence.",
        tags: ["ai", "analytics", "insights", "metrics", "dashboard"],
        techs: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Recharts",
          "Shadcn UI",
        ],
        items: [{ itemName: "Analytics" }],
      },
      {
        name: "AI Chats",
        description:
          "Transform user engagement with intelligent chat interfaces that drive conversions and retention. These professional conversation components feature natural language processing, real-time messaging, and smart assistant capabilities perfect for customer support automation, AI companions, and interactive web applications.",
        tags: ["ai", "chat", "assistant", "conversation", "messaging"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Motion"],
        items: [{ itemName: "AI Chat Bot 1" }],
      },
      {
        name: "AI Commands",
        description:
          "Supercharge productivity workflows with smart command palettes and AI-powered navigation systems. These punchy interface components reduce user friction, accelerate task completion, and provide intelligent shortcuts—essential for enterprise software, developer tools, and power-user applications.",
        tags: ["ai", "commands", "command-palette", "actions", "productivity"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
        items: [{ itemName: "Command Bar" }],
      },
      {
        name: "AI Forms",
        description:
          "Revolutionize data collection with intelligent form components featuring AI validation, contextual suggestions, and automated workflows. These smart form concepts dramatically reduce abandonment rates while increasing conversion—perfect for lead generation, onboarding sequences, and enterprise data entry.",
        tags: ["ai", "forms", "input", "autofill", "validation"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
        items: [{ itemName: "Forms" }],
      },
      {
        name: "AI Generators",
        description:
          "Accelerate content creation with cutting-edge AI generation tools for text, code, and media. These featured components showcase the latest in generative AI integration—ideal for marketing automation, developer productivity suites, and creative workflow enhancement.",
        tags: ["ai", "generator", "content", "automation", "creative"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
        items: [{ itemName: "Content Generators" }],
      },
      {
        name: "AI Searches",
        description:
          "Drive discovery and engagement with intelligent search interfaces featuring semantic understanding and predictive results. These professional search components enhance user experience while increasing content findability and time-on-site metrics for e-commerce and content platforms.",
        tags: ["ai", "search", "semantic", "command", "discovery"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
        items: [{ itemName: "Searches" }],
      },
      {
        name: "AI Suggestions",
        description:
          "Increase user retention with context-aware suggestion systems that anticipate needs and guide workflows. These smart recommendation components leverage behavioral analytics to deliver personalized experiences that boost engagement and reduce cognitive load.",
        tags: ["ai", "suggestions", "recommendations", "predictive", "ux"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
        items: [{ itemName: "Suggestions" }],
      },
      {
        name: "AI Summary",
        description:
          "Deliver instant clarity with intelligent summarization tools that distill complex information into actionable insights. These punchy summary components enhance dashboard intelligence, improve decision velocity, and provide at-a-glance understanding for busy professionals.",
        tags: ["ai", "summary", "insights", "nlp", "content"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
        items: [{ itemName: "Summary Card" }],
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
          "Maximize communication efficiency with professional status indicators that instantly convey system health and user activity. These smart badge components enhance dashboard clarity, improve user onboarding, and provide at-a-glance understanding—crucial for enterprise applications and growth-focused platforms.",
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
          "Unlock trend analysis with professional area visualizations that highlight growth patterns and volume metrics. These featured chart components deliver exceptional data storytelling for business intelligence dashboards, financial applications, and performance monitoring platforms seeking actionable insights.",
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
          "Drive data-driven decisions with comparative bar visualizations that excel at categorical analysis. These smart charting components feature responsive designs, accessibility compliance, and interactive capabilities—perfect for analytics platforms, reporting tools, and business dashboards.",
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
          "Capture performance trends with precision line visualizations designed for time-series analysis. These professional chart components deliver clear pattern recognition and forecasting capabilities essential for financial platforms, IoT dashboards, and growth analytics.",
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
          "Simplify proportion analysis with intuitive pie and donut visualizations that highlight distribution patterns. These smart chart concepts enhance dashboard storytelling and improve data comprehension for marketing analytics, budget allocation, and market share analysis.",
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
          "Reveal multidimensional insights with advanced radar visualizations for comparative analysis and skill mapping. These featured chart components excel at performance benchmarking, competitive analysis, and multivariate data comparison for enterprise applications.",
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
          "Uncover hidden relationships with correlation-focused scatter visualizations for statistical analysis. These professional chart components identify patterns, clusters, and outliers in complex datasets—essential for data science platforms, research applications, and predictive analytics.",
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
          "Enhance data density with compact sparkline visualizations for at-a-glance trend analysis. These smart micro-chart components integrate seamlessly into dashboards, tables, and reports—perfect for financial applications, performance metrics, and space-constrained interfaces.",
        tags: ["sparkline", "mini", "inline", "micro", "trend"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [{ itemName: "Area Sparkline" }, { itemName: "Bar Sparkline" }],
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
          "Accelerate revenue growth with conversion-optimized pricing tables that maximize subscription sign-ups. These professional components feature clear value propositions, strategic CTAs, and responsive designs that outperform standard pricing pages—driving measurable business impact.",
        tags: ["pricing", "comparison", "subscription", "cta", "features"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
        items: [{ itemName: "Pricing Table 1" }],
      },
    ],
  },
  {
    category: "Feedbacks",
    icon: "messages-square",
    tags: ["ui", "feedback", "notifications", "interaction", "frontend"],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Alerts",
        description:
          "Enhance user experience with professional alert systems that communicate critical information effectively. These smart notification components improve system transparency, guide user actions, and reduce support tickets through clear, actionable feedback mechanisms.",
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
          "Boost engagement metrics with strategic popup implementations that capture attention without disrupting flow. These featured overlay components drive conversions, increase newsletter sign-ups, and promote featured content through smart timing and targeting.",
        tags: ["popup", "modal", "overlay", "interactive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Popup 1" }, { itemName: "Popup 2" }],
      },
      {
        name: "Modal Alerts",
        description:
          "Ensure critical actions with professional modal alerts that demand user attention for important decisions. These smart dialog components prevent errors, confirm high-stakes operations, and guide users through complex workflows with confidence.",
        tags: ["modal", "critical", "confirmation", "blocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Standard Modal Alert" }],
      },
      {
        name: "Snackbars",
        description:
          "Deliver seamless feedback with non-intrusive snackbar notifications that confirm actions and provide updates. These punchy message components enhance user confidence without interrupting workflow—perfect for modern applications prioritizing productivity.",
        tags: ["snackbar", "temporary", "action", "nonblocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Snackbar 1" }, { itemName: "Snackbar 2" }],
      },
      {
        name: "Toasts",
        description:
          "Improve system communication with elegant toast notifications that provide timely feedback. These smart messaging concepts enhance user experience through subtle animations, clear messaging, and intelligent auto-dismissal timing.",
        tags: ["toast", "feedback", "ephemeral", "nonintrusive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Toast 1" }],
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
          "Elevate content presentation with modular card layouts that organize information effectively. These professional container components improve content scanning, enhance visual hierarchy, and increase engagement across dashboard interfaces and content platforms.",
        tags: ["card", "dashboard", "content", "layout", "responsive"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
        items: [{ itemName: "Interactive Card" }, { itemName: "Luxury Card" }],
      },
      {
        name: "Containers",
        description:
          "Establish visual consistency with professional container systems that structure content with precision. These smart layout concepts ensure responsive behavior across devices while maintaining brand alignment and improving content readability.",
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
          "Optimize navigation efficiency with intelligent sidebar systems that adapt to user workflows. These featured layout components provide contextual navigation, reduce cognitive load, and improve task completion rates in complex applications.",
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
          "Maximize site engagement with comprehensive footer systems that improve navigation and conversion. These professional footer components enhance SEO through structured links, build trust with legal information, and capture leads through strategic CTAs.",
        tags: ["footer", "sitemap", "bottom", "legal", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [{ itemName: "Standard Footer" }],
      },
      {
        name: "Floating Menus",
        description:
          "Accelerate user actions with dynamic floating menus that provide instant access to key functions. These smart navigation components improve productivity metrics, reduce interaction cost, and create memorable user experiences through innovative interaction patterns.",
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
          "Streamline user journeys with intuitive menu systems that simplify complex navigation. These professional navigation components reduce bounce rates, improve content discovery, and enhance mobile experience through responsive designs and smart organization.",
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
          "Establish strong navigation foundations with professional navbar systems that guide users effectively. These featured header components improve brand recognition, enhance mobile responsiveness, and drive key conversions through strategic placement and clear hierarchy.",
        tags: ["navbar", "header", "navigation", "top", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [{ itemName: "Standard Navbar" }],
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
          "Reduce support overhead with intelligent FAQ sections that answer questions before they're asked. These smart accordion components improve SEO through structured data, enhance user experience with smooth interactions, and increase conversion through clear information architecture.",
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
          "Build trust and accelerate conversions with compelling testimonial displays that showcase social proof. These professional testimonial components increase credibility, improve engagement metrics, and drive purchasing decisions through authentic customer stories and strategic placement.",
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
          "Improve perceived performance with intelligent button loaders that provide immediate feedback during operations. These smart loading indicators enhance user confidence, reduce premature clicking, and create professional experiences during asynchronous processes.",
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
          "Enhance brand experience with distinctive custom loaders that reflect your application's personality. These professional loading animations maintain user engagement during wait times, improve perceived speed, and reinforce visual identity through thoughtful motion design.",
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
          "Maintain interface continuity with subtle inline loaders that indicate background activity without disruption. These smart micro-loading components provide contextual feedback within content streams, forms, and data tables—perfect for real-time applications.",
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
          "Create polished transitions with professional page loaders that manage user expectations during critical waits. These featured loading screens improve perceived performance, maintain brand presence, and reduce bounce rates during initial load and navigation.",
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
          "Increase completion rates with visual progress indicators that motivate users through multi-step processes. These smart progress components reduce abandonment, provide clear expectations, and enhance satisfaction during onboarding, uploads, and complex workflows.",
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
          "Indicate system activity with subtle pulse animations that communicate processing without interrupting flow. These professional loading indicators provide gentle feedback for background operations, real-time updates, and system status monitoring.",
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
