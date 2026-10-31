import { Breadcrumb, BreadcrumbItem } from "./index";

export default function AnimatedBreadcrumbDemo() {
  return (
    <div className="grid grid-cols-2 items-start gap-5 md:gap-10 p-5 md:p-10 max-w-3xl w-full">
      {/* Slide */}
      <div className="space-y-5">
        <p className="text-xs md:text-sm capitalize">
          underline = &quot;slide&quot;
        </p>
        <Breadcrumb underline="slide">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Projects</BreadcrumbItem>
          <BreadcrumbItem href="#">Venumity</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Components</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Center */}
      <div className="space-y-5">
        <p className="text-xs md:text-sm capitalize">
          underline = &quot;center&quot;
        </p>
        <Breadcrumb underline="center">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Projects</BreadcrumbItem>
          <BreadcrumbItem href="#">Venumity</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Components</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Dot */}
      <div className="space-y-5">
        <p className="text-xs md:text-sm capitalize">
          underline = &quot;dot&quot;
        </p>
        <Breadcrumb underline="dot">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Projects</BreadcrumbItem>
          <BreadcrumbItem href="#">Venumity</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Components</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Dashed */}
      <div className="space-y-5">
        <p className="text-xs md:text-sm capitalize">
          underline = &quot;dashed&quot;
        </p>
        <Breadcrumb underline="dashed">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Projects</BreadcrumbItem>
          <BreadcrumbItem href="#">Venumity</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Components</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Double */}
      <div className="space-y-5">
        <p className="text-xs md:text-sm capitalize">
          underline = &quot;double&quot;
        </p>
        <Breadcrumb underline="double">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Projects</BreadcrumbItem>
          <BreadcrumbItem href="#">Venumity</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Components</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Pulse */}
      <div className="space-y-5">
        <p className="text-xs md:text-sm capitalize">
          underline = &quot;pulse&quot;
        </p>
        <Breadcrumb underline="pulse">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Projects</BreadcrumbItem>
          <BreadcrumbItem href="#">Venumity</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Components</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Grow up */}
      <div className="space-y-5">
        <p className="text-xs md:text-sm capitalize">
          underline = &quot;grow-up&quot;
        </p>
        <Breadcrumb underline="grow-up">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Projects</BreadcrumbItem>
          <BreadcrumbItem href="#">Venumity</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Components</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Ink fill */}
      <div className="space-y-5">
        <p className="text-xs md:text-sm capitalize">
          underline = &quot;ink-fill&quot;
        </p>
        <Breadcrumb underline="ink-fill">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Projects</BreadcrumbItem>
          <BreadcrumbItem href="#">Venumity</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Components</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  );
}
