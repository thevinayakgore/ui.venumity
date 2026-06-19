#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';
import boxen from 'boxen';
import dotenv from 'dotenv';
dotenv.config();

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================
// CONFIGURATION
// ============================================================

const API_BASE_URL = process.env.VENUMITY_API_URL || 'http://localhost:3000';

// ============================================================
// HEADER / LOGO
// ============================================================

function printHeader() {
  const venumityGradient = gradient('#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c');
  console.log(venumityGradient(`
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
`));
  console.log(chalk.cyan.bold(`📦 Venumity UI CLI v1.0.0`));
  console.log(chalk.dim('└─ Production-ready UI components • https://ui.venumity.com\n'));
}

// ============================================================
// API HELPERS
// ============================================================

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
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
  const parts = componentPath.split('/');
  if (parts.length < 4) throw new Error('Invalid path');
  const category = parts[1];
  const rest = parts.slice(2).join('/');
  const url = `${API_BASE_URL}/api/components/${category}/${rest}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

// ============================================================
// PROJECT HELPERS
// ============================================================

async function detectProject(cwd) {
  const packageJsonPath = path.join(cwd, 'package.json');
  const hasPackageJson = fs.existsSync(packageJsonPath);
  
  if (!hasPackageJson) {
    const items = fs.readdirSync(cwd);
    for (const item of items) {
      const itemPath = path.join(cwd, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const subPackageJson = path.join(itemPath, 'package.json');
        if (fs.existsSync(subPackageJson)) {
          return {
            hasPackageJson: true,
            hasTypeScript: fs.existsSync(path.join(itemPath, 'tsconfig.json')),
            hasSrc: fs.existsSync(path.join(itemPath, 'src')),
            hasApp: fs.existsSync(path.join(itemPath, 'app')),
            cwd: itemPath,
            isSubDirectory: true,
            projectName: item
          };
        }
      }
    }
    return { hasPackageJson: false, hasTypeScript: false, hasSrc: false, hasApp: false, cwd };
  }

  let packageJson = {};
  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  } catch {
    packageJson = { name: 'unknown-project' };
  }

  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  const hasTypeScript = fs.existsSync(path.join(cwd, 'tsconfig.json')) || !!deps.typescript;
  const hasSrc = fs.existsSync(path.join(cwd, 'src'));
  const hasApp = fs.existsSync(path.join(cwd, 'app'));

  return { hasPackageJson: true, hasTypeScript, hasSrc, hasApp, cwd };
}

async function createNextJsProject(projectName, cwd, installMotion) {
  const projectPath = path.join(cwd, projectName);
  
  if (fs.existsSync(projectPath)) {
    console.log(chalk.yellow(`⚠️  Project "${projectName}" already exists. Using existing project.`));
    return projectPath;
  }

  const spinner = ora(chalk.cyan('Creating Next.js project...')).start();

  try {
    const createCmd = `npx create-next-app@latest ${projectName} --typescript --tailwind --app --no-eslint --import-alias "@/*" --yes`;
    
    await execAsync(createCmd, { cwd });
    
    if (!fs.existsSync(projectPath)) {
      throw new Error(`Project directory ${projectPath} was not created`);
    }
    process.chdir(projectPath);

    spinner.text = 'Installing dependencies...';
    const deps = [
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'lucide-react',
      '@radix-ui/react-slot',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
    ];
    await execAsync(`npm install ${deps.join(' ')}`, { cwd: projectPath });

    spinner.text = 'Configuring shadcn/ui...';
    
    const componentsJson = {
      "$schema": "https://ui.shadcn.com/schema.json",
      "style": "new-york",
      "rsc": false,
      "tsx": true,
      "tailwind": {
        "config": "tailwind.config.js",
        "css": "app/globals.css",
        "baseColor": "neutral",
        "cssVariables": true,
        "prefix": ""
      },
      "aliases": {
        "components": "@/components",
        "utils": "@/lib/utils",
        "ui": "@/components/ui",
        "lib": "@/lib",
        "hooks": "@/hooks"
      },
      "iconLibrary": "lucide"
    };
    
    fs.writeFileSync(
      path.join(projectPath, 'components.json'),
      JSON.stringify(componentsJson, null, 2)
    );

    if (installMotion) {
      spinner.text = 'Installing motion...';
      await execAsync('npm install motion', { cwd: projectPath });
    }

    const hasSrc = fs.existsSync(path.join(projectPath, 'src'));
    const baseDir = hasSrc ? 'src' : '';
    const libDir = path.join(projectPath, baseDir, 'lib');
    fs.mkdirSync(libDir, { recursive: true });
    
    const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;
    
    fs.writeFileSync(
      path.join(libDir, 'utils.ts'),
      utilsContent
    );

    const uiDir = path.join(projectPath, baseDir, 'components', 'ui');
    fs.mkdirSync(uiDir, { recursive: true });

    spinner.succeed(chalk.green('Project ready'));
    return projectPath;
  } catch (error) {
    spinner.fail(chalk.red(`Failed to create project: ${error.message}`));
    throw error;
  }
}

// ============================================================
// DEPENDENCY DETECTION HELPERS
// ============================================================

const SHADCN_BASE_MAP = {
  'card-content': 'card',
  'card-header': 'card',
  'card-footer': 'card',
  'card-title': 'card',
  'card-description': 'card',
  'avatar-image': 'avatar',
  'avatar-fallback': 'avatar',
  'chart-tooltip': 'chart',
  'chart-container': 'chart',
  'chart-tooltip-content': 'chart',
  'chart-tooltip-item': 'chart',
  'chart-legend': 'chart',
  'chart-grid': 'chart',
};

const KNOWN_NPM_PACKAGES = {
  'recharts': 'recharts',
  'date-fns': 'date-fns',
  'react-hook-form': 'react-hook-form',
  '@hookform/resolvers': '@hookform/resolvers',
  'zod': 'zod',
  'react-query': '@tanstack/react-query',
  'axios': 'axios',
  'swr': 'swr',
  'next-auth': 'next-auth',
  'bcryptjs': 'bcryptjs',
  'jsonwebtoken': 'jsonwebtoken',
  'react-hot-toast': 'react-hot-toast',
  'sonner': 'sonner',
  'react-toastify': 'react-toastify',
};

function detectShadcnDependencies(code) {
  const deps = [];
  const importRegex = /import\s+.*?\s+from\s+['"]@\/components\/ui\/([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const comp = match[1].replace(/\.tsx$/, '').replace(/\.jsx$/, '').replace(/\/index$/, '');
    if (comp && !deps.includes(comp)) {
      const baseComp = SHADCN_BASE_MAP[comp] || comp;
      if (!deps.includes(baseComp)) {
        deps.push(baseComp);
      }
    }
  }
  const patterns = ['Button', 'Card', 'Avatar', 'Badge', 'Chart', 'Dialog', 'DropdownMenu'];
  for (const p of patterns) {
    if (code.includes(p)) {
      const kebab = p.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
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
    if (!importPath.startsWith('.') && !importPath.startsWith('@/') && !importPath.startsWith('/')) {
      let packageName = importPath.split('/')[0];
      if (importPath.startsWith('@') && importPath.includes('/')) {
        packageName = importPath.split('/')[0] + '/' + importPath.split('/')[1];
      }
      const skipPackages = ['react', 'react-dom', 'next', 'typescript', 'tailwindcss', 'postcss'];
      if (!skipPackages.includes(packageName) && !skipPackages.includes(packageName.split('/')[0])) {
        const mappedName = KNOWN_NPM_PACKAGES[packageName] || packageName;
        if (!deps.includes(mappedName)) {
          deps.push(mappedName);
        }
      }
    }
  }
  return deps;
}

function scanFilesForDependencies(files) {
  const shadcnDeps = new Set();
  const npmDeps = new Set();
  
  for (const file of files) {
    const content = file.content || file.code || '';
    if (!content) continue;
    
    const shadcn = detectShadcnDependencies(content);
    shadcn.forEach(dep => shadcnDeps.add(dep));
    
    const npm = detectNpmDependencies(content);
    npm.forEach(dep => npmDeps.add(dep));
  }
  
  return {
    shadcnDeps: Array.from(shadcnDeps),
    npmDeps: Array.from(npmDeps)
  };
}

async function installNpmDependencies(deps, cwd) {
  if (!deps || deps.length === 0) return [];
  
  const failed = [];
  const spinner = ora(`Installing npm dependencies...`).start();
  
  try {
    await execAsync(`npm install ${deps.join(' ')}`, { cwd });
    spinner.succeed('npm dependencies installed');
  } catch (error) {
    spinner.fail('Failed to install npm dependencies');
    console.log(chalk.yellow(`  Try manually: npm install ${deps.join(' ')}`));
    failed.push(...deps);
  }
  
  return failed;
}

async function installShadcnComponents(deps, cwd) {
  if (!deps || deps.length === 0) return [];
  
  const failed = [];
  const hasSrc = fs.existsSync(path.join(cwd, 'src'));
  const baseDir = hasSrc ? 'src' : '';
  const uiDir = path.join(cwd, baseDir, 'components', 'ui');
  fs.mkdirSync(uiDir, { recursive: true });

  for (const dep of deps) {
    try {
      await execAsync(`npx shadcn@latest add ${dep} --yes`, { 
        cwd: cwd,
        timeout: 60000 
      });
    } catch (error) {
      const componentName = dep.charAt(0).toUpperCase() + dep.slice(1);
      const componentContent = `// Placeholder for ${dep} - Install manually with: npx shadcn@latest add ${dep}
import * as React from "react";

export interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {}

const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`flex items-center justify-center p-4 border rounded-lg \${className || ''}\`}
        {...props}
      >
        ${dep} Component
      </div>
    );
  }
);

${componentName}.displayName = "${componentName}";

export { ${componentName} };
`;
      
      const filePath = path.join(uiDir, `${dep}.tsx`);
      fs.writeFileSync(filePath, componentContent, 'utf8');
      failed.push(dep);
    }
  }
  return failed;
}

// ============================================================
// SUCCESS MESSAGE
// ============================================================

function showSuccessMessage(displayName, installed, projectDir, targetDir, shadcnDeps, npmDeps, isFolder) {
  const relativePath = path.relative(projectDir, targetDir);
  const componentName = toKebabCase(displayName);
  const importName = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  let importPath;
  if (isFolder) {
    importPath = relativePath.includes('src/') 
      ? `@/${relativePath.replace(/^src\//, '')}/${componentName}`
      : `./${relativePath}/${componentName}`;
  } else {
    importPath = relativePath.includes('src/') 
      ? `@/${relativePath.replace(/^src\//, '')}/${componentName}`
      : `./${relativePath}/${componentName}`;
  }

  let dependenciesText = '';
  if (shadcnDeps && shadcnDeps.length > 0) {
    dependenciesText += `\n   shadcn/ui: ${shadcnDeps.join(', ')}`;
  }
  if (npmDeps && npmDeps.length > 0) {
    dependenciesText += `\n   npm: ${npmDeps.join(', ')}`;
  }

  const content = [
    chalk.green.bold("🎉 Installation Completed!"),
    chalk.dim('\n🚀 Explore it • ⚡ Use it • 📣 Share it\n'),
    chalk.white(`${displayName} has been successfully installed!`),
    chalk.dim("─".repeat(80)),
    chalk.bold("📦 Installed Components:"),
    installed.map(c => `  • ${c}`).join('\n'),
    chalk.dim("─".repeat(80)),
    chalk.bold("📁 Location:"),
    chalk.cyan(`  ${relativePath}`),
    chalk.dim("─".repeat(80)),
    chalk.bold("🚀 What's Next?"),
    chalk.dim("─".repeat(80)),
    `  1. Start dev server : ${chalk.cyan("npm run dev")}`,
    `  2. Import component : ${chalk.cyan(`import ${importName} from "${importPath}"`)}`,
    `  3. Add more components : ${chalk.cyan("npx venumityui add <component-name>")}`,
    `  4. See all components : ${chalk.cyan("npx venumityui list")}`,
    chalk.dim("─".repeat(80)),
    chalk.dim('💡 Need help? ') + chalk.cyan('npx venumityui --help') + chalk.dim(' or visit: ') + chalk.cyan('https://ui.venumity.com'),
    chalk.dim("─".repeat(80)),
    chalk.dim('\n✨ Happy Coding ✨'),
  ].filter(line => line !== '').join("\n");

  console.log(
    boxen(content, {
      padding: 1,
      borderStyle: "round",
      borderColor: "green",
    })
  );
}

// ============================================================
// COMMAND: ADD
// ============================================================

async function addComponentAction(componentNames, options) {
  console.clear();
  printHeader();

  // If --all flag is used, install all components
  if (options.all) {
    console.log(chalk.blue(`\n📦 Installing all components...\n`));
    try {
      const registry = await fetchRegistry();
      if (!registry.length) {
        console.log(chalk.red('❌ No components found in registry.'));
        return;
      }
      componentNames = registry.map(c => c.name);
      console.log(chalk.gray(`   Found ${componentNames.length} components to install`));
    } catch (error) {
      console.log(chalk.red(`❌ Failed to fetch registry: ${error.message}`));
      return;
    }
  }

  if (!componentNames || componentNames.length === 0) {
    console.log(chalk.red('❌ Please specify at least one component name.'));
    console.log(chalk.yellow('💡 Usage: venumityui add <component-name>'));
    console.log(chalk.yellow('💡 Or install all: venumityui add --all'));
    return;
  }

  console.log(chalk.blue(`\n📦 Adding ${componentNames.length} component(s): ${componentNames.join(', ')}\n`));

  try {
    const cwd = process.cwd();
    let projectInfo = await detectProject(cwd);
    let projectPath = cwd;

    if (projectInfo.hasPackageJson) {
      projectPath = projectInfo.cwd;
      console.log(chalk.green(`✅ Project found at: ${path.relative(cwd, projectPath) || '.'}`));
    } else {
      const items = fs.readdirSync(cwd);
      let foundProject = false;
      for (const item of items) {
        const itemPath = path.join(cwd, item);
        if (fs.statSync(itemPath).isDirectory()) {
          const subPackageJson = path.join(itemPath, 'package.json');
          if (fs.existsSync(subPackageJson)) {
            projectPath = itemPath;
            foundProject = true;
            console.log(chalk.green(`✅ Project found at: ${item}`));
            break;
          }
        }
      }
      
      if (!foundProject) {
        console.log(chalk.yellow('🆕 No existing project found. Creating a new project...\n'));

        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'What is your project named?',
            default: 'my-app',
            validate: (input) => {
              if (!input) return 'Project name is required';
              if (!/^[a-z0-9-]+$/.test(input)) {
                return 'Project name must be lowercase, numbers, and dashes only';
              }
              return true;
            }
          },
          {
            type: 'confirm',
            name: 'installMotion',
            message: 'Install motion (Framer Motion) for animations?',
            default: true
          }
        ]);

        projectPath = await createNextJsProject(answers.projectName, cwd, answers.installMotion);
        process.chdir(projectPath);
        projectInfo = await detectProject(projectPath);
      }
    }

    const registry = await fetchRegistry();
    if (!registry.length) {
      console.log(chalk.red('❌ No components found in registry. Make sure the API is running.'));
      console.log(chalk.yellow(`💡 API URL: ${API_BASE_URL}`));
      return;
    }

    const hasSrc = fs.existsSync(path.join(projectPath, 'src'));
    const baseDir = hasSrc ? 'src' : '';
    const uiDir = path.join(projectPath, baseDir, 'components', 'ui');
    fs.mkdirSync(uiDir, { recursive: true });

    const installedComponents = [];
    const allShadcnDeps = new Set();
    const allNpmDeps = new Set();
    let isFolderComponent = false;

    for (const compName of componentNames) {
      const searchTerm = toKebabCase(compName);
      const spinner = ora(`Installing ${compName}...`).start();

      let component = registry.find(c => c.name === searchTerm);
      if (!component) {
        component = registry.find(c =>
          c.name.includes(searchTerm) ||
          (c.displayName && c.displayName.toLowerCase().includes(compName.toLowerCase()))
        );
      }

      if (!component) {
        spinner.fail(`Component "${compName}" not found.`);
        console.log(chalk.yellow(`💡 Run "venumityui list" to see all available components.`));
        continue;
      }

      const displayName = component.displayName || component.name;
      spinner.text = `Downloading ${displayName}...`;

      try {
        const componentData = await fetchComponentData(component.path);
        
        if (componentData.isFolder && componentData.files && componentData.files.length > 0) {
          isFolderComponent = true;
          const componentFolder = path.join(uiDir, component.name);
          fs.mkdirSync(componentFolder, { recursive: true });
          
          const allFiles = componentData.files.map(file => ({
            content: file.content,
            path: file.path
          }));
          
          const { shadcnDeps, npmDeps } = scanFilesForDependencies(allFiles);
          shadcnDeps.forEach(dep => allShadcnDeps.add(dep));
          npmDeps.forEach(dep => allNpmDeps.add(dep));
          
          for (const file of componentData.files) {
            const filePath = path.join(componentFolder, file.path);
            const fileDir = path.dirname(filePath);
            fs.mkdirSync(fileDir, { recursive: true });
            fs.writeFileSync(filePath, file.content, 'utf8');
          }
          
          spinner.succeed(chalk.green(`${displayName} installed (${componentData.files.length} files)`));
          installedComponents.push(component.name);
          
        } else if (componentData.code) {
          isFolderComponent = false;
          const fileName = `${component.name}.tsx`;
          const filePath = path.join(uiDir, fileName);
          fs.writeFileSync(filePath, componentData.code, 'utf8');
          
          const { shadcnDeps, npmDeps } = scanFilesForDependencies([{ content: componentData.code }]);
          shadcnDeps.forEach(dep => allShadcnDeps.add(dep));
          npmDeps.forEach(dep => allNpmDeps.add(dep));
          
          spinner.succeed(chalk.green(`${displayName} installed`));
          installedComponents.push(component.name);
        } else {
          spinner.fail(`Unknown component format for ${displayName}`);
        }
      } catch (err) {
        spinner.fail(`Failed to install ${displayName}: ${err.message}`);
      }
    }

    let npmDepsList = [];
    if (allNpmDeps.size > 0) {
      npmDepsList = Array.from(allNpmDeps);
      await installNpmDependencies(npmDepsList, projectPath);
    }

    let shadcnDepsList = [];
    if (allShadcnDeps.size > 0) {
      shadcnDepsList = Array.from(allShadcnDeps);
      const spinner = ora(`Installing shadcn/ui components...`).start();
      const failed = await installShadcnComponents(shadcnDepsList, projectPath);
      if (failed.length === 0) {
        spinner.succeed('shadcn/ui components installed');
      } else {
        spinner.warn(`Some components failed: ${failed.join(', ')}`);
        console.log(chalk.yellow(`  Try: npx shadcn@latest add ${failed.join(' ')}`));
      }
    }

    if (installedComponents.length > 0) {
      const displayName = registry.find(c => c.name === installedComponents[0])?.displayName || installedComponents[0];
      showSuccessMessage(displayName, installedComponents, projectPath, uiDir, shadcnDepsList, npmDepsList, isFolderComponent);
    } else {
      console.log(chalk.red('❌ No components were installed.'));
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
      console.log(chalk.yellow('⚠️  No components found. Make sure the API is running.'));
      console.log(chalk.dim(`\n💡 API URL: ${API_BASE_URL}`));
      return;
    }

    let filtered = registry;
    if (options && options.category) {
      filtered = registry.filter(c => c.category === options.category);
    }

    const grouped = new Map();
    for (const comp of filtered) {
      const key = `${comp.category}/${comp.subcategory}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(comp.displayName || comp.name);
    }

    console.log(chalk.bold(`\n📦 Available Components (${filtered.length} total):\n`));
    for (const [group, items] of grouped.entries()) {
      console.log(chalk.green(`📁 ${group}`));
      for (const name of items) {
        console.log(`  • ${name}`);
      }
      console.log('');
    }
    console.log(chalk.dim('💡 To add: venumityui add <component-name>'));
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
    const results = registry.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      (c.displayName && c.displayName.toLowerCase().includes(query.toLowerCase())) ||
      (c.description && c.description.toLowerCase().includes(query.toLowerCase()))
    );

    if (!results.length) {
      console.log(chalk.yellow(`❌ No components found for "${query}"`));
      return;
    }

    console.log(chalk.green(`\n✅ Found ${results.length} components matching "${query}":\n`));
    for (const comp of results) {
      console.log(`${chalk.green('•')} ${chalk.bold(comp.displayName || comp.name)}`);
      console.log(`  ${chalk.dim(`Category: ${comp.category} | Install: venumityui add ${comp.name}`)}`);
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
    const comp = registry.find(c => c.name === toKebabCase(componentName));

    if (!comp) {
      console.log(chalk.red(`❌ Component "${componentName}" not found.`));
      console.log(chalk.yellow('💡 Run "venumityui list" to see all available components.'));
      return;
    }

    console.log(chalk.bold(`\n📋 Component Information\n`));
    console.log(`${chalk.green('Name:')} ${comp.displayName || comp.name}`);
    console.log(`${chalk.green('Category:')} ${comp.category}`);
    console.log(`${chalk.green('Subcategory:')} ${comp.subcategory}`);
    if (comp.description) console.log(`${chalk.green('Description:')} ${comp.description}`);
    if (comp.dependencies?.length) console.log(`${chalk.green('Dependencies:')} ${comp.dependencies.join(', ')}`);
    console.log(`\n${chalk.dim('💡 Install: venumityui add ' + comp.name)}`);
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

    console.log(chalk.bold(`\n📂 Available Categories (${categories.size}):\n`));
    for (const [cat, count] of categories.entries()) {
      console.log(`  ${chalk.green(cat)}: ${chalk.gray(`${count} components`)}`);
    }
    console.log(`\n${chalk.dim('💡 To see components: venumityui list --category <category>')}`);
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
    const comps = registry.filter(c => c.category === category);

    if (!comps.length) {
      console.log(chalk.yellow(`❌ No components found for category "${category}"`));
      console.log(chalk.yellow('💡 Run "venumityui categories" to see all categories.'));
      return;
    }

    const subcategories = new Map();
    for (const comp of comps) {
      subcategories.set(comp.subcategory, (subcategories.get(comp.subcategory) || 0) + 1);
    }

    console.log(chalk.bold(`\n📂 Subcategories for "${category}" (${comps.length} components):\n`));
    for (const [sub, count] of subcategories.entries()) {
      console.log(`  ${chalk.green(sub)}: ${chalk.gray(`${count} components`)}`);
      const items = comps.filter(c => c.subcategory === sub);
      for (const item of items) {
        console.log(`    • ${item.displayName || item.name}`);
      }
    }
    console.log(`\n${chalk.dim('💡 To add: venumityui add <component-name>')}`);
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
    .name('venumityui')
    .description('✨ Install beautiful, production-ready UI components')
    .version('1.0.0', '-v, --version', 'Show version')
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Show help');

  program
    .command('add [components...]')
    .description('Add one or more Venumity components to your project')
    .option('-o, --overwrite', 'Overwrite existing files')
    .option('--all', 'Install all available components')
    .action(addComponentAction);

  program
    .command('list')
    .description('List all available components')
    .option('-c, --category <category>', 'Filter by category')
    .action(listComponentsAction);

  program
    .command('search <query>')
    .description('Search for components')
    .action(searchComponentsAction);

  program
    .command('info <component>')
    .description('Show detailed information about a component')
    .action(infoComponentAction);

  program
    .command('categories')
    .description('List all available categories')
    .action(categoriesAction);

  program
    .command('subcategory <category>')
    .description('List subcategories for a given category')
    .action(subcategoryAction);

  program.on('--help', () => {
    console.log(chalk.cyan.bold('\n📚 Examples:'));
    console.log(chalk.dim('━'.repeat(60)));
    console.log(`  ${chalk.green('$')} npx venumityui add profile-card-1`);
    console.log(`  ${chalk.green('$')} npx venumityui add personal-panel-1`);
    console.log(`  ${chalk.green('$')} npx venumityui add --all`);
    console.log(`  ${chalk.green('$')} npx venumityui list`);
    console.log(`  ${chalk.green('$')} npx venumityui search hero`);
    console.log(chalk.dim('━'.repeat(60)));
    console.log(chalk.dim('\n📖 Documentation: https://ui.venumity.com\n'));
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

main().catch(error => {
  console.error(chalk.red('\n❌ Unexpected error:'));
  console.error(chalk.dim(error.message));
  process.exit(1);
});