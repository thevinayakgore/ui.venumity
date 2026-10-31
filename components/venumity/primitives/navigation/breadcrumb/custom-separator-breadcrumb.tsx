import { Breadcrumb, BreadcrumbItem } from "./index";

export default function CustomSeparatorBreadcrumbDemo() {
  return (
    <div className="space-y-5">
      <p className="text-xs md:text-sm capitalize">
        variant = &quot;custom-separator&quot;
      </p>
      <Breadcrumb
        variant="custom-separator"
        underline="dashed"
        separator={
          <span className="text-muted-foreground text-xs select-none">$$</span>
        }
      >
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Library</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
