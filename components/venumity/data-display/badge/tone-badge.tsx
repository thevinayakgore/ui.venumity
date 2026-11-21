import { Badge } from "./index";

export default function ToneBadgeDemo() {
  return (
    <div className="space-y-5 md:space-y-10">
      <div className="space-y-3">
        <p className="text-xs md:text-sm capitalize">default variant</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral" className="text-white">
            Neutral
          </Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="danger">Danger</Badge>
          <Badge tone="brand">Brand</Badge>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs md:text-sm capitalize">outline variant</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" tone="neutral">
            Neutral
          </Badge>
          <Badge variant="outline" tone="success">
            Success
          </Badge>
          <Badge variant="outline" tone="warning">
            Warning
          </Badge>
          <Badge variant="outline" tone="info">
            Info
          </Badge>
          <Badge variant="outline" tone="danger">
            Danger
          </Badge>
          <Badge variant="outline" tone="brand">
            Brand
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs md:text-sm capitalize">ghost variant</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="ghost" tone="success">
            Success
          </Badge>
          <Badge variant="ghost" tone="warning">
            Warning
          </Badge>
          <Badge variant="ghost" tone="info">
            Info
          </Badge>
          <Badge variant="ghost" tone="danger">
            Danger
          </Badge>
          <Badge variant="ghost" tone="brand">
            Brand
          </Badge>
        </div>
      </div>
    </div>
  );
}
