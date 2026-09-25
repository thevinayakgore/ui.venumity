#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import gradient from "gradient-string";
import inquirer from "inquirer";
import ora from "ora";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync, spawn } from "child_process";
import boxen from "boxen";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"),
);

const API_BASE_URL = "https://ui.venumity.com";

// ============================================================
// YARN VERSION DETECTION (cached)
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

// ============================================================
// PACKAGE MANAGER DETECTION
//   Priority:
//     1. Lock files in the target project (source of truth)
//     2. User agent (how the CLI was invoked)
//     3. Fallback: npm
// ============================================================
function detectPackageManager(cwd) {
  // 1. Lock files — this is what the project actually uses
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (
    fs.existsSync(path.join(cwd, "bun.lockb")) ||
    fs.existsSync(path.join(cwd, "bun.lock"))
  )
    return "bun";
  if (fs.existsSync(path.join(cwd, "package-lock.json"))) return "npm";

  // 2. User agent — how CLI was invoked
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("pnpm")) return "pnpm";
  if (ua.startsWith("yarn")) return "yarn";
  if (ua.startsWith("bun")) return "bun";
  if (ua.startsWith("npm")) return "npm";

  // 3. Fallback
  return "npm";
}

// ============================================================
// COMMAND BUILDERS (with Yarn 1.x fallback)
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
      : `npx shadcn@latest ${a}`; // Yarn 1.x has no dlx
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
// STREAMED EXEC — used for all install commands
// Shows live output so nothing looks stuck
// ============================================================
function runStreamed(cmd, cwd, label) {
  return new Promise((resolve, reject) => {
    if (label) console.log(chalk.gray(`   ${cmd}`));

    const child = spawn(cmd, {
      cwd,
      shell: true,
      stdio: "inherit",
      env: {
        ...process.env,
        CI: "true", // force non-interactive
        FORCE_COLOR: "1",
      },
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
// API HELPERS
// ============================================================
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchRegistry() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/registry/components`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.components || [];
  } catch (error) {
    console.log(chalk.yellow(`⚠️  Could not fetch registry: ${error.message}`));
    return [];
  }
}

async function fetchComponentData(componentPath) {
  const parts = componentPath.split("/");
  if (parts.length < 4) throw new Error("Invalid path");
  const category = parts[1];
  const rest = parts.slice(2).join("/");
  const url = `${API_BASE_URL}/api/components/${category}/${rest}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
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
      `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
    );
  }

  const uiDir = path.join(cwd, baseDir, "components", "ui");
  fs.mkdirSync(uiDir, { recursive: true });

  return { baseDir, uiDir };
}

// Core deps installed in every fresh project
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
// CREATE NEXT.JS PROJECT — in current dir
// ============================================================
async function createNextJsProjectInCurrentDir(cwd, installMotion) {
  const pm = detectPackageManager(cwd);
  console.log(chalk.cyan(`🚀 Creating Next.js project (using ${pm})...\n`));

  const files = fs.readdirSync(cwd);
  const hasFiles = files.some(
    (f) =>
      !f.startsWith(".") &&
      f !== "package-lock.json" &&
      f !== "pnpm-lock.yaml" &&
      f !== "yarn.lock" &&
      f !== "bun.lockb" &&
      f !== "bun.lock" &&
      f !== "node_modules",
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

// ============================================================
// CREATE NEXT.JS PROJECT — in subfolder
// ============================================================
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
};

function detectShadcnDependencies(code) {
  const deps = [];
  const importRegex =
    /import\s+.*?\s+from\s+['"]@\/components\/ui\/([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const comp = match[1]
      .replace(/\.tsx$/, "")
      .replace(/\.jsx$/, "")
      .replace(/\/index$/, "");
    if (comp && !deps.includes(comp)) {
      const baseComp = SHADCN_BASE_MAP[comp] || comp;
      if (!deps.includes(baseComp)) deps.push(baseComp);
    }
  }
  const patterns = [
    "Button",
    "Card",
    "Avatar",
    "Badge",
    "Chart",
    "Dialog",
    "DropdownMenu",
  ];
  for (const p of patterns) {
    if (code.includes(p)) {
      const kebab = p
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()
        .replace(/^-/, "");
      if (!deps.includes(kebab)) deps.push(kebab);
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

function scanFilesForDependencies(files) {
  const shadcnDeps = new Set();
  const npmDeps = new Set();

  for (const file of files) {
    const content = file.content || file.code || "";
    if (!content) continue;
    detectShadcnDependencies(content).forEach((d) => shadcnDeps.add(d));
    detectNpmDependencies(content).forEach((d) => npmDeps.add(d));
  }

  return {
    shadcnDeps: Array.from(shadcnDeps),
    npmDeps: Array.from(npmDeps),
  };
}

// ============================================================
// INSTALL: npm dependencies (streamed)
// ============================================================
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

// ============================================================
// INSTALL: shadcn/ui components
// ============================================================
async function installShadcnComponents(deps, cwd, pm) {
  if (!deps || deps.length === 0) return [];

  const failed = [];
  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  const baseDir = hasSrc ? "src" : "";
  const uiDir = path.join(cwd, baseDir, "components", "ui");
  fs.mkdirSync(uiDir, { recursive: true });

  for (const dep of deps) {
    const depPath = path.join(uiDir, `${dep}.tsx`);
    if (fs.existsSync(depPath)) continue; // already installed

    try {
      await runStreamed(getShadcnCmd(pm, ["add", dep, "--yes"]), cwd);
    } catch {
      // Create placeholder so imports don't break
      const componentName = dep.charAt(0).toUpperCase() + dep.slice(1);
      const componentContent = `// Placeholder for ${dep}
// Install manually with: ${getShadcnCmd(pm, ["add", dep])}
import * as React from "react";

export interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {}

const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={\`flex items-center justify-center p-4 border rounded-lg \${className || ""}\`}
      {...props}
    >
      ${dep} Component
    </div>
  )
);

${componentName}.displayName = "${componentName}";

export { ${componentName} };
`;
      fs.writeFileSync(depPath, componentContent, "utf8");
      failed.push(dep);
    }
  }
  return failed;
}

// ============================================================
// SUCCESS MESSAGE
// ============================================================
function showSuccessMessage(
  displayName,
  installed,
  projectDir,
  targetDir,
  shadcnDeps,
  npmDeps,
  isFolder,
  pm,
) {
  const relativePath = path.relative(projectDir, targetDir);
  const componentName = toKebabCase(displayName);
  const importName = componentName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  let importPath;
  if (relativePath.includes("src/")) {
    importPath = `@/${relativePath.replace(/^src\//, "")}${isFolder ? "" : `/${componentName}`}`;
  } else {
    importPath = `./${relativePath}${isFolder ? "" : `/${componentName}`}`;
  }

  const installCmd = getCliInvokeCmd(pm);
  const runCmd = getRunCmd(pm, "dev");
  const listCmd = `${installCmd} list`;
  const addCmd = `${installCmd} add <component-name>`;

  const content = [
    chalk.green.bold("🎉 Installation Completed!"),
    chalk.dim("\n🚀 Explore it • ⚡ Use it • 📣 Share it\n"),
    chalk.white(`${displayName} has been successfully installed!`),
    chalk.dim("─".repeat(80)),
    chalk.bold("📦 Installed Components:"),
    installed.map((c) => `  • ${c}`).join("\n"),
    chalk.dim("─".repeat(80)),
    chalk.bold("📁 Location:"),
    chalk.cyan(`  ${relativePath}`),
    chalk.dim("─".repeat(80)),
    chalk.bold("🚀 What's Next?"),
    chalk.dim("─".repeat(80)),
    `  1. Start dev server : ${chalk.cyan(runCmd)}`,
    `  2. Import component : ${chalk.cyan(`import ${importName} from "${importPath}"`)}`,
    `  3. Add more components : ${chalk.cyan(addCmd)}`,
    `  4. See all components : ${chalk.cyan(listCmd)}`,
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
    boxen(content, {
      padding: 1,
      borderStyle: "round",
      borderColor: "green",
    }),
  );
}

// ============================================================
// COMMAND: ADD
// ============================================================
async function addComponentAction(componentNames, options) {
  console.clear();
  printHeader();

  if (options.all) {
    console.log(chalk.blue(`\n📦 Installing all components...\n`));
    try {
      const registry = await fetchRegistry();
      if (!registry.length) {
        console.log(chalk.red("❌ No components found in registry."));
        return;
      }
      componentNames = registry.map((c) => c.name);
      console.log(
        chalk.gray(`   Found ${componentNames.length} components to install`),
      );
    } catch (error) {
      console.log(chalk.red(`❌ Failed to fetch registry: ${error.message}`));
      return;
    }
  }

  if (!componentNames || componentNames.length === 0) {
    console.log(chalk.red("❌ Please specify at least one component name."));
    console.log(
      chalk.yellow("💡 Usage: venumityui@latest add <component-name>"),
    );
    console.log(chalk.yellow("💡 Or install all: venumityui@latest add --all"));
    return;
  }

  console.log(
    chalk.blue(
      `\n📦 Adding ${componentNames.length} component(s): ${componentNames.join(", ")}\n`,
    ),
  );

  try {
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
            validate: (input) => {
              if (!input) return "Project name is required";
              if (input === ".") return true;
              if (!/^[a-z0-9-]+$/.test(input)) {
                return "Project name must be lowercase, numbers, and dashes only";
              }
              return true;
            },
          },
          {
            type: "confirm",
            name: "installMotion",
            message: "Install motion (Framer Motion) for animations?",
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

    const registry = await fetchRegistry();
    if (!registry.length) {
      console.log(
        chalk.red(
          "❌ No components found in registry. Make sure the API is running.",
        ),
      );
      console.log(chalk.yellow(`💡 API URL: ${API_BASE_URL}`));
      return;
    }

    const hasSrc = fs.existsSync(path.join(projectPath, "src"));
    const baseDir = hasSrc ? "src" : "";
    const uiDir = path.join(projectPath, baseDir, "components", "ui");
    fs.mkdirSync(uiDir, { recursive: true });

    const installedComponents = [];
    const allShadcnDeps = new Set();
    const allNpmDeps = new Set();
    let isFolderComponent = false;

    for (const compName of componentNames) {
      const searchTerm = toKebabCase(compName);
      const spinner = ora(`Installing ${compName}...`).start();

      let component = registry.find((c) => c.name === searchTerm);
      if (!component) {
        component = registry.find(
          (c) =>
            c.name.includes(searchTerm) ||
            (c.displayName &&
              c.displayName.toLowerCase().includes(compName.toLowerCase())),
        );
      }

      if (!component) {
        spinner.fail(`Component "${compName}" not found.`);
        console.log(
          chalk.yellow(
            `💡 Run "venumityui list" to see all available components.`,
          ),
        );
        continue;
      }

      const displayName = component.displayName || component.name;
      spinner.text = `Downloading ${displayName}...`;

      try {
        const componentData = await fetchComponentData(component.path);

        if (
          componentData.isFolder &&
          componentData.files &&
          componentData.files.length > 0
        ) {
          isFolderComponent = true;
          const componentFolder = path.join(uiDir, component.name);
          fs.mkdirSync(componentFolder, { recursive: true });

          const allFiles = componentData.files.map((file) => ({
            content: file.content,
            path: file.path,
          }));

          const { shadcnDeps, npmDeps } = scanFilesForDependencies(allFiles);
          shadcnDeps.forEach((dep) => allShadcnDeps.add(dep));
          npmDeps.forEach((dep) => allNpmDeps.add(dep));

          for (const file of componentData.files) {
            const filePath = path.join(componentFolder, file.path);
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, file.content, "utf8");
          }

          spinner.succeed(
            chalk.green(
              `${displayName} installed (${componentData.files.length} files)`,
            ),
          );
          installedComponents.push(component.name);
        } else if (componentData.code) {
          isFolderComponent = false;
          const fileName = `${component.name}.tsx`;
          const filePath = path.join(uiDir, fileName);
          fs.writeFileSync(filePath, componentData.code, "utf8");

          const { shadcnDeps, npmDeps } = scanFilesForDependencies([
            { content: componentData.code },
          ]);
          shadcnDeps.forEach((dep) => allShadcnDeps.add(dep));
          npmDeps.forEach((dep) => allNpmDeps.add(dep));

          spinner.succeed(chalk.green(`${displayName} installed`));
          installedComponents.push(component.name);
        } else {
          spinner.fail(`Unknown component format for ${displayName}`);
        }
      } catch (err) {
        spinner.fail(`Failed to install ${displayName}: ${err.message}`);
      }
    }

    // NPM deps
    let npmDepsList = [];
    if (allNpmDeps.size > 0) {
      npmDepsList = Array.from(allNpmDeps);
      await installNpmDependencies(npmDepsList, projectPath, pm);
    }

    // shadcn deps
    let shadcnDepsList = [];
    if (allShadcnDeps.size > 0) {
      shadcnDepsList = Array.from(allShadcnDeps);
      console.log(
        chalk.cyan(`\n🎨 Installing shadcn/ui: ${shadcnDepsList.join(", ")}\n`),
      );
      const failed = await installShadcnComponents(
        shadcnDepsList,
        projectPath,
        pm,
      );
      if (failed.length === 0) {
        console.log(chalk.green("\n✅ shadcn/ui components installed"));
      } else {
        console.log(
          chalk.yellow(
            `\n⚠️  Some failed: ${failed.join(", ")}\n  Try: ${getShadcnCmd(pm, ["add", failed.join(" ")])}\n`,
          ),
        );
      }
    }

    if (installedComponents.length > 0) {
      const displayName =
        registry.find((c) => c.name === installedComponents[0])?.displayName ||
        installedComponents[0];
      showSuccessMessage(
        displayName,
        installedComponents,
        projectPath,
        uiDir,
        shadcnDepsList,
        npmDepsList,
        isFolderComponent,
        pm,
      );
    } else {
      console.log(chalk.red("❌ No components were installed."));
    }
  } catch (error) {
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
    if (error.stack) console.log(chalk.dim(error.stack));
  }
}

// ============================================================
// COMMAND: LIST
// ============================================================
async function listComponentsAction(options) {
  console.clear();
  printHeader();

  try {
    const registry = await fetchRegistry();
    if (!registry.length) {
      console.log(
        chalk.yellow("⚠️  No components found. Make sure the API is running."),
      );
      console.log(chalk.dim(`\n💡 API URL: ${API_BASE_URL}`));
      return;
    }

    let filtered = registry;
    if (options && options.category) {
      filtered = registry.filter((c) => c.category === options.category);
    }

    const grouped = new Map();
    for (const comp of filtered) {
      const key = `${comp.category}/${comp.subcategory}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(comp.displayName || comp.name);
    }

    console.log(
      chalk.bold(`\n📦 Available Components (${filtered.length} total):\n`),
    );
    for (const [group, items] of grouped.entries()) {
      console.log(chalk.green(`📁 ${group}`));
      for (const name of items) console.log(`  • ${name}`);
      console.log("");
    }
    console.log(chalk.dim("💡 To add: venumityui@latest add <component-name>"));
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
    const results = registry.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        (c.displayName &&
          c.displayName.toLowerCase().includes(query.toLowerCase())) ||
        (c.description &&
          c.description.toLowerCase().includes(query.toLowerCase())),
    );

    if (!results.length) {
      console.log(chalk.yellow(`❌ No components found for "${query}"`));
      return;
    }

    console.log(
      chalk.green(
        `\n✅ Found ${results.length} components matching "${query}":\n`,
      ),
    );
    for (const comp of results) {
      console.log(
        `${chalk.green("•")} ${chalk.bold(comp.displayName || comp.name)}`,
      );
      console.log(
        `  ${chalk.dim(`Category: ${comp.category} | Install: venumityui add ${comp.name}`)}`,
      );
    }
  } catch (error) {
    console.log(chalk.red(`❌ Error: ${error.message}`));
  }
}

// ============================================================
// COMMAND: INFO
// ============================================================
async function infoComponentAction(componentName) {
  console.clear();
  printHeader();

  try {
    const registry = await fetchRegistry();
    const comp = registry.find((c) => c.name === toKebabCase(componentName));

    if (!comp) {
      console.log(chalk.red(`❌ Component "${componentName}" not found.`));
      console.log(
        chalk.yellow(
          '💡 Run "venumityui list" to see all available components.',
        ),
      );
      return;
    }

    console.log(chalk.bold(`\n📋 Component Information\n`));
    console.log(`${chalk.green("Name:")} ${comp.displayName || comp.name}`);
    console.log(`${chalk.green("Category:")} ${comp.category}`);
    console.log(`${chalk.green("Subcategory:")} ${comp.subcategory}`);
    if (comp.description)
      console.log(`${chalk.green("Description:")} ${comp.description}`);
    if (comp.dependencies?.length)
      console.log(
        `${chalk.green("Dependencies:")} ${comp.dependencies.join(", ")}`,
      );
    console.log(`\n${chalk.dim("💡 Install: venumityui add " + comp.name)}`);
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
    const categories = new Map();
    for (const comp of registry) {
      categories.set(comp.category, (categories.get(comp.category) || 0) + 1);
    }

    console.log(
      chalk.bold(`\n📂 Available Categories (${categories.size}):\n`),
    );
    for (const [cat, count] of categories.entries()) {
      console.log(
        `  ${chalk.green(cat)}: ${chalk.gray(`${count} components`)}`,
      );
    }
    console.log(
      `\n${chalk.dim("💡 To see components: venumityui list --category <category>")}`,
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
    const comps = registry.filter((c) => c.category === category);

    if (!comps.length) {
      console.log(
        chalk.yellow(`❌ No components found for category "${category}"`),
      );
      console.log(
        chalk.yellow('💡 Run "venumityui categories" to see all categories.'),
      );
      return;
    }

    const subcategories = new Map();
    for (const comp of comps) {
      subcategories.set(
        comp.subcategory,
        (subcategories.get(comp.subcategory) || 0) + 1,
      );
    }

    console.log(
      chalk.bold(
        `\n📂 Subcategories for "${category}" (${comps.length} components):\n`,
      ),
    );
    for (const [sub, count] of subcategories.entries()) {
      console.log(
        `  ${chalk.green(sub)}: ${chalk.gray(`${count} components`)}`,
      );
      const items = comps.filter((c) => c.subcategory === sub);
      for (const item of items) {
        console.log(`    • ${item.displayName || item.name}`);
      }
    }
    console.log(`\n${chalk.dim("💡 To add: venumityui add <component-name>")}`);
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
    .command("add [components...]")
    .description("Add one or more Venumity components to your project")
    .option("-o, --overwrite", "Overwrite existing files")
    .option("--all", "Install all available components")
    .action(addComponentAction);

  program
    .command("list")
    .description("List all available components")
    .option("-c, --category <category>", "Filter by category")
    .action(listComponentsAction);

  program
    .command("search <query>")
    .description("Search for components")
    .action(searchComponentsAction);

  program
    .command("info <component>")
    .description("Show detailed information about a component")
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
    console.log(
      `  ${chalk.green("$")} npx venumityui@latest add profile-card-1`,
    );
    console.log(`  ${chalk.green("$")} npx venumityui@latest list`);
    console.log(`  ${chalk.green("$")} npx venumityui@latest search hero`);
    console.log(chalk.dim("━".repeat(60)));
    console.log(chalk.cyan.bold("\n📚 Other Package Managers:"));
    console.log(chalk.dim("━".repeat(60)));
    console.log(
      `  ${chalk.green("$")} pnpm dlx venumityui@latest add profile-card-1`,
    );
    console.log(
      `  ${chalk.green("$")} yarn dlx venumityui@latest add profile-card-1`,
    );
    console.log(
      `  ${chalk.green("$")} bunx venumityui@latest add profile-card-1`,
    );
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
