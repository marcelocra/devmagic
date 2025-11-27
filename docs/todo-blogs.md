# Blog Post Ideas

Ideas for DevMagic blog posts, with outlines to develop later.

---

## 1. The `${localEnv:VAR}` Pattern and Its Limitations

**Status:** Worth writing - documents a real gotcha!

**Angle:** "Dev Container tip that took me too long to discover (and its hidden limitation)"

**Outline:**
- Problem: Want customizable dev containers without forcing users to edit JSON
- Discovery: The `${localEnv:VAR}` substitution pattern
- How it works: Reads from host environment, passes to container
- **The gotcha:** `${localEnv:VAR:default}` syntax breaks with colons in default values (URLs!)
- Real example: DevMagic's dotfiles configuration
- Workaround: Handle defaults in bash scripts, not devcontainer.json
- Link: [devcontainers/spec#565](https://github.com/devcontainers/spec/issues/565)

**Why write this:** This is NOT common knowledge. The spec issue has few comments, meaning many people hit this silently.

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
