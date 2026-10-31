type NavLinkItem = {
  name: string;
  href: string;
  newLink?: boolean;
  isExternal?: boolean;
};

type NavLinks = {
  title: string;
  links: NavLinkItem[];
};

export const COMPANY_SECTION: NavLinks = {
  title: "Company",
  links: [
    { name: "Primitives", href: "/primitives", newLink: true },
    { name: "Components", href: "/components" },
    { name: "Resources", href: "/resources" },
    { name: "Changelog", href: "/changelog" },
    { name: "Contact", href: "https://venumity.com/#contact" },
  ],
};
