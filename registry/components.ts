// registry/components.ts
import { createComponents } from "./component-utils";

// Commented Components are under progress...
export const COMPONENTS = createComponents([
  {
    category: "AI Features",
    icon: "bot",
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
      //   items: [{ itemName: "Analytics", githubUsername: "thevinayakgore" }],
      // },
      {
        name: "AI Chats",
        description:
          "Transform user engagement with intelligent chat interfaces that drive conversions and retention. These professional conversation components feature natural language processing, real-time messaging, and smart assistant capabilities perfect for customer support automation, AI companions, and interactive web applications.",
        tags: ["ai", "chat", "assistant", "conversation", "messaging"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Motion"],
        items: [
          { itemName: "AI Chat Bot 1", githubUsername: "thevinayakgore" },
        ],
      },
      // {
      //   name: "AI Commands",
      //   description:
      //     "Supercharge productivity workflows with smart command palettes and AI-powered navigation systems. These punchy interface components reduce user friction, accelerate task completion, and provide intelligent shortcuts—essential for enterprise software, developer tools, and power-user applications.",
      //   tags: ["ai", "commands", "command-palette", "actions", "productivity"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Command Bar", githubUsername: "thevinayakgore" }],
      // },
      // {
      //   name: "AI Forms",
      //   description:
      //     "Revolutionize data collection with intelligent form components featuring AI validation, contextual suggestions, and automated workflows. These smart form concepts dramatically reduce abandonment rates while increasing conversion—perfect for lead generation, onboarding sequences, and enterprise data entry.",
      //   tags: ["ai", "forms", "input", "autofill", "validation"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Forms", githubUsername: "thevinayakgore" }],
      // },
      // {
      //   name: "AI Generators",
      //   description:
      //     "Accelerate content creation with cutting-edge AI generation tools for text, code, and media. These featured components showcase the latest in generative AI integration—ideal for marketing automation, developer productivity suites, and creative workflow enhancement.",
      //   tags: ["ai", "generator", "content", "automation", "creative"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Content Generators", githubUsername: "thevinayakgore" }],
      // },
      // {
      //   name: "AI Searches",
      //   description:
      //     "Drive discovery and engagement with intelligent search interfaces featuring semantic understanding and predictive results. These professional search components enhance user experience while increasing content findability and time-on-site metrics for e-commerce and content platforms.",
      //   tags: ["ai", "search", "semantic", "command", "discovery"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Searches", githubUsername: "thevinayakgore" }],
      // },
      {
        name: "AI Suggestions",
        description:
          "Increase user retention with context-aware suggestion systems that anticipate needs and guide workflows. These smart recommendation components leverage behavioral analytics to deliver personalized experiences that boost engagement and reduce cognitive load.",
        tags: ["ai", "suggestions", "recommendations", "predictive", "ux"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
        items: [{ itemName: "Enhance Mail", githubUsername: "thevinayakgore" }],
      },
      {
        name: "AI Summary",
        description:
          "Deliver instant clarity with intelligent summarization tools that distill complex information into actionable insights. These punchy summary components enhance dashboard intelligence, improve decision velocity, and provide at-a-glance understanding for busy professionals.",
        tags: ["ai", "summary", "insights", "layout", "content"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Motion"],
        items: [
          { itemName: "Summary Block", githubUsername: "thevinayakgore" },
        ],
      },
    ],
  },
  {
    category: "Badges",
    icon: "badge-check",
    subcategories: [
      {
        name: "Status Badges",
        thumbnail: "connection-status-badge",
        description:
          "Maximize communication efficiency with professional status indicators that instantly convey system health and user activity. These smart badge components enhance dashboard clarity, improve user onboarding, and provide at-a-glance understanding—crucial for enterprise applications and growth-focused platforms.",
        tags: ["status", "system", "connection", "priority", "user"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Basic Badge", githubUsername: "thevinayakgore" },
          { itemName: "User Status Badge", githubUsername: "thevinayakgore" },
          { itemName: "System Status Badge", githubUsername: "thevinayakgore" },
          {
            itemName: "Priority Status Badge",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Connection Status Badge",
            githubUsername: "thevinayakgore",
          },
        ],
      },
    ],
  },
  {
    category: "Cards",
    icon: "square-slash",
    subcategories: [
      {
        name: "Profile Cards",
        description:
          "Profile card components designed to present user identities, roles, and key metadata in a clean, engaging layout. Ideal for dashboards, team pages, social platforms, and SaaS applications where quick recognition and contextual user information are essential.",
        tags: [
          "profile",
          "user",
          "identity",
          "card",
          "avatar",
          "dashboard",
          "saas",
          "team",
        ],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Profile Card 1", githubUsername: "thevinayakgore" },
        ],
      },
    ],
  },
  {
    category: "Charts",
    icon: "chart-pie",
    subcategories: [
      {
        name: "Area Charts",
        thumbnail: "percent-area-chart",
        description:
          "Unlock trend analysis with professional area visualizations that highlight growth patterns and volume metrics. These featured chart components deliver exceptional data storytelling for business intelligence dashboards, financial applications, and performance monitoring platforms seeking actionable insights.",
        tags: ["area", "trend", "data", "shaded", "growth"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Area Chart", githubUsername: "thevinayakgore" },
          { itemName: "Gradient Area Chart", githubUsername: "thevinayakgore" },
          { itemName: "Multi Area Chart", githubUsername: "thevinayakgore" },
          { itemName: "Percent Area Chart", githubUsername: "thevinayakgore" },
          { itemName: "Spline Area Chart", githubUsername: "thevinayakgore" },
          { itemName: "Stacked Area Chart", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Bar Charts",
        thumbnail: "mixed-bar-chart",
        description:
          "Drive data-driven decisions with comparative bar visualizations that excel at categorical analysis. These smart charting components feature responsive designs, accessibility compliance, and interactive capabilities—perfect for analytics platforms, reporting tools, and business dashboards.",
        tags: ["bar", "comparison", "histogram", "data", "analytics"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Bar Chart", githubUsername: "thevinayakgore" },
          { itemName: "Grouped Bar Chart", githubUsername: "thevinayakgore" },
          {
            itemName: "Horizontal Bar Chart",
            githubUsername: "thevinayakgore",
          },
          { itemName: "Mixed Bar Chart", githubUsername: "thevinayakgore" },
          { itemName: "Stacked Bar Chart", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Line Charts",
        thumbnail: "label-line-chart",
        description:
          "Capture performance trends with precision line visualizations designed for time-series analysis. These professional chart components deliver clear pattern recognition and forecasting capabilities essential for financial platforms, IoT dashboards, and growth analytics.",
        tags: ["line", "time", "pattern", "graph", "data"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Line Chart", githubUsername: "thevinayakgore" },
          { itemName: "Linear Line Chart", githubUsername: "thevinayakgore" },
          { itemName: "Step Line Chart", githubUsername: "thevinayakgore" },
          { itemName: "Multiple Line Chart", githubUsername: "thevinayakgore" },
          { itemName: "Dots Line Chart", githubUsername: "thevinayakgore" },
          {
            itemName: "Custom Dots Line Chart",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Dots Color Line Chart",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Label Line Chart",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Custom Label Line Chart",
            githubUsername: "thevinayakgore",
          },
        ],
      },
      {
        name: "Pie Charts",
        thumbnail: "donut-pie-chart",
        description:
          "Simplify proportion analysis with intuitive pie and donut visualizations that highlight distribution patterns. These smart chart concepts enhance dashboard storytelling and improve data comprehension for marketing analytics, budget allocation, and market share analysis.",
        tags: ["pie", "proportion", "distribution", "graph", "segments"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Pie Chart", githubUsername: "thevinayakgore" },
          { itemName: "Donut Pie Chart", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Radar Charts",
        thumbnail: "filled-radar-chart",
        description:
          "Reveal multidimensional insights with advanced radar visualizations for comparative analysis and skill mapping. These featured chart components excel at performance benchmarking, competitive analysis, and multivariate data comparison for enterprise applications.",
        tags: ["radar", "spider", "analysis", "skill", "comparison"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Radar Chart", githubUsername: "thevinayakgore" },
          { itemName: "Filled Radar Chart", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Radial Charts",
        thumbnail: "label-radial-chart",
        description:
          "Visualize progress, distribution, and performance with radial chart components built for circular data representation. These charts are ideal for KPIs, completion metrics, comparative proportions, and dashboard highlights where visual impact and quick comprehension matter.",
        tags: [
          "radial",
          "circular",
          "donut",
          "progress",
          "kpi",
          "metrics",
          "distribution",
          "dashboard",
        ],
        techs: [
          "Next.js",
          "Recharts",
          "TypeScript",
          "Tailwind CSS",
          "shadcnui",
        ],
        items: [
          { itemName: "Basic Radial Chart", githubUsername: "thevinayakgore" },
          { itemName: "Label Radial Chart", githubUsername: "thevinayakgore" },
          { itemName: "Grid Radial Chart", githubUsername: "thevinayakgore" },
          { itemName: "Text Radial Chart", githubUsername: "thevinayakgore" },
          { itemName: "Shape Radial Chart", githubUsername: "thevinayakgore" },
          {
            itemName: "Stacked Radial Chart",
            githubUsername: "thevinayakgore",
          },
        ],
      },
      {
        name: "Scatter Plots",
        description:
          "Uncover hidden relationships with correlation-focused scatter visualizations for statistical analysis. These professional chart components identify patterns, clusters, and outliers in complex datasets—essential for data science platforms, research applications, and predictive analytics.",
        tags: ["scatter", "dot", "correlation", "statistic", "analysis"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Scatter Plot", githubUsername: "thevinayakgore" },
          { itemName: "3D Scatter Plot", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Sparklines",
        thumbnail: "range-sparkline",
        description:
          "Enhance data density with compact sparkline visualizations for at-a-glance trend analysis. These smart micro-chart components integrate seamlessly into dashboards, tables, and reports—perfect for financial applications, performance metrics, and space-constrained interfaces.",
        tags: ["sparkline", "mini", "inline", "micro", "trend"],
        techs: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Line Sparkline", githubUsername: "thevinayakgore" },
          { itemName: "Area Sparkline", githubUsername: "thevinayakgore" },
          { itemName: "Bar Sparkline", githubUsername: "thevinayakgore" },
          { itemName: "Winloss Sparkline", githubUsername: "thevinayakgore" },
          { itemName: "Scatter Sparkline", githubUsername: "thevinayakgore" },
          { itemName: "Range Sparkline", githubUsername: "thevinayakgore" },
        ],
      },
    ],
  },
  {
    category: "Commerce",
    icon: "indian-rupee",
    subcategories: [
      // {
      //   name: "Checkout Forms",
      //   description:
      //     "Conversion-focused checkout form layouts designed to streamline the purchase flow. These components reduce friction, support multiple steps and layouts, and improve completion rates across e-commerce and SaaS payment experiences.",
      //   tags: ["checkout", "forms", "payment", "conversion", "ecommerce", "ux"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Basic Checkout Form", githubUsername: "thevinayakgore" },
      //     { itemName: "Compact Checkout Form", githubUsername: "thevinayakgore" },
      //     { itemName: "Floating Checkout Form", githubUsername: "thevinayakgore" },
      //     { itemName: "Multi Step Checkout Form", githubUsername: "thevinayakgore" },
      //     { itemName: "Split Screen Checkout Form", githubUsername: "thevinayakgore" },
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
      //     { itemName: "Simple Discount Badge", githubUsername: "thevinayakgore" },
      //     { itemName: "Minimal Discount Badge", githubUsername: "thevinayakgore" },
      //     { itemName: "Countdown Discount Badge", githubUsername: "thevinayakgore" },
      //     { itemName: "Collapse Discount Badge", githubUsername: "thevinayakgore" },
      //     { itemName: "Animated Discount Badge", githubUsername: "thevinayakgore" },
      //   ],
      // },
      // {
      //   name: "Offer Banners",
      //   description:
      //     "Promotional banner components designed to announce offers, campaigns, and limited-time deals. These banners balance visibility with usability and are optimized for conversions and user engagement.",
      //   tags: ["banner", "promotion", "offer", "marketing", "cta", "ecommerce"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Simple Offer Banner", githubUsername: "thevinayakgore" },
      //     { itemName: "Countdown Offer Banner", githubUsername: "thevinayakgore" },
      //     { itemName: "Interactive Offer Banner", githubUsername: "thevinayakgore" },
      //     { itemName: "Scrolling Offer Banner", githubUsername: "thevinayakgore" },
      //     { itemName: "Split Offer Banner", githubUsername: "thevinayakgore" },
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
      //     { itemName: "Minimal Payment Options", githubUsername: "thevinayakgore" },
      //     { itemName: "Payment Methods Cards", githubUsername: "thevinayakgore" },
      //     { itemName: "Payment Methods Selector", githubUsername: "thevinayakgore" },
      //     { itemName: "Saved Cards Payment Options", githubUsername: "thevinayakgore" },
      //     { itemName: "Split Payment Options", githubUsername: "thevinayakgore" },
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
      //     { itemName: "Simple Pricing Card", githubUsername: "thevinayakgore" },
      //     { itemName: "Minimal Pricing Card", githubUsername: "thevinayakgore" },
      //     { itemName: "Feature Comparison Pricing", githubUsername: "thevinayakgore" },
      //     { itemName: "Tiered Pricing Card", githubUsername: "thevinayakgore" },
      //     { itemName: "Toggle Pricing Card", githubUsername: "thevinayakgore" },
      //   ],
      // },
      {
        name: "Pricing Tables",
        thumbnail: "tiered-pricing-card",
        description:
          "Accelerate revenue growth with conversion-optimized pricing tables that maximize subscription sign-ups. These professional components feature clear value propositions, strategic CTAs, and responsive designs that outperform standard pricing pages—driving measurable business impact.",
        tags: ["pricing", "comparison", "subscription", "features"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
        items: [
          { itemName: "Pricing Table 1", githubUsername: "thevinayakgore" },
          { itemName: "Pricing Table 2", githubUsername: "thevinayakgore" },
          { itemName: "Pricing Table 3", githubUsername: "thevinayakgore" },
          { itemName: "Tiered Pricing Card", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Product Cards",
        thumbnail: "product-card-3",
        description:
          "Commerce-ready card components designed to showcase products with clarity and impact. These cards support pricing, images, actions, and metadata, helping improve product discovery, conversion rates, and browsing experience across e-commerce, SaaS, and marketplace interfaces.",
        tags: ["product", "ecommerce", "card", "catalog"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
        items: [
          { itemName: "Product Card 1", githubUsername: "thevinayakgore" },
          { itemName: "Product Card 2", githubUsername: "thevinayakgore" },
          { itemName: "Product Card 3", githubUsername: "thevinayakgore" },
        ],
      },
      // {
      //   name: "Product Display",
      //   description:
      //     "High-impact product display sections built to showcase product details, visuals, and key selling points. These layouts enhance product storytelling and support informed purchasing decisions.",
      //   tags: ["product", "showcase", "details", "ecommerce", "ui", "display"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Compact Product Display", githubUsername: "thevinayakgore" },
      //     { itemName: "Minimal Product Display", githubUsername: "thevinayakgore" },
      //     { itemName: "Interactive Product Display", githubUsername: "thevinayakgore" },
      //     { itemName: "Tech Product Display", githubUsername: "thevinayakgore" },
      //     { itemName: "Luxury Product Display", githubUsername: "thevinayakgore" },
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
      //     { itemName: "Minimal Product Grid", githubUsername: "thevinayakgore" },
      //     { itemName: "Standard Product Grid", githubUsername: "thevinayakgore" },
      //     { itemName: "Filters Product Grid", githubUsername: "thevinayakgore" },
      //     { itemName: "Featured Product Grid", githubUsername: "thevinayakgore" },
      //     { itemName: "Masonry Product Grid", githubUsername: "thevinayakgore" },
      //   ],
      // },
      // {
      //   name: "Shopping Carts",
      //   description:
      //     "Shopping cart components that manage product selection, quantities, and checkout progression. These carts improve clarity, reduce errors, and guide users smoothly toward purchase completion.",
      //   tags: ["cart", "shopping", "checkout", "ecommerce", "order", "summary"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Compact Shopping Cart", githubUsername: "thevinayakgore" },
      //     { itemName: "Progress Shopping Cart", githubUsername: "thevinayakgore" },
      //     { itemName: "Standard Shopping Cart", githubUsername: "thevinayakgore" },
      //     { itemName: "Sidebar Shopping Cart", githubUsername: "thevinayakgore" },
      //     { itemName: "Recommendations Shopping Cart", githubUsername: "thevinayakgore" },
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
      //     { itemName: "Animated Wishlist Button", githubUsername: "thevinayakgore" },
      //     { itemName: "Standard Wishlist Button", githubUsername: "thevinayakgore" },
      //     { itemName: "Floating Wishlist Button", githubUsername: "thevinayakgore" },
      //     { itemName: "Tooltip Wishlist Button", githubUsername: "thevinayakgore" },
      //     { itemName: "Toggle Wishlist Button", githubUsername: "thevinayakgore" },
      //   ],
      // },
    ],
  },
  {
    category: "Dashboards",
    icon: "chart-no-axes-combined",
    subcategories: [
      {
        name: "Financial",

        description:
          "Professional financial dashboard layouts designed to track income, expenses, savings, and key performance metrics. These dashboards provide clear data visualization, actionable insights, and a structured overview—ideal for personal finance tools, fintech platforms, and business reporting applications.",
        tags: [
          "finance",
          "personal-finance",
          "analytics",
          "metrics",
          "charts",
          "reports",
          "fintech",
        ],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          {
            itemName: "Personal Panel 1",
            hasFolderStructure: true, // Enable Folder Structure
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Charts Dashboard",
            githubUsername: "thevinayakgore",
          },
        ],
      },
    ],
  },
  {
    category: "Data Display",
    icon: "database-zap",
    subcategories: [
      {
        name: "Accordions",
        thumbnail: "nested-accordion",
        description:
          "Data-focused accordion components designed to organize large or hierarchical datasets into expandable sections. Ideal for dashboards, settings panels, FAQs, and dense information layouts where progressive disclosure improves readability and usability.",
        tags: [
          "accordion",
          "data-display",
          "collapsible",
          "expandable",
          "hierarchical",
          "dashboard",
          "ui-pattern",
        ],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          {
            itemName: "Basic Accordion",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Steps Accordion",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Multiple Open Accordion",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Nested Accordion",
            githubUsername: "thevinayakgore",
          },
        ],
      },
      {
        name: "Tables",
        thumbnail: "real-time-filterable-table",
        description:
          "Powerful table components built for displaying, sorting, and managing structured data efficiently. Ideal for dashboards, admin panels, analytics views, and enterprise applications where clarity, performance, and user control are essential.",
        tags: [
          "table",
          "data-table",
          "sortable",
          "data-display",
          "dashboard",
          "admin",
          "analytics",
          "enterprise",
        ],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          {
            itemName: "Fixed Column Table",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Sortable Table",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Editable Table",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Filters Table",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Real Time Filterable Table",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Saved Views Filterable Table",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Expandable Row Table",
            githubUsername: "thevinayakgore",
          },
        ],
      },
    ],
  },
  {
    category: "Feedbacks",
    icon: "messages-square",
    subcategories: [
      {
        name: "Alerts",
        thumbnail: "action-alert",
        description:
          "Enhance user experience with professional alert systems that communicate critical information effectively. These smart notification components improve system transparency, guide user actions, and reduce support tickets through clear, actionable feedback mechanisms.",
        tags: ["alert", "notification", "banner", "action", "animated"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Standard Alert", githubUsername: "thevinayakgore" },
          { itemName: "Action Alert", githubUsername: "thevinayakgore" },
          { itemName: "Modal Alert", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Popups",
        description:
          "Boost engagement metrics with strategic popup implementations that capture attention without disrupting flow. These featured overlay components drive conversions, increase newsletter sign-ups, and promote featured content through smart timing and targeting.",
        tags: ["popup", "modal", "overlay", "interactive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Popup 1", githubUsername: "thevinayakgore" },
          { itemName: "Popup 2", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Snackbars",
        thumbnail: "snackbar-2",
        description:
          "Deliver seamless feedback with non-intrusive snackbar notifications that confirm actions and provide updates. These punchy message components enhance user confidence without interrupting workflow—perfect for modern applications prioritizing productivity.",
        tags: ["snackbar", "temporary", "action", "nonblocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Snackbar 1", githubUsername: "thevinayakgore" },
          { itemName: "Snackbar 2", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Toasts",
        description:
          "Improve system communication with elegant toast notifications that provide timely feedback. These smart messaging concepts enhance user experience through subtle animations, clear messaging, and intelligent auto-dismissal timing.",
        tags: ["toast", "feedback", "ephemeral", "nonintrusive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Toast 1", githubUsername: "thevinayakgore" }],
      },
    ],
  },
  {
    category: "Layouts",
    icon: "layout-template",
    subcategories: [
      {
        name: "Containers",
        thumbnail: "premium-container",
        description:
          "Establish visual consistency with professional container systems that structure content with precision. These smart layout concepts ensure responsive behavior across devices while maintaining brand alignment and improving content readability.",
        tags: ["container", "page", "wrapper", "responsive", "structure"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [
          { itemName: "Basic Container", githubUsername: "thevinayakgore" },
          { itemName: "Standard Container", githubUsername: "thevinayakgore" },
          { itemName: "Premium Container", githubUsername: "thevinayakgore" },
        ],
      },
      // {
      //   name: "Grid Systems",
      //   description:
      //     "Grid-based masonry layouts that arrange variable-height content into balanced columns. Ideal for galleries, feeds, and card-heavy interfaces, these layouts maximize space usage while staying fully responsive across screen sizes.",
      //   tags: ["masonry", "grid", "layout", "gallery", "cards"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [
      //     { itemName: "Basic Grid", githubUsername: "thevinayakgore" },
      //     { itemName: "Standard Grid", githubUsername: "thevinayakgore" },
      //     { itemName: "Animated Grid", githubUsername: "thevinayakgore" },
      //   ],
      // },
      {
        name: "Masonry Layouts",
        thumbnail: "masonry-image-gallery",
        description:
          "Grid-based masonry layouts that arrange variable-height content into balanced columns. Ideal for galleries, feeds, and card-heavy interfaces, these layouts maximize space usage while staying fully responsive across screen sizes.",
        tags: ["masonry", "grid", "layout", "gallery", "cards"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
        items: [
          {
            itemName: "Basic Masonry Layout",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Standard Masonry Layout",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Masonry Image Gallery",
            githubUsername: "thevinayakgore",
          },
        ],
      },
      // {
      //   name: "Sidebars",
      //   description:
      //     "Optimize navigation efficiency with intelligent sidebar systems that adapt to user workflows. These featured layout components provide contextual navigation, reduce cognitive load, and improve task completion rates in complex applications.",
      //   tags: ["sidebar", "admin", "navigation", "collapsible", "drawer"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [{ itemName: "Sidebar 1", githubUsername: "thevinayakgore" }],
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
      //     { itemName: "Basic Split Layout", githubUsername: "thevinayakgore" },
      //     { itemName: "Standard Split Layout", githubUsername: "thevinayakgore" },
      //     { itemName: "Animated Split Layout", githubUsername: "thevinayakgore" },
      //     { itemName: "Premium Split Layout", githubUsername: "thevinayakgore" },
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
      //     { itemName: "Basic Stack", githubUsername: "thevinayakgore" },
      //     { itemName: "Standard Stack", githubUsername: "thevinayakgore" },
      //     { itemName: "Moderate Stack", githubUsername: "thevinayakgore" },
      //     { itemName: "Complex Stack", githubUsername: "thevinayakgore" },
      //     { itemName: "Animated Stack", githubUsername: "thevinayakgore" },
      //   ],
      // },
    ],
  },
  {
    category: "Loaders",
    icon: "loader",
    subcategories: [
      {
        name: "Button Loaders",
        thumbnail: "shiny-button-loader",
        description:
          "Improve perceived performance with intelligent button loaders that provide immediate feedback during operations. These smart loading indicators enhance user confidence, reduce premature clicking, and create professional experiences during asynchronous processes.",
        tags: ["button", "loader", "loading", "async", "feedback"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Button Loader", githubUsername: "thevinayakgore" },
          {
            itemName: "Outline Button Loader",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Animated Button Loader",
            githubUsername: "thevinayakgore",
          },
          { itemName: "Shiny Button Loader", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Grid Loaders",
        description:
          "Indicate system activity with subtle pulse animations that communicate processing without interrupting flow. These professional loading indicators provide gentle feedback for background operations, real-time updates, and system status monitoring.",
        tags: ["pulse", "loader", "activity", "animation", "waiting"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Grid Loader 1", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Inline Loaders",
        thumbnail: "basic-inline-loader",
        description:
          "Maintain interface continuity with subtle inline loaders that indicate background activity without disruption. These smart micro-loading components provide contextual feedback within content streams, forms, and data tables—perfect for real-time applications.",
        tags: ["inline", "loader", "text", "micro", "compact"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS"],
        items: [
          { itemName: "Basic Inline Loader", githubUsername: "thevinayakgore" },
          { itemName: "Pulse Inline Loader", githubUsername: "thevinayakgore" },
          { itemName: "Text Inline Loader", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Page Loaders",
        thumbnail: "full-page-loader",
        description:
          "Create polished transitions with professional page loaders that manage user expectations during critical waits. These featured loading screens improve perceived performance, maintain brand presence, and reduce bounce rates during initial load and navigation.",
        tags: ["page", "loader", "fullscreen", "route", "blocking"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          {
            itemName: "Centered Page Loader",
            githubUsername: "thevinayakgore",
          },
          { itemName: "Full Page Loader", githubUsername: "thevinayakgore" },
          { itemName: "Logo Page Loader", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Progress Loaders",
        thumbnail: "progress-loader-2",
        description:
          "Create polished transitions with professional page loaders that manage user expectations during critical waits. These featured loading screens improve perceived performance, maintain brand presence, and reduce bounce rates during initial load and navigation.",
        tags: ["page", "loader", "fullscreen", "route", "blocking"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          {
            itemName: "Linear Progress Loader",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Circular Progress Loader",
            githubUsername: "thevinayakgore",
          },
          { itemName: "Progress Loader 2", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Pulse Loaders",
        thumbnail: "multi-pulse-loader",
        description:
          "Create polished transitions with professional page loaders that manage user expectations during critical waits. These featured loading screens improve perceived performance, maintain brand presence, and reduce bounce rates during initial load and navigation.",
        tags: ["page", "loader", "fullscreen", "route", "blocking"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          {
            itemName: "Basic Pulse Loader",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Multi Pulse Loader",
            githubUsername: "thevinayakgore",
          },
        ],
      },
      {
        name: "Skeletons",
        thumbnail: "dashboard-skeleton-loader",
        description:
          "Create polished transitions with professional page loaders that manage user expectations during critical waits. These featured loading screens improve perceived performance, maintain brand presence, and reduce bounce rates during initial load and navigation.",
        tags: ["page", "loader", "fullscreen", "route", "blocking"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          {
            itemName: "Basic Skeleton Loader",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Card Skeleton Loader",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Profile Skeleton Loader",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Table Skeleton Loader",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Dashboard Skeleton Loader",
            githubUsername: "thevinayakgore",
          },
        ],
      },
      {
        name: "Spinners",
        thumbnail: "ring-spinner",
        description:
          "Indicate system activity with subtle pulse animations that communicate processing without interrupting flow. These professional loading indicators provide gentle feedback for background operations, real-time updates, and system status monitoring.",
        tags: ["pulse", "loader", "activity", "animation", "waiting"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Spinner", githubUsername: "thevinayakgore" },
          { itemName: "Ring Spinner", githubUsername: "thevinayakgore" },
          { itemName: "Gradient Spinner", githubUsername: "thevinayakgore" },
        ],
      },
      {
        name: "Wave Loaders",
        thumbnail: "premium-wave-loader",
        description:
          "Indicate system activity with subtle pulse animations that communicate processing without interrupting flow. These professional loading indicators provide gentle feedback for background operations, real-time updates, and system status monitoring.",
        tags: ["pulse", "loader", "activity", "animation", "waiting"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Wave Loader", githubUsername: "thevinayakgore" },
          { itemName: "Pulse Wave Loader", githubUsername: "thevinayakgore" },
          { itemName: "Circle Wave Loader", githubUsername: "thevinayakgore" },
          {
            itemName: "Gradient Wave Loader",
            githubUsername: "thevinayakgore",
          },
          { itemName: "Premium Wave Loader", githubUsername: "thevinayakgore" },
        ],
      },
    ],
  },
  {
    category: "Navigations",
    icon: "send",
    subcategories: [
      // {
      //   name: "Floating Menus",
      //   description:
      //     "Accelerate user actions with dynamic floating menus that provide instant access to key functions. These smart navigation components improve productivity metrics, reduce interaction cost, and create memorable user experiences through innovative interaction patterns.",
      //   tags: ["menu", "dock", "speed", "radial", "navigation"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
      //   items: [
      //     { itemName: "Dock Menu", githubUsername: "thevinayakgore" },
      //     { itemName: "Speed Dial Menu", githubUsername: "thevinayakgore" },
      //     { itemName: "Radial Menu", githubUsername: "thevinayakgore" },
      //   ],
      // },
      {
        name: "Footers",
        description:
          "Maximize site engagement with comprehensive footer systems that improve navigation and conversion. These professional footer components enhance SEO through structured links, build trust with legal information, and capture leads through strategic CTAs.",
        tags: ["footer", "sitemap", "bottom", "legal", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [
          { itemName: "Standard Footer", githubUsername: "thevinayakgore" },
        ],
      },
      // {
      //   name: "Menu",
      //   description:
      //     "Streamline user journeys with intuitive menu systems that simplify complex navigation. These professional navigation components reduce bounce rates, improve content discovery, and enhance mobile experience through responsive designs and smart organization.",
      //   tags: ["menu", "dropdown", "mega", "nav", "command"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
      //   items: [
      //     { itemName: "Dropdown Menu", githubUsername: "thevinayakgore" },
      //     { itemName: "Mega Menu", githubUsername: "thevinayakgore" },
      //     { itemName: "Nav Menu", githubUsername: "thevinayakgore" },
      //     { itemName: "Command Palette", githubUsername: "thevinayakgore" },
      //   ],
      // },
      {
        name: "Navbars",
        description:
          "Establish strong navigation foundations with professional navbar systems that guide users effectively. These featured header components improve brand recognition, enhance mobile responsiveness, and drive key conversions through strategic placement and clear hierarchy.",
        tags: ["navbar", "header", "navigation", "top", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [
          { itemName: "Standard Navbar", githubUsername: "thevinayakgore" },
        ],
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
      //     { itemName: "Basic Pagination", githubUsername: "thevinayakgore" },
      //     { itemName: "Compact Pagination", githubUsername: "thevinayakgore" },
      //     { itemName: "Table Pagination", githubUsername: "thevinayakgore" },
      //     { itemName: "Load More Pagination", githubUsername: "thevinayakgore" },
      //     { itemName: "Infinite Scroll", githubUsername: "thevinayakgore" },
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
      //     { itemName: "Basic Tab", githubUsername: "thevinayakgore" },
      //     { itemName: "Pills Tab", githubUsername: "thevinayakgore" },
      //     { itemName: "Scrollable Tab", githubUsername: "thevinayakgore" },
      //   ],
      // },
    ],
  },
  {
    category: "Sections",
    icon: "layout-grid",
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
        items: [{ itemName: "FAQ 1", githubUsername: "thevinayakgore" }],
      },
      {
        name: "Testimonials",
        thumbnail: "company-testimonial",
        description:
          "Build trust and accelerate conversions with compelling testimonial displays that showcase social proof. These professional testimonial components increase credibility, improve engagement metrics, and drive purchasing decisions through authentic customer stories and strategic placement.",
        tags: ["testimonial", "social", "reviews", "trust", "carousel"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
        items: [
          { itemName: "Minimal Testimonial", githubUsername: "thevinayakgore" },
          { itemName: "Social Testimonial", githubUsername: "thevinayakgore" },
          {
            itemName: "Standard Testimonial",
            githubUsername: "thevinayakgore",
          },
          { itemName: "Company Testimonial", githubUsername: "thevinayakgore" },
          {
            itemName: "Carousel Testimonial",
            githubUsername: "thevinayakgore",
          },
        ],
      },
    ],
  },
] as const);
