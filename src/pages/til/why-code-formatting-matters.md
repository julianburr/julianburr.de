---
title: Why code formatting matters
description: And why I love prettier
date: 2020-05-23
tags: opinion
---

This is going to be a quick one, but seeing this tweet reminded me of the importance of good code formatting, why it's not always "just opinions" and bikeshedding, and why `prettier` is so awesome.

https://twitter.com/rickhanlonii/status/1259246670136696833

https://twitter.com/rickhanlonii/status/1259247285864738816

For me this was one of the best visualisations how code formatting can completely change how easy or hard it is to quickly consume the code. Not only in the sense of reading it and understanding what it does, but also scanning it for certain functionalities and behaviours.

Especially on larger established code bases, where a lot of the work that you do on existing code is finding and fixing issues, extending existing functionality, etc, imo it is extremely important that the code is structured in a way that easily allows for that, even if that means adding a few more lines.

You always need to keep in mind that any unclear code (be it bad variable names, unclear boudaries between different code chunks, etc) will inevitably lead to cognitive overhead. Maybe not for you (because you're used to a certain pattern and/or have written this bit of code), but definitely for other developers. I don't think we can completely eliminate this overhead, but I do think when working in a team, everyone in that team should do their best to reduce it as much as possible.

## Prettier

In case you're not familiar with it, [`prettier`](https://prettier.io/) is a tool that's been around for a while now. It's trying to help automate formatting concerns (to certain extends) to remove it from the responsibilities of the developers and free up that cognitive power to do the actual work.

If you're writing Javascript (or HTML, CSS, GraphQL, YML, Markdown or even other languages like [PHP](https://github.com/prettier/plugin-php) for that matter), and you're not using `prettier` or some other tool like it, you should definitely check it out 😊
