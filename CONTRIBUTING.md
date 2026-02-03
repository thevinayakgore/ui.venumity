# <img src="./public/logo.png" width="30" style="vertical-align: middle; margin-top: 5px;" /> Contributing to Venu<span style="color:orange">mity</span> UI

First off, thanks for checking out **Venu<span style="color:orange">mity</span> UI** ! Whether you're here to add a component, fix a bug, improve docs, or just vibe with us - you're awesome. **Venu<span style="color:orange">mity</span> UI** thrives on community contributions, and we're excited you're thinking of helping out.

## 🤝 Ways to Contribute

Here's how you can make a difference :

- **🧱 Add a New Component**  
  Have a cool component idea ? Share it with the community !  
  👉 [ui.venumity.com/docs/getting-started](https://www.ui.venumity.com/docs/getting-started)

- **🐛 Fix Bugs**  
  Found a bug ? Even small fixes make a huge difference !

- **📚 Improve Documentation**  
  Good docs = happy developers. Spot something unclear or missing? Help us make it better.

- **💡 Suggest Ideas**  
  Got feature ideas or improvements ? [Open an issue](https://github.com/thevinayakgore/ui.venumity/issues) and let's chat !

- **🎨 Polish UI/UX**  
  Design improvements, better examples, or accessibility fixes are always welcome.

## 🚀 Quick Start for Contributors

#### 1. Fork [this](https://github.com/thevinayakgore/ui.venumity.git) repository.

#### 2. Clone your forked copy of the project.

```bash
git clone https://github.com/<your_user_name>/ui.venumity.git
```

#### 3. Navigate to the project directory :file_folder: .

```bash
cd ui.venumity
```

#### 4. Add a reference (remote) to the original repository.

```bash
git remote add upstream https://github.com/thevinayakgore/ui.venumity.git
```

#### 5. Check the remotes for this repository.

```bash
git remote -v
```

#### 6. Always take a pull from the upstream repository to your master branch to keep it at par with the main project (updated repository).

```bash
git pull upstream main
```

#### 7. Create a new branch.

```bash
git checkout -b <your_branch_name>
```

#### 8. Perform your desired changes to the code base.

#### 9. Track your changes:heavy_check_mark: .

```bash
git add .
```

#### 10. Commit your changes .

```bash
git commit -m "Relevant message"
```

#### 11. Push the committed changes in your feature branch to your remote repo.

```bash
git push -u origin <your_branch_name>
```

#### 12. To create a pull request, click on `compare and pull requests`.

#### 13. Add appropriate title and description to your pull request explaining your changes and efforts done.

#### 14. Click on `Create Pull Request`.

## ⭐️ Adding New Components

### Component Structure
Each component lives in:
```
components/
└── venumity/
  └── [category]/
      └── [subcategory]/
          └── component.tsx       # Component page
```

### Update Resgistry

Add your component in `registry/components.ts` page with all details to see your component at right page url and at correct place.

### Component Guidelines

- ✅ **TypeScript First** – Full type safety and IntelliSense
- ✅ **Mobile-First Design** – Responsive across all viewports
- ✅ **Consistent Styling** – Follows Venumity UI design tokens
- ✅ **Accessibility Focused** – ARIA labels, keyboard navigation

## 🧪 Quality Assurance

### Test Coverage
Make sure your changes don't break existing functionality :
1. Verify TypeScript compilation
2. Check for any console errors
3. Test responsive behavior

## 📝 Pull Request Process

### Before Submitting

1. **Self-Review** – Read your code as if reviewing someone else's
2. **Check Responsiveness** – Test mobile, tablet, desktop
3. **Validate Accessibility** – Run Lighthouse audits
4. **Verify TypeScript** – No `any` types, proper interfaces

### PR Submission Checklist
- [ ] Code follows project conventions
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Accessibility tested
- [ ] Cross-browser compatibility
- [ ] Bundle size analyzed
- [ ] Commit messages follow conventional format

### Creating the PR
1. Push to your fork :
```bash
git push origin feature/amazing-component
```
2. Create a Pull Request on GitHub
3. Fill out the PR template completely
4. Add screenshots/GIFs for visual changes
5. Reference any related issues

## 🎨 Code Style

### Commit Messages

Use conventional commit format :

```bash
feat: add modern sidebar component
fix: resolve button hover state issue
docs: update installation guide
style: format component files
```

### Naming Conventions

- Components : `PascalCase` (e.g., `ModernSidebar`)
- Files : `kebab-case` (e.g., `modern-sidebar.tsx`)
- Variables : `camelCase`
- Constants : `UPPER_SNAKE_CASE`

## ⚠️ Issue Report Process

### 🐞 Found a Bug ?

1. Search existing issues first
2. Create a new issue with :
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

### 💡 Want a New Feature ?

1. Check if it aligns with project goals
2. Describe the use case clearly
3. Suggest implementation ideas (optional)
4. Wait for discussion before coding

## 🆘 Need Help ?

1. Check existing documentation
2. Look at similar components for patterns
3. Ask in PR comments
4. GitHub : [Discussions](https://github.com/thevinayakgore/ui.venumity/discussions)

# 🎲 Thanks for contributing to Venu<span style="color:orange">mity</span> UI !

Together, we're building beautiful, accessible UI components for everyone. 🚀