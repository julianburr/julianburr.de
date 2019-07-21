---
title: Git pull and autostash
description: Keeping your work while pulling latest origin changes
date: 2019-07-13
tags: git
---

I use `git stash` a lot. Like, really a lot. Probably more than you should. It's just a really neat way to keep your changes somewhere while jumping around between branches, e.g. because you have to QA changes from collegues or just quickly want to confirm how things were working in another branch.

Another thing I use `stash` for is when pulling in latest changes from origin without having to commit my changes just yet. It's as easy as this:

```bash
git stash
git pull
git stash pop
```

In the end you either end up with your changes applied on top of latest origin, or you get appropriate conflicts you need to resolve if you and the origin changed the same code.

This is easy and straight forward, but it's still 3 individual steps to do whenever I want to perform this action, which just adds up over time. So when I found this on twitter today it absolutely made my day:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">git tip:<br><br>if you&#39;ve been frustrated by not being able to pull or rebase because you have existing changes,<br><br>say hello to my little friend: <br><br>`git pull --autostash` <a href="https://t.co/gDutlj5A3m">pic.twitter.com/gDutlj5A3m</a></p>&mdash; Tejas Kumar (@TejasKumar_) <a href="https://twitter.com/TejasKumar_/status/1149700419129618433?ref_src=twsrc%5Etfw">July 12, 2019</a></blockquote>

Being able to do all the stashing logic with one git command is just nice. Not solving the biggest problem in the world here, but I think it was neat and I'm definitely gonna use it a lot moving forward 😄
