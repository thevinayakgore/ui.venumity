// app/components/content/component-item-with-tabs.tsx
"use client";
import Manual from "./manual";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Overview from "./overview";
import { toKebabCase } from "@/utils/slug-kebab";
import { PencilRuler, Terminal } from "lucide-react";
import CodeBlock from "@/components/site/common/code-block";
import { ComponentItemData } from "../[...slug]/page.client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ComponentItemWithTabsProps {
  item: ComponentItemData;
  index: number;
}

// ─────────────────────────────────────────────────────────────
// PACKAGE MANAGER CONFIG
// ─────────────────────────────────────────────────────────────
type PackageManagerName = "npm" | "pnpm" | "yarn" | "bun";

interface PackageManagerConfig {
  name: PackageManagerName;
  label: string;
  logo?: ReactNode;
  command: (componentName: string) => string;
}

const packageManagers: PackageManagerConfig[] = [
  {
    name: "npm",
    label: "npm",
    logo: (
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
      >
        <path
          fill="#cb3837"
          d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"
        ></path>
      </svg>
    ),
    command: (c) => `npx venumityui@latest add ${c}`,
  },
  {
    name: "pnpm",
    label: "pnpm",
    logo: (
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 368"
        width="24"
        height="24"
      >
        <path
          fill="#F9AD00"
          d="M512 126.274v114.794H397.206V126.274zM512 0v114.794H397.206V0zM385.726 0v114.794H270.932V0zM259.452 0v114.794H144.658V0z"
        ></path>
        <path
          fill="#4E4E4E"
          d="M385.726 252.548v114.794H270.932V252.548zm126.274 0v114.794H397.206V252.548zm-252.548 0v114.794H144.658V252.548zm126.274-126.274v114.794H270.932V126.274zM21.503 159.77q5.785 0 10.752 1.494q4.965 1.496 8.534 4.58q3.568 3.086 5.593 7.763t2.025 11.138q-.001 6.171-1.736 10.8q-1.736 4.628-4.918 7.762t-7.666 4.676t-9.98 1.543q-4.147 0-7.714-1.253v16.007l-.156.044q-.972.27-2.93.582q-2.12.338-4.34.338q-2.12 0-3.808-.29q-1.687-.288-2.845-1.156q-1.157-.868-1.735-2.363Q0 219.942 0 217.531v-46.285l.005-.343q.069-2.37 1.104-3.9q1.11-1.64 3.037-2.99q2.99-1.928 7.425-3.085q4.436-1.157 9.932-1.157m112.627 0q5.785 0 10.752 1.494q4.965 1.496 8.534 4.58q3.568 3.086 5.593 7.763t2.025 11.138q0 6.171-1.736 10.8q-1.736 4.628-4.918 7.762t-7.666 4.676t-9.98 1.543q-4.147 0-7.714-1.253v16.007l-.155.044q-.973.27-2.931.582q-2.12.338-4.34.338q-2.12 0-3.808-.29q-1.687-.288-2.845-1.156q-1.157-.868-1.735-2.363q-.579-1.494-.579-3.905v-46.285l.005-.343q.069-2.37 1.104-3.9q1.11-1.64 3.037-2.99q2.99-1.928 7.425-3.085q4.436-1.157 9.932-1.157m-54.288 0q10.896 0 16.778 4.773t5.882 13.259v30.181l-.168.049q-.969.264-2.87.53q-2.072.29-4.29.29q-2.122 0-3.81-.29q-1.686-.29-2.844-1.157q-1.157-.868-1.784-2.363q-.627-1.494-.626-3.905v-22.757l-.005-.31q-.084-2.752-1.683-4.077q-1.688-1.398-4.58-1.398q-1.929 0-3.81.482q-1.88.481-3.23 1.446v33.46l-.168.049q-.969.264-2.869.53q-2.073.29-4.29.29q-2.123 0-3.81-.29t-2.844-1.157t-1.784-2.363q-.627-1.494-.627-3.905V172.21l.005-.343q.069-2.37 1.104-3.9q1.11-1.64 3.037-2.99q3.279-2.313 8.245-3.76t11.04-1.446m141.266 0q3.664 0 7.184.964t6.267 3.038q2.749 2.073 4.388 5.496q1.64 3.423 1.64 8.34v30.375l-.17.049q-.968.264-2.868.53q-2.073.29-4.291.29q-2.122 0-3.81-.29q-1.686-.29-2.844-1.157q-1.157-.868-1.784-2.363q-.627-1.494-.627-3.905v-23.046l-.005-.316q-.086-2.649-1.634-3.879q-1.64-1.3-4.435-1.301q-1.35 0-2.893.626q-1.543.627-2.315 1.302q.097.386.097.723v32.737l-.184.049q-1.05.264-2.95.53q-2.073.29-4.195.29q-2.12 0-3.808-.29t-2.845-1.157t-1.784-2.363q-.627-1.494-.627-3.905v-23.046l-.005-.3q-.088-2.66-1.779-3.895q-1.784-1.3-4.29-1.301q-1.737 0-2.99.53t-2.121 1.013v33.845l-.169.049q-.968.264-2.869.53q-2.073.29-4.29.29q-2.123 0-3.81-.29t-2.844-1.157t-1.784-2.363q-.627-1.494-.627-3.905v-29.12l.005-.343q.069-2.364 1.104-3.804q1.11-1.543 3.037-2.893q3.279-2.314 8.149-3.76q4.869-1.447 10.173-1.447q3.953 0 7.762 1.109q3.81 1.109 6.605 3.326q2.893-1.928 6.51-3.182q3.615-1.253 8.726-1.253M22.082 172.596q-1.832 0-3.279.434q-1.446.433-2.507 1.012v21.214l.391.188q.991.455 2.116.776q1.35.386 2.893.386q9.932 0 9.932-11.86q0-6.172-2.459-9.161q-2.458-2.99-7.087-2.99m112.627 0q-1.832 0-3.279.434q-1.446.433-2.507 1.012v21.214l.391.188q.991.455 2.116.776q1.35.386 2.893.386q9.933 0 9.932-11.86q0-6.172-2.459-9.161q-2.458-2.99-7.087-2.99"
        ></path>
      </svg>
    ),
    command: (c) => `pnpm dlx venumityui@latest add ${c}`,
  },
  {
    name: "yarn",
    label: "yarn",
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width="24"
        height="24"
        className="h-4 w-4"
      >
        <g fill="#2c8ebb">
          <path d="M99.24 80.71C94.9 80.76 91.1 83 87.89 85c-6 3.71-9 3.47-9 3.47l-.1-.17c-.41-.67 1.92-6.68-.69-13.84-2.82-7.83-7.3-9.72-6.94-10.32 1.53-2.59 5.36-6.7 6.89-14.36.91-4.64.67-12.28-1.39-16.28-.38-.74-3.78 1.24-3.78 1.24s-3.18-7.09-4.07-7.66c-2.87-1.84-6 7.61-6 7.61a14 14 0 00-11.71 4.5 9.64 9.64 0 01-3.85 2.27c-.41.14-.91.12-2.15 3.47-1.9 5.07 3.24 10.81 3.24 10.81s-6.13 4.33-8.4 9.72a24.78 24.78 0 00-1.75 11.68s-4.36 3.78-4.64 7.68a12.87 12.87 0 001.77 7.83 1.94 1.94 0 002.63.91s-2.9 3.38-.19 4.81c2.47 1.29 6.63 2 8.83-.19 1.6-1.6 1.92-5.17 2.51-6.63.14-.34.62.57 1.08 1a10 10 0 001.36 1s-3.9 1.68-2.3 5.51c.53 1.27 2.42 2.08 5.51 2.06 1.15 0 13.76-.72 17.12-1.53a4.33 4.33 0 002.61-1.46 63 63 0 0015.49-7c4.74-3.09 6.68-3.93 10.51-4.84 3.16-.75 2.95-5.65-1.24-5.58z"></path>
          <path d="M64 2a62 62 0 1062 62A62 62 0 0064 2zm37.3 87.83c-3.35.81-4.91 1.44-9.41 4.36a67 67 0 01-15.56 7.18 8.71 8.71 0 01-3.64 1.77c-3.81.93-16.88 1.63-17.91 1.63h-.24c-4 0-6.27-1.24-7.49-2.54-3.4 1.7-7.8 1-11-.69a5.55 5.55 0 01-3-3.9 6 6 0 010-2.06 6.66 6.66 0 01-.79-1A16.38 16.38 0 0130 84.52c.29-3.73 2.87-7.06 4.55-8.83A28.56 28.56 0 0136.61 64a26.82 26.82 0 016.82-9c-1.65-2.78-3.33-7.06-1.7-11.42 1.17-3.11 2.13-4.84 4.24-5.58a6.84 6.84 0 002.51-1.34A17.65 17.65 0 0160.34 31c.19-.48.41-1 .65-1.46 1.6-3.4 3.3-5.31 5.29-6a4.88 4.88 0 014.4.5c.65.43 1.48 1 3.9 6a4.69 4.69 0 012.85-.1 3.81 3.81 0 012.39 1.94c2.47 4.74 2.8 13.19 1.72 18.62a33.8 33.8 0 01-5.84 13.31 25.73 25.73 0 015.77 9.43 25.42 25.42 0 011.41 10.41A28.7 28.7 0 0086 81.91c3.06-1.89 7.68-4.74 13.19-4.81a6.62 6.62 0 017 5.7 6.35 6.35 0 01-4.89 7.03z"></path>
        </g>
      </svg>
    ),
    command: (c) => `yarn dlx venumityui@latest add ${c}`,
  },
  {
    name: "bun",
    label: "bun",
    logo: (
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
      >
        <path d="M113.744 41.999a18.558 18.558 0 0 0-.8-.772c-.272-.246-.528-.524-.8-.771s-.528-.525-.8-.771c-.272-.247-.528-.525-.8-.772s-.528-.524-.8-.771-.528-.525-.8-.772-.528-.524-.8-.771c7.936 7.52 12.483 17.752 12.656 28.481 0 25.565-26.912 46.363-60 46.363-18.528 0-35.104-6.526-46.128-16.756l.8.772.8.771.8.772.8.771.8.772.8.771.8.771c11.008 10.662 27.952 17.527 46.928 17.527 33.088 0 60-20.797 60-46.285 0-10.893-4.864-21.215-13.456-29.33z"></path>
        <path
          fill="#fbf0df"
          d="M116.8 65.08c0 23.467-25.072 42.49-56 42.49s-56-19.023-56-42.49c0-14.55 9.6-27.401 24.352-35.023C43.904 22.435 53.088 14.628 60.8 14.628S75.104 21 92.448 30.058C107.2 37.677 116.8 50.53 116.8 65.08Z"
        ></path>
        <path
          fill="#f6dece"
          d="M116.8 65.08a32.314 32.314 0 0 0-1.28-8.918c-4.368 51.377-69.36 53.846-94.912 38.48 11.486 8.584 25.66 13.144 40.192 12.928 30.88 0 56-19.054 56-42.49z"
        ></path>
        <path
          fill="#fffefc"
          d="M39.248 27.234c7.152-4.135 16.656-11.896 26-11.911a15.372 15.372 0 0 0-4.448-.695c-3.872 0-8 1.93-13.2 4.83-1.808 1.018-3.68 2.144-5.664 3.317-3.728 2.222-8 4.736-12.8 7.251C13.904 37.972 4.8 51.071 4.8 65.08v1.836c9.696-33.033 27.312-35.547 34.448-39.682z"
        ></path>
        <path
          fill="#ccbea7"
          d="M56.192 18.532A24.553 24.553 0 0 1 53.867 29.1a25.407 25.407 0 0 1-6.683 8.671c-.448.386-.096 1.127.48.91 5.392-2.02 12.672-8.068 9.6-20.272-.128-.695-1.072-.51-1.072.123zm3.632 0a24.474 24.474 0 0 1 3.646 10.12c.445 3.587.08 7.224-1.07 10.662-.192.54.496 1.003.88.556 3.504-4.32 6.56-12.899-2.592-22.156-.464-.4-1.184.216-.864.756zm4.416-.262a25.702 25.702 0 0 1 7.521 7.925A24.71 24.71 0 0 1 75.2 36.414c-.016.13.02.26.101.365a.543.543 0 0 0 .718.117.509.509 0 0 0 .221-.313c1.472-5.384.64-14.564-11.472-19.332-.64-.246-1.056.587-.528.957zM34.704 34.315a27.418 27.418 0 0 0 9.91-5.222 26.262 26.262 0 0 0 6.842-8.663c.288-.556 1.2-.34 1.056.277-2.768 12.343-12.032 14.92-17.792 14.58-.608.016-.592-.802-.016-.972z"
        ></path>
        <path d="M60.8 111.443c-33.088 0-60-20.798-60-46.363 0-15.429 9.888-29.823 26.448-38.448 4.8-2.469 8.912-4.953 12.576-7.128 2.016-1.203 3.92-2.33 5.76-3.379C51.2 12.916 56 10.771 60.8 10.771c4.8 0 8.992 1.852 14.24 4.845 1.6.88 3.2 1.836 4.912 2.885 3.984 2.376 8.48 5.06 14.4 8.131 16.56 8.625 26.448 23.004 26.448 38.448 0 25.565-26.912 46.363-60 46.363zm0-96.814c-3.872 0-8 1.928-13.2 4.829-1.808 1.018-3.68 2.144-5.664 3.317-3.728 2.222-8 4.736-12.8 7.251C13.904 37.972 4.8 51.071 4.8 65.08c0 23.436 25.12 42.506 56 42.506s56-19.07 56-42.506c0-14.01-9.104-27.108-24.352-35.023-6.048-3.086-10.768-5.986-14.592-8.27-1.744-1.033-3.344-1.99-4.8-2.838-4.848-2.778-8.384-4.32-12.256-4.32z"></path>
        <path
          fill="#b71422"
          d="M72.08 76.343c-.719 2.839-2.355 5.383-4.672 7.267a11.07 11.07 0 0 1-6.4 2.9 11.13 11.13 0 0 1-6.608-2.9c-2.293-1.892-3.906-4.436-4.608-7.267a1.073 1.073 0 0 1 .05-.5 1.11 1.11 0 0 1 .272-.428 1.19 1.19 0 0 1 .958-.322h19.744a1.185 1.185 0 0 1 .947.33 1.073 1.073 0 0 1 .317.92z"
        ></path>
        <path
          fill="#ff6164"
          d="M54.4 83.733a11.24 11.24 0 0 0 6.592 2.932 11.239 11.239 0 0 0 6.576-2.932 16.652 16.652 0 0 0 1.6-1.65 10.904 10.904 0 0 0-3.538-2.564 11.26 11.26 0 0 0-4.302-1 10.121 10.121 0 0 0-4.549 1.192 9.71 9.71 0 0 0-3.451 3.097c.368.323.688.632 1.072.925z"
        ></path>
        <path d="M54.656 82.514a8.518 8.518 0 0 1 2.97-2.347 8.836 8.836 0 0 1 3.734-.862 9.78 9.78 0 0 1 6.4 2.608c.368-.386.72-.787 1.056-1.188-2.035-1.87-4.726-2.933-7.536-2.978a10.487 10.487 0 0 0-4.335.975 10.125 10.125 0 0 0-3.489 2.666c.378.396.779.772 1.2 1.126z"></path>
        <path d="M60.944 87.436a12.078 12.078 0 0 1-7.12-3.086c-2.477-2.02-4.22-4.75-4.976-7.791-.054-.27-.045-.55.027-.817a1.83 1.83 0 0 1 .389-.726 2.25 2.25 0 0 1 .81-.595 2.32 2.32 0 0 1 .998-.192h19.744c.343-.007.683.06.996.196a2.3 2.3 0 0 1 .812.591c.182.212.313.46.382.728.07.267.076.545.018.815-.756 3.042-2.5 5.771-4.976 7.791a12.078 12.078 0 0 1-7.104 3.086zm-9.872-11.417c-.256 0-.32.108-.336.139.676 2.638 2.206 4.999 4.368 6.742a10.122 10.122 0 0 0 5.84 2.7 10.207 10.207 0 0 0 5.84-2.67c2.155-1.745 3.679-4.106 4.352-6.741a.333.333 0 0 0-.14-.113.348.348 0 0 0-.18-.026z"></path>
        <path
          fill="#febbd0"
          d="M85.152 77.3c5.17 0 9.36-2.377 9.36-5.308s-4.19-5.307-9.36-5.307c-5.17 0-9.36 2.376-9.36 5.307 0 2.931 4.19 5.307 9.36 5.307zm-48.432 0c5.17 0 9.36-2.377 9.36-5.308s-4.19-5.307-9.36-5.307c-5.17 0-9.36 2.376-9.36 5.307 0 2.931 4.19 5.307 9.36 5.307z"
        ></path>
        <path d="M41.12 69.863a9.052 9.052 0 0 0 4.902-1.425 8.578 8.578 0 0 0 3.254-3.812 8.22 8.22 0 0 0 .508-4.913 8.41 8.41 0 0 0-2.408-4.357 8.92 8.92 0 0 0-4.514-2.33 9.12 9.12 0 0 0-5.096.48 8.755 8.755 0 0 0-3.96 3.131 8.287 8.287 0 0 0-1.486 4.725c0 2.252.927 4.412 2.577 6.005 1.65 1.594 3.888 2.492 6.223 2.496zm39.632 0a9.054 9.054 0 0 0 4.915-1.403 8.582 8.582 0 0 0 3.275-3.802 8.22 8.22 0 0 0 .528-4.917 8.408 8.408 0 0 0-2.398-4.368 8.92 8.92 0 0 0-4.512-2.344 9.12 9.12 0 0 0-5.103.473 8.756 8.756 0 0 0-3.967 3.13 8.287 8.287 0 0 0-1.49 4.73c-.004 2.245.914 4.4 2.555 5.994 1.64 1.593 3.869 2.495 6.197 2.507z"></path>
        <path
          fill="#fff"
          d="M38.4 61.902a3.4 3.4 0 0 0 1.844-.531c.547-.35.974-.847 1.227-1.43a3.088 3.088 0 0 0 .195-1.847 3.16 3.16 0 0 0-.902-1.639 3.351 3.351 0 0 0-1.696-.878 3.426 3.426 0 0 0-1.916.179 3.29 3.29 0 0 0-1.489 1.176 3.113 3.113 0 0 0-.559 1.776c0 .844.347 1.654.964 2.253a3.374 3.374 0 0 0 2.332.94zm39.632 0a3.4 3.4 0 0 0 1.844-.531c.547-.35.974-.847 1.227-1.43a3.088 3.088 0 0 0 .195-1.847 3.16 3.16 0 0 0-.902-1.639 3.351 3.351 0 0 0-1.696-.878 3.426 3.426 0 0 0-1.916.179 3.29 3.29 0 0 0-1.489 1.176 3.113 3.113 0 0 0-.559 1.776c0 .84.342 1.644.953 2.242.61.598 1.44.94 2.311.952z"
        ></path>
      </svg>
    ),
    command: (c) => `bunx venumityui@latest add ${c}`,
  },
];

// ─────────────────────────────────────────────────────────────
// GLOBAL PM PREFERENCE
//   - Shared across all component tabs on the page
//   - Persisted to localStorage
//   - Auto-detected from browser UA on first visit
// ─────────────────────────────────────────────────────────────
const PM_STORAGE_KEY = "venumity-pm-preference";
const PM_EVENT = "venumity-pm-change";

const isPackageManagerName = (v: string): v is PackageManagerName =>
  ["npm", "pnpm", "yarn", "bun"].includes(v);

function readStoredPM(): PackageManagerName | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(PM_STORAGE_KEY);
    return stored && isPackageManagerName(stored) ? stored : null;
  } catch {
    return null;
  }
}

function detectPMFromUA(): PackageManagerName {
  if (typeof window === "undefined") return "npm";
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes("pnpm")) return "pnpm";
  if (ua.includes("yarn")) return "yarn";
  if (ua.includes("bun")) return "bun";
  return "npm";
}

function writeStoredPM(pm: PackageManagerName) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PM_STORAGE_KEY, pm);
    // Notify all other component instances on the page
    window.dispatchEvent(new CustomEvent(PM_EVENT, { detail: pm }));
  } catch {
    // localStorage unavailable — ignore
  }
}

/**
 * Global, shared package manager state.
 * Any tab that changes PM updates every other tab on the page.
 */
function useGlobalPackageManager(): [
  PackageManagerName,
  (pm: PackageManagerName) => void,
] {
  const [pm, setPm] = useState<PackageManagerName>("npm");

  // Initialize from storage / UA on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      const stored = readStoredPM();
      setPm(stored ?? detectPMFromUA());
    }, 0); // change 0 to e.g. 300 or 500 if you want a real delay

    return () => clearTimeout(timeout);
  }, []);

  // Listen for changes from other instances
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<PackageManagerName>).detail;
      if (detail && isPackageManagerName(detail)) {
        setPm(detail);
      }
    };
    window.addEventListener(PM_EVENT, handler);
    return () => window.removeEventListener(PM_EVENT, handler);
  }, []);

  const update = (next: PackageManagerName) => {
    setPm(next);
    writeStoredPM(next);
  };

  return [pm, update];
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
export default function ComponentItemWithTabs({
  item,
  index,
}: ComponentItemWithTabsProps) {
  const [componentActiveTab, setComponentActiveTab] = useState<string>("cli");

  // Shared + persisted PM preference across every tab on the page
  const [selectedPackageManager, setSelectedPackageManager] =
    useGlobalPackageManager();

  // Memoize slug paths — they never change for a given item
  const itemSlugPath = useMemo(
    () =>
      `${toKebabCase(item.category)}/${toKebabCase(item.subcategory || "")}/${toKebabCase(item.itemName)}`,
    [item.category, item.subcategory, item.itemName],
  );

  const componentFolderPath = useMemo(() => itemSlugPath, [itemSlugPath]);

  const showManual = Boolean(item.code);
  const showCli = true;
  const showAnyExtra = showCli || showManual;

  // Memoize the CLI command shown in the code block
  const currentCommand = useMemo(() => {
    const pm = packageManagers.find((p) => p.name === selectedPackageManager);
    return (
      pm?.command(toKebabCase(item.itemName)) ??
      `npx venumityui@latest add ${toKebabCase(item.itemName)}`
    );
  }, [selectedPackageManager, item.itemName]);

  // Memoize tab column count
  const tabCount = useMemo(
    () => [showCli, showManual].filter(Boolean).length,
    [showCli, showManual],
  );

  const tabGridClass = useMemo(() => {
    if (tabCount === 3) return "grid-cols-3";
    if (tabCount === 2) return "grid-cols-2";
    return "grid-cols-1";
  }, [tabCount]);

  return (
    <section
      key={`${item.itemName}-${index}`}
      id={toKebabCase(item.itemName)}
      className="scroll-mt-24 w-full"
    >
      <Overview
        itemName={item.itemName}
        componentName={item.category}
        component={item.itemName}
        description={item.description || ""}
        tags={item.tags || []}
        techs={item.techs || []}
        youtubeUrl={item.video}
        code={item.code}
        slugPath={itemSlugPath}
        subcategory={item.subcategory}
        isInListView={true}
        githubUsername={item.githubUsername}
      />

      {showAnyExtra && (
        <div className="w-full py-5 md:py-10 mb-5 md:mb-10 border-b">
          <Tabs
            value={componentActiveTab}
            onValueChange={setComponentActiveTab}
            className="w-full"
          >
            <TabsList
              className={`grid p-1.25 mb-3 w-full bg-accent dark:bg-popover border-0! rounded-lg max-w-fit! h-12! ${tabGridClass}`}
            >
              {showCli && (
                <TabsTrigger
                  value="cli"
                  className="flex items-center gap-2 px-3! border-0! data-active:bg-white! dark:data-active:bg-foreground/10! rounded-md"
                >
                  <Terminal className="size-4" />
                  CLI
                </TabsTrigger>
              )}
              {showManual && (
                <TabsTrigger
                  value="manual"
                  className="flex items-center gap-2 px-3! border-0! data-active:bg-white! dark:data-active:bg-foreground/10! rounded-md"
                >
                  <PencilRuler className="size-4" />
                  Manual
                </TabsTrigger>
              )}
            </TabsList>

            {showCli && (
              <TabsContent value="cli">
                <div className="p-1.5 bg-foreground/5 backdrop-blur-md rounded-xl">
                  <div className="flex items-center justify-between px-1.5 w-full">
                    <div className="flex items-center gap-1.5 pt-1 pb-2 text-xs font-semibold text-foreground/50">
                      <Terminal className="size-5 p-0.75 mr-1 bg-foreground/70 text-background rounded-[3px]" />
                      {packageManagers.map((pm) => (
                        <button
                          key={pm.name}
                          type="button"
                          onClick={() => setSelectedPackageManager(pm.name)}
                          className={`flex items-center gap-2 px-2 py-1 border border-transparent rounded-sm transition-all duration-200 ${
                            selectedPackageManager === pm.name &&
                            "bg-background dark:bg-foreground/15 text-foreground border-foreground/20! dark:border-background!"
                          }`}
                          aria-pressed={selectedPackageManager === pm.name}
                        >
                          <span>{pm.logo}</span>
                          <span>{pm.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border border-foreground/6 rounded-lg overflow-hidden">
                    <div>
                      <CodeBlock code={currentCommand} language="txt" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}

            {showManual && item.code && (
              <TabsContent value="manual">
                <Manual
                  code={item.code}
                  componentName={item.itemName}
                  componentPath={componentFolderPath}
                  packageManager={selectedPackageManager}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}
    </section>
  );
}
