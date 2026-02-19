// app/api/og/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { COMPONENTS } from "@/registry/components";
import { getOGThumbnailPath } from "@/registry/component-utils";
import { toKebabCase } from "@/utils/slug-kebab";
import { website } from "@/lib/brand";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const component = searchParams.get("component");
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    // Find component details
    let componentName = component || "UI Component";
    let categoryName = category || "Components";
    let subcategoryName = subcategory || "";
    let thumbnailPath = "";

    // Search through COMPONENTS to find the matching component
    for (const cat of COMPONENTS) {
      if (toKebabCase(cat.name) === category) {
        categoryName = cat.name;
        for (const sub of cat.subcategories) {
          if (toKebabCase(sub.name) === subcategory) {
            subcategoryName = sub.name;
            for (const item of sub.items) {
              if (toKebabCase(item.itemName) === component) {
                componentName = item.itemName;
                // OG images ALWAYS use component item name (not subcategory thumbnail)
                thumbnailPath = getOGThumbnailPath(item.itemName);
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }

    // Try to fetch the actual component thumbnail from public folder
    let thumbnailBase64 = "";
    if (thumbnailPath) {
      try {
        const baseUrl = website || "http://localhost:3000/";
        const imageUrl = `${baseUrl}${thumbnailPath}`;
        const imageRes = await fetch(imageUrl);
        if (imageRes.ok) {
          const arrayBuffer = await imageRes.arrayBuffer();
          thumbnailBase64 = `data:${imageRes.headers.get("content-type") || "image/png"};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
        }
      } catch (error) {
        console.error("Failed to fetch thumbnail:", error);
      }
    }

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030711",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "40px",
            background:
              "linear-gradient(135deg, rgba(2,6,23,0.95) 0%, rgba(15,23,42,0.98) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              maxWidth: "1000px",
              background: "rgba(15, 23, 42, 0.8)",
              borderRadius: "24px",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              padding: "40px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Component thumbnail - from public/thumbnails using item name */}
            {thumbnailBase64 ? (
              <img
                src={thumbnailBase64}
                alt={componentName}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  marginBottom: "24px",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                }}
              />
            ) : (
              // Default box when image not found in thumbnails folder
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                  fontSize: "80px",
                  color: "#3b82f6",
                }}
              >
                {componentName.charAt(0)}
              </div>
            )}

            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              {componentName}
            </div>

            <div
              style={{
                fontSize: "24px",
                color: "#3b82f6",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              {categoryName} • {subcategoryName}
            </div>

            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              {[
                "Next.js",
                "TypeScript",
                "Framer Motion",
                "Tailwind CSS",
                "shadcn/ui",
              ].map((tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "8px 16px",
                    background: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "40px",
                    color: "#94a3b8",
                    fontSize: "16px",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "12px",
                color: "#3b82f6",
                fontSize: "18px",
                borderTop: "1px solid rgba(59, 130, 246, 0.2)",
                paddingTop: "20px",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <span>⚡ venumityui</span>
              <span>•</span>
              <span>#buildinginpublic</span>
              <span>•</span>
              <span>copy-paste ready</span>
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await fetch(
              new URL(
                "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
              ),
            ).then((res) => res.arrayBuffer()),
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch (e) {
    console.error("OG Image Error:", e);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
