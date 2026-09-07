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