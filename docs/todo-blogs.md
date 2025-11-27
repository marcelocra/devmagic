# Blog Post Ideas

Ideas for DevMagic blog posts, with outlines to develop later.

---

## 1. The `${localEnv:VAR:default}` Pattern for Zero-Config Customization

**Status:** Maybe - might be too well-known?

**Angle:** "Dev Container tip that took me too long to discover"

**Outline:**
- Problem: Want customizable dev containers without forcing users to edit JSON
- Discovery: The `${localEnv:VAR:default}` substitution pattern
- How it works: Reads from host environment, falls back to default
- Real example: DevMagic's dotfiles configuration
- When to use: Any config that varies per-developer but has sane defaults

**Question for myself:** Is this common knowledge? Check r/devcontainers, Stack Overflow.

---

## 2. Why ADRs Over RFCs for Solo Projects

**Status:** Write this one

**Angle:** "Right-sizing your decision documentation"

**Outline:**
- Context: Solo-maintained project, no team to "request comments" from
- The RFC temptation: Feels "professional" and thorough
- Why ADRs fit better:
  - Lighter weight - decision already made, just documenting
  - No approval process needed
  - Future-you is the primary audience
  - Can always graduate to RFCs if project grows
- Michael Nygard's template: Simple, battle-tested
- Meta point: ADRs help you think through decisions, even alone
- DevMagic examples: The 3 ADRs we've created

**Key insight:** Documentation should match your project's scale.

---

## 3. The Perils of Over-Engineering: A GPT-5 Story

**Status:** ✅ Written at `docs/blog-over-engineering-gpt5-story.md`

**Angle:** "When AI suggests complexity you don't need"

**Outline:**
- Setup: Simple problem - wanted dotfiles installed in dev container
- The GPT-5 suggestion: Build a whole configuration system!
  - URL parameters for setup script
  - Multiple configuration sources
  - Elaborate fallback chains
- The key moment: I paused and asked "what's the simplest thing?"
- What I actually did: Used `${localEnv:VAR:default}` in devcontainer.json
  - One line. Done.
- Time saved: Hours of unnecessary complexity avoided
- Lesson learned:
  - AI is great at generating sophisticated solutions
  - AI doesn't know when simple is enough
  - Always ask: "What's the simplest thing that could work?"
  - Trust your instincts when something feels overcomplicated
  - The best code is code you don't write

**Quote to include:** "The AI gave me a Ferrari when I needed a bicycle. I chose the bicycle."

---

## 4. containerEnv vs remoteEnv: The Dev Container Timing Gotcha

**Status:** Already drafted at `docs/blog-containerenv-vs-remoteenv.md`

**Outline:** See existing draft.

---

## Notes

- Posts 2 and 3 feel most valuable/unique
- Post 1 might be redundant if well-documented elsewhere
- Post 4 is drafted, just needs polish
- Could combine posts into a series: "DevMagic Development Lessons"
