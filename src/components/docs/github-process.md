# GitHub Process & Workflow

This guide walks you through SAST's GitHub workflow, from creating an issue to getting your PR merged.

## Issue Labels

We use labels to organize and prioritize work. When browsing issues, look for:

### Difficulty
- `good first issue` - Perfect for newcomers
- `beginner friendly` - Requires some familiarity
- `intermediate` - Intermediate challenge
- `advanced` - Complex or experimental

### Category
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Docs updates
- `question` - Questions from community
- `help wanted` - Specifically looking for contributors

### Priority
- `urgent` - Blocking other work
- `high` - Important for upcoming release
- `low` - Nice to have

### Status
- `blocked` - Waiting on something
- `in progress` - Someone is working on it
- `needs review` - PR submitted, awaiting review

## Branching Strategy

We follow a naming convention for branches to keep them organized.

### Branch Naming

```
<type>/<scope>-<description>
```

### Types

- **feat** - New feature
- **fix** - Bug fix
- **docs** - Documentation
- **refactor** - Code cleanup
- **test** - Tests
- **chore** - Build/dependency updates

### Examples

```
feat/navbar-dropdown-menu
fix/mobile-menu-z-index
docs/add-learning-resources
refactor/event-filtering-logic
test/newsletter-downloads
```

### Best Practices

- Keep branch names **lowercase** and **hyphenated**
- Use **short-lived branches** - merge within 1-2 weeks
- Delete branches after merging
- One feature/fix per branch
- Sync with `main` before submitting PR

## Creating a Pull Request

### Step 1: Create Your Branch

```bash
git checkout -b feat/your-feature-name
git push -u origin feat/your-feature-name
```

### Step 2: Make Your Changes

- Commit with [Conventional Commits](/docs/guidelines)
- Keep commits focused and logical
- Test locally before pushing

### Step 3: Open the PR

1. Go to GitHub → Pull Requests → New PR
2. **Base branch:** `main` → **Compare branch:** your branch
3. **Title:** Use descriptive, conventional format
4. **Description:** Explain what, why, and how
5. **Add context:**
   - Link related issues: `Fixes #42` or `Related to #123`
   - Add screenshots for UI changes
   - List any breaking changes

### Step 4: Use Draft PRs for Early Feedback

If you want feedback while still working:
1. Click **Draft PR** when creating
2. Request reviews from maintainers
3. Continue pushing to the same branch
4. Mark **Ready for Review** when done

## Code Review Process

### What We Review

- **Code Quality** - Follows project standards and best practices
- **Testing** - Adequate test coverage
- **Performance** - No unnecessary re-renders or slow operations
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- **Documentation** - Clear comments and updated docs

### Review Requirements

- **Approvals required:** 1-2 maintainer approvals
- **CI/CD must pass:** All automated checks pass
- **No conflicts:** PR is up to date with main

### Timeline

- First response: Within 2-3 business days
- Approval/merge: 3-5 business days after approval
- Blocked: Clearly communicated with timeline

## Continuous Integration (CI)

We use **GitHub Actions** to automate testing and building.

### What CI Checks

- ✅ Builds successfully
- ✅ No ESLint errors
- ✅ Tests pass
- ✅ No security vulnerabilities
- ✅ Bundle size acceptable

### If CI Fails

1. Click **Details** to see the error
2. Fix locally and push
3. CI re-runs automatically
4. Keep pushing until all checks pass

## Releases & Versioning

### Version Strategy

We follow **Semantic Versioning** (MAJOR.MINOR.PATCH):
- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes

### Release Process

1. Maintainers merge approved PRs to `main`
2. Create a release with a version tag
3. Generate release notes from commit history
4. Deploy to production
5. Announce in community channels

## Tips for Smooth Workflow

1. **Communicate early** - Comment on issues before starting
2. **Keep it small** - Smaller PRs get faster reviews
3. **Write clear commits** - Helps with code archaeology
4. **Test thoroughly** - Catch bugs before review
5. **Respond promptly** - Feedback cycle matters
6. **Ask for help** - We're here to guide you
7. **Draft PRs are okay** - Get feedback while developing

## Troubleshooting

### PR shows conflicts

```bash
git fetch origin
git rebase origin/main
# Fix conflicts in your editor
git add .
git rebase --continue
git push --force-with-lease origin your-branch
```

### Need to update your branch

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease origin your-branch
```

### Accidentally committed to wrong branch

```bash
git reset HEAD~1  # Undo the commit
git stash         # Save your changes
git checkout correct-branch
git stash pop     # Apply your changes
git commit        # Commit on the right branch
```

---

**Questions?** Check our [Guidelines](/docs/guidelines) or ask in a discussion. We're a supportive community! 🌟
