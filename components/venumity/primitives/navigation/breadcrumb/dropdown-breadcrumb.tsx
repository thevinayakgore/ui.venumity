import { Home, Users, Table, Folder, FileText, Database } from "lucide-react";
import { Breadcrumb, BreadcrumbItem } from "./index";

export default function BreadcrumbDemo() {
  return (
    <div className="space-y-5">
      <p className="text-xs md:text-sm capitalize">
        dropdown — click ⋯ to open menu
      </p>
      <Breadcrumb variant="dropdown" maxItems={3} underline="ink-fill">
        <BreadcrumbItem href="#" icon={<Home />}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem href="#" icon={<Folder />}>
          Projects
        </BreadcrumbItem>
        <BreadcrumbItem href="#" icon={<Users />}>
          Team
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
