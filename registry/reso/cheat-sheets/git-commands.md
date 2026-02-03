# 100 Git Commands

A handy cheat sheet for essential Git commands and workflows. Includes branching, commits, merges, resets, and collaboration commands.

---

## Getting Started

### Installation & Setup

```bash
# Check Git version
git --version

# Configure user
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# List all configurations
git config --list

# Set default editor
git config --global core.editor "code --wait"
```

### Repository Setup

```bash
# Initialize new repository
git init

# Clone existing repository
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git folder-name

# Clone with SSH
git clone git@github.com:user/repo.git

# Clone specific branch
git clone -b branch-name https://github.com/user/repo.git
```

---

## Basic Workflow

### Making Changes

```bash
# Check status
git status

# Add files to staging
git add file.txt
git add .                  # Add all files
git add *.js              # Add all JS files
git add -A                # Add all (including deleted)

# Remove from staging
git reset file.txt
git reset .               # Unstage all

# Commit changes
git commit -m "Add feature"
git commit -am "Message"  # Add and commit in one command

# Amend last commit
git commit --amend -m "New message"
```

### Viewing Changes

```bash
# Show changes in working directory
git diff

# Show staged changes
git diff --staged
git diff --cached        # Same as --staged

# Show changes between commits
git diff HEAD~1 HEAD
git diff commit1 commit2

# Show what changed in commit
git show commit-hash
```

---

## Branch Management

### Basic Branching

```bash
# List branches
git branch                # Local branches
git branch -a             # All branches (local + remote)
git branch -r             # Remote branches only

# Create branch
git branch feature-x
git branch feature-x commit-hash  # From specific commit

# Switch branch
git checkout feature-x
git checkout -b feature-x        # Create and switch

# Modern switch (Git 2.23+)
git switch feature-x
git switch -c feature-x          # Create and switch

# Delete branch
git branch -d feature-x          # Safe delete
git branch -D feature-x          # Force delete
```

### Merging & Rebasing

```bash
# Merge branch
git merge feature-x
git merge --no-ff feature-x      # No fast-forward

# Abort merge
git merge --abort

# Rebase branch
git rebase main
git rebase -i HEAD~3             # Interactive rebase

# Abort rebase
git rebase --abort

# Continue rebase after fixing conflicts
git rebase --continue

# Skip commit in rebase
git rebase --skip
```

---

## Remote Operations

### Remote Management

```bash
# List remotes
git remote
git remote -v                    # With URLs

# Add remote
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git

# Remove remote
git remote remove origin

# Change remote URL
git remote set-url origin https://new-url.git

# Fetch from remote
git fetch origin
git fetch --all                  # Fetch all remotes

# Pull changes
git pull origin main
git pull --rebase origin main    # Pull with rebase

# Push changes
git push origin main
git push -u origin feature-x     # Set upstream
```

### Push & Pull

```bash
# Push with tags
git push --tags

# Force push (use with caution!)
git push --force
git push --force-with-lease      # Safer force push

# Pull specific branch
git pull origin branch-name

# Pull and merge
git pull origin main --no-rebase

# Delete remote branch
git push origin --delete feature-x
git push origin :feature-x       # Old syntax
```

---

## Commit History

### Viewing History

```bash
# Show commit history
git log
git log --oneline                # One line per commit
git log --graph                  # ASCII graph
git log --all --graph --oneline  # All branches, graph, one-line

# Filter commits
git log --author="John"
git log --since="2023-01-01"
git log --until="2023-12-31"
git log --grep="fix"             # Search in messages
git log -S "functionName"        # Search in code

# Show stats
git log --stat                   # Show changed files
git log --shortstat              # Only stats
git log --name-only              # Only file names
```

### Changing History

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard commit-hash

# Clean working directory
git clean -fd                    # Remove untracked files/dirs
git clean -fdn                   # Dry run

# Revert commit (creates new commit)
git revert commit-hash
git revert HEAD                  # Revert last commit
```

---

## Stashing

### Stash Changes

```bash
# Stash changes
git stash
git stash save "WIP: feature"

# List stashes
git stash list

# Apply stash
git stash apply                  # Apply latest, keep in stash
git stash apply stash@{2}        # Apply specific stash

# Pop stash (apply and remove)
git stash pop
git stash pop stash@{1}

# Drop stash
git stash drop stash@{0}

# Clear all stashes
git stash clear

# Create branch from stash
git stash branch new-branch stash@{0}
```

### Stash Options

```bash
# Stash including untracked files
git stash -u
git stash --include-untracked

# Stash everything (including ignored)
git stash -a
git stash --all

# Show stash diff
git stash show stash@{0}
git stash show -p stash@{0}      # With patch
```

---

## Finding & Debugging

### Search & Find

```bash
# Find commit by message
git log --all --grep="bug fix"

# Find commit that introduced a bug
git bisect start
git bisect bad                  # Current commit is bad
git bisect good commit-hash     # Last known good commit
git bisect reset                # Exit bisect mode

# Find which commit changed a file
git blame file.txt
git blame -L 10,20 file.txt     # Specific lines

# Find lost commits
git fsck --lost-found
git reflog                      # Reference log
```

### Debugging

```bash
# Show object details
git show object-hash
git cat-file -p object-hash      # Pretty print object

# Check repository health
git fsck
git gc --prune=now               # Clean up garbage

# Verify commit signatures
git verify-commit commit-hash

# Debug refs
git show-ref
```

---

## Tags

### Tag Management

```bash
# List tags
git tag
git tag -l "v1.*"               # Filter tags

# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Create tag for specific commit
git tag v1.0.0 commit-hash

# Show tag details
git show v1.0.0

# Delete tag
git tag -d v1.0.0

# Push tags to remote
git push origin v1.0.0
git push origin --tags          # Push all tags
```

### Working with Tags

```bash
# Checkout tag
git checkout v1.0.0
git checkout -b branch-name v1.0.0  # Create branch from tag

# Compare tags
git diff v1.0.0 v1.1.0

# List commits between tags
git log v1.0.0..v1.1.0 --oneline
```

---

## Advanced Operations

### Submodules

```bash
# Add submodule
git submodule add https://github.com/user/repo.git path

# Initialize submodules
git submodule init
git submodule update

# Update submodules
git submodule update --remote

# Clone with submodules
git clone --recursive https://github.com/user/repo.git
```

### Cherry-pick

```bash
# Apply specific commit to current branch
git cherry-pick commit-hash
git cherry-pick commit1 commit2 commit3  # Multiple commits

# Cherry-pick with no commit
git cherry-pick -n commit-hash

# Cherry-pick range
git cherry-pick start-commit^..end-commit
```

### Archive

```bash
# Create archive
git archive --format=zip HEAD -o release.zip
git archive --format=tar.gz HEAD -o release.tar.gz

# Archive specific branch/tag
git archive --format=zip v1.0.0 -o v1.0.0.zip
```

---

## Git Hooks

### Local Hooks

```bash
# List hooks
ls .git/hooks/

# Make hook executable
chmod +x .git/hooks/pre-commit

# Sample pre-commit hook
#!/bin/sh
# Prevent commit if tests fail
npm test
```

### Server Hooks

```bash
# Pre-receive hook (server-side)
#!/bin/sh
# Reject push if contains banned files
while read oldrev newrev refname; do
    # Check commits
done
```

---

## Aliases & Shortcuts

### Useful Aliases

```bash
# Add to ~/.gitconfig
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    lg = log --oneline --graph --all
    last = log -1 HEAD
    unstage = reset HEAD --
    undo = reset --soft HEAD~1
    wip = !git add -A && git commit -m "WIP"

# Set alias
git config --global alias.s status
git config --global alias.lg "log --oneline --graph --all"
```

### Quick Commands

```bash
# Quick status
git st

# Quick log
git lg

# Quick commit
git ci -m "message"

# Quick checkout
git co main
```

---

## Configuration

### Git Config

```bash
# Set configuration
git config --global core.autocrlf true
git config --global core.editor "code --wait"
git config --global merge.tool vscode
git config --global diff.tool vscode

# Color output
git config --global color.ui auto
git config --global color.status auto
git config --global color.branch auto

# Ignore file permissions
git config core.filemode false

# Set pull strategy
git config pull.rebase true

# Edit config file
git config --global --edit
```

### .gitignore

```bash
# Common .gitignore patterns
node_modules/
.DS_Store
*.log
.env
dist/
build/
*.tmp
*.swp

# Ignore all but specific file
/*
!/src
!/package.json
!/README.md
```

---

## Troubleshooting

### Common Issues

```bash
# Fix line endings
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # Linux/Mac

# Recover deleted branch
git reflog
git checkout -b recovered-branch commit-hash

# Fix detached HEAD
git checkout main
git branch -f detached-branch HEAD@{1}
git checkout detached-branch

# Remove large file from history
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD
```

### Authentication Issues

```bash
# Cache credentials
git config --global credential.helper cache
git config --global credential.helper 'cache --timeout=3600'

# Store credentials
git config --global credential.helper store

# SSH key issues
ssh -T git@github.com          # Test SSH connection
eval "$(ssh-agent -s)"         # Start SSH agent
ssh-add ~/.ssh/id_rsa          # Add SSH key
```

---

## Git Flow & Workflows

### Common Workflows

```bash
# Git Flow
git flow init
git flow feature start new-feature
git flow feature finish new-feature
git flow release start 1.0.0
git flow release finish 1.0.0
git flow hotfix start bug-fix
git flow hotfix finish bug-fix

# GitHub Flow (simpler)
# 1. Create feature branch
# 2. Add commits
# 3. Open Pull Request
# 4. Discuss and review
# 5. Deploy and test
# 6. Merge
```

### PR/MR Commands

```bash
# Update PR branch
git fetch origin
git rebase origin/main
git push --force-with-lease

# Squash commits for PR
git rebase -i HEAD~3
# Change "pick" to "squash" for commits to combine

# Create PR from command line (GitHub CLI)
gh pr create --title "Title" --body "Description"
```

---

## Performance Tips

### Speed Up Git

```bash
# Shallow clone
git clone --depth 1 https://github.com/user/repo.git

# Partial clone
git clone --filter=blob:none https://github.com/user/repo.git

# Sparse checkout
git clone --no-checkout https://github.com/user/repo.git
cd repo
git sparse-checkout init
git sparse-checkout set folder1 folder2

# Clean up repository
git gc --aggressive
git prune
```

### Large File Storage (LFS)

```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.psd"
git lfs track "*.zip"

# List tracked files
git lfs track

# Migrate existing repo to LFS
git lfs migrate import --include="*.psd,*.zip"
```

---

## Best Practices

### Do:

- Write meaningful commit messages
- Keep commits atomic
- Use feature branches
- Review code before merging
- Keep master/main always deployable
- Use .gitignore properly
- Regularly pull from upstream
- Sign your commits

### Avoid:

- Committing directly to main
- Force pushing to shared branches
- Large binary files in repo
- Sensitive data in commits
- Long-running feature branches
- Ignoring merge conflicts
- Overly complex commit messages

### Commit Message Convention:

```
type(scope): subject

body

footer

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(auth): add login functionality
```

---

## Resources

### Learning:

- [Pro Git Book](https://git-scm.com/book/)
- [Git Documentation](https://git-scm.com/docs)
- [GitHub Learning Lab](https://lab.github.com/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git)

### Tools:

- [GitHub CLI](https://cli.github.com/)
- [GitKraken](https://www.gitkraken.com/)
- [SourceTree](https://www.sourcetreeapp.com/)
- [Tig](https://jonas.github.io/tig/) - Text-mode interface

### Practice:

- [Learn Git Branching](https://learngitbranching.js.org/)
- [Oh My Git!](https://ohmygit.org/)
- [Git Game](https://github.com/git-game/git-game)

---

## Git Command Categories

| Category  | Key Commands                           |
| --------- | -------------------------------------- |
| Setup     | init, clone, config                    |
| Basic     | add, commit, status, diff              |
| Branching | branch, checkout, switch, merge        |
| Remote    | remote, fetch, pull, push              |
| History   | log, show, reflog                      |
| Undo      | reset, revert, checkout, restore       |
| Stash     | stash                                  |
| Tags      | tag                                    |
| Advanced  | rebase, cherry-pick, bisect, submodule |

---

## Quick Reference Card

### Daily Workflow:

```bash
git status                 # Check changes
git add .                  # Stage changes
git commit -m "Message"    # Commit
git pull origin main       # Get latest
git push origin main       # Push changes
```

### Branch Workflow:

```bash
git checkout -b feature    # Create branch
# Make changes
git add . && git commit -m "Changes"
git checkout main          # Switch to main
git pull origin main       # Update main
git checkout feature       # Back to feature
git rebase main           # Update feature branch
git push origin feature    # Push feature
```

### Emergency:

```bash
git reflog                 # Find lost commits
git reset --hard HEAD~1    # Undo last commit
git stash                  # Save work in progress
git clean -fd              # Remove untracked files
```

---

## Pro Tips

### One-liners:

```bash
# Update all submodules
git submodule foreach git pull origin main

# Delete merged branches
git branch --merged main | grep -v "main" | xargs git branch -d

# Find large files in history
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {print substr($0,6)}' | sort --numeric-sort --key=2 | tail -10

# Count commits by author
git shortlog -s -n

# Create patch from commit
git format-patch -1 commit-hash
```

### Git Plumbing:

```bash
# Low-level commands
git hash-object file.txt          # Get object hash
git cat-file -p object-hash       # View object content
git update-index                  # Manipulate index
git write-tree                    # Create tree object
git commit-tree                   # Create commit object
```

---

## Remember These!

### Essential Commands (20% you'll use 80% of the time):

```bash
git status
git add .
git commit -m ""
git push
git pull
git checkout
git branch
git merge
git log --oneline --graph --all
git diff
git stash
git reset
git revert
git clone
git init
git remote add
git fetch
git rebase
git tag
git show
git reflog
```