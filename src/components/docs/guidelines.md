# Contribution Guidelines

Welcome! We're excited to have you contribute to SAST. This guide outlines our expectations and best practices for making our collaboration smooth, inclusive, and productive.

## Core Values

We value:
- **Kindness** - Treat everyone with respect and understanding
- **Curiosity** - Ask questions and explore ideas
- **Clear Communication** - Explain your thoughts and reasoning
- **Quality over Speed** - Smaller, focused PRs are better than large changes

## Before You Start

### Getting Assignment

1. **Look for issues** tagged `good first issue` or `help wanted`
2. **Comment on the issue** with your intent to work on it
3. **Wait for assignment** - A maintainer will assign it to you
4. **Ask questions** if anything is unclear

This ensures we avoid duplicate work and can provide guidance upfront.

## Collaboration Practices

### Pull Request Workflow

1. **Create a descriptive PR title** - Include context and what you're changing
   - ✅ Good: `feat(navbar): add dropdown menu for Explore section`
   - ❌ Bad: `Update navbar`

2. **Add screenshots/GIFs** for UI changes
   - Show before and after states
   - Demonstrate responsive design on mobile
   - Include dark/light theme variations

3. **Write a clear description** of what and why you changed something

4. **Keep PRs focused** - One feature or fix per PR
   - Easier to review
   - Easier to revert if needed
   - Faster merge time

5. **Be responsive to feedback** - Address comments promptly and respectfully

### Code Review Tips

- **Be constructive** - Suggest improvements, not just criticisms
- **Celebrate good work** - A positive comment goes a long way
- **Learn from reviews** - View feedback as knowledge sharing
- **Ask for clarification** if you don't understand a suggestion

## Commit Standards

We follow **Conventional Commits** to keep our history clean and organized.

### Commit Format

```
<type>(<scope>): <subject>

<body>
```

### Types

- **feat** - A new feature
- **fix** - A bug fix
- **docs** - Documentation changes
- **style** - Code style (no logic change)
- **refactor** - Code refactoring
- **perf** - Performance improvements
- **test** - Adding or updating tests
- **chore** - Build process, dependencies, etc.

### Examples

```
feat(docs): add Community Roles page
fix(navbar): resolve mobile menu z-index issue
docs(contributing): update guidelines section
refactor(events): optimize event filtering logic
test(newsletter): add download functionality tests
```

### Tips

- Use lowercase
- Keep it concise (50 chars or less)
- Use imperative mood ("add" not "added")
- Reference issues when relevant: `fixes #42`

## Code Quality

### Before Submitting

- [ ] Code follows project style
- [ ] Changes are tested locally
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile (max-width: 768px)
- [ ] Dark theme is visually consistent
- [ ] Accessibility considerations are met (semantic HTML, ARIA labels)

### CI/CD

- Our CI pipeline runs automated checks on every PR
- All checks **must pass** before merging
- Use draft PRs to get early feedback while still working

## Review Timeline

- **Response target** - 2-3 days for feedback
- **Merge timeline** - 3-5 business days after approval
- **Urgent fixes** - Tag with `urgent` for faster review

## Questions?

- Check our [FAQs](/docs/faqs) for common questions
- Read our [Code of Conduct](/docs/code-of-conduct)
- Reach out to any maintainer - we're here to help!

---

Thank you for contributing to SAST! Your efforts help us build better tools and knowledge for the space community. 🚀
