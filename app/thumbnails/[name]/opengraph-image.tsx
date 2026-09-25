// app/thumbnails/[name]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { removeKebabCase } from "@/utils/slug-kebab";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Thumbnail preview";

export default async function OGImage({
  params,
}: {
  params: { name: string };
}) {
  const display = removeKebabCase(params.name);
  const img = `https://ui.venumity.com/api/thumbnails?name=${encodeURIComponent(params.name)}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        color: "white",
        padding: 60,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 24, opacity: 0.6 }}>Venumity UI</div>
        <div style={{ fontSize: 72, fontWeight: 700 }}>{display}</div>
        <div style={{ fontSize: 24, opacity: 0.6 }}>
          Production-ready React component
        </div>
      </div>
      <img
        src={img}
        alt=""
        width={400}
        height={300}
        style={{ borderRadius: 16, objectFit: "cover" }}
      />
    </div>,
    { ...size },
  );
}
