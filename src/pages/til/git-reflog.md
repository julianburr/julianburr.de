---
title: git reflog
description: How you can recover most things in git
date: 2021-02-01
tags: git
---

There are a lot of commands in git that alter the git history and it might seem if you accidenially removed a commit that way that it's lost forever, but most of the time that's actually not true.

One of the most helpful commands to recover "lost" commits in git is `git reflog`.

## What does reflog do

Git internally keeps track of all changes that are being done to references, be it normal commits creating new ones, rebase and force push creating new ones (and "overwriting" or "deleting" old ones) or resets just putting the HEAD onto a new reference. All those actions are being logged, and `git reflog` is your way to access this information.

You can use the command on the current HEAD, which is the default, a specific branch and even on the current stash.

```bash
git reflog
git reflog show HEAD  # same as above
git reflog show some-branch
git reflog show stash
git reflog show --all  # shows all references
```

You can then use the references listed in other git commands.

```bash
# e.g. to compare two refs
git diff stash@{0} main@{0}
```

## What's the difference between `git log` and `git reflog`?

The above already describes the difference somewhat, but put into simple terms:

`git log` takes the last commit of the HEAD (or whatever branch you specify) and from there shows all parent commits from that commit, and from there all parent commits from all those parent commits, etc. In a nutshell, `git log` will show you all commits from your currently active history.

`git reflog` does not traverse/go back finding parents and parents of parents, all git reflog cares about to order the list of commits (and other actions) is the order in which they were executed. The big difference is that `git reflog` will also include e.g. commits that are no longer part of your currently active history and therefore wouldn't show up in the `git log` output (e.g. because you've changed the commit through a rebase or reverted it through a reset).

## References for specific time frames

Git does not only allow you to point to a reference by using the ref index (e.g. `main@{0}`), it also allows for time frames

```bash
main@{1.day.ago}  # will point to the first ref after that specific time
main@{2019-11-16.11:30:00}  # you can even use a specific date
```

This can be very handy if, as mentioned above, you want to use these references in other git commands.

```bash
git diff main@{0} main@{1.month.ago}
```

## How to recover from a bad rebase or reset

So how can you actually use the reflog command to recover from something that accidentially changed or "removed" a commit? As mentioned above you can use the refs shown in the reflog output as references in other git commands, so the easiest way is to use the ref you accidentially got rid of in the `git reset` command.

```bash
# lets say you accidentially squashed two commits you didn't want to squash
git rebase -i HEAD~2

# to recover, you can use `git reflog` to find the ref before the rebase
git reflog

# This will output something like this
#  HEAD@{0}: rebase -i (finish): ...
#  HEAD@{1}: rebase -i (start): ...
#  HEAD@{2}: commit: second commit
#  HEAD@{3}: commit: first commit

# and then use the reference of the commit before the rebase to reset
git reset HEAD@{2}
```

## Some gotchas

### Reflogs are not kept forever

In order to free up space, git (internally) tries to clean up dangling references (references that are "unreachable") every now and then. This means you should never really rely on being `git reflog` to recover anything you haven't changed just now. On a side note, you can trigger this clean up manually as well, running `git reflog expire`.

### This is local

Reflogs are local to your machine, you cannot recover un-pushed commits etc from another developers machine through `git reflog`.

### Still be mindful with destructive git commands

While this is a safety net in a lot of cases to recover from accidential mistakes, I think it should not be treated as a cure-it-all. Mainly because of the other gotchas above, you should still always be cautious whenever you're preforming any actions in git that are potentially destructive (e.g. `git rebase`, `git reset`, etc) 😊

## Further reading

- https://git-scm.com/docs/git-reflog
- https://github.blog/2015-06-08-how-to-undo-almost-anything-with-git/
- https://www.atlassian.com/git/tutorials/rewriting-history/git-reflog
