# Frequently Asked Questions

Got questions? You're not alone! Here are answers to the most common questions we get from our SAST community.

## Getting Started

### How do I get started with SAST?

1. **Visit our GitHub** - Explore our repositories
2. **Read the documentation** - Start with this handbook
3. **Find an issue** - Look for `good first issue` labels
4. **Comment and ask** - Let us know you're interested
5. **Get assigned** - A maintainer will assign you the issue
6. **Start coding** - Follow our guidelines and collaborate!

### How do I get assigned to an issue?

1. Browse our [GitHub issues](https://github.com/Nakul-Jaglan/Website_SAST/issues)
2. Find an issue you'd like to work on (look for `good first issue` or `help wanted`)
3. **Comment on the issue** with something like: "I'd like to work on this! Can you assign it to me?"
4. A maintainer will review your comment and assign the issue to you
5. You're all set to start working!

**Why assignment matters:**
- Prevents duplicate work
- Lets maintainers provide guidance upfront
- Ensures issues get attention from capable contributors
- Builds accountability and ownership

### What if I've never contributed to open source before?

That's awesome - welcome! Here's what to know:

- **Start small** - Pick a `good first issue` or documentation task
- **Ask questions** - We love helping newcomers; no question is dumb
- **Read thoroughly** - Check our [Guidelines](/docs/guidelines) first
- **Communicate** - Let us know if you're stuck or need help
- **Learn by doing** - The best way to learn is to contribute!

## Contributing

### What if I'm stuck or don't understand something?

That's completely normal! Here's what to do:

1. **Search existing issues/discussions** - Your question might be answered
2. **Read relevant documentation** - Our guides have lots of info
3. **Write a clear question** - Include:
   - What you're trying to do
   - What you've already tried
   - Where you're blocked specifically
   - Any error messages or screenshots
4. **Post in an issue or discussion** - Tag a maintainer if urgent
5. **Be patient** - We aim to respond within 2-3 days

### Can I work on a feature that isn't in the issues?

Great initiative! Here's the process:

1. **Open a discussion first** - Explain your idea and why it matters
2. **Get feedback** - Discuss with maintainers and the community
3. **Create an issue** - Once aligned, we'll open an issue for it
4. **Get assigned** - Comment to express interest
5. **Submit your PR** - Follow our [Guidelines](/docs/guidelines)

This prevents wasted effort and ensures your idea aligns with project goals.

### How long does it take to get my PR reviewed?

**Timeline:**
- **First response** - 2-3 business days
- **Approval** - 3-5 days after addressing feedback
- **Merge** - Immediate once approved

**Note:** Community members may get feedback faster, and urgent items are prioritized.

### My PR was rejected. What now?

**Don't be discouraged!** Rejection is rarely personal. Here's what to do:

1. **Read the feedback carefully** - Understand why it wasn't merged
2. **Ask for clarification** if needed - Comments should be actionable
3. **Make changes** if you agree with the feedback
4. **Discuss alternatives** if you disagree
5. **Try again** - We love seeing revised submissions!

### How do I update my PR after feedback?

1. **Make changes locally** on your branch
2. **Commit with a new commit** - `git commit -am "address review feedback"`
3. **Push to the same branch** - `git push origin your-branch-name`
4. **PR automatically updates** - No need to create a new one
5. **Reply to comments** - Let reviewers know you've addressed feedback

## Code & Quality

### What's your code style?

- **JavaScript** - Follow ESLint config (it's enforced by CI)
- **CSS** - Custom CSS classes (Tailwind isn't working well for us)
- **Components** - Functional components with hooks, meaningful names
- **Commits** - Follow [Conventional Commits](/docs/guidelines)

### Do I need to write tests?

- **UI changes** - Not required but appreciated
- **Bug fixes** - Test to prevent regression
- **New features** - Functional testing should be done locally
- **Critical logic** - Tests are highly valued

We test in CI/CD before merge, but your manual testing saves time!

### How do I handle merge conflicts?

```bash
# Update your branch
git fetch origin
git rebase origin/main

# Resolve conflicts in your editor
# Then continue the rebase
git add .
git rebase --continue
git push --force-with-lease origin your-branch
```

Don't worry - it's easier than it sounds! Ask if you need help.

## Community & Growth

### Can I propose a new documentation page?

Absolutely! We love community-contributed docs. Here's how:

1. **Open an issue** with your doc idea
2. **Write a brief outline** - What will it cover?
3. **Get feedback** - Maintainers will review and discuss
4. **Create the doc** - Either as a PR or draft
5. **Submit for review** - We'll provide feedback and merge!

Examples of great doc topics:
- Setup guides for specific tools
- Learning resources curated by topic
- Troubleshooting guides
- Project showcases

### How do I become a maintainer?

You've shown consistent contributions and deep commitment? Awesome! Here's the path:

1. **Contribute actively** - Regular PRs and engagement
2. **Demonstrate expertise** - Help others, review PRs, improve quality
3. **Show leadership** - Lead discussions and mentor newer members
4. **Receive nomination** - Current maintainers nominate you
5. **Accept invitation** - Join the core team!

There's no set timeline - it's based on demonstrated quality and commitment.

### Can I run a workshop or webinar?

Yes! We love community-led learning. Here's what to do:

1. **Propose a topic** - Open an issue or discussion
2. **Outline the content** - What will participants learn?
3. **Coordinate with maintainers** - Pick a date, promote it
4. **Host the session** - On Zoom or YouTube Live
5. **Record & share** - Help others learn asynchronously

Previous workshop topics:
- React patterns and performance
- Satellite tracking basics
- Setting up your dev environment
- Open source contribution workflow

## Troubleshooting

### CI/CD check failed. What does it mean?

1. **Click Details** on the failed check
2. **Read the error message** - Usually quite clear
3. **Fix the issue locally** - Common fixes:
   - ESLint error: Run `npm run lint` locally
   - Tests failing: Run `npm test` locally
   - Build failed: Try `npm run build`
4. **Commit and push** - CI will re-run automatically

### I accidentally committed to the wrong branch

```bash
git reset HEAD~1        # Undo the commit locally
git stash               # Save your changes
git checkout correct-branch
git stash pop           # Get your changes back
git commit              # Commit on the right branch
git push origin correct-branch
```

### How do I keep my fork in sync?

```bash
# Add upstream remote (one time)
git remote add upstream https://github.com/SASTxNST/Website_SAST.git

# Sync your main branch
git fetch upstream
git checkout main
git rebase upstream/main
git push origin main
```

## More Questions?

If your question isn't answered here:

1. **Check our [Guidelines](/docs/guidelines)** - Covers collaboration
2. **Read [GitHub Process](/docs/github-process)** - Workflow details
3. **Browse existing issues** - Your question might be discussed
4. **Open a new discussion** - Tag maintainers if needed
5. **Attend community events** - Great place to connect and ask questions

We're here to help! Don't hesitate to reach out. 🌟

---

**Last updated:** October 2025 | **Have a suggestion?** Submit a PR to improve these FAQs!
