---
title: How to use git rebase --onto
description: And how it is different to a normal rebase
date: 2019-02-13
tags: git
---

Ever accidentially based your feature branch off the wrong branch. But you already made a bunch of commits, so now you have to cherry pick every commit individually over to the correct branch?

I've been there way to often, and everyone who's been there as well also knows that `git rebase`, despite logical reasoning, doesn't seem to help in this situation, since by default it will take all your commits that are different to the branch you are rebasing on and puts them on top, meaning you're not only getting your changes, but also all the other changes from the "wrong" base branch.

Lets say we have a `master`, a `develop` and a `feature` branch. And you need to base the feature off `master` (maybe its super urgent or something), but out of habit created the branch off `develop`

```
master    1
develop    \--- 2 --- 3
feature                \--- 4 --- 5 --- 6
```

```bash
git checkout feature
git rebase master
# Trying to get 4, 5 and 6 on top of master instead of develop
```

This looks like the intuitive way to do it, since it is how you would describe it (you want to rebase your changes onto master). Git by default however is not smart enough to know what "your changes" are, it just compares your branch to the branch you want to rebase onto, so i.e. it would find that all `2`, `3`, `4`, `5` and `6` are different and would need to be picked on top of `1`. Since in this example nothing changes, it will tell you `Branch is already up-to-date` and that's it.

As I mentioned, I used to jump in and manually cherry pick my commits into the right branch when I got into these situations. But recently I learned about the `--onto` flag, and I'm still secretly wondering why this is not the default behaviour...

Anyhow, long story short, you **can** use `git rebase` to solve this situation, you just need to use the `--onto` feature.

```bash
git rebase --onto [TARGET BRANCH] [CURRENT BASE BRANCH]

# So in this example
git checkout feature
git rebase --onto master develop
```

This way you help git understand which commits you actually want to move to the other branch. It will grab everything between the current base branch and the HEAD and puts that on top of the target branch using rebase.

```
master    1
feature    \--- 4 --- 5 --- 6
develop     \--- 2 --- 3
```

You don't even have to pass in branch names, it works the same way with any other commit reference, e.g. hashes or relative references like `HEAD~4`. This can come in handy e.g. when you realise that a commit you made to a feature branch should probably have gone into a separate hotfix branch so that it could get merged and everyone else on the team would get the fix without having to wait for your feature.

Knowing about the `--onto` flag has saved me heaps of time and frustration lately, so I thought its worth sharing. You can read up on it in more detail [here](https://content.pivotal.io/blog/git-rebase-onto) or in the official git docs as usual.
