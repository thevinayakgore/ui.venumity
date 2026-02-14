// registry/components.ts
import { createComponents } from "./component-utils";

// Commented Components are under progress...
export const COMPONENTS = createComponents([
  {
    category: "AI Features",
    icon: "bot",
    tags: ["ui", "feedback", "notifications", "interaction", "frontend"],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      // {
      //   name: "AI Analytics",
      //   description:
      //     "Boost data-driven decision making with our smart AI analytics dashboard components. These featured UI elements deliver real-time insights, predictive metrics, and performance visualization that accelerate business growth. Engineered for SaaS platforms, enterprise dashboards, and AI-powered applications seeking actionable intelligence.",
      //   tags: ["ai", "analytics", "insights", "metrics", "dashboard"],
      //   techs: [
      //     "Next.js",
      //     "TypeScript",
      //     "Tailwind CSS",
      //     "Recharts",
      //     "Shadcn UI",
      //   ],
      //   items: [{ itemName: "Analytics" }],
      // },
      {
        name: "AI Chats",
        description:
          "Transform user engagement with intelligent chat interfaces that drive conversions and retention. These professional conversation components feature natural language processing, real-time messaging, and smart assistant capabilities perfect for customer support automation, AI companions, and interactive web applications.",
        tags: ["ai", "chat", "assistant", "conversation", "messaging"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Motion"],
        items: [{ itemName: "AI Chat Bot 1" }],
      },
      // {
      //   name: "AI Commands",
      //   description:
      //     "Supercharge productivity workflows with smart command palettes and AI-powered navigation systems. These punchy interface components reduce user friction, accelerate task completion, and provide intelligent shortcuts—essential for enterprise software, developer tools, and power-user applications.",
      //   tags: ["ai", "commands", "command-palette", "actions", "productivity"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Command Bar" }],
      // },
      // {
      //   name: "AI Forms",
      //   description:
      //     "Revolutionize data collection with intelligent form components featuring AI validation, contextual suggestions, and automated workflows. These smart form concepts dramatically reduce abandonment rates while increasing conversion—perfect for lead generation, onboarding sequences, and enterprise data entry.",
      //   tags: ["ai", "forms", "input", "autofill", "validation"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Forms" }],
      // },
      // {
      //   name: "AI Generators",
      //   description:
      //     "Accelerate content creation with cutting-edge AI generation tools for text, code, and media. These featured components showcase the latest in generative AI integration—ideal for marketing automation, developer productivity suites, and creative workflow enhancement.",
      //   tags: ["ai", "generator", "content", "automation", "creative"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Content Generators" }],
      // },
      // {
      //   name: "AI Searches",
      //   description:
      //     "Drive discovery and engagement with intelligent search interfaces featuring semantic understanding and predictive results. These professional search components enhance user experience while increasing content findability and time-on-site metrics for e-commerce and content platforms.",
      //   tags: ["ai", "search", "semantic", "command", "discovery"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Searches" }],
      // },
      // {
      //   name: "AI Suggestions",
      //   description:
      //     "Increase user retention with context-aware suggestion systems that anticipate needs and guide workflows. These smart recommendation components leverage behavioral analytics to deliver personalized experiences that boost engagement and reduce cognitive load.",
      //   tags: ["ai", "suggestions", "recommendations", "predictive", "ux"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Suggestions" }],
      // },
      {
        name: "AI Summary",
        description:
          "Deliver instant clarity with intelligent summarization tools that distill complex information into actionable insights. These punchy summary components enhance dashboard intelligence, improve decision velocity, and provide at-a-glance understanding for busy professionals.",
        tags: ["ai", "summary", "insights", "layout", "content"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Motion"],
        items: [{ itemName: "Summary Block" }, { itemName: "Summary Card" }],
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
          { itemName: "Basic Badge" },
          { itemName: "User Status Badge" },
          { itemName: "System Status Badge" },
          { itemName: "Priority Status Badge" },
          { itemName: "Connection Status Badge" },
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
      // {
      //   name: "Checkout Forms",
      //   description:
      //     "Conversion-focused checkout form layouts designed to streamline the purchase flow. These components reduce friction, support multiple steps and layouts, and improve completion rates across e-commerce and SaaS payment experiences.",
      //   tags: ["checkout", "forms", "payment", "conversion", "ecommerce", "ux"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Basic Checkout Form" },
      //     { itemName: "Compact Checkout Form" },
      //     { itemName: "Floating Checkout Form" },
      //     { itemName: "Multi Step Checkout Form" },
      //     { itemName: "Split Screen Checkout Form" },
      //   ],
      // },
      // {
      //   name: "Discount Badges",
      //   description:
      //     "Eye-catching discount and offer badge components that highlight promotions and drive urgency. Ideal for product listings and landing pages, these badges improve offer visibility and boost conversion rates.",
      //   tags: [
      //     "discount",
      //     "badge",
      //     "offer",
      //     "promotion",
      //     "pricing",
      //     "ecommerce",
      //   ],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Simple Discount Badge" },
      //     { itemName: "Minimal Discount Badge" },
      //     { itemName: "Countdown Discount Badge" },
      //     { itemName: "Collapse Discount Badge" },
      //     { itemName: "Animated Discount Badge" },
      //   ],
      // },
      // {
      //   name: "Offer Banners",
      //   description:
      //     "Promotional banner components designed to announce offers, campaigns, and limited-time deals. These banners balance visibility with usability and are optimized for conversions and user engagement.",
      //   tags: ["banner", "promotion", "offer", "marketing", "cta", "ecommerce"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Simple Offer Banner" },
      //     { itemName: "Countdown Offer Banner" },
      //     { itemName: "Interactive Offer Banner" },
      //     { itemName: "Scrolling Offer Banner" },
      //     { itemName: "Split Offer Banner" },
      //   ],
      // },
      // {
      //   name: "Payment Options",
      //   description:
      //     "Flexible payment selection components that present multiple payment methods clearly and securely. These layouts improve trust, reduce checkout abandonment, and support modern payment flows.",
      //   tags: [
      //     "payment",
      //     "checkout",
      //     "billing",
      //     "methods",
      //     "ecommerce",
      //     "finance",
      //   ],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Minimal Payment Options" },
      //     { itemName: "Payment Methods Cards" },
      //     { itemName: "Payment Methods Selector" },
      //     { itemName: "Saved Cards Payment Options" },
      //     { itemName: "Split Payment Options" },
      //   ],
      // },
      // {
      //   name: "Pricing Cards",
      //   description:
      //     "Structured pricing card components that communicate plan value clearly. Designed for SaaS and subscription products, these cards highlight features, tiers, and CTAs to maximize plan selection.",
      //   tags: [
      //     "pricing",
      //     "plans",
      //     "subscription",
      //     "saas",
      //     "comparison",
      //     "cards",
      //   ],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Simple Pricing Card" },
      //     { itemName: "Minimal Pricing Card" },
      //     { itemName: "Feature Comparison Pricing" },
      //     { itemName: "Tiered Pricing Card" },
      //     { itemName: "Toggle Pricing Card" },
      //   ],
      // },
      {
        name: "Pricing Tables",
        description:
          "Accelerate revenue growth with conversion-optimized pricing tables that maximize subscription sign-ups. These professional components feature clear value propositions, strategic CTAs, and responsive designs that outperform standard pricing pages—driving measurable business impact.",
        tags: ["pricing", "comparison", "subscription", "features"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
        items: [{ itemName: "Pricing Table 1" }],
      },
      // {
      //   name: "Product Cards",
      //   description:
      //     "Commerce-ready card components designed to showcase products with clarity and impact. These cards support pricing, images, actions, and metadata, helping improve product discovery, conversion rates, and browsing experience across e-commerce, SaaS, and marketplace interfaces.",
      //   tags: ["product", "ecommerce", "card", "catalog"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Minimal Product Card" },
      //     { itemName: "Standard Product Card" },
      //     { itemName: "Product Card 1" },
      //     { itemName: "Product Card 2" },
      //     { itemName: "Status Product Card" },
      //     { itemName: "Variants Product Card" },
      //     { itemName: "Quick Actions Product Card" },
      //   ],
      // },
      // {
      //   name: "Product Display",
      //   description:
      //     "High-impact product display sections built to showcase product details, visuals, and key selling points. These layouts enhance product storytelling and support informed purchasing decisions.",
      //   tags: ["product", "showcase", "details", "ecommerce", "ui", "display"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Compact Product Display" },
      //     { itemName: "Minimal Product Display" },
      //     { itemName: "Interactive Product Display" },
      //     { itemName: "Tech Product Display" },
      //     { itemName: "Luxury Product Display" },
      //   ],
      // },
      // {
      //   name: "Product Grids",
      //   description:
      //     "Responsive product grid layouts optimized for browsing large catalogs. These grids support filtering, highlighting, and masonry styles to improve discovery and visual balance.",
      //   tags: [
      //     "product-grid",
      //     "catalog",
      //     "listing",
      //     "ecommerce",
      //     "responsive",
      //     "layout",
      //   ],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Minimal Product Grid" },
      //     { itemName: "Standard Product Grid" },
      //     { itemName: "Filters Product Grid" },
      //     { itemName: "Featured Product Grid" },
      //     { itemName: "Masonry Product Grid" },
      //   ],
      // },
      // {
      //   name: "Shopping Carts",
      //   description:
      //     "Shopping cart components that manage product selection, quantities, and checkout progression. These carts improve clarity, reduce errors, and guide users smoothly toward purchase completion.",
      //   tags: ["cart", "shopping", "checkout", "ecommerce", "order", "summary"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Compact Shopping Cart" },
      //     { itemName: "Progress Shopping Cart" },
      //     { itemName: "Standard Shopping Cart" },
      //     { itemName: "Sidebar Shopping Cart" },
      //     { itemName: "Recommendations Shopping Cart" },
      //   ],
      // },
      // {
      //   name: "Wishlist Buttons",
      //   description:
      //     "Interactive wishlist button components that allow users to save products for later. These UI elements encourage return visits and improve engagement in e-commerce experiences.",
      //   tags: [
      //     "wishlist",
      //     "favorites",
      //     "like",
      //     "ecommerce",
      //     "interaction",
      //     "ui",
      //   ],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Animated Wishlist Button" },
      //     { itemName: "Standard Wishlist Button" },
      //     { itemName: "Floating Wishlist Button" },
      //     { itemName: "Tooltip Wishlist Button" },
      //     { itemName: "Toggle Wishlist Button" },
      //   ],
      // },
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
          { itemName: "Action Alert" },
          { itemName: "Modal Alert" },
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
      // {
      //   name: "Grid Systems",
      //   description:
      //     "Grid-based masonry layouts that arrange variable-height content into balanced columns. Ideal for galleries, feeds, and card-heavy interfaces, these layouts maximize space usage while staying fully responsive across screen sizes.",

      //   tags: ["masonry", "grid", "layout", "gallery", "cards"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Basic Grid" },
      //     { itemName: "Standard Grid" },
      //     { itemName: "Animated Grid" },
      //   ],
      // },
      {
        name: "Masonry Layouts",
        description:
          "Grid-based masonry layouts that arrange variable-height content into balanced columns. Ideal for galleries, feeds, and card-heavy interfaces, these layouts maximize space usage while staying fully responsive across screen sizes.",

        tags: ["masonry", "grid", "layout", "gallery", "cards"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
        items: [
          { itemName: "Basic Masonry Layout" },
          { itemName: "Standard Masonry Layout" },
          { itemName: "Masonry Image Gallery" },
        ],
      },
      // {
      //   name: "Sidebars",
      //   description:
      //     "Optimize navigation efficiency with intelligent sidebar systems that adapt to user workflows. These featured layout components provide contextual navigation, reduce cognitive load, and improve task completion rates in complex applications.",
      //   tags: ["sidebar", "admin", "navigation", "collapsible", "drawer"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [{ itemName: "Sidebar 1" }],
      // },
      // {
      //   name: "Split Layouts",
      //   description:
      //     "Responsive split-screen layouts designed to present parallel content side by side. Ideal for comparisons, onboarding flows, dashboards, and feature showcases, these layouts adapt seamlessly across devices while maintaining clear visual balance and hierarchy.",
      //   tags: [
      //     "split-layout",
      //     "two-column",
      //     "responsive",
      //     "comparison",
      //     "dashboard",
      //   ],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Basic Split Layout" },
      //     { itemName: "Standard Split Layout" },
      //     { itemName: "Animated Split Layout" },
      //     { itemName: "Premium Split Layout" },
      //   ],
      // },
      // {
      //   name: "Stacks",
      //   description:
      //     "Vertical stacking layouts that organize content in a clear top-to-bottom flow. Perfect for feeds, forms, cards, and content-heavy sections, these stack systems ensure consistent spacing, alignment, and smooth responsiveness across screen sizes.",
      //   tags: [
      //     "stack",
      //     "vertical-layout",
      //     "spacing",
      //     "content-flow",
      //     "responsive",
      //   ],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Basic Stack" },
      //     { itemName: "Standard Stack" },
      //     { itemName: "Moderate Stack" },
      //     { itemName: "Complex Stack" },
      //     { itemName: "Animated Stack" },
      //   ],
      // },
    ],
  },
  {
    category: "Loaders",
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
        name: "Grid Loaders",
        description:
          "Indicate system activity with subtle pulse animations that communicate processing without interrupting flow. These professional loading indicators provide gentle feedback for background operations, real-time updates, and system status monitoring.",
        tags: ["pulse", "loader", "activity", "animation", "waiting"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [{ itemName: "Grid Loader 1" }],
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
        name: "Progress Loaders",
        description:
          "Create polished transitions with professional page loaders that manage user expectations during critical waits. These featured loading screens improve perceived performance, maintain brand presence, and reduce bounce rates during initial load and navigation.",
        tags: ["page", "loader", "fullscreen", "route", "blocking"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Linear Progress Loader" },
          { itemName: "Circular Progress Loader" },
          { itemName: "Progress Loader 2" },
        ],
      },
      {
        name: "Skeletons",
        description:
          "Create polished transitions with professional page loaders that manage user expectations during critical waits. These featured loading screens improve perceived performance, maintain brand presence, and reduce bounce rates during initial load and navigation.",
        tags: ["page", "loader", "fullscreen", "route", "blocking"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Skeleton Loader" },
          { itemName: "Card Skeleton Loader" },
          { itemName: "Profile Skeleton Loader" },
          { itemName: "Table Skeleton Loader" },
          { itemName: "Dashboard Skeleton Loader" },
        ],
      },
      {
        name: "Spinners",
        description:
          "Indicate system activity with subtle pulse animations that communicate processing without interrupting flow. These professional loading indicators provide gentle feedback for background operations, real-time updates, and system status monitoring.",
        tags: ["pulse", "loader", "activity", "animation", "waiting"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Spinner" },
          { itemName: "Ring Spinner" },
          { itemName: "Gradient Spinner" },
        ],
      },
      {
        name: "Wave Loaders",
        description:
          "Indicate system activity with subtle pulse animations that communicate processing without interrupting flow. These professional loading indicators provide gentle feedback for background operations, real-time updates, and system status monitoring.",
        tags: ["pulse", "loader", "activity", "animation", "waiting"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Wave Loader" },
          { itemName: "Pulse Wave Loader" },
          { itemName: "Circle Wave Loader" },
          { itemName: "Gradient Wave Loader" },
          { itemName: "Premium Wave Loader" },
        ],
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
      // {
      //   name: "Floating Menus",
      //   description:
      //     "Accelerate user actions with dynamic floating menus that provide instant access to key functions. These smart navigation components improve productivity metrics, reduce interaction cost, and create memorable user experiences through innovative interaction patterns.",
      //   tags: ["menu", "dock", "speed", "radial", "navigation"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
      //   items: [
      //     { itemName: "Dock Menu" },
      //     { itemName: "Speed Dial Menu" },
      //     { itemName: "Radial Menu" },
      //   ],
      // },
      {
        name: "Footers",
        description:
          "Maximize site engagement with comprehensive footer systems that improve navigation and conversion. These professional footer components enhance SEO through structured links, build trust with legal information, and capture leads through strategic CTAs.",
        tags: ["footer", "sitemap", "bottom", "legal", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [{ itemName: "Standard Footer" }],
      },
      // {
      //   name: "Menu",
      //   description:
      //     "Streamline user journeys with intuitive menu systems that simplify complex navigation. These professional navigation components reduce bounce rates, improve content discovery, and enhance mobile experience through responsive designs and smart organization.",
      //   tags: ["menu", "dropdown", "mega", "nav", "command"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
      //   items: [
      //     { itemName: "Dropdown Menu" },
      //     { itemName: "Mega Menu" },
      //     { itemName: "Nav Menu" },
      //     { itemName: "Command Palette" },
      //   ],
      // },
      {
        name: "Navbars",
        description:
          "Establish strong navigation foundations with professional navbar systems that guide users effectively. These featured header components improve brand recognition, enhance mobile responsiveness, and drive key conversions through strategic placement and clear hierarchy.",
        tags: ["navbar", "header", "navigation", "top", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [{ itemName: "Standard Navbar" }],
      },
      // {
      //   name: "Pagination",
      //   description:
      //     "Navigation controls that help users move efficiently through large datasets and content collections. These pagination patterns improve performance, usability, and content discoverability across tables, feeds, and long-form listings.",
      //   tags: [
      //     "pagination",
      //     "navigation",
      //     "paging",
      //     "tables",
      //     "lists",
      //     "infinite-scroll",
      //     "ui",
      //   ],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
      //   items: [
      //     { itemName: "Basic Pagination" },
      //     { itemName: "Compact Pagination" },
      //     { itemName: "Table Pagination" },
      //     { itemName: "Load More Pagination" },
      //     { itemName: "Infinite Scroll" },
      //   ],
      // },
      // {
      //   name: "Tabs",
      //   description:
      //     "Navigation controls that help users move efficiently through large datasets and content collections. These pagination patterns improve performance, usability, and content discoverability across tables, feeds, and long-form listings.",
      //   tags: [
      //     "pagination",
      //     "navigation",
      //     "paging",
      //     "tables",
      //     "lists",
      //     "infinite-scroll",
      //     "ui",
      //   ],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
      //   items: [
      //     { itemName: "Basic Tab" },
      //     { itemName: "Pills Tab" },
      //     { itemName: "Scrollable Tab" },
      //   ],
      // },
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
          { itemName: "Company Testimonial" },
          { itemName: "Carousel Testimonial" },
        ],
      },
    ],
  },
]);
