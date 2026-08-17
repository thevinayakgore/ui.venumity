// registry/components.ts
import { toKebabCase } from "@/utils/slug-kebab";

function createComponents(
  data: {
    category: string;
    icon: string;
    tags?: string[];
    techs?: string[];
    subcategories: {
      name: string;
      description?: string;
      icon?: string;
      thumbnail?: string;
      tags: string[];
      techs: string[];
      items: {
        itemName: string;
        tags?: string[];
        techs?: string[];
        video?: string;
        githubUsername?: string;
      }[];
    }[];
  }[],
) {
  return data.map((categoryData) => ({
    name: categoryData.category,
    icon: categoryData.icon,
    tags: categoryData.tags || [],
    techs: categoryData.techs || [],
    subcategories: categoryData.subcategories.map((subcategoryData) => ({
      name: subcategoryData.name,
      description: subcategoryData.description,
      icon: subcategoryData.icon,
      thumbnail: subcategoryData.thumbnail,
      tags: subcategoryData.tags,
      techs: subcategoryData.techs,
      items: subcategoryData.items.map((itemData) => {
        const categoryKebab = toKebabCase(categoryData.category);
        const subcategoryKebab = toKebabCase(subcategoryData.name);
        const itemKebab = toKebabCase(itemData.itemName);

        return {
          ...itemData,
          tags: [
            ...new Set([...(itemData.tags || []), ...subcategoryData.tags]),
          ],
          techs: [
            ...new Set([...(itemData.techs || []), ...subcategoryData.techs]),
          ],
          category: categoryKebab,
          subcategory: subcategoryKebab,
          folderPath: `${categoryKebab}/${subcategoryKebab}/${itemKebab}`,
          githubUsername: itemData.githubUsername,
        };
      }),
    })),
  }));
}

// Commented Components are under progress...
export const COMPONENTS = createComponents([
  {
    category: "AI Features",
    icon: "sparkles",
    subcategories: [
      // {
      //   name: "AI Analytics",
      //   description: "Boost data-driven decisions with smart AI analytics dashboards featuring real-time insights and predictive metrics for SaaS platforms.",
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
          "Transform user engagement with intelligent chat interfaces featuring NLP, real-time messaging, and smart assistant capabilities.",
        tags: ["ai", "chat", "assistant", "conversation", "messaging"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Motion"],
        items: [
          {
            itemName: "Gemini Style Chat Shell",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Cursor Style AI Prompt Panel",
            githubUsername: "thevinayakgore",
          },
        ],
      },
      // {
      //   name: "AI Commands",
      //   description: "Supercharge productivity with smart command palettes and AI-powered navigation systems that reduce user friction and accelerate task completion.",
      //   tags: ["ai", "commands", "command-palette", "actions", "productivity"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Command Bar", githubUsername: "thevinayakgore" }],
      // },
      // {
      //   name: "AI Forms",
      //   description: "Revolutionize data collection with intelligent forms featuring AI validation, contextual suggestions, and automated workflows.",
      //   tags: ["ai", "forms", "input", "autofill", "validation"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Forms", githubUsername: "thevinayakgore" }],
      // },
      // {
      //   name: "AI Generators",
      //   description: "Accelerate content creation with cutting-edge AI generation tools for text, code, and media in marketing and development suites.",
      //   tags: ["ai", "generator", "content", "automation", "creative"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Content Generators", githubUsername: "thevinayakgore" }],
      // },
      // {
      //   name: "AI Searches",
      //   description: "Drive discovery with intelligent search interfaces featuring semantic understanding and predictive results for e-commerce platforms.",
      //   tags: ["ai", "search", "semantic", "command", "discovery"],
      //   techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      //   items: [{ itemName: "Searches", githubUsername: "thevinayakgore" }],
      // },
      {
        name: "AI Suggestions",
        description:
          "Increase user retention with context-aware suggestion systems that anticipate needs and guide workflows using behavioral analytics.",
        tags: ["ai", "suggestions", "recommendations", "predictive", "ux"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
        items: [
          {
            itemName: "AI Inline Suggestion Bar",
            githubUsername: "thevinayakgore",
          },
        ],
      },
      {
        name: "AI Summary",
        description:
          "Deliver instant clarity with intelligent summarization tools that distill complex information into actionable insights.",
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
          "Maximize communication efficiency with professional status indicators that instantly convey system health and user activity.",
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
    category: "Background Effects",
    icon: "square-terminal",
    subcategories: [
      {
        name: "Gradient Spotlight",
        description:
          "Modern background effects featuring dynamic gradient spotlight animations for depth, focus, and visual hierarchy.",
        tags: [
          "background",
          "gradient",
          "spotlight",
          "animation",
          "effects",
          "ui",
          "visual",
          "hero",
          "landing",
        ],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Motion"],
        items: [
          {
            itemName: "Background Gradient Spotlight",
            githubUsername: "thevinayakgore",
          },
        ],
      },
    ],
  },
  {
    category: "Buttons",
    icon: "pointer",
    subcategories: [
      {
        name: "Action Buttons",
        description:
          "Interactive action button components designed to improve user workflows with smooth motion-driven interactions.",
        tags: [
          "button",
          "magnetic",
          "action",
          "interactive",
          "delete",
          "drag",
          "animation",
          "motion",
        ],
        thumbnail: "delete-confirm-button",
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Motion"],
        items: [
          {
            itemName: "Delete Confirm Button",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Magnetic Drag Button",
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
          "Profile card components designed to present user identities, roles, and key metadata in a clean, engaging layout.",
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
          "Unlock trend analysis with professional area visualizations that highlight growth patterns and volume metrics.",
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
          "Drive data-driven decisions with comparative bar visualizations that excel at categorical analysis.",
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
          "Capture performance trends with precision line visualizations designed for time-series analysis.",
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
          "Simplify proportion analysis with intuitive pie and donut visualizations that highlight distribution patterns.",
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
          "Reveal multidimensional insights with advanced radar visualizations for comparative analysis and skill mapping.",
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
          "Visualize progress and distribution with radial chart components built for circular data representation.",
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
          "Uncover hidden relationships with correlation-focused scatter visualizations for statistical analysis.",
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
          "Enhance data density with compact sparkline visualizations for at-a-glance trend analysis.",
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
      //   description: "Conversion-focused checkout form layouts designed to streamline purchase flow and improve completion rates.",
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
      //   description: "Eye-catching discount and offer badge components that highlight promotions and drive urgency.",
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
      //   description: "Promotional banner components designed to announce offers, campaigns, and limited-time deals.",
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
      //   description: "Flexible payment selection components that present multiple payment methods clearly and securely.",
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
      //   description: "Structured pricing card components that communicate plan value clearly for SaaS and subscription products.",
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
          "Accelerate revenue growth with conversion-optimized pricing tables that maximize subscription sign-ups.",
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
          "Commerce-ready card components designed to showcase products with clarity and impact.",
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
      //   description: "High-impact product display sections built to showcase product details, visuals, and key selling points.",
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
      //   description: "Responsive product grid layouts optimized for browsing large catalogs with filtering and masonry styles.",
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
      //   description: "Shopping cart components that manage product selection, quantities, and checkout progression.",
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
      //   description: "Interactive wishlist button components that allow users to save products for later.",
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
          "Professional financial dashboard layouts for tracking income, expenses, savings, and key performance metrics.",
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
          "Data-focused accordion components for organizing large or hierarchical datasets into expandable sections.",
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
          "Powerful table components for displaying, sorting, and managing structured data efficiently.",
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
          "Enhance user experience with professional alert systems that communicate critical information effectively.",
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
          "Boost engagement metrics with strategic popup implementations that capture attention without disrupting flow.",
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
          "Deliver seamless feedback with non-intrusive snackbar notifications that confirm actions and provide updates.",
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
          "Improve system communication with elegant toast notifications that provide timely feedback.",
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
          "Establish visual consistency with professional container systems that structure content with precision.",
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
      //   description: "Grid-based masonry layouts that arrange variable-height content into balanced columns for galleries and feeds.",
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
          "Grid-based masonry layouts that arrange variable-height content into balanced columns for galleries and feeds.",
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
      //   description: "Optimize navigation efficiency with intelligent sidebar systems that adapt to user workflows.",
      //   tags: ["sidebar", "admin", "navigation", "collapsible", "drawer"],
      //   techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "Motion"],
      //   items: [{ itemName: "Sidebar 1", githubUsername: "thevinayakgore" }],
      // },
      // {
      //   name: "Split Layouts",
      //   description: "Responsive split-screen layouts designed to present parallel content side by side for comparisons and dashboards.",
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
      //   description: "Vertical stacking layouts that organize content in a clear top-to-bottom flow for feeds and forms.",
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
          "Improve perceived performance with intelligent button loaders that provide immediate feedback during operations.",
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
          "Indicate system activity with subtle pulse animations that communicate processing without interrupting flow.",
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
          "Maintain interface continuity with subtle inline loaders that indicate background activity without disruption.",
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
          "Create polished transitions with professional page loaders that manage user expectations during critical waits.",
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
          "Track operation completion with visual progress indicators that manage user expectations during longer waits.",
        tags: ["progress", "loader", "loading", "indicator", "status"],
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
        ],
      },
      {
        name: "Pulse Loaders",
        thumbnail: "multi-pulse-loader",
        description:
          "Indicate system activity with subtle pulse animations that communicate processing without interrupting flow.",
        tags: ["pulse", "loader", "activity", "animation", "waiting"],
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
          "Improve perceived performance with skeleton loaders that preview content structure while data loads.",
        tags: ["skeleton", "loader", "placeholder", "content", "ui"],
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
          "Classic spinner animations that provide clear visual feedback during loading states.",
        tags: ["spinner", "loader", "loading", "waiting", "animation"],
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
          "Dynamic wave animations that create engaging loading experiences for modern applications.",
        tags: ["wave", "loader", "loading", "animation", "waiting"],
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        items: [
          { itemName: "Basic Wave Loader", githubUsername: "thevinayakgore" },
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
      //   description: "Accelerate user actions with dynamic floating menus that provide instant access to key functions.",
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
          "Maximize site engagement with comprehensive footer systems that improve navigation and conversion.",
        tags: ["footer", "sitemap", "bottom", "legal", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [
          { itemName: "Standard Footer", githubUsername: "thevinayakgore" },
        ],
      },
      // {
      //   name: "Menu",
      //   description: "Streamline user journeys with intuitive menu systems that simplify complex navigation.",
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
          "Establish strong navigation foundations with professional navbar systems that guide users effectively.",
        tags: ["navbar", "header", "navigation", "top", "branding"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [
          { itemName: "Standard Navbar", githubUsername: "thevinayakgore" },
          { itemName: "Sticky Glass Navbar", githubUsername: "thevinayakgore" },
        ],
      },
      // {
      //   name: "Pagination",
      //   description: "Navigation controls that help users move efficiently through large datasets and content collections.",
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
      //   description: "Tab components for organizing content into separate views without page reloads.",
      //   tags: [
      //     "tabs",
      //     "navigation",
      //     "switching",
      //     "content",
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
        name: "Bento Grids",
        description:
          "A modern responsive bento grid layout for showcasing features, dashboards, and product highlights.",
        tags: [
          "grid",
          "layout",
          "responsive",
          "ui",
          "dashboard",
          "modern",
          "cards",
          "showcase",
          "design",
          "components",
        ],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Motion"],
        items: [{ itemName: "Bento Grid 1", githubUsername: "thevinayakgore" }],
      },
      {
        name: "FAQ",
        description:
          "Reduce support overhead with intelligent FAQ sections that answer questions before they're asked.",
        tags: ["faq", "accordion", "support", "schema", "collapsible"],
        techs: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
        items: [{ itemName: "FAQ 1", githubUsername: "thevinayakgore" }],
      },
      {
        name: "Testimonials",
        thumbnail: "carousel-testimonial-2",
        description:
          "Build trust and accelerate conversions with compelling testimonial displays that showcase social proof.",
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
            itemName: "Carousel Testimonial 1",
            githubUsername: "thevinayakgore",
          },
          {
            itemName: "Carousel Testimonial 2",
            githubUsername: "thevinayakgore",
          },
        ],
      },
    ],
  },
  // {
  //   category: "Typography",
  //   icon: "type",
  //   subcategories: [
  //     {
  //       name: "Text Effects",
  //       description: "Comprehensive typography components designed to standardize text presentation across applications.",
  //       tags: ["typography", "text", "fonts", "ui", "design"],
  //       techs: ["Next.js", "Tailwind CSS", "TypeScript", "Motion"],
  //       items: [
  //         { itemName: "------", githubUsername: "thevinayakgore" },
  //       ],
  //     },
  //   ],
  // },
] as const);
