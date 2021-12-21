---
title: Array slice vs. splice
description: Which does what and when should they be used
date: 2019-07-19
tags: js
---

This is not something I learned today, but mainly something my brain just can't seem to comprehend. Every (and I mean EVERY) time I need to get a section of an array I need to go to MDN and look up which of these methods I need to use. 99.9% of the time it's `slice`, since I really just want to get a sub section and I rarely want to mutate my arrays, but my brain just can't remember which of these 2 does the mutating and which returns the requested section 😅

So out of this personal desperation, I created a small landing page (mostly for myself), that quickly shows the difference between those two prototype methods: [https://julianburr.github.io/slice-or-splice](https://julianburr.github.io/slice-or-splice).

It's also great seing on twitter that I'm not the only one having this problem:

https://twitter.com/Jack_Franklin/status/1149670372100452353

Main take away imo from this: build stupid tools and stuff that helps you remember, even if it's just for yourself. I will now (hopefully) always remember which one to use just because I remember building this stupid landing page 🎉

PS: probably gonna have to do the same for substr vs. substring soon 😅
