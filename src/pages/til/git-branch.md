---
title: The neat use case for git branch --sort
description: Finding recent branches you worked on more easily
date: 2021-05-02
tags: git
---

This is a quick one, but it's something that was new to me and ended up saving me A LOT of time, so I write it down.

If you're working on multiple projects with multiple branches, you naturally switch branches a lot during your day to day. This could be because you're working on multiple things, or because you need to review someone else's work, or because you want to test a bug on your branch against the production branch.

Whatever the reason, when switching branches a lot I always found it extremely helpful to be able to use the `-` shortcut in the terminal to switch to the previous branch, i.e.

```bash
# I'm on `master`, but want to check out the `develop` branch
git checkout develop

# Once I'm done, I can quickly jump back to the original branch using `-`
git checkout -
```

This is great, but only works with one previous branch. If I have to switch around between more than 3 branches, this doesn't work anymore. I have a similar problem when creating a few experimental branches where I just play around with ideas. The next day I always struggle to remember what I named these branches and end up desperately going either through all the local branches (which can be a lot in some of the projects) or back through my terminal command history in the hope to find the relevant `git checkout -b ...` command 😅

To cut to the chase, I recently learned the `git branch` has an extremely helpful sorting functionality, that allows you to print out all branches sorted by the date of the last commit:

```bash
git branch —sort=committerdate
```

😍
