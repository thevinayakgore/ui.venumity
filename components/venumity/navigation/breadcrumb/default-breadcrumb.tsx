import { Breadcrumb, BreadcrumbItem } from "./index";

export default function DefaultBreadcrumbDemo() {
  return (
    <div className="space-y-5">
      <p className="text-xs md:text-sm capitalize">
        variant = &quot;default&quot;
      </p>
      <Breadcrumb underline="slide">
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Docs</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
