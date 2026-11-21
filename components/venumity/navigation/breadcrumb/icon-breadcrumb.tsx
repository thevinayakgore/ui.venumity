import { Home, Folder, FileText, Settings } from "lucide-react";
import { Breadcrumb, BreadcrumbItem } from "./index";

export default function IconBreadcrumbDemo() {
  return (
    <Breadcrumb variant="with-icons" underline="center">
      <BreadcrumbItem href="#" icon={<Home />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#" icon={<Folder />}>
        Projects
      </BreadcrumbItem>
      <BreadcrumbItem href="#" icon={<FileText />}>
        Venumity
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage icon={<Settings />}>
        Settings
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
