---
title: Lighthouse User Flows
description: You can now run complete user stories in lighthouse
date: 2021-11-03
tags: js, node, perf
---

It's not a secret that [I'm a huge fan](../running-lighthouse-in-node) of [Lighthouse](https://developers.google.com/web/tools/lighthouse), the tool developed by the Chrome team that can help to not only measure performance and identify underlying issues, but that can also go deeper and help with best practises, accessibility, search engine optimisation and even PWA setup.

The team recently added a new and in my opinion extremely powerful feature, so I thought I'd have a bit of a closer look at it here 😊

## What is Lighthouse

Very brief in a nutshell: it's a tool that let's you measure and test performance and best practises for a given website by analysing various things while the site loads. It's been around for a while now, and comes out of the box in the Chrome Dev Tools. You can also run it manually e.g. using the [node JS client](../running-lighthouse-in-node).

- [About Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [About Core Web Vitals](https://web.dev/vitals/#core-web-vitals)
- [`lighthouse` node library developed by Google Chrome](https://github.com/GoogleChrome/lighthouse)

## What are Lighthouse User Flows

With the new user flows feature, you can now measure performance and best practises for whole user stories, rather than for a single page load. So e.g. instead of just measuring for the initial load of `https://google.com`, you could now measure all these things for the flow of a user loading the site (#1: initial load), then entering a search term (#2: loading of suggestions in the search field) and then hitting enter (#3: loading of the actual search results).

## Why we needed this

Lighthouse has been a very valuable tool for a while now, helping developers understand the performance and best practises and the current "mistakes" or rather potential improvements. However, until now, Lighthouse only ever really worked with the assumption of a full page load when measuring these things.

This is not very realistic, especially in the era of SPAs. A real user doesn't do a full page load when going from one page to another. User flows take exactly this (and more) into account, basically measuring the initial page load and from then on measuring what happens in between the defined interactions.

This can help pinpoint specific performance issues on certain pages (because Lighthouse now e.g. can show the additional network requests needed when navigating to a page in isolation, rather than bulked together with everything else on a full page load). But it also goes further than that, instead of navigating User Flows allow you to define any kind of user interaction, so you could e.g. measure the impact of an autocomplete in your global search, or expanding accordions, etc.

Overall, User Flows allow you to measure more accurately the actual user experience, rather than focusing purely on the initial page load for various URLs 😊

## Further reading

- https://web.dev/lighthouse-user-flows/
- https://developer.chrome.com/blog/lighthouse-9-0/#lighthouse-user-flows
- https://developer.chrome.com/docs/devtools/recorder/ — Chrome plugin that allows you to record user flows
