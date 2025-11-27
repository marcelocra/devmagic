# Which Blog Posts to Create

great, thanks! feels like there's more content to be put into other blog posts, no?

## Opus 4.5
You're right! Looking at our discussion, there are several distinct topics that could be standalone blog posts:

Potential Blog Posts
1. VS Code Dotfiles Don't Work in Remote Containers (already exists as fix-dotfiles-install.md planning doc)
VS Code's dotfiles.repository setting explicitly doesn't work for devcontainers/Codespaces
The workaround: implement your own cloning in postCreateCommand
Could be extracted/refined from the existing planning doc
2. containerEnv vs remoteEnv ✅ (already created)
blog-containerenv-vs-remoteenv.md
3. The ${localEnv:VAR:default} Pattern for Zero-Config Customization
How to let users customize without editing files
Host env → localEnv → containerEnv → container processes
Pattern for sensible defaults with easy overrides
4. Why We Chose ADRs Over RFCs
Lightweight vs heavyweight documentation
Michael Nygard's template
When ADRs make sense (especially for solo/small projects)
Examples from major open source projects (Aider, etc.)
5. Over-Engineering: How I Almost Built a Marker File System for Dotfiles
Started with commit hash tracking, integrity checks, retry logic
Realized directory presence is sufficient
Lesson: simplicity over cleverness
Would you like me to create any of these? I'd suggest #3 (localEnv pattern) and #5 (over-engineering lesson) as they contain unique insights from our discussion that aren't yet captured elsewhere.


## Me
Other notes:
1. Please, review the AI context files #file:.claude.md , #file:.clinerules , #file:.cursorrules , #file:copilot-instructions.md . Is it really useful to have all of them? Or should I just have one, say, copilot-instructions, which I really use, and point the others to it? What is the best architecture/decision regarding this? Should we create a ADR for it?
1. Please, review the #file:TODO.md file. It was supposed to be an AI todo list that was kept between chat sessions, but I feel like it is already outdated. It was meant to be somewhat like a changelog, with the full repo history. If there's no value in it anymore, move it to the docs folder, please.
1. About the blog posts, below, please, create a temporary todo-blogs file and put the outline of each post before actually writing them, and confirm with me.
1. Should we use date for the adr files? instead of 0001-<filename>, 20251126-2043-<filename>? Feels way more useful.. unique and informative.

About the blog posts:
1. I have to points about this:
    1. We already have an ADR file for it, #file:0002-automatic-dotfiles-installation.md . Is it the same content from #file:fix-dotfiles-install.md ? Would you suggest to keep both?
    1. Problem: when should I create a blog post? I want to have the ADRs for sure, but I also want to avoid writing the same thing twice. It might make sense, since the target public might be different, and also the writing style and structure, but what do you think?
2. cool
3. isn't this well know? If not, go for it
4. cool, really like that. The #file:0003-adopt-architecture-decision-records.md has more context about it
5. I never really considered that. Should definitely be a blog post because it is really important, but we shouldn't write it as if something I almost did. Perhaps we could write it to include all of that, but also mention about paying close attention to what AI suggests, as the whole shebang was a gpt-5 suggestion
