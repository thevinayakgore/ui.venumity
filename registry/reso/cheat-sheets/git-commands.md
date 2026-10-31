# Git Commands Complete Cheat Sheet

Git is a distributed version-control system used to track code changes, collaborate with teams, manage branches, and deploy applications safely. This cheat sheet covers the most useful Git commands with practical examples and real-world use cases.

Git commands generally move changes through four areas: **working directory → staging area → local repository → remote repository**. [281]

```text
Working Directory
      ↓ git add
Staging Area
      ↓ git commit
Local Repository
      ↓ git push
Remote Repository
```

---

## 1. Git Configuration

### Set global username

```bash
git config --global user.name "Vianayak Kumar"
```

### Set global email

```bash
git config --global user.email "vianayak@example.com"
```

### Set repository-specific username

```bash
git config user.name "Vianayak Kumar"
```

### Set default branch name

```bash
git config --global init.defaultBranch main
```

### Set default editor

```bash
git config --global core.editor "code --wait"
```

### View all configuration

```bash
git config --list
```

### View specific configuration

```bash
git config user.name
git config user.email
```

### Use case

Set your name and email before making your first commit. Git attaches this identity to every commit.

---

## 2. Start a Repository

### Initialize a new repository

```bash
git init
```

### Initialize with a custom branch name

```bash
git init -b main
```

### Clone an existing repository

```bash
git clone [https://github.com/username/repository.git](https://github.com/username/repository.git)
```

### Clone into a specific folder

```bash
git clone [https://github.com/username/repository.git](https://github.com/username/repository.git) my-folder
```

### Clone a specific branch

```bash
git clone -b develop [https://github.com/username/repository.git](https://github.com/username/repository.git)
```

### Use case

Use `git init` for a new local project. Use `git clone` to download an existing remote repository.

---

## 3. Check Repository Status

### Show current status

```bash
git status
```

### Short status

```bash
git status -s
```

### Show branch information

```bash
git status -sb
```

### Use case

Use `git status` before committing to check modified, staged, untracked, and deleted files.

Example output:

```text
On branch main
Changes to be committed:
  modified:   app/page.tsx

Changes not staged for commit:
  modified:   README.md

Untracked files:
  components/Header.tsx
```

---

## 4. Staging Changes

### Stage a single file

```bash
git add index.js
```

### Stage multiple files

```bash
git add index.js style.css
```

### Stage all changes

```bash
git add .
```

### Stage all tracked file changes

```bash
git add -u
```

### Stage interactively

```bash
git add -p
```

### Unstage a file

```bash
git restore --staged index.js
```

### Unstage all files

```bash
git restore --staged .
```

### Use case

Use `git add` to move changes into the staging area before committing. Use `git add -p` to review and stage only selected parts of a file.

---

## 5. Commit Changes

### Commit staged changes

```bash
git commit -m "Add login page"
```

### Stage and commit tracked files

```bash
git commit -am "Fix navbar responsiveness"
```

### Amend the last commit

```bash
git commit --amend -m "Updated commit message"
```

### Add files to the last commit

```bash
git add missing-file.js
git commit --amend --no-edit
```

### Commit with detailed message

```bash
git commit -m "Add authentication" -m "Implemented JWT login and signup"
```

### Use case

Use commits to save a stable point in your project history. Write clear, specific commit messages.

Good examples:

```bash
git commit -m "Fix mobile navigation overflow issue"
git commit -m "Add product filtering by category"
git commit -m "Refactor user authentication service"
```

---

## 6. View Changes and History

### Show unstaged changes

```bash
git diff
```

### Show staged changes

```bash
git diff --staged
```

### Show all changes since last commit

```bash
git diff HEAD
```

### Compare two commits

```bash
git diff commit1 commit2
```

### Compare two branches

```bash
git diff main..feature/login
```

### Show commit history

```bash
git log
```

### Compact history

```bash
git log --oneline
```

### Graph history

```bash
git log --oneline --graph --all
```

### Show last 5 commits

```bash
git log -5
```

### Show changes in each commit

```bash
git log -p
```

### Show commits by author

```bash
git log --author="Vianayak"
```

### Show who changed each line

```bash
git blame index.js
```

### Use case

Use `git diff` before committing to review changes. Use `git log` to understand project history and locate commits.

---

## 7. Branching

### List branches

```bash
git branch
```

### List remote branches

```bash
git branch -r
```

### List all branches

```bash
git branch -a
```

### Create a branch

```bash
git branch feature/login
```

### Switch to a branch

```bash
git checkout feature/login
```

### Create and switch in one command

```bash
git checkout -b feature/login
```

### Modern branch switching

```bash
git switch feature/login
```

### Create and switch using `switch`

```bash
git switch -c feature/login
```

### Rename current branch

```bash
git branch -m new-branch-name
```

### Delete a branch

```bash
git branch -d feature/login
```

### Force delete a branch

```bash
git branch -D feature/login
```

### Use case

Create a separate branch for every feature, bug fix, or experiment. This keeps `main` stable.

```bash
git switch -c feature/payment-gateway
```

---

## 8. Merging Branches

### Merge a branch into current branch

```bash
git merge feature/login
```

### Merge without fast-forward

```bash
git merge --no-ff feature/login
```

### Squash merge

```bash
git merge --squash feature/login
git commit -m "Add login feature"
```

### Abort a merge

```bash
git merge --abort
```

### Use case

Switch to the target branch first, then merge the feature branch into it.

```bash
git switch main
git merge feature/login
```

### Merge vs Rebase

| Merge | Rebase |
|---|---|
| Preserves branch history | Creates linear history |
| Creates merge commit | Rewrites commits |
| Safer for shared branches | Cleaner but requires care |
| Example: `git merge feature` | Example: `git rebase main` |

---

## 9. Resolving Merge Conflicts

When Git cannot automatically merge changes, it marks conflicts.

```bash
<<<<<<< HEAD
Current branch changes
=======
Incoming branch changes
>>>>>>> feature/login
```

### Steps to resolve

```bash
git status
```

Open the conflicted files, remove conflict markers, keep the correct code, then:

```bash
git add resolved-file.js
git commit
```

### Continue after resolving

```bash
git merge --continue
```

### Abort conflict resolution

```bash
git merge --abort
```

### Use case

Use this when two branches modify the same lines or when one branch deletes a file modified by another.

---

## 10. Remote Repositories

### Add a remote

```bash
git remote add origin [https://github.com/username/repository.git](https://github.com/username/repository.git)
```

### View remotes

```bash
git remote -v
```

### Rename remote

```bash
git remote rename origin upstream
```

### Remove remote

```bash
git remote remove origin
```

### Change remote URL

```bash
git remote set-url origin [https://github.com/new-username/repository.git](https://github.com/new-username/repository.git)
```

### Use case

Connect a local project to GitHub, GitLab, Bitbucket, or another remote repository.

---

## 11. Fetch, Pull, and Push

### Download remote changes without merging

```bash
git fetch origin
```

### Fetch all remotes

```bash
git fetch --all
```

### Fetch and merge remote branch

```bash
git pull origin main
```

### Fetch and rebase remote changes

```bash
git pull --rebase origin main
```

### Push current branch

```bash
git push
```

### Push to a specific remote and branch

```bash
git push origin main
```

### Push and set upstream branch

```bash
git push -u origin main
```

### Push a new branch

```bash
git push -u origin feature/login
```

### Force push, use carefully

```bash
git push --force-with-lease
```

### Delete remote branch

```bash
git push origin --delete feature/login
```

### Use case

Use `git fetch` to inspect remote changes before merging. Use `git pull` to update your local branch. Use `git push` to upload local commits.

---

## 12. Stashing Changes

### Stash current changes

```bash
git stash
```

### Stash with a message

```bash
git stash push -m "Work in progress on dashboard"
```

### Stash including untracked files

```bash
git stash -u
```

### View stash list

```bash
git stash list
```

### Apply latest stash

```bash
git stash apply
```

### Apply and remove latest stash

```bash
git stash pop
```

### Apply a specific stash

```bash
git stash apply stash@{1}
```

### Delete latest stash

```bash
git stash drop
```

### Delete all stashes

```bash
git stash clear
```

### Use case

Use stash when you need to switch branches but have unfinished changes.

```bash
git stash
git switch main
git switch feature/dashboard
git stash pop
```

---

## 13. Rebase

### Rebase current branch onto another branch

```bash
git rebase main
```

### Interactive rebase

```bash
git rebase -i HEAD~5
```

### Continue after conflict

```bash
git rebase --continue
```

### Skip current commit

```bash
git rebase --skip
```

### Abort rebase

```bash
git rebase --abort
```

### Squash last 3 commits

```bash
git rebase -i HEAD~3
```

In interactive mode, change:

```text
pick abc123 Add feature
pick def456 Fix typo
pick ghi789 Update styles
```

To:

```text
pick abc123 Add feature
fixup def456 Fix typo
fixup ghi789 Update styles
```

### Use case

Use rebase to keep feature branches updated with `main` and to clean up local commit history before opening a pull request.

Avoid rebasing branches that other teammates are already using.

---

## 14. Cherry-Pick

### Copy one commit to current branch

```bash
git cherry-pick abc123
```

### Copy multiple commits

```bash
git cherry-pick abc123 def456
```

### Copy a range of commits

```bash
git cherry-pick abc123..def456
```

### Apply changes without committing

```bash
git cherry-pick --no-commit abc123
```

### Abort cherry-pick

```bash
git cherry-pick --abort
```

### Continue after conflict

```bash
git cherry-pick --continue
```

### Use case

Use cherry-pick to copy a specific bug fix from one branch to another without merging the entire branch.

```bash
git switch release/v1.2
git cherry-pick abc123
```

---

## 15. Undo Changes

### Discard unstaged changes in a file

```bash
git restore index.js
```

### Discard all unstaged changes

```bash
git restore .
```

### Unstage a file

```bash
git restore --staged index.js
```

### Undo last commit but keep changes

```bash
git reset --soft HEAD~1
```

### Undo last commit and unstage changes

```bash
git reset --mixed HEAD~1
```

### Undo last commit and delete changes

```bash
git reset --hard HEAD~1
```

### Reset to a specific commit

```bash
git reset --hard abc123
```

### Undo a commit safely

```bash
git revert abc123
```

### Revert the last commit

```bash
git revert HEAD
```

### Use case

Use `git restore` to discard local file changes. Use `git revert` to undo a commit safely on shared branches. Avoid `git reset --hard` on shared branches.

| Command | Effect |
|---|---|
| `git restore` | Discards working-directory changes |
| `git restore --staged` | Unstages files |
| `git reset --soft` | Moves branch pointer, keeps changes staged |
| `git reset --mixed` | Moves branch pointer, keeps changes unstaged |
| `git reset --hard` | Deletes changes permanently |
| `git revert` | Creates a new commit that reverses a previous commit |

---

## 16. Tags

### Create a lightweight tag

```bash
git tag v1.0.0
```

### Create an annotated tag

```bash
git tag -a v1.0.0 -m "First stable release"
```

### List tags

```bash
git tag
```

### Show tag details

```bash
git show v1.0.0
```

### Push a tag

```bash
git push origin v1.0.0
```

### Push all tags

```bash
git push --tags
```

### Delete local tag

```bash
git tag -d v1.0.0
```

### Delete remote tag

```bash
git push origin --delete v1.0.0
```

### Use case

Use tags to mark releases, such as `v1.0.0`, `v2.1.3`, or `production-ready`.

---

## 17. Git Stash Workflow Example

```bash
# You are working on a feature
git switch feature/dashboard

# You need to fix an urgent bug on main
git stash push -m "Dashboard work in progress"

git switch main
git switch -c hotfix/navbar

# Fix bug, commit, push
git add .
git commit -m "Fix navbar issue"
git push -u origin hotfix/navbar

# Return to feature branch
git switch feature/dashboard
git stash pop
```

---

## 18. Feature Branch Workflow Example

```bash
# Start from latest main
git switch main
git pull origin main

# Create feature branch
git switch -c feature/user-profile

# Make changes
git add .
git commit -m "Add user profile page"

# Keep branch updated
git fetch origin
git rebase origin/main

# Push branch
git push -u origin feature/user-profile

# Open pull request, review, merge
```

---

## 19. Fix Wrong Commit Message

### Change the latest commit message

```bash
git commit --amend -m "Correct commit message"
```

### Push amended commit

```bash
git push --force-with-lease
```

### Use case

Use this only if the commit has not been shared with teammates or merged into `main`.

---

## 20. Remove Files from Git

### Remove file from working directory and Git

```bash
git rm file.txt
```

### Remove file only from Git tracking

```bash
git rm --cached file.txt
```

### Remove folder from Git tracking

```bash
git rm -r --cached folder-name
```

### Commit removal

```bash
git commit -m "Remove file from repository"
```

### Use case

Use `git rm --cached` when you accidentally committed a file that should be ignored, such as `.env`.

---

## 21. `.gitignore`

Create a `.gitignore` file:

```text
node_modules/
dist/
build/
.env
.env.local
coverage/
*.log
.DS_Store
```

### Check why a file is ignored

```bash
git check-ignore -v .env
```

### Use case

Use `.gitignore` to prevent temporary files, dependencies, build outputs, and secrets from being committed.

---

## 22. Git Reflog

### View reference log

```bash
git reflog
```

### Recover a lost commit

```bash
git reflog
git reset --hard abc123
```

### Use case

Use `git reflog` when you accidentally reset, rebase, or delete a branch and need to recover a previous commit.

---

## 23. Bisect: Find a Bug

### Start bisect

```bash
git bisect start
```

### Mark current commit as bad

```bash
git bisect bad
```

### Mark an older commit as good

```bash
git bisect good abc123
```

### Finish bisect

```bash
git bisect reset
```

### Use case

Use `git bisect` to find the exact commit that introduced a bug.

---

## 24. Useful Git Aliases

```bash
git config --global alias.st "status -sb"
git config --global alias.co "checkout"
git config --global alias.sw "switch"
git config --global alias.br "branch"
git config --global alias.cm "commit -m"
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.last "log -1 HEAD"
```

### Use aliases

```bash
git st
git co main
git sw -c feature/login
git cm "Add feature"
git lg
```

---

## 25. Common Interview Questions

### 1. What is Git?

Git is a distributed version-control system that tracks changes in source code and enables collaboration.

### 2. What is the difference between Git and GitHub?

Git is the version-control tool. GitHub is a cloud-based platform for hosting Git repositories and collaborating.

### 3. What is the difference between `git merge` and `git rebase`?

`git merge` combines branch histories and creates a merge commit. `git rebase` reapplies commits on top of another branch to create a linear history. [273][280]

### 4. What is the difference between `git fetch` and `git pull`?

`git fetch` downloads remote changes without merging. `git pull` fetches and merges remote changes. [274][277]

### 5. What is the difference between `git reset` and `git revert`?

`git reset` moves the branch pointer and can discard commits. `git revert` creates a new commit that reverses a previous commit. [276]

### 6. What is a merge conflict?

A merge conflict occurs when Git cannot automatically combine changes from two branches.

### 7. What is staging area?

The staging area is where changes are prepared before being committed.

### 8. What is HEAD?

`HEAD` points to the current branch or commit.

### 9. What is `origin`?

`origin` is the default name for the remote repository from which a project was cloned.

### 10. What is a detached HEAD?

A detached HEAD occurs when `HEAD` points directly to a commit instead of a branch.

### 11. What is `git stash`?

`git stash` temporarily saves uncommitted changes so you can switch branches or work on something else. [273][274]

### 12. What is cherry-pick?

`git cherry-pick` applies a specific commit from one branch to another. [274][277]

### 13. What is a fast-forward merge?

A fast-forward merge occurs when the target branch has no new commits, so Git simply moves the branch pointer forward.

### 14. What is a pull request?

A pull request proposes merging one branch into another, enabling code review and discussion.

### 15. What is `.gitignore`?

`.gitignore` specifies files and folders that Git should not track.

### 16. What is `git reflog`?

`git reflog` records movements of `HEAD` and helps recover lost commits.

### 17. What is force push?

Force push overwrites the remote branch history. Use `git push --force-with-lease` instead of `git push --force` for safer overwrites.

### 18. What is a tag?

A tag marks an important point in history, commonly used for releases.

### 19. What is Git bisect?

`git bisect` helps find the commit that introduced a bug using binary search.

### 20. What is the difference between `git clone` and `git fork`?

`git clone` downloads a repository locally. A fork creates your own copy of someone else’s repository on a hosting platform.

---

## 26. Best Practices

- Pull the latest changes before starting new work.
- Create a separate branch for each feature or bug fix.
- Make small, focused commits.
- Write clear commit messages.
- Review changes using `git diff` before committing.
- Use `.gitignore` for secrets, dependencies, and build files.
- Prefer `git revert` on shared branches.
- Avoid force-pushing shared branches.
- Keep feature branches updated with `main`.
- Use pull requests for code review.
- Use meaningful branch names such as `feature/login`, `bugfix/navbar`, and `hotfix/payment`.

---

## Summary

Git is essential for modern software development. The most important commands are `git init`, `git clone`, `git status`, `git add`, `git commit`, `git branch`, `git switch`, `git merge`, `git pull`, `git push`, `git stash`, `git rebase`, `git revert`, and `git cherry-pick`.

For beginners, focus on the daily workflow: clone or init, branch, add, commit, pull, push, and merge. For interviews, focus on merge vs rebase, fetch vs pull, reset vs revert, conflict resolution, stash, cherry-pick, reflog, and safe collaboration practices.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to the official Git documentation at git-scm.com for detailed and current command guidance.