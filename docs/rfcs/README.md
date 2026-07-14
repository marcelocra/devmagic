# RFCs (Design Discussions)

This directory holds the **running discussion** for a feature or bug before (and often during and after) it gets built: the problem, the context, the options considered, the back-and-forth that led to a decision, and open questions. It is DevMagic's equivalent of what many projects call a "design doc" or "proposal."

## RFC vs. ADR vs. `docs/archives/`

DevMagic already has two other places decisions show up, and it's worth being precise about how they differ:

- **RFC (`docs/rfcs/`, this directory)** — the _process_ of reaching a decision. Long-form, informal, evolving. Captures the problem, the context, every option considered (including ones we rejected), the discussion (including AI pairing sessions — paste the relevant exchange in, don't just summarize it away), and open questions that are still, well, open. An RFC can stay in "Draft" or "Exploring" status indefinitely — not everything needs to be resolved immediately, and writing it down is valuable even before a decision is made.
- **[ADR](../adr/) (`docs/adr/`)** — the _result_. Short, final, rarely edited after acceptance. Title, status, context (a paragraph, not a transcript), the decision, alternatives considered (a summary, not the debate), and consequences. If an RFC leads to a decision, the ADR is the two-paragraph summary of it — and should link back to the RFC for anyone who wants the full story.
- **`docs/archives/`** — informal planning notes and brainstorms that predate this convention (blog planning, an early refactor plan, etc.). Kept for historical reference; not maintained as a structured system. New planning work should use `docs/rfcs/` instead.

Put differently: **RFC → (optional) ADR**. Many RFCs never need an ADR — a bug fix or a small feature doesn't need a decision record, just a place to think out loud and leave a trail. Reach for an ADR once there's a decision worth being able to cite later ("why did we do it this way?").

## When to write one

Not everything needs an RFC. Use your judgement — the [OpenBMC design doc guidelines](https://github.com/openbmc/docs/blob/master/designs/design-template.md) put it well: if a change can be made in a single, reasonably small patchset with little impact, it doesn't need a design discussion.

Write one when:

- The problem or the right approach isn't obvious, and you want to think through it (or work through it with an AI pairing session) before touching code.
- There are multiple real options and you want a record of why the others were rejected.
- The discussion is likely to resurface later ("didn't we consider X already?").

## Format

1. Copy `template.md` to a new file: `NNNN-short-title.md`, numbered sequentially like ADRs (shared numbering isn't required — RFC numbers and ADR numbers are independent sequences).
2. Start in whatever status fits — usually `Exploring` or `Draft`.
3. Keep appending to the Discussion Log as the conversation develops. Don't rewrite history — append, with dates. It's fine (encouraged, even) to paste in verbatim excerpts from a chat with an AI assistant or a conversation with a collaborator; that context is exactly what gets lost when people only keep the final decision.
4. When (if) a decision is reached, either fold the summary into the RFC's own "Decision" section, or — for decisions worth citing later — write an ADR and link to it from the RFC (and vice versa).
5. Update the status: `Decided`, `Implemented`, `Superseded`, or `Abandoned`. Don't delete abandoned RFCs — the discussion of why something _wasn't_ done is often as valuable as why something was.

## Index

- [0001 - Unify Installer Implementation (Scripts vs. Generated Templates)](0001-unify-installer-implementation.md) — **Exploring**
