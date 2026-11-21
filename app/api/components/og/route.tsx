// app/api/components/og/route.tsx
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import type { NextRequest } from "next/server";
import path from "node:path";

import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";

export const runtime = "nodejs";

const THUMBNAILS_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "thumbnails",
);

const INTER_FONT_PATH = path.join(
  process.cwd(),
  "public",
  "fonts",
  "Inter-Regular.ttf",
);

let interFontPromise: Promise<ArrayBuffer> | undefined;

/**
 * Load the font once per function instance.
 * Failed reads are not retained, allowing a later request to retry.
 */
function getInterFont(): Promise<ArrayBuffer> {
  if (!interFontPromise) {
    interFontPromise = readFile(INTER_FONT_PATH)
      .then((buffer) => {
        const arrayBuffer = new ArrayBuffer(buffer.byteLength);

        new Uint8Array(arrayBuffer).set(buffer);

        return arrayBuffer;
      })
      .catch((error: unknown) => {
        interFontPromise = undefined;
        throw error;
      });
  }

  return interFontPromise;
}

/**
 * Normalize a component name or thumbnail path into a thumbnail slug.
 */
function getThumbnailSlug(value: string): string {
  const filename = value
    .split(/[?#]/)[0]
    .replace(/\\/g, "/")
    .split("/")
    .pop();

  if (!filename) return "";

  return toKebabCase(filename.replace(/\.(webp|png|jpe?g)$/i, ""));
}

/**
 * Read an existing thumbnail from the local filesystem.
 */
async function getThumbnailBase64(name: string): Promise<string> {
  // Only allow a filename, never a directory path.
  if (!name || !/^[a-zA-Z0-9_-]+$/.test(name)) {
    return "";
  }

  try {
    const filePath = path.join(
      THUMBNAILS_DIRECTORY,
      `${name}.webp`,
    );

    const buffer = await readFile(filePath);

    return `data:image/webp;base64,${buffer.toString("base64")}`;
  } catch (error: unknown) {
    const isMissingFile =
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT";

    if (!isMissingFile) {
      console.error(`Error reading thumbnail "${name}":`, error);
    }

    return "";
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const requestedPath = searchParams.get("path") ?? "";

    const pathParts = requestedPath.split("/").filter(Boolean);

    const component = (
      searchParams.get("component") ||
      searchParams.get("title") ||
      ""
    ).trim();

    const category = (
      searchParams.get("category") ||
      pathParts[0] ||
      ""
    ).trim();

    const subcategory = (
      searchParams.get("subcategory") ||
      pathParts[1] ||
      ""
    ).trim();

    const componentSlug = toKebabCase(component);
    const categorySlug = toKebabCase(category);
    const subcategorySlug = toKebabCase(subcategory);

    let componentName = component || "UI Component";
    let categoryName = category || "Components";
    let subcategoryName = subcategory;

    const thumbnailCandidates: string[] = [];

    // General thumbnail fallbacks.
    if (component) {
      thumbnailCandidates.push(getThumbnailSlug(component));
    }

    if (subcategory) {
      thumbnailCandidates.push(getThumbnailSlug(subcategory));
    }

    if (category) {
      thumbnailCandidates.push(getThumbnailSlug(category));
    }

    // Resolve display names and preferred thumbnails from registries.
    const allRegistries = [...COMPONENTS, ...PRIMITIVES];

    for (const registryCategory of allRegistries) {
      if (toKebabCase(registryCategory.name) !== categorySlug) {
        continue;
      }

      categoryName = registryCategory.name;

      for (const registrySubcategory of registryCategory.subcategories) {
        if (
          toKebabCase(registrySubcategory.name) !== subcategorySlug
        ) {
          continue;
        }

        subcategoryName = registrySubcategory.name;

        if (registrySubcategory.thumbnail) {
          thumbnailCandidates.unshift(
            getThumbnailSlug(registrySubcategory.thumbnail),
          );
        }

        for (const item of registrySubcategory.items) {
          if (toKebabCase(item.itemName) !== componentSlug) {
            continue;
          }

          componentName = item.itemName;

          thumbnailCandidates.unshift(
            getThumbnailSlug(item.itemName),
          );

          break;
        }

        break;
      }

      break;
    }

    // Remove empty and duplicate candidates without changing priority.
    const uniqueCandidates = [
      ...new Set(thumbnailCandidates.filter(Boolean)),
    ];

    let thumbnailBase64 = "";

    for (const candidate of uniqueCandidates) {
      const thumbnail = await getThumbnailBase64(candidate);

      if (thumbnail) {
        thumbnailBase64 = thumbnail;
        break;
      }
    }

    const interFont = await getInterFont();

    const categoryLabel = subcategoryName
      ? `${categoryName} • ${subcategoryName}`
      : categoryName;

    return new ImageResponse(
      (
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
              {/* Component thumbnail */}
              {thumbnailBase64 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnailBase64}
                  alt={componentName}
                  width={200}
                  height={200}
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
                  {componentName.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Component name */}
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

              {/* Category */}
              <div
                style={{
                  fontSize: "24px",
                  color: "#3b82f6",
                  marginBottom: "24px",
                  textAlign: "center",
                }}
              >
                {categoryLabel}
              </div>

              {/* Technology badges */}
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

              {/* Footer */}
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
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interFont,
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch (error: unknown) {
    console.error("OG Image Error:", error);

    return new Response("Failed to generate image", {
      status: 500,
    });
  }
}