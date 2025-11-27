# The Perils of Over-Engineering: A GPT-5 Story

**Date:** 2025-11-26

**TL;DR:** AI assistants are great at generating sophisticated solutions. They're not great at knowing when simple is enough. Always ask: "What's the simplest thing that could work?"

## The Setup

I had a simple problem: I wanted my dotfiles automatically installed when my dev container started.

That's it. Clone a repo, run an install script. Should take maybe 10 minutes to implement, right?

## The GPT-5 Suggestion

I asked GPT-5 for a suggestion, in case there was anything else I could consider, and it delivered... enthusiastically. Here's what it proposed:

**A complete configuration system:**
- URL parameters for the setup script endpoint (`/setup?repo=...&branch=...`)
- A `.devcontainer/dotfiles.conf` configuration file
- Multiple configuration sources with precedence rules
- Marker files to track installation state (`~/.dotfiles_installed`, `~/.cache/devmagic/dotfiles.marker`)
- Commit hash tracking and integrity verification
- Retry logic with exponential backoff
- SHA256 checksums for security
- `postStartCommand` integrity checks
- Phased rollout with feature flags
- Detailed audit logs

It was comprehensive. It was thorough. It addressed edge cases I hadn't even considered.

It was also complete overkill.

## The Key Moment

I was really surprised by the complexity of the suggestion, especially given what I already had in mind.

So I literally asked GPT this (copy/pasted from the chat):

> _"That is a very detailed plan, but I believe it is way more complex than necessary. [...]

The full suggestion by GPT-5 had 15 steps, I added the comment below in step 8, already too much for me:

> _"I like the Hybrid approach, but don't think we need all those control files. I want more simplicity, not less. Previously, all I had was the devcontainer-setup.sh file cloning the dotfiles repo to ~/prj/dotfiles, which worked great. The current devcontainer-setup.sh already has a section in which it runs the install.sh if present, we could force a repo clone if the condition is not met."_

And that was it. GPT-5 agreed. We changed one if condition in the existing script, and called it a day.

The setup script checks if the dotfiles directory exists, clones if not, runs the install script.

Then we made some small improvements to let users configure the dotfiles repo/branch via host environment variables, using the existing `${localEnv:VAR:default}` syntax in `containerEnv`, but that's secondary here.

## What I Avoided

By pausing to question the AI's suggestion, I avoided building:

- ❌ Custom endpoint with version/parameter parsing
- ❌ Configuration file format and parser
- ❌ Marker file system for state tracking
- ❌ Commit hash comparison logic
- ❌ Retry mechanisms
- ❌ Checksum verification
- ❌ Feature flag infrastructure
- ❌ Audit logging system

**Time saved:** Hours, easily. Maybe days if you count testing and debugging.

## The Lesson

AI assistants are trained on codebases with varying levels of complexity, being exposed to both simple and intricate solutions. It is our responsibility to guide them and judge the appropriateness of their suggestions.

It is important to recognize that not every problem demands a complex solution. Often, the simplest approach proves most effective—and paradoxically, the hardest to discover. Leonardo da Vinci captured this truth perfectly: "Simplicity is the ultimate sophistication." While complex solutions emerge quickly, finding the simple one requires deeper understanding of the problem domain and the discipline to resist over-engineering—a challenge amplified by AI assistants' tendency toward comprehensive solutions.

Let's learn from this.

**The pattern I've noticed:**

1. You describe a problem
2. AI generates a sophisticated solution
3. The solution is technically correct and thorough
4. It's also 10x more complex than necessary
5. You implement it because "the AI knows best"
6. You spend days building and debugging
7. You realize a one-liner would have worked

## How to Avoid This

1. **Always ask "What's the simplest thing that could work?"** before implementing AI suggestions
2. **Trust your instincts** when something feels overcomplicated
3. **Sleep on architectural suggestions** - if it still seems reasonable tomorrow, maybe proceed
4. **Remember: the best code is code you don't write**
5. **AI doesn't know your context** - it doesn't know this is a solo project, or that you value simplicity, or that "good enough" is often good enough

## The Quote

> "The AI gave me a Ferrari when I needed a bicycle. I chose the bicycle."

The Ferrari would have been impressive. It would have handled edge cases I'll never encounter. It would have been "production-ready" for a scale I'll never reach.

But the bicycle gets me where I need to go, and I can actually maintain it.

## Related

- [ADR 0002: Automatic Dotfiles Installation](adr/0002-automatic-dotfiles-installation.md) - The actual decision record
- [containerEnv vs remoteEnv](blog-containerenv-vs-remoteenv.md) - A related Dev Container gotcha I discovered along the way
