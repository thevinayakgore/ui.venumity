#!/usr/bin/env node
import fs from "fs";
import ora from "ora";
import path from "path";
import chalk from "chalk";
import boxen from "boxen";
import { Command } from "commander";
import { fileURLToPath } from "url";
import gradient from "gradient-string";
import { execSync, spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"),
);

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://ui.venumity.com";

// ============================================================
// IMPORT REWRITER & DEPENDENCY EXTRACTOR
// ============================================================
function processImports(code, currentSlug) {
  const internalDeps = new Set();
  let out = code;

  // 1. Rewrite absolute imports
  out = out.replace(
    /from\s+["']@\/components\/venumity\/(?:primitives|components)\/([^"']+)["']/g,
    (_match, fullPath) => {
      let cleanPath = fullPath
        .replace(/\/index(\.tsx?)?$/, "")
        .replace(/\.tsx?$/, "");
      const parts = cleanPath.split("/").filter(Boolean);
      const flatSlug = parts[parts.length - 1];
      if (flatSlug !== "index" && flatSlug !== currentSlug) {
        internalDeps.add(flatSlug);
      }
      return `from "@/components/venumity/${flatSlug === "index" ? currentSlug : flatSlug}"`;
    },
  );

  // 2. Rewrite relative imports
  const selfTarget = `@/components/venumity/${currentSlug}`;
  out = out.replace(
    /from\s+["']((?:\.\.?\/)+)([^"']+)["']/g,
    (_match, prefix, importPath) => {
      const parts = importPath.split("/").filter(Boolean);
      const flatSlug = parts[parts.length - 1];

      // Skip if importing index of the same file
      if (flatSlug === "index") {
        return `from "${selfTarget}"`;
      }

      if (flatSlug === currentSlug) {
        return `from "${selfTarget}"`;
      }

      internalDeps.add(flatSlug);
      return `from "@/components/venumity/${flatSlug}"`;
    },
  );

  return { code: out, internalDeps: Array.from(internalDeps) };
}

// ============================================================
// PACKAGE MANAGER DETECTION
// ============================================================
let _yarnMajor = null;
function yarnMajor() {
  if (_yarnMajor !== null) return _yarnMajor;
  try {
    const v = execSync("yarn --version", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    _yarnMajor = parseInt(v.split(".")[0], 10) || 1;
  } catch {
    _yarnMajor = 1;
  }
  return _yarnMajor;
}

function detectPackageManager(cwd) {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (
    fs.existsSync(path.join(cwd, "bun.lockb")) ||
    fs.existsSync(path.join(cwd, "bun.lock"))
  )
    return "bun";
  if (fs.existsSync(path.join(cwd, "package-lock.json"))) return "npm";

  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("pnpm")) return "pnpm";
  if (ua.startsWith("yarn")) return "yarn";
  if (ua.startsWith("bun")) return "bun";
  if (ua.startsWith("npm")) return "npm";

  return "npm";
}

// ============================================================
// COMMAND BUILDERS
// ============================================================
function getInstallCmd(pm) {
  switch (pm) {
    case "pnpm":
      return "pnpm add";
    case "yarn":
      return "yarn add";
    case "bun":
      return "bun add";
    default:
      return "npm install";
  }
}

function getShadcnCmd(pm, args) {
  const a = args.join(" ");
  if (pm === "pnpm") return `pnpm dlx shadcn@latest ${a}`;
  if (pm === "bun") return `bunx shadcn@latest ${a}`;
  if (pm === "yarn") {
    return yarnMajor() >= 2
      ? `yarn dlx shadcn@latest ${a}`
      : `npx shadcn@latest ${a}`;
  }
  return `npx shadcn@latest ${a}`;
}

function getCreateNextAppCmd(pm, projectName, tsFlag) {
  const args = `${projectName} ${tsFlag} --tailwind --app --no-eslint --import-alias "@/*" --yes`;
  if (pm === "pnpm") return `pnpm dlx create-next-app@latest ${args}`;
  if (pm === "bun") return `bunx create-next-app@latest ${args}`;
  if (pm === "yarn") {
    return yarnMajor() >= 2
      ? `yarn dlx create-next-app@latest ${args}`
      : `npx create-next-app@latest ${args}`;
  }
  return `npx create-next-app@latest ${args}`;
}

function getRunCmd(pm, script) {
  if (pm === "pnpm") return `pnpm ${script}`;
  if (pm === "bun") return `bun run ${script}`;
  if (pm === "yarn") return `yarn ${script}`;
  return `npm run ${script}`;
}

function getCliInvokeCmd(pm) {
  if (pm === "pnpm") return "pnpm dlx venumityui@latest";
  if (pm === "bun") return "bunx venumityui@latest";
  if (pm === "yarn") {
    return yarnMajor() >= 2
      ? "yarn dlx venumityui@latest"
      : "npx venumityui@latest";
  }
  return "npx venumityui@latest";
}

// ============================================================
// STREAMED EXEC
// ============================================================
function runStreamed(cmd, cwd, label) {
  return new Promise((resolve, reject) => {
    if (label) console.log(chalk.gray(`   ${cmd}`));

    const child = spawn(cmd, {
      cwd,
      shell: true,
      stdio: "inherit",
      env: { ...process.env, CI: "true", FORCE_COLOR: "1" },
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command exited with code ${code}`));
    });
  });
}

// ============================================================
// HEADER
// ============================================================
function printHeader() {
  const venumityGradient = gradient(
    "#ffedd5",
    "#fed7aa",
    "#fdba74",
    "#fb923c",
    "#f97316",
    "#ea580c",
  );
  console.log(
    venumityGradient(`
╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ██╗   ██╗███████╗███╗   ██╗██╗   ██╗███╗   ███╗██╗████████╗██╗   ██╗  ║
║  ██║   ██║██╔════╝████╗  ██║██║   ██║████╗ ████║██║╚══██╔══╝╚██╗ ██╔╝  ║
║  ██║   ██║█████╗  ██╔██╗ ██║██║   ██║██╔████╔██║██║   ██║    ╚████╔╝   ║
║  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██║   ██║██║╚██╔╝██║██║   ██║     ╚██╔╝    ║
║   ╚████╔╝ ███████╗██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██║   ██║      ██║     ║
║    ╚═══╝  ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═╝   ╚═╝      ╚═╝     ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
`),
  );
  console.log(chalk.cyan.bold(`📦 Venumity UI CLI v${pkg.version}`));
  console.log(
    chalk.dim("└─ Production-ready UI components • https://ui.venumity.com\n"),
  );
}

// ============================================================
// UTILS
// ============================================================
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ============================================================
// API — REGISTRY FETCH
// ============================================================
async function fetchRegistry() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/registry/components`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const raw = data.components || [];

    const byKey = new Map();

    for (const entry of raw) {
      const isPrimitive = entry.type === "primitive";
      const registryType = isPrimitive ? "primitives" : "components";

      const categorySlug = toKebabCase(entry.category || "");
      const subcategorySlug = toKebabCase(entry.subcategory || "");
      if (!categorySlug || !subcategorySlug) continue;

      const key = `${registryType}:${categorySlug}:${subcategorySlug}`;

      if (!byKey.has(key)) {
        byKey.set(key, {
          name: subcategorySlug,
          displayName: entry.subcategory,
          category: entry.category,
          categorySlug,
          subcategory: entry.subcategory,
          subcategorySlug,
          type: isPrimitive ? "primitive" : "component",
          registryType,
          variants: [],
          variantNames: [],
        });
      }

      const bucket = byKey.get(key);
      if (entry.slug && !bucket.variants.includes(entry.slug)) {
        bucket.variants.push(entry.slug);
      }
      if (
        entry.displayName &&
        !bucket.variantNames.includes(entry.displayName)
      ) {
        bucket.variantNames.push(entry.displayName);
      }
    }

    return Array.from(byKey.values());
  } catch (error) {
    console.log(chalk.yellow(`⚠️  Could not fetch registry: ${error.message}`));
    return [];
  }
}

// ============================================================
// API — SOURCE FETCH
// ============================================================
async function fetchSource(entry, variantSlug) {
  // 1. If a specific variant is requested, fetch that single file
  if (variantSlug) {
    const params = new URLSearchParams({
      action: "cli-source",
      category: entry.categorySlug,
      subcategory: entry.subcategorySlug,
      item: variantSlug,
    });
    const res = await fetch(`${API_BASE_URL}/api/components?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { mainCode: data.code, files: data.files || [] };
  }

  // 2. Fetch the whole subcategory via cli-list
  const params = new URLSearchParams({
    action: "cli-list",
    category: entry.categorySlug,
    subcategory: entry.subcategorySlug,
  });

  const res = await fetch(`${API_BASE_URL}/api/components?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  if (!data.components || data.components.length === 0) {
    throw new Error("No components found in this subcategory");
  }

  if (data.components.length === 1) {
    const comp = data.components[0];
    return {
      mainCode: comp.code,
      files: comp.isFolder ? comp.files || [] : [],
    };
  }

  // Multiple items in the subcategory: put the first as main, others as files
  return {
    mainCode: data.components[0].code,
    files: data.components
      .slice(1)
      .flatMap((c) =>
        c.isFolder
          ? c.files || []
          : [{ path: `${c.name}.tsx`, content: c.code }],
      ),
  };
}

// ============================================================
// PROJECT HELPERS
// ============================================================
async function detectProject(cwd) {
  const packageJsonPath = path.join(cwd, "package.json");
  const hasPackageJson = fs.existsSync(packageJsonPath);

  if (!hasPackageJson) {
    const items = fs.readdirSync(cwd);
    for (const item of items) {
      const itemPath = path.join(cwd, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const subPackageJson = path.join(itemPath, "package.json");
        if (fs.existsSync(subPackageJson)) {
          return {
            hasPackageJson: true,
            hasTypeScript: fs.existsSync(path.join(itemPath, "tsconfig.json")),
            hasSrc: fs.existsSync(path.join(itemPath, "src")),
            hasApp: fs.existsSync(path.join(itemPath, "app")),
            cwd: itemPath,
            isSubDirectory: true,
            projectName: item,
          };
        }
      }
    }
    return {
      hasPackageJson: false,
      hasTypeScript: false,
      hasSrc: false,
      hasApp: false,
      cwd,
    };
  }

  let packageJson = {};
  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  } catch {
    packageJson = { name: "unknown-project" };
  }

  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  const hasTypeScript =
    fs.existsSync(path.join(cwd, "tsconfig.json")) || !!deps.typescript;
  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  const hasApp = fs.existsSync(path.join(cwd, "app"));

  return { hasPackageJson: true, hasTypeScript, hasSrc, hasApp, cwd };
}

function setupProjectFiles(cwd) {
  const componentsJson = {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    rsc: false,
    tsx: true,
    tailwind: {
      config: "tailwind.config.js",
      css: "app/globals.css",
      baseColor: "neutral",
      cssVariables: true,
      prefix: "",
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
    iconLibrary: "lucide",
  };

  fs.writeFileSync(
    path.join(cwd, "components.json"),
    JSON.stringify(componentsJson, null, 2),
  );

  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  const baseDir = hasSrc ? "src" : "";

  const libDir = path.join(cwd, baseDir, "lib");
  fs.mkdirSync(libDir, { recursive: true });

  const utilsPath = path.join(libDir, "utils.ts");
  if (!fs.existsSync(utilsPath)) {
    fs.writeFileSync(
      utilsPath,
      `import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`,
    );
  }

  const uiDir = path.join(cwd, baseDir, "components", "ui");
  fs.mkdirSync(uiDir, { recursive: true });

  return { baseDir, uiDir };
}

const CORE_DEPS = [
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  "lucide-react",
  "@radix-ui/react-slot",
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-avatar",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-context-menu",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-hover-card",
  "@radix-ui/react-label",
  "@radix-ui/react-menubar",
  "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toggle",
  "@radix-ui/react-toggle-group",
  "@radix-ui/react-tooltip",
];

// ============================================================
// CREATE NEXT.JS PROJECT
// ============================================================
async function createNextJsProjectInCurrentDir(cwd, installMotion) {
  const pm = detectPackageManager(cwd);
  console.log(chalk.cyan(`🚀 Creating Next.js project (using ${pm})...\n`));

  const files = fs.readdirSync(cwd);
  const hasFiles = files.some(
    (f) =>
      !f.startsWith(".") &&
      ![
        "package-lock.json",
        "pnpm-lock.yaml",
        "yarn.lock",
        "bun.lockb",
        "bun.lock",
        "node_modules",
      ].includes(f),
  );

  if (hasFiles) {
    const { proceed } = await inquirer.prompt([
      {
        type: "confirm",
        name: "proceed",
        message: "Current directory is not empty. Continue anyway?",
        default: false,
      },
    ]);
    if (!proceed) {
      console.log(
        chalk.yellow("💡 Create a new folder or choose a different location."),
      );
      process.exit(0);
    }
  }

  const createCmd = getCreateNextAppCmd(pm, ".", "--typescript");
  console.log(chalk.gray("   Running create-next-app...\n"));
  await runStreamed(createCmd, cwd);

  console.log(chalk.cyan("\n📦 Installing core dependencies...\n"));
  await runStreamed(`${getInstallCmd(pm)} ${CORE_DEPS.join(" ")}`, cwd);

  if (installMotion) {
    console.log(chalk.cyan("\n🎬 Installing motion...\n"));
    await runStreamed(`${getInstallCmd(pm)} motion`, cwd);
  }

  console.log(chalk.cyan("\n🔧 Configuring shadcn/ui...\n"));
  setupProjectFiles(cwd);

  console.log(chalk.green("✅ Project ready in current directory!"));
  return cwd;
}

async function createNextJsProject(projectName, cwd, installMotion) {
  const pm = detectPackageManager(cwd);
  console.log(
    chalk.cyan(`🚀 Creating Next.js project "${projectName}" (${pm})...\n`),
  );

  const createCmd = getCreateNextAppCmd(pm, projectName, "--typescript");
  await runStreamed(createCmd, cwd);

  const projectPath = path.join(cwd, projectName);

  console.log(chalk.cyan("\n📦 Installing core dependencies...\n"));
  await runStreamed(`${getInstallCmd(pm)} ${CORE_DEPS.join(" ")}`, projectPath);

  if (installMotion) {
    console.log(chalk.cyan("\n🎬 Installing motion...\n"));
    await runStreamed(`${getInstallCmd(pm)} motion`, projectPath);
  }

  console.log(chalk.cyan("\n🔧 Configuring shadcn/ui...\n"));
  setupProjectFiles(projectPath);

  console.log(chalk.green(`✅ Project "${projectName}" ready!`));
  return projectPath;
}

// ============================================================
// DEPENDENCY DETECTION
// ============================================================
const SHADCN_BASE_MAP = {
  "card-content": "card",
  "card-header": "card",
  "card-footer": "card",
  "card-title": "card",
  "card-description": "card",
  "avatar-image": "avatar",
  "avatar-fallback": "avatar",
  "chart-tooltip": "chart",
  "chart-container": "chart",
  "chart-tooltip-content": "chart",
  "chart-tooltip-item": "chart",
  "chart-legend": "chart",
  "chart-grid": "chart",
};

const KNOWN_NPM_PACKAGES = {
  recharts: "recharts",
  "date-fns": "date-fns",
  "react-hook-form": "react-hook-form",
  "@hookform/resolvers": "@hookform/resolvers",
  zod: "zod",
  "react-query": "@tanstack/react-query",
  axios: "axios",
  swr: "swr",
  "next-auth": "next-auth",
  bcryptjs: "bcryptjs",
  jsonwebtoken: "jsonwebtoken",
  "react-hot-toast": "react-hot-toast",
  sonner: "sonner",
  "react-toastify": "react-toastify",
  "next-themes": "next-themes",
  "framer-motion": "motion",
  motion: "motion",
};

function detectShadcnDependencies(code, sourceSlug) {
  const deps = [];
  const importRegex =
    /import\s+.*?\s+from\s+['"]@\/components\/ui\/([^"']+)['"]/g;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const comp = match[1]
      .replace(/\.tsx$/, "")
      .replace(/\.jsx$/, "")
      .replace(/\/index$/, "");
    if (comp) {
      const baseComp = SHADCN_BASE_MAP[comp] || comp;
      if (!deps.includes(baseComp)) {
        deps.push(baseComp);
        if (sourceSlug) {
          console.log(`  ℹ️  ${sourceSlug} needs shadcn/ui/${baseComp}`);
        }
      }
    }
  }
  return deps;
}

function detectNpmDependencies(code) {
  const deps = [];
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const importPath = match[1];
    if (
      !importPath.startsWith(".") &&
      !importPath.startsWith("@/") &&
      !importPath.startsWith("/")
    ) {
      let packageName = importPath.split("/")[0];
      if (importPath.startsWith("@") && importPath.includes("/")) {
        packageName = importPath.split("/")[0] + "/" + importPath.split("/")[1];
      }
      const skipPackages = [
        "react",
        "react-dom",
        "next",
        "typescript",
        "tailwindcss",
        "postcss",
        "cn", // ← internal utility
        "clsx",
        "tailwind-merge",
      ];
      if (
        !skipPackages.includes(packageName) &&
        !skipPackages.includes(packageName.split("/")[0])
      ) {
        const mappedName = KNOWN_NPM_PACKAGES[packageName] || packageName;
        if (!deps.includes(mappedName)) deps.push(mappedName);
      }
    }
  }
  return deps;
}

async function installNpmDependencies(deps, cwd, pm) {
  if (!deps || deps.length === 0) return [];
  console.log(
    chalk.cyan(
      `\n📦 Installing ${deps.length} dependencies via ${pm}: ${deps.join(", ")}\n`,
    ),
  );
  try {
    await runStreamed(`${getInstallCmd(pm)} ${deps.join(" ")}`, cwd);
    console.log(chalk.green("\n✅ Dependencies installed"));
    return [];
  } catch {
    console.log(
      chalk.yellow(
        `\n  ⚠️  Try manually: ${getInstallCmd(pm)} ${deps.join(" ")}\n`,
      ),
    );
    return deps;
  }
}

async function installShadcnComponents(deps, cwd, pm) {
  if (!deps || deps.length === 0) return [];
  const failed = [];
  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  const baseDir = hasSrc ? "src" : "";
  const uiDir = path.join(cwd, baseDir, "components", "ui");
  fs.mkdirSync(uiDir, { recursive: true });

  for (const dep of deps) {
    const depPath = path.join(uiDir, `${dep}.tsx`);
    if (fs.existsSync(depPath)) continue;
    try {
      await runStreamed(getShadcnCmd(pm, ["add", dep, "--yes"]), cwd);
    } catch {
      failed.push(dep);
    }
  }
  return failed;
}

function showSuccessMessage(installed, projectDir, pm) {
  const installCmd = getCliInvokeCmd(pm);
  const runCmd = getRunCmd(pm, "dev");
  const listCmd = `${installCmd} list`;

  const content = [
    chalk.green.bold("🎉 Installation Completed!"),
    chalk.dim("\n🚀 Explore it • ⚡ Use it • 📣 Share it\n"),
    chalk.white(
      `${installed.length} file${installed.length === 1 ? "" : "s"} installed into components/venumity/`,
    ),
    chalk.dim("─".repeat(80)),
    chalk.bold("📦 Installed:"),
    installed
      .map(
        (i) =>
          `  • ${chalk.cyan(`components/venumity/${i.slug}.tsx`)} ${chalk.gray(`[${i.registryType}${i.isVariant ? "/variant" : ""}]`)}`,
      )
      .join("\n"),
    chalk.dim("─".repeat(80)),
    chalk.bold("🚀 What's Next?"),
    chalk.dim("─".repeat(80)),
    `  1. Start dev server : ${chalk.cyan(runCmd)}`,
    `  2. Import           : ${chalk.cyan(`import { ... } from "@/components/venumity/<slug>"`)}`,
    `  3. Add more         : ${chalk.cyan(`${installCmd} add <slug>`)}`,
    `  4. See all          : ${chalk.cyan(listCmd)}`,
    chalk.dim("─".repeat(80)),
    chalk.dim("💡 Detected package manager: ") + chalk.cyan(pm),
    chalk.dim("💡 Need help? ") +
      chalk.cyan(`${installCmd} --help`) +
      chalk.dim(" or visit: ") +
      chalk.cyan("https://ui.venumity.com"),
    chalk.dim("─".repeat(80)),
    chalk.dim("\n✨ Happy Coding ✨"),
  ]
    .filter((line) => line !== "")
    .join("\n");

  console.log(
    boxen(content, { padding: 1, borderStyle: "round", borderColor: "green" }),
  );
}

function resolveInput(input, registry) {
  const search = toKebabCase(input);

  let match = registry.find((c) => c.name === search);
  if (match)
    return { entry: match, matchedBy: "subcategory-slug", variantSlug: null };

  match = registry.find((c) => toKebabCase(c.displayName) === search);
  if (match)
    return { entry: match, matchedBy: "subcategory-name", variantSlug: null };

  match = registry.find((c) => c.variants.includes(search));
  if (match)
    return { entry: match, matchedBy: "variant-slug", variantSlug: search };

  match = registry.find((c) =>
    c.variantNames.some((n) => toKebabCase(n) === search),
  );
  if (match) {
    const vName = match.variantNames.find((n) => toKebabCase(n) === search);
    return {
      entry: match,
      matchedBy: "variant-name",
      variantSlug: toKebabCase(vName),
    };
  }

  match = registry.find(
    (c) =>
      c.name.includes(search) || toKebabCase(c.displayName).includes(search),
  );
  if (match) return { entry: match, matchedBy: "fuzzy", variantSlug: null };

  match = registry.find((c) => c.variants.some((v) => v.includes(search)));
  if (match) {
    const vSlug = match.variants.find((v) => v.includes(search));
    return { entry: match, matchedBy: "fuzzy-variant", variantSlug: vSlug };
  }

  return { entry: null, matchedBy: null, variantSlug: null };
}

// ============================================================
// COMMAND: ADD (updated with import rewrite & auto-resolve)
// ============================================================
async function addComponentAction(inputs, options) {
  console.clear();
  printHeader();

  const registry = await fetchRegistry();
  if (!registry.length) {
    console.log(chalk.red("❌ No subcategories found in registry."));
    console.log(chalk.yellow(`💡 API URL: ${API_BASE_URL}`));
    return;
  }

  let requested = inputs || [];
  if (options.all) {
    console.log(
      chalk.blue(`\n📦 Installing all ${registry.length} subcategories...\n`),
    );
    requested = registry.map((c) => c.name);
  }

  if (requested.length === 0) {
    console.log(chalk.red("❌ Please specify at least one subcategory name."));
    console.log(
      chalk.yellow("💡 Usage: venumityui@latest add <subcategory-name>"),
    );
    return;
  }

  const resolved = [];
  const unresolved = [];

  for (const input of requested) {
    const r = resolveInput(input, registry);
    if (!r.entry) {
      unresolved.push(input);
      continue;
    }

    if (r.variantSlug && r.entry.registryType === "primitives") {
      console.log(
        chalk.yellow(
          `\n⚠️  "${input}" is a primitive variant — installing the whole subcategory "${r.entry.subcategory}" instead.`,
        ),
      );
      resolved.push({
        entry: r.entry,
        matchedBy: r.matchedBy,
        originalInput: input,
        variantSlug: null,
      });
    } else {
      resolved.push({
        entry: r.entry,
        matchedBy: r.matchedBy,
        originalInput: input,
        variantSlug: r.variantSlug,
      });
    }
  }

  if (unresolved.length > 0) {
    console.log(
      chalk.yellow(`\n⚠️  Could not resolve: ${unresolved.join(", ")}\n`),
    );
  }

  if (resolved.length === 0) {
    console.log(chalk.red("❌ Nothing to install."));
    return;
  }

  // Deduplicate
  const unique = new Map();
  for (const r of resolved) {
    const targetSlug = r.variantSlug || r.entry.subcategorySlug;
    const key = `${r.entry.registryType}:${r.entry.categorySlug}:${targetSlug}`;
    if (!unique.has(key)) unique.set(key, r);
  }
  let toInstall = Array.from(unique.values());

  // ── PROJECT DETECTION & SETUP ──
  const cwd = process.cwd();
  let projectInfo = await detectProject(cwd);
  let projectPath = cwd;

  if (projectInfo.hasPackageJson) {
    projectPath = projectInfo.cwd;
    console.log(
      chalk.green(
        `✅ Project found at: ${path.relative(cwd, projectPath) || "."}`,
      ),
    );
  } else {
    const items = fs.readdirSync(cwd);
    let foundProject = false;
    for (const item of items) {
      const itemPath = path.join(cwd, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const subPackageJson = path.join(itemPath, "package.json");
        if (fs.existsSync(subPackageJson)) {
          projectPath = itemPath;
          foundProject = true;
          console.log(chalk.green(`✅ Project found at: ${item}`));
          break;
        }
      }
    }

    if (!foundProject) {
      console.log(
        chalk.yellow(
          "🆕 No existing project found. Creating a new project...\n",
        ),
      );
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Where would you like to create the project?",
          default: "my-app",
        },
        {
          type: "confirm",
          name: "installMotion",
          message: "Install motion for animations?",
          default: true,
        },
      ]);

      if (answers.projectName === ".") {
        projectPath = cwd;
        await createNextJsProjectInCurrentDir(cwd, answers.installMotion);
      } else {
        projectPath = await createNextJsProject(
          answers.projectName,
          cwd,
          answers.installMotion,
        );
      }

      process.chdir(projectPath);
      projectInfo = await detectProject(projectPath);
    }
  }

  const pm = detectPackageManager(projectPath);
  console.log(chalk.gray(`🔧 Using package manager: ${pm}\n`));

  const hasSrc = fs.existsSync(path.join(projectPath, "src"));
  const baseDir = hasSrc ? "src" : "";
  const venumityDir = path.join(projectPath, baseDir, "components", "venumity");
  fs.mkdirSync(venumityDir, { recursive: true });

  const installedSummaries = [];
  const allShadcnDeps = new Set();
  const allNpmDeps = new Set();

  // ── ITERATIVE INSTALLATION (Handles auto-discovered primitives) ──
  const installedSlugs = new Set();
  const installQueue = [...toInstall];

  while (installQueue.length > 0) {
    const { entry, variantSlug } = installQueue.shift();
    const targetSlug = variantSlug || entry.subcategorySlug;

    if (installedSlugs.has(targetSlug)) continue;
    installedSlugs.add(targetSlug);

    const targetFile = path.join(venumityDir, `${targetSlug}.tsx`);
    const spinner = ora(`Fetching ${targetSlug}...`).start();

    try {
      let { mainCode, files } = await fetchSource(entry, variantSlug);

      const { code: rewrittenCode, internalDeps } = processImports(
        mainCode,
        targetSlug,
      );

      fs.writeFileSync(targetFile, rewrittenCode, "utf8");

      // Write additional files (nested folder contents)
      for (const file of files) {
        const filePath = path.join(venumityDir, file.path);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        const { code: rewrittenFileCode } = processImports(
          file.content,
          targetSlug,
        );
        fs.writeFileSync(filePath, rewrittenFileCode, "utf8");
      }

      // ✅ Auto-resolve internal primitives imported by this component
      for (const dep of internalDeps) {
        // If we haven't already installed it, find it in the registry
        if (!installedSlugs.has(dep)) {
          const depEntry = registry.find(
            (c) =>
              c.name === dep ||
              c.subcategorySlug === dep ||
              toKebabCase(c.displayName) === dep,
          );
          if (depEntry) {
            installQueue.push({ entry: depEntry, variantSlug: null });
            spinner.info(
              chalk.blue(`Auto-discovered dependency: ${dep} (queued)`),
            );
            spinner.start(`Fetching ${targetSlug}...`);
          } else {
            console.log(
              chalk.yellow(
                `  ⚠️  Could not find primitive "${dep}" in registry. You may need to install it manually.`,
              ),
            );
          }
        }
      }

      // Extract shadcn and npm dependencies from the *rewritten* code
      const shadcnDeps = detectShadcnDependencies(rewrittenCode, targetSlug);
      const npmDeps = detectNpmDependencies(rewrittenCode);
      shadcnDeps.forEach((d) => allShadcnDeps.add(d));
      npmDeps.forEach((d) => allNpmDeps.add(d));

      spinner.succeed(chalk.green(`${targetSlug}.tsx installed`));
      installedSummaries.push({
        slug: targetSlug,
        registryType: entry.registryType,
        isVariant: !!variantSlug,
      });
    } catch (err) {
      spinner.fail(`Failed to install ${targetSlug}: ${err.message}`);
    }
  }

  // ── Install npm and shadcn dependencies
  if (allNpmDeps.size > 0) {
    await installNpmDependencies(Array.from(allNpmDeps), projectPath, pm);
  }
  if (allShadcnDeps.size > 0) {
    await installShadcnComponents(Array.from(allShadcnDeps), projectPath, pm);
  }

  if (installedSummaries.length > 0) {
    showSuccessMessage(installedSummaries, projectPath, pm);
  } else {
    console.log(chalk.red("❌ Nothing was installed."));
  }
}

// ============================================================
// COMMAND: LIST
// ============================================================
async function listComponentsAction(options) {
  console.clear();
  printHeader();

  try {
    let registry = await fetchRegistry();
    if (!registry.length) {
      console.log(
        chalk.yellow(
          "⚠️  No subcategories found. Make sure the API is running.",
        ),
      );
      console.log(chalk.dim(`\n💡 API URL: ${API_BASE_URL}`));
      return;
    }

    if (options && options.type) {
      const t = options.type === "primitive" ? "primitives" : "components";
      registry = registry.filter((c) => c.registryType === t);
    }

    if (options && options.category) {
      const catSlug = toKebabCase(options.category);
      registry = registry.filter((c) => c.categorySlug === catSlug);
    }

    const byCategory = new Map();
    for (const entry of registry) {
      const key = `${entry.registryType}:${entry.categorySlug}`;
      if (!byCategory.has(key)) {
        byCategory.set(key, {
          category: entry.category,
          registryType: entry.registryType,
          items: [],
        });
      }
      byCategory.get(key).items.push(entry);
    }

    console.log(
      chalk.bold(`\n📦 Available Subcategories (${registry.length} total):\n`),
    );

    const sorted = Array.from(byCategory.values()).sort((a, b) =>
      a.category.localeCompare(b.category),
    );

    for (const group of sorted) {
      const badge =
        group.registryType === "primitives"
          ? chalk.bgBlue.white.bold(" PRIMITIVE ")
          : chalk.bgMagenta.white.bold(" COMPONENT ");
      console.log(`${badge} ${chalk.green.bold(group.category)}`);

      group.items
        .sort((a, b) => a.subcategory.localeCompare(b.subcategory))
        .forEach((item) => {
          const variantHint =
            item.variants.length > 0
              ? chalk.dim(
                  ` (${item.variants.length} variant${item.variants.length === 1 ? "" : "s"})`,
                )
              : "";
          console.log(
            `  ${chalk.cyan("•")} ${chalk.white(item.displayName)}${variantHint}`,
          );
          console.log(`     ${chalk.dim(`add ${item.name}`)}`);
        });
      console.log("");
    }

    console.log(
      chalk.dim(`💡 Add: venumityui@latest add <subcategory-or-variant-slug>`),
    );
  } catch (error) {
    console.log(chalk.red(`❌ Error: ${error.message}`));
  }
}

// ============================================================
// COMMAND: SEARCH
// ============================================================
async function searchComponentsAction(query) {
  console.clear();
  printHeader();

  try {
    const registry = await fetchRegistry();
    const q = query.toLowerCase();

    const results = registry.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        toKebabCase(c.displayName).includes(q) ||
        c.variants.some((v) => v.includes(q)) ||
        c.variantNames.some((n) => toKebabCase(n).includes(q)) ||
        c.category.toLowerCase().includes(q),
    );

    if (!results.length) {
      console.log(chalk.yellow(`❌ No subcategories found for "${query}"`));
      return;
    }

    console.log(
      chalk.green(
        `\n✅ Found ${results.length} subcategor${results.length === 1 ? "y" : "ies"} matching "${query}":\n`,
      ),
    );

    for (const entry of results) {
      const badge =
        entry.registryType === "primitives"
          ? chalk.bgBlue.white.bold(" PRIMITIVE ")
          : chalk.bgMagenta.white.bold(" COMPONENT ");

      console.log(`${badge} ${chalk.bold(entry.displayName)}`);
      console.log(
        `  ${chalk.dim(`Category: ${entry.category} | Add: ${entry.name}`)}`,
      );

      if (entry.variants.length > 0) {
        const matchedVariants = entry.variants.filter((v) => v.includes(q));
        if (matchedVariants.length > 0 && entry.registryType === "components") {
          console.log(
            `  ${chalk.dim(`Matched variants: ${matchedVariants.join(", ")}`)}`,
          );
        }
      }
      console.log("");
    }
  } catch (error) {
    console.log(chalk.red(`❌ Error: ${error.message}`));
  }
}

// ============================================================
// COMMAND: INFO
// ============================================================
async function infoComponentAction(input) {
  console.clear();
  printHeader();

  try {
    const registry = await fetchRegistry();
    const { entry, variantSlug } = resolveInput(input, registry);

    if (!entry) {
      console.log(chalk.red(`❌ "${input}" not found.`));
      console.log(
        chalk.yellow(
          '💡 Run "venumityui list" to see all available subcategories.',
        ),
      );
      return;
    }

    console.log(chalk.bold(`\n📋 Information\n`));
    console.log(`${chalk.green("Subcategory:")} ${entry.displayName}`);
    console.log(`${chalk.green("Registry:")} ${entry.registryType}`);
    console.log(`${chalk.green("Category:")} ${entry.category}`);
    console.log(`${chalk.green("Slug:")} ${entry.name}`);

    if (variantSlug) {
      console.log(`${chalk.yellow("Resolved from variant:")} ${variantSlug}`);
      console.log(
        `${chalk.dim("Install:")} ${chalk.cyan(`venumityui add ${variantSlug}`)}`,
      );
    }

    if (entry.variantNames.length > 0) {
      console.log(`\n${chalk.green("Variants:")}`);
      entry.variantNames.forEach((v, i) => {
        const slug = entry.variants[i] || toKebabCase(v);
        console.log(`  • ${v} ${chalk.dim(`(${slug})`)}`);
      });
      if (entry.registryType === "primitives") {
        console.log(
          chalk.dim(
            `\n  ⚠️  Variants can only be installed for components. Primitives always install the full subcategory.`,
          ),
        );
      } else {
        console.log(
          chalk.dim(
            `\n  💡 Install a single variant: venumityui add <variant-slug>`,
          ),
        );
      }
    }

    console.log(
      `\n${chalk.dim("💡 Install full subcategory: venumityui add " + entry.name)}`,
    );
  } catch (error) {
    console.log(chalk.red(`❌ Error: ${error.message}`));
  }
}

// ============================================================
// COMMAND: CATEGORIES
// ============================================================
async function categoriesAction() {
  console.clear();
  printHeader();

  try {
    const registry = await fetchRegistry();
    const byTypeAndCategory = new Map();

    for (const entry of registry) {
      const key = `${entry.registryType}:${entry.category}`;
      byTypeAndCategory.set(key, (byTypeAndCategory.get(key) || 0) + 1);
    }

    console.log(
      chalk.bold(`\n📂 Available Categories (${byTypeAndCategory.size}):\n`),
    );

    const primitives = [];
    const components = [];

    for (const [key, count] of byTypeAndCategory.entries()) {
      const [type, category] = key.split(":");
      if (type === "primitives") primitives.push({ category, count });
      else components.push({ category, count });
    }

    if (primitives.length > 0) {
      console.log(chalk.bgBlue.white.bold(" PRIMITIVES "));
      primitives
        .sort((a, b) => a.category.localeCompare(b.category))
        .forEach((p) => {
          console.log(
            `  ${chalk.green(p.category)}: ${chalk.gray(`${p.count} subcategor${p.count === 1 ? "y" : "ies"}`)}`,
          );
        });
      console.log("");
    }

    if (components.length > 0) {
      console.log(chalk.bgMagenta.white.bold(" COMPONENTS "));
      components
        .sort((a, b) => a.category.localeCompare(b.category))
        .forEach((p) => {
          console.log(
            `  ${chalk.green(p.category)}: ${chalk.gray(`${p.count} subcategor${p.count === 1 ? "y" : "ies"}`)}`,
          );
        });
      console.log("");
    }

    console.log(
      chalk.dim(
        `💡 List a category: venumityui list --category <category-slug>`,
      ),
    );
  } catch (error) {
    console.log(chalk.red(`❌ Error: ${error.message}`));
  }
}

// ============================================================
// COMMAND: SUBCATEGORY
// ============================================================
async function subcategoryAction(category) {
  console.clear();
  printHeader();

  try {
    const registry = await fetchRegistry();
    const catSlug = toKebabCase(category);
    const items = registry.filter((c) => c.categorySlug === catSlug);

    if (!items.length) {
      console.log(
        chalk.yellow(`❌ No subcategories found for category "${category}"`),
      );
      console.log(
        chalk.yellow('💡 Run "venumityui categories" to see all categories.'),
      );
      return;
    }

    console.log(
      chalk.bold(
        `\n📂 Subcategories in "${items[0].category}" (${items.length}):\n`,
      ),
    );

    items
      .sort((a, b) => a.subcategory.localeCompare(b.subcategory))
      .forEach((item) => {
        const badge =
          item.registryType === "primitives"
            ? chalk.bgBlue.white.bold(" P ")
            : chalk.bgMagenta.white.bold(" C ");
        const variantHint =
          item.variants.length > 0
            ? chalk.dim(` (${item.variants.length} variants)`)
            : "";
        console.log(`${badge} ${chalk.green(item.displayName)}${variantHint}`);
        if (item.variantNames.length > 0) {
          item.variantNames.forEach((v, i) => {
            const slug = item.variants[i] || toKebabCase(v);
            console.log(`    • ${chalk.dim(v)} ${chalk.gray(`(${slug})`)}`);
          });
        }
      });

    console.log(
      `\n${chalk.dim("💡 To add: venumityui add <subcategory-or-variant-slug>")}`,
    );
  } catch (error) {
    console.log(chalk.red(`❌ Error: ${error.message}`));
  }
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  const program = new Command();

  program
    .name("venumityui")
    .description("✨ Install beautiful, production-ready UI components")
    .version(pkg.version, "-v, --version", "Show version")
    .usage("<command> [options]")
    .helpOption("-h, --help", "Show help");

  program
    .command("add [names...]")
    .description(
      "Add subcategories (primitives + components) or single component variants",
    )
    .option("-o, --overwrite", "Overwrite existing files")
    .option("--all", "Install all available subcategories")
    .action(addComponentAction);

  program
    .command("list")
    .description("List all available subcategories")
    .option("-c, --category <category>", "Filter by category")
    .option("-t, --type <type>", "Filter by type: primitive | component")
    .action(listComponentsAction);

  program
    .command("search <query>")
    .description("Search for subcategories or variants")
    .action(searchComponentsAction);

  program
    .command("info <name>")
    .description("Show detailed information about a subcategory or variant")
    .action(infoComponentAction);

  program
    .command("categories")
    .description("List all available categories")
    .action(categoriesAction);

  program
    .command("subcategory <category>")
    .description("List subcategories for a given category")
    .action(subcategoryAction);

  program.on("--help", () => {
    console.log(chalk.cyan.bold("\n📚 Examples (npm):"));
    console.log(chalk.dim("━".repeat(60)));
    console.log(`  ${chalk.green("$")} npx venumityui@latest add accordion`);
    console.log(
      `  ${chalk.green("$")} npx venumityui@latest add chat-card-suggestion`,
    );
    console.log(`  ${chalk.green("$")} npx venumityui@latest list`);
    console.log(
      `  ${chalk.green("$")} npx venumityui@latest list --type primitive`,
    );
    console.log(`  ${chalk.green("$")} npx venumityui@latest search accordion`);
    console.log(chalk.dim("━".repeat(60)));
    console.log(chalk.cyan.bold("\n📁 Installation paths:"));
    console.log(chalk.dim("━".repeat(60)));
    console.log(
      `  Subcategory : ${chalk.cyan("components/venumity/<subcategory-slug>.tsx")}`,
    );
    console.log(
      `  Variant     : ${chalk.cyan("components/venumity/<variant-slug>.tsx")} ${chalk.dim("(components only)")}`,
    );
    console.log(`  shadcn deps : ${chalk.cyan("components/ui/*.tsx")}`);
    console.log(chalk.dim("━".repeat(60)));
    console.log(chalk.dim("\n📖 Documentation: https://ui.venumity.com/cli\n"));
  });

  try {
    program.parse(process.argv);
  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    process.exit(1);
  }

  if (!process.argv.slice(2).length) {
    printHeader();
    program.help();
  }
}

main().catch((error) => {
  console.error(chalk.red("\n❌ Unexpected error:"));
  console.error(chalk.dim(error.message));
  process.exit(1);
});
