import { Breadcrumb, BreadcrumbItem } from "./index";
import {
  Home,
  Table,
  Folder,
  Database,
  FileText,
  LayoutDashboard,
} from "lucide-react";

export default function BreadcrumbDemo() {
  return (
    <div className="space-y-5">
      <p className="text-xs md:text-sm capitalize">
        Expandable - click ⋯ to expand
      </p>
      <Breadcrumb variant="expandable" maxItems={3} underline="slide">
        <BreadcrumbItem href="#" icon={<Home />}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem href="#" icon={<Folder />}>
          Projects
        </BreadcrumbItem>
        <BreadcrumbItem href="#" icon={<LayoutDashboard />}>
          Venumity
        </BreadcrumbItem>
        <BreadcrumbItem href="#" icon={<Database />}>
          Registry
        </BreadcrumbItem>
        <BreadcrumbItem href="#" icon={<Table />}>
          Primitives
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage icon={<FileText />}>
          Breadcrumb
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
