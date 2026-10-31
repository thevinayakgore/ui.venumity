// registry/components.ts
import { createComponents } from "./factories";
import type { ComponentCategory } from "@/types/components";

export const COMPONENTS: ComponentCategory[] = createComponents([
  // ─── AI FEATURES ─────────────────────────────────────────
  {
    category: "AI Features",
    icon: "sparkles",
    tags: ["ai", "ml", "assistant", "intelligent"],
    subcategories: [
      //       {
      //         name: "AI Analytics",
      //         description:
      //           "Boost data-driven decisions with smart AI analytics dashboards.",
      //         tags: ["ai", "analytics", "insights", "metrics", "dashboard"],
      //         props: [
      //           {
      //             name: "className",
      //             type: "string",
      //             description: "Additional classes.",
      //           },
      //         ],
      //         items: [{ itemName: "Analytics" }],
      //       },
      {
        name: "AI Chat Panels",
        description:
          "Intelligent chat interfaces featuring NLP, real-time messaging, and smart assistant capabilities.",
        tags: ["ai", "chat", "assistant", "conversation", "messaging"],
        items: [
          { itemName: "Gemini Style Chat Shell" },
          { itemName: "Cursor Style AI Prompt Panel" },
        ],
      },
      //       {
      //         name: "AI Commands",
      //         description:
      //           "Smart command palettes and AI-powered navigation systems.",
      //         tags: ["ai", "commands", "command-palette", "actions", "productivity"]
      //         items: [{ itemName: "Command Bar" }],
      //       },
      //       {
      //         name: "AI Forms",
      //         description:
      //           "Intelligent forms featuring AI validation and automated workflows.",
      //         tags: ["ai", "forms", "input", "autofill", "validation"]
      //         items: [{ itemName: "Forms" }],
      //       },
      //       {
      //         name: "AI Generators",
      //         description: "AI generation tools for text, code, and media.",
      //         tags: ["ai", "generator", "content", "automation", "creative"]
      //         items: [{ itemName: "Content Generators" }],
      //       },
      //       {
      //         name: "AI Searches",
      //         description:
      //           "Intelligent search interfaces featuring semantic understanding.",
      //         tags: ["ai", "search", "semantic", "command", "discovery"]
      //         items: [{ itemName: "Searches" }],
      //       },
      {
        name: "AI Chat Suggestion",
        newItem: true,
        description:
          "AI chat suggestion interface with floating cards, boxed lists, skeleton loading, typewriter text reveals, click-outside closing, and automatic chat scrolling.",
        tags: [
          "ai",
          "chat",
          "prompts",
          "skeleton",
          "auto-reply",
          "typewriter",
          "suggestions",
        ],
        props: [
          {
            name: "variant",
            type: '"floating" | "box"',
            default: '"floating"',
            description:
              "Controls the suggestion layout. Use floating for a 2-column card grid or box for a vertical list.",
            example: 'variant="box"',
          },
          {
            name: "messages",
            type: "ChatMessage[]",
            default: "[]",
            description: "Initial chat messages rendered inside the chat area.",
            example: '[{ id: "1", sender: "user", text: "Hello" }]',
          },
          {
            name: "suggestions",
            type: "SuggestionChip[]",
            default: "[]",
            description:
              "AI prompt suggestions displayed above the input with skeleton loading and typewriter reveal.",
            example: '[{ text: "Summarize this chat" }]',
          },
          {
            name: "autoReply",
            type: "string",
            default: '"Got it — I\'ll get back to you shortly!"',
            description:
              "Assistant reply automatically added after a user sends a message or selects a suggestion.",
          },
          {
            name: "placeholder",
            type: "string",
            default: '"Type a message or ask anything"',
            description: "Placeholder text for the chat input field.",
          },
          {
            name: "inputAvatar",
            type: "string",
            default: '"/vinu.jpeg"',
            description:
              "Avatar image URL used for user and assistant message bubbles.",
          },
          {
            name: "className",
            type: "string",
            description:
              "Additional classes applied to the outer component wrapper.",
            example: 'className="max-w-3xl"',
          },
        ],
        items: [{ itemName: "Floating Cards" }, { itemName: "Suggestion Box" }],
      },
      {
        name: "AI Summary",
        description:
          "AI-powered summary interfaces that transform long documents into clear insights, key topics, and actionable takeaways.",
        tags: [
          "ai",
          "summary",
          "insights",
          "dashboard",
          "analytics",
          "content",
          "productivity",
        ],
        items: [{ itemName: "AI Summary Page" }],
      },
    ],
  },

  //   // ─── SECTIONS ────────────────────────────────────────────
  {
    category: "Sections",
    icon: "layout-grid",
    tags: ["section", "block", "page", "layout"],
    subcategories: [
      {
        name: "Auth Forms",
        newItem: true,
        description:
          "Conversion-optimized authentication forms for modern SaaS products — sign-in, sign-up, OTP verification, password reset, and multi-step onboarding.",
        tags: [
          "auth",
          "authentication",
          "signin",
          "signup",
          "login",
          "otp",
          "password",
          "onboarding",
          "saas",
          "form",
        ],
        items: [
          {
            itemName: "Standard Sign In Form",
          },
        ],
      },
      {
        name: "Bento Grids",
        newItem: true,
        thumbnail: "analytics-stats-bento",
        description:
          "Explore modern, responsive bento grid layouts for dashboards, product overviews, feature showcases, and analytics interfaces.",
        tags: ["grid", "bento", "layout", "overview", "features", "analytics"],
        items: [
          { itemName: "Product Overview Bento" },
          { itemName: "Analytics Stats Bento" },
          { itemName: "Aurora Feature Bento" },
        ],
      },
      {
        name: "Profiles",
        description:
          "Profile card components designed to present user identities, roles, and key metadata in a clean, engaging layout.",
        tags: ["profile", "user", "identity", "section", "avatar", "member"],
        items: [{ itemName: "User Profile" }],
      },
      {
        name: "Testimonials",
        thumbnail: "carousel-testimonial-2",
        description:
          "Build trust and accelerate conversions with compelling testimonial displays that showcase social proof.",
        tags: ["testimonial", "social", "reviews", "trust", "carousel"],
        items: [
          { itemName: "Minimal Testimonial" },
          { itemName: "Social Testimonial" },
          { itemName: "Company Testimonial" },
          { itemName: "Carousel Testimonial 1" },
          { itemName: "Carousel Testimonial 2" },
        ],
      },
    ],
  },

  //   // ─── COMMERCE ────────────────────────────────────────────
  {
    category: "Commerce",
    icon: "indian-rupee",
    tags: ["commerce", "ecommerce", "shop", "payment"],
    subcategories: [
      //       {
      //         name: "Checkout Forms",
      //         description: "Conversion-focused checkout form layouts.",
      //         items: [
      //           { itemName: "Basic Checkout Form" },
      //           {
      //             itemName: "Compact Checkout Form",
      //           },
      //           {
      //             itemName: "Floating Checkout Form",
      //           },
      //           {
      //             itemName: "Multi Step Checkout Form",
      //           },
      //           {
      //             itemName: "Split Screen Checkout Form",
      //           },
      //         ],
      //       },
      //       {
      //         name: "Discount Badges",
      //         description: "Discount and offer badge components.",
      //         items: [
      //           {
      //             itemName: "Simple Discount Badge",
      //           },
      //           {
      //             itemName: "Minimal Discount Badge",
      //           },
      //           {
      //             itemName: "Countdown Discount Badge",
      //           },
      //           {
      //             itemName: "Collapse Discount Badge",
      //           },
      //           {
      //             itemName: "Animated Discount Badge",
      //           },
      //         ],
      //       },
      //       {
      //         name: "Offer Banners",
      //         description: "Promotional banner components.",
      //         tags: ["banner", "promotion", "offer", "marketing", "cta"],
      //         items: [
      //           { itemName: "Simple Offer Banner" },
      //           {
      //             itemName: "Countdown Offer Banner",
      //           },
      //           {
      //             itemName: "Interactive Offer Banner",
      //           },
      //           {
      //             itemName: "Scrolling Offer Banner",
      //           },
      //           { itemName: "Split Offer Banner" },
      //         ],
      //       },
      //       {
      //         name: "Payment Options",
      //         description: "Flexible payment selection components.",
      //         tags: ["payment", "checkout", "billing", "methods", "finance"],
      //         items: [
      //           {
      //             itemName: "Minimal Payment Options",
      //           },
      //           {
      //             itemName: "Payment Methods Cards",
      //           },
      //           {
      //             itemName: "Payment Methods Selector",
      //           },
      //           {
      //             itemName: "Saved Cards Payment Options",
      //           },
      //           {
      //             itemName: "Split Payment Options",
      //           },
      //         ],
      //       },
      //       {
      //         name: "Pricing Cards",
      //         description: "Structured pricing card components.",
      //         tags: ["pricing", "plans", "subscription", "saas", "cards"],
      //         items: [
      //           { itemName: "Simple Pricing Card" },
      //           {
      //             itemName: "Minimal Pricing Card",
      //           },
      //           {
      //             itemName: "Feature Comparison Pricing",
      //           },
      //           { itemName: "Tiered Pricing Card" },
      //           { itemName: "Toggle Pricing Card" },
      //         ],
      //       },
      {
        name: "Pricing Tables",
        newItem: true,
        description:
          "Accelerate revenue growth with conversion-optimized pricing tables that maximize subscription sign-ups.",
        tags: ["pricing", "comparison", "subscription", "features"],
        items: [
          {
            itemName: "Simple Pricing Table",
          },
          {
            itemName: "Standard Pricing Table",
          },
          {
            itemName: "Tiered Pricing Table",
          },
        ],
      },
      {
        name: "Product Cards",
        description:
          "Commerce-ready card components designed to showcase products with clarity and impact.",
        tags: ["product", "ecommerce", "card", "catalog"],
        items: [
          {
            itemName: "Interactive Product Card",
          },
          {
            itemName: "Detailed Product Card",
          },
        ],
      },
      //       {
      //         name: "Product Display",
      //         description: "High-impact product display sections.",
      //         tags: ["product", "showcase", "details", "ecommerce", "display"],
      //         items: [
      //           {
      //             itemName: "Compact Product Display",
      //           },
      //           {
      //             itemName: "Minimal Product Display",
      //           },
      //           {
      //             itemName: "Interactive Product Display",
      //           },
      //           {
      //             itemName: "Tech Product Display",
      //           },
      //           {
      //             itemName: "Luxury Product Display",
      //           },
      //         ],
      //       },
      //       {
      //         name: "Product Grids",
      //         description: "Responsive product grid layouts.",
      //         tags: ["product-grid", "catalog", "listing", "ecommerce", "responsive"],
      //         items: [
      //           {
      //             itemName: "Minimal Product Grid",
      //           },
      //           {
      //             itemName: "Standard Product Grid",
      //           },
      //           {
      //             itemName: "Filters Product Grid",
      //           },
      //           {
      //             itemName: "Featured Product Grid",
      //           },
      //           {
      //             itemName: "Masonry Product Grid",
      //           },
      //         ],
      //       },
      //       {
      //         name: "Shopping Carts",
      //         description: "Shopping cart components.",
      //         tags: ["cart", "shopping", "checkout", "ecommerce", "order"],
      //         items: [
      //           {
      //             itemName: "Compact Shopping Cart",
      //           },
      //           {
      //             itemName: "Progress Shopping Cart",
      //           },
      //           {
      //             itemName: "Standard Shopping Cart",
      //           },
      //           {
      //             itemName: "Sidebar Shopping Cart",
      //           },
      //           {
      //             itemName: "Recommendations Shopping Cart",
      //           },
      //         ],
      //       },
      //       {
      //         name: "Wishlist Buttons",
      //         description: "Interactive wishlist button components.",
      //         tags: ["wishlist", "favorites", "like", "ecommerce", "interaction"],
      //         items: [
      //           {
      //             itemName: "Animated Wishlist Button",
      //           },
      //           {
      //             itemName: "Standard Wishlist Button",
      //           },
      //           {
      //             itemName: "Floating Wishlist Button",
      //           },
      //           {
      //             itemName: "Tooltip Wishlist Button",
      //           },
      //           {
      //             itemName: "Toggle Wishlist Button",
      //           },
      //         ],
      //       },
    ],
  },

  //   // ─── BACKGROUND EFFECTS ──────────────────────────────────
  {
    category: "Background Effects",
    icon: "square-terminal",
    tags: ["background", "effects", "visual", "gradient"],
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
        items: [
          {
            itemName: "Background Gradient Spotlight",
          },
        ],
      },
    ],
  },

  //   // ─── LAYOUTS ─────────────────────────────────────────────
  {
    category: "Layouts",
    icon: "layout-template",
    tags: ["layout", "structure", "grid"],
    subcategories: [
      {
        name: "Containers",
        thumbnail: "premium-container",
        description:
          "Professional, responsive container systems for structuring page content with consistent spacing, alignment, and max-width control.",
        tags: [
          "layout",
          "wrapper",
          "spacing",
          "container",
          "alignment",
          "structure",
        ],
        items: [
          { itemName: "Basic Container" },
          { itemName: "Standard Container" },
          { itemName: "Premium Container" },
        ],
      },
      // {
      //   name: "Grid Systems",
      //   description:
      //     "Flexible grid-based layout components for creating balanced columns, structured content sections, galleries, and responsive card layouts.",
      //   tags: [
      //     "grid",
      //     "columns",
      //     "layout",
      //     "gallery",
      //     "cards",
      //     "masonry",
      //     "animated",
      //     "responsive",
      //   ],
      //   items: [
      //     { itemName: "Basic Grid" },
      //     { itemName: "Standard Grid" },
      //     { itemName: "Animated Grid" },
      //   ],
      // },
      {
        name: "Masonry Layouts",
        thumbnail: "masonry-image-gallery",
        description:
          "Responsive masonry layout components for building image galleries, content feeds, portfolios, and Pinterest-style card layouts.",
        tags: [
          "masonry",
          "grid",
          "gallery",
          "portfolio",
          "feed",
          "cards",
          "images",
        ],
        items: [
          { itemName: "Basic Masonry Layout" },
          { itemName: "Standard Masonry Layout" },
          { itemName: "Masonry Image Gallery" },
        ],
      },
      //       {
      //         name: "Sidebars",
      //         description: "Intelligent sidebar systems.",
      //         tags: ["sidebar", "admin", "navigation", "collapsible", "drawer"],
      //         items: [{ itemName: "Sidebar 1" }],
      //       },
      //       {
      //         name: "Split Layouts",
      //         description: "Responsive split-screen layouts.",
      //         tags: [
      //           "split-layout",
      //           "two-column",
      //           "responsive",
      //           "comparison",
      //           "dashboard",
      //         ],
      //         items: [
      //           { itemName: "Basic Split Layout" },
      //           {
      //             itemName: "Standard Split Layout",
      //           },
      //           {
      //             itemName: "Animated Split Layout",
      //           },
      //           {
      //             itemName: "Premium Split Layout",
      //           },
      //         ],
      //       },
      //       {
      //         name: "Stacks",
      //         description: "Vertical stacking layouts.",
      //         tags: [
      //           "stack",
      //           "vertical-layout",
      //           "spacing",
      //           "content-flow",
      //           "responsive",
      //         ],
      //         items: [
      //           { itemName: "Basic Stack" },
      //           { itemName: "Standard Stack" },
      //           { itemName: "Moderate Stack" },
      //           { itemName: "Complex Stack" },
      //           { itemName: "Animated Stack" },
      //         ],
      //       },
    ],
  },

  //   // ─── NAVIGATIONS ─────────────────────────────────────────
  {
    category: "Navigations",
    icon: "send",
    tags: ["navigation", "menu", "navbar", "footer"],
    subcategories: [
      //       {
      //         name: "Floating Menus",
      //         description: "Dynamic floating menus for instant access.",
      //         tags: ["menu", "dock", "speed", "radial", "navigation"],
      //         items: [
      //           { itemName: "Dock Menu" },
      //           { itemName: "Speed Dial Menu" },
      //           { itemName: "Radial Menu" },
      //         ],
      //       },
      {
        name: "Footers",
        description:
          "Maximize site engagement with comprehensive footer systems that improve navigation and conversion.",
        tags: ["footer", "sitemap", "bottom", "legal", "branding"],
        items: [{ itemName: "Simple Footer" }, { itemName: "Standard Footer" }],
      },
      //       {
      //         name: "Menu",
      //         description: "Intuitive menu systems.",
      //         tags: ["menu", "dropdown", "mega", "nav", "command"],
      //         items: [
      //           { itemName: "Dropdown Menu" },
      //           { itemName: "Mega Menu" },
      //           { itemName: "Nav Menu" },
      //           { itemName: "Command Palette" },
      //         ],
      //       },
      {
        name: "Navbars",
        thumbnail: "sticky-glass-navbar",
        description:
          "Establish strong navigation foundations with professional navbar systems that guide users effectively.",
        tags: ["navbar", "header", "navigation", "top", "branding"],
        items: [
          { itemName: "Standard Navbar" },
          { itemName: "Sticky Glass Navbar" },
        ],
      },
      //       {
      //         name: "Pagination",
      //         description: "Navigation controls for datasets.",
      //         tags: ["pagination", "navigation", "paging", "infinite-scroll", "ui"],
      //         items: [
      //           { itemName: "Basic Pagination" },
      //           { itemName: "Compact Pagination" },
      //           { itemName: "Table Pagination" },
      //           {
      //             itemName: "Load More Pagination",
      //           },
      //           { itemName: "Infinite Scroll" },
      //         ],
      //       },
      //       {
      //         name: "Tabs",
      //         description: "Tab components for content views.",
      //         tags: ["tabs", "navigation", "switching", "content", "ui"],
      //         items: [
      //           { itemName: "Basic Tab" },
      //           { itemName: "Pills Tab" },
      //           { itemName: "Scrollable Tab" },
      //         ],
      //       },
    ],
  },

  //   // ─── DASHBOARDS ──────────────────────────────────────────
  {
    category: "Dashboards",
    icon: "chart-no-axes-combined",
    tags: ["dashboard", "analytics", "admin", "finance"],
    subcategories: [
      {
        name: "Financial",
        newItem: true,
        kind: "multi",
        description:
          "Professional financial dashboard layouts for tracking income and expenses.",
        tags: ["finance", "personal-finance", "analytics", "metrics", "charts"],
        items: [
          { itemName: "Analytics Dashboard" },
          { itemName: "Personal Finance Dashboard" },
        ],
      },
    ],
  },

  //   // ─── PAGE SECTIONS ───────────────────────────────────────
  //   {
  //     category: "Page Sections",
  //     icon: "layout-panel-top",
  //     tags: ["page", "section", "landing", "marketing"],
  //     subcategories: [
  //       {
  //         name: "About Section",
  //         description: "Versatile about sections for your story.",
  //         tags: ["about", "story", "team", "company", "section"],
  //         items: [
  //           { itemName: "Basic About Section" },
  //           {
  //             itemName: "Minimal About Section",
  //           },
  //           {
  //             itemName: "Minimal About Section 2",
  //           },
  //           { itemName: "Minimal Profile" },
  //           {
  //             itemName: "Skills Grid About Section",
  //           },
  //           {
  //             itemName: "Split About Image Focus",
  //           },
  //           { itemName: "Split Image About" },
  //           {
  //             itemName: "Statistics About Section",
  //           },
  //           { itemName: "Story Telling About" },
  //           { itemName: "Team About Section" },
  //           {
  //             itemName: "Timeline About Journey",
  //           },
  //           {
  //             itemName: "Timeline About Section",
  //           },
  //           {
  //             itemName: "Timeline About Section 2",
  //           },
  //           {
  //             itemName: "Values About Section",
  //           },
  //           {
  //             itemName: "Values Columns About Section",
  //           },
  //           { itemName: "Values Driven About" },
  //         ],
  //       },
  //       {
  //         name: "Contact Section",
  //         description: "Contact sections with forms, maps, and layout variants.",
  //         tags: ["contact", "form", "map", "section", "support"],
  //         items: [
  //           { itemName: "Basic Contact Form" },
  //           { itemName: "Card Grid Contact" },
  //           { itemName: "Compact Contact Bar" },
  //           {
  //             itemName: "Compact Inline Status",
  //           },
  //           { itemName: "Compact Micro Faq" },
  //           {
  //             itemName: "Contact Side Info Panel",
  //           },
  //           { itemName: "Faq Contact" },
  //           { itemName: "Map Contact" },
  //           { itemName: "Map Contact 2" },
  //           { itemName: "Minimal Contact" },
  //           { itemName: "Multi Step Contact" },
  //           { itemName: "Simple Contact Card" },
  //           {
  //             itemName: "Simple Contact Card 2",
  //           },
  //           {
  //             itemName: "Social Media Contact",
  //           },
  //           {
  //             itemName: "Support Tiers Contact",
  //           },
  //         ],
  //       },
  //       {
  //         name: "CTA Section",
  //         description: "Conversion-focused call-to-action sections.",
  //         tags: ["cta", "call-to-action", "conversion", "section", "marketing"],
  //         items: [
  //           { itemName: "Basic Cta" },
  //           { itemName: "Comparison Cta" },
  //           { itemName: "Countdown Cta" },
  //           { itemName: "Email Capture Cta" },
  //           { itemName: "Features Cta" },
  //           { itemName: "Gradient Cta" },
  //           { itemName: "Input Field Cta" },
  //           { itemName: "Primary Cta Banner" },
  //           { itemName: "Progress Hint Cta" },
  //           { itemName: "Simple Cta" },
  //           { itemName: "Social Proof Cta" },
  //           { itemName: "Split Cta" },
  //           { itemName: "Subtle Cta Strip" },
  //           { itemName: "Testimonials Cta" },
  //           { itemName: "Two Actions Cta" },
  //         ],
  //       },
  //       {
  //         name: "Features Section",
  //         description: "Feature showcase sections.",
  //         tags: ["features", "showcase", "grid", "section", "marketing"],
  //         items: [
  //           {
  //             itemName: "Alternating Features",
  //           },
  //           { itemName: "Bento Features" },
  //           {
  //             itemName: "Comparison Columns Features",
  //           },
  //           { itemName: "Comparison Features" },
  //           {
  //             itemName: "Comparison Table Features",
  //           },
  //           { itemName: "Grid Features" },
  //           { itemName: "Grid Features 2" },
  //           {
  //             itemName: "Highlighted Card Features",
  //           },
  //           { itemName: "Icons Row Features" },
  //           {
  //             itemName: "Interactive Features Showcase",
  //           },
  //           {
  //             itemName: "Minimal Features Grid",
  //           },
  //           {
  //             itemName: "Side By Side Features",
  //           },
  //           {
  //             itemName: "Steps Layout Features",
  //           },
  //           { itemName: "Tab Features" },
  //           { itemName: "Tabs Features" },
  //         ],
  //       },
  //       {
  //         name: "Footer Section",
  //         description: "Comprehensive footer sections.",
  //         tags: ["footer", "section", "sitemap", "newsletter", "social"],
  //         items: [
  //           {
  //             itemName: "Compact Sitemap Footer",
  //           },
  //           { itemName: "Contact Footer" },
  //           {
  //             itemName: "Footer Centered Minimal",
  //           },
  //           {
  //             itemName: "Footer Simple Columns",
  //           },
  //           { itemName: "Legal Strip Footer" },
  //           { itemName: "Minimal Footer" },
  //           { itemName: "Newsletter Footer" },
  //           { itemName: "Newsletter Footer 2" },
  //           {
  //             itemName: "Simple Footer Section",
  //           },
  //           {
  //             itemName: "Standard Footer Section",
  //           },
  //         ],
  //       },
  //       {
  //         name: "Hero Section",
  //         description: "High-impact hero sections.",
  //         tags: ["hero", "section", "landing", "headline", "cta"],
  //         items: [
  //           { itemName: "Animated Hero" },
  //           {
  //             itemName: "Animated Particles Hero",
  //           },
  //           { itemName: "Centered Hero" },
  //           { itemName: "Centered Hero 2" },
  //           {
  //             itemName: "Centered Hero Primary Cta",
  //           },
  //           { itemName: "Email Capture Hero" },
  //           { itemName: "Gradient Hero" },
  //           { itemName: "Image Hero" },
  //           {
  //             itemName: "Inline Video Cta Hero",
  //           },
  //           { itemName: "Split Hero" },
  //           {
  //             itemName: "Split Hero Preview Card",
  //           },
  //           { itemName: "Stats Counter Hero" },
  //           { itemName: "Stats Row Hero" },
  //           { itemName: "Tagline Strip Hero" },
  //           { itemName: "Video Hero" },
  //         ],
  //       },
  //       {
  //         name: "Navbar Section",
  //         description: "Navbar sections for pages.",
  //         tags: ["navbar", "section", "header", "navigation", "responsive"],
  //         items: [
  //           { itemName: "Centered Navbar" },
  //           {
  //             itemName: "Compact Pills Navbar",
  //           },
  //           { itemName: "Cta Badge Navbar" },
  //           { itemName: "Dashboard Navbar" },
  //           { itemName: "Dropdown Navbar" },
  //           { itemName: "Logo Links Navbar" },
  //           {
  //             itemName: "Secondary Row Navbar",
  //           },
  //           { itemName: "Simple Navbar" },
  //           { itemName: "Transparent Navbar" },
  //           {
  //             itemName: "Underline Active Navbar",
  //           },
  //         ],
  //       },
  //       {
  //         name: "Pricing Section",
  //         description: "Pricing sections with toggles.",
  //         tags: ["pricing", "section", "plans", "comparison", "subscription"],
  //         items: [
  //           { itemName: "Comparison Pricing" },
  //           {
  //             itemName: "Pricing Feature Comparison",
  //           },
  //           {
  //             itemName: "Pricing Notes Column",
  //           },
  //           { itemName: "Pricing Single Card" },
  //           { itemName: "Pricing Toggle Hint" },
  //           { itemName: "Pricing Two Tiers" },
  //           { itemName: "Single Plan Pricing" },
  //           {
  //             itemName: "Three Column Pricing",
  //           },
  //           { itemName: "Toggle Pricing" },
  //           { itemName: "Usage Based Pricing" },
  //         ],
  //       },
  //       {
  //         name: "Team Section",
  //         description: "Team showcase sections.",
  //         tags: ["team", "section", "people", "company", "showcase"],
  //         items: [
  //           { itemName: "Cards Team" },
  //           { itemName: "Grid Team" },
  //           { itemName: "List Team" },
  //           { itemName: "Minimal Team" },
  //           { itemName: "Quote Team" },
  //         ],
  //       },
  //       {
  //         name: "Testimonial Section",
  //         description: "Testimonial sections with carousels.",
  //         tags: ["testimonial", "section", "reviews", "social-proof", "carousel"],
  //         items: [
  //           {
  //             itemName: "Carousel Testimonials",
  //           },
  //           { itemName: "Grid Testimonials" },
  //           {
  //             itemName: "Masonry Testimonials",
  //           },
  //           {
  //             itemName: "Metrics Testimonials",
  //           },
  //           {
  //             itemName: "Testimonial Cards Grid",
  //           },
  //           {
  //             itemName: "Testimonial Carousel Dots",
  //           },
  //           {
  //             itemName: "Testimonial Highlight Single",
  //           },
  //           {
  //             itemName: "Testimonial Logo Row",
  //           },
  //           {
  //             itemName: "Testimonial Quote Stack",
  //           },
  //           { itemName: "Video Testimonials" },
  //         ],
  //       },
  //     ],
  //   },

  //   // ─── SUPPORT ─────────────────────────────────────────────
  {
    category: "Support",
    icon: "life-buoy",
    tags: ["support", "help", "contact", "faq"],
    subcategories: [
      //       {
      //         name: "Contacts",
      //         description: "Contact information components.",
      //         tags: ["contact", "info", "card", "grid", "support"],
      //         items: [
      //           {
      //             itemName: "3D Tilt Card Staggered Items",
      //           },
      //           { itemName: "Basic Grid" },
      //           { itemName: "Basic Grid 2" },
      //           {
      //             itemName: "Card Grid Contact Info",
      //           },
      //           { itemName: "Compact Bar" },
      //           { itemName: "Compact Cards" },
      //           { itemName: "Detailed Card" },
      //           {
      //             itemName: "Drag To Reveal Card Stack",
      //           },
      //           {
      //             itemName: "Expandable Channel Selector",
      //           },
      //           {
      //             itemName: "Floating Contact Info",
      //           },
      //           {
      //             itemName: "Hover Reveal Details",
      //           },
      //           {
      //             itemName: "Interactive Dashboard",
      //           },
      //           {
      //             itemName: "Interactive Map Contact Info",
      //           },
      //           { itemName: "Modern Layout" },
      //           {
      //             itemName: "Pulsing Online Status",
      //           },
      //           { itemName: "Sidebar Style" },
      //           { itemName: "Split Contact Info" },
      //           { itemName: "Status Chip" },
      //           { itemName: "Studio Overview" },
      //           { itemName: "Support Channels" },
      //         ],
      //       },
      {
        name: "FAQ",
        thumbnail: "icon-style-faq",
        description:
          "Reduce support overhead with intelligent FAQ sections that answer questions before they're asked.",
        tags: ["faq", "accordion", "collapsible", "support", "help"],
        items: [
          { itemName: "Single Open FAQ" },
          { itemName: "Multiple Open FAQ" },
          { itemName: "Masonry grid FAQ" },
          { itemName: "Icon Style FAQ" },
        ],
      },
      //       {
      //         name: "Help Widget",
      //         description: "Floating help widgets, chat assistants.",
      //         tags: ["help", "widget", "chat", "assistant", "support"],
      //         items: [
      //           { itemName: "AI Assistant" },
      //           { itemName: "Basic Help Widgets" },
      //           {
      //             itemName: "Chat Widget Help Widgets",
      //           },
      //           {
      //             itemName: "Comprehensive Dashboard",
      //           },
      //           { itemName: "Contextual Help" },
      //           {
      //             itemName: "Draggable Support Dock Mini Inbox",
      //           },
      //           {
      //             itemName: "Floating Action Button",
      //           },
      //           {
      //             itemName: "Knowledge Tree Help Widgets",
      //           },
      //           {
      //             itemName: "Multi State Floating Launcher",
      //           },
      //           { itemName: "Quick Help Widgets" },
      //           { itemName: "Side Panel" },
      //           {
      //             itemName: "Ticket Status Help Widgets",
      //           },
      //         ],
      //       },
      //       {
      //         name: "Support Card",
      //         description: "Support card components.",
      //         tags: ["support", "card", "team", "ticket", "sla"],
      //         items: [
      //           { itemName: "Basic Information" },
      //           { itemName: "Basic Support Card" },
      //           { itemName: "Emergency Contact" },
      //           { itemName: "Interactive Request" },
      //           {
      //             itemName: "Pricing Support Card",
      //           },
      //           {
      //             itemName: "Service Level Agreement",
      //           },
      //           { itemName: "Status Support Card" },
      //           { itemName: "Team Contact" },
      //           {
      //             itemName: "Team Member Support Card",
      //           },
      //           {
      //             itemName: "Ticket Detail Support Card",
      //           },
      //           { itemName: "What Happens Next" },
      //         ],
      //       },
    ],
  },
]);
