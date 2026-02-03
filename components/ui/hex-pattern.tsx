// app/components/HexPatternBackground.tsx
"use client";

import type { CSSProperties } from "react";

const patternStyle: CSSProperties = {
  // @ts-expect-error custom CSS variables
  "--s": "105px",
  "--c1": "#b9b9b9",
  "--c2": "#dcdcdc",
  "--c3": "#fafafa",
  backgroundImage: `
    conic-gradient(
      from 75deg,
      var(--c1) 15deg,
      var(--c2) 0 30deg,
      #0000 0 180deg,
      var(--c2) 0 195deg,
      var(--c1) 0 210deg,
      #0000 0
    ),
    conic-gradient(
      var(--c1) 30deg,
      var(--c3) 0 75deg,
      var(--c1) 0 90deg,
      var(--c2) 0 105deg,
      var(--c3) 0 150deg,
      var(--c2) 0 180deg,
      var(--c3) 0 210deg,
      var(--c1) 0 256deg,
      var(--c2) 0 270deg,
      var(--c1) 0 286deg,
      var(--c2) 0 331deg,
      var(--c3) 0
    )
  `,
  backgroundPosition: `
    calc(0.5 * var(--s)) calc(0.5 * var(--s) / 0.577),
    0 0
  `,
  backgroundSize: "var(--s) calc(var(--s) / 0.577)", // 0.577 = tan(30deg)
};

export function HexPatternBackground() {
  return (
    <div className="h-full w-full" style={patternStyle}>
      {/* Put your content here */}
    </div>
  );
}
