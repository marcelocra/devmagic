# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for DevMagic.

## What is an ADR?

An Architecture Decision Record (ADR) captures an important architectural decision made along with its context and consequences. ADRs help teams understand:

- Why certain decisions were made
- What alternatives were considered
- What the trade-offs and consequences are

## Format

We use a simplified version of [Michael Nygard's ADR template](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions), which is the most popular format in open-source projects.

Each ADR contains:

1. **Title** - Short present-tense statement
2. **Status** - Proposed, Accepted, Rejected, Deprecated, Superseded
3. **Context** - What is the issue we're seeing that is motivating this decision
4. **Decision** - What is the change we're proposing and/or doing
5. **Consequences** - What becomes easier or harder to do because of this change

## Naming Convention

ADRs are numbered sequentially and use lowercase with dashes:

- `0001-use-dev-container-features.md`
- `0002-automatic-dotfiles-installation.md`
- `0003-adopt-architecture-decision-records.md`

## Creating a New ADR

1. Copy `template.md` to a new file with the next number
2. Fill in the sections
3. Start with status "Proposed"
4. After team discussion, change to "Accepted" or "Rejected"
5. Commit to the repository

## Index

- [0001 - Use Dev Container Features](0001-use-dev-container-features.md) - **Accepted**
- [0002 - Automatic Dotfiles Installation](0002-automatic-dotfiles-installation.md) - **Accepted**
- [0003 - Adopt Architecture Decision Records](0003-adopt-architecture-decision-records.md) - **Accepted**
- [0004 - Consolidate AI Context Files](0004-consolidate-ai-context-files.md) - **Accepted**
- [0005 - Generate Devcontainer Files from Templates](0005-generate-devcontainer-files-from-templates.md) - **Accepted**
- [0006 - Serve Generic Project Templates Through the Installer Registry](0006-generic-template-installer.md) - **Accepted**
