type NavLinkItem = {
  name: string;
  href: string;
  isExternal?: boolean;
};

type NavLinks = {
  title: string;
  links: NavLinkItem[];
};

export const COMPANY_SECTION: NavLinks = {
  title: "Company",
  links: [
    { name: "Components", href: "/components" },
    { name: "Resources", href: "/resources" },
    // { name: "Templates", href: "https://pro.venumity.com/templates" },
    { name: "Contributors", href: "/contributors" },
    { name: "Changelog", href: "/changelog" },
    // { name: "Pricing", href: "https://pro.venumity.com/pricing" },
    { name: "Contact", href: "https://venumity.com/#contact" },
  ],
};

export const GRADIENTS_12 = [
  "linear-gradient(270deg, #6366f1, #8b5cf6)",
  "linear-gradient(270deg, #8b5cf6, #ec4899)",
  "linear-gradient(270deg, #ec4899, #f43f5e)",
  "linear-gradient(270deg, #f43f5e, #f97316)",
  "linear-gradient(270deg, #f97316, #eab308)",
  "linear-gradient(270deg, #eab308, #22c55e)",
  "linear-gradient(270deg, #22c55e, #06b6d4)",
  "linear-gradient(270deg, #06b6d4, #0ea5e9)",
  "linear-gradient(270deg, #0ea5e9, #3b82f6)",
  "linear-gradient(270deg, #3b82f6, #6366f1)",
  "linear-gradient(270deg, #6366f1, #22c55e)",
  "linear-gradient(270deg, #22c55e, #ec4899)",
];

export const GRADIENT_ANIMATION = {
  animate: { backgroundImage: GRADIENTS_12 },
  transition: {
    duration: 10,
    repeat: Infinity,
    ease: (t: number) => t,
  },
};
