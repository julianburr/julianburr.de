---
title: Vivid
type: Project
description: Building a Frontend React Component Library / Design System
date: 2019-01-01
job: rexlabs
---

## The Project

At [rexlabs](https://www.rexlabs.io), we transitioned from a one product company into a product house over the last couple of years. One of the things this brought with it was the fact, that we now build multiple different, completely independent brands, while we are building new products.

This created an interesting challenge for the frontend team. How can we avoid building the same things over an over again and utilise solutions we built for one product for all the others as well. Especially when it comes to styling of the app and the app's components.

The solution: a centralised component and module library, that acts as the foundational design system all our brands inherit from.

## The Concept

The concept is simple and probably nothing too revolutionary in itself. A central collection of libraries and npm modules, that solve all our common problems across brands and provide a white branded component library for every brand to build on. On app level all that needs to be done, ideally, is to put the pieces together like lego and apply the brand styles.

## Technical Challenges

To start with, the architechture of the whole system. While this was largely initiated by [Lochlan Bunn](https://twitter.com/loklaan) before I even started at rexlabs, him, [Tom McCarthy](https://twitter.com/iamtommcc) and myself took on the task of actually evolving it into a working frontend ecosystem.

The basis is a [monorepo](https://danluu.com/monorepo/), that contains all the packages, managed via a [lerna](https://github.com/lerna/lerna) setup, providing a toolkit that provides a modern webpack, babel, [jest](https://jestjs.io/) and [storybook](https://storybook.js.org/) stack, allowing us to quickly build, maintain and constantly iterate over JS modules, React components and React applications without constantly needing to worry about the underlying tool setups and configurations 🎉

For the branding, Lochlan built an abstraction layer on top of [glamor](https://github.com/threepointone/glamor), a popular CSS-in-JS library, early on, that allowed us to override styles for our components via a simple provider. No need to wrap or even override the core components for no reason, kind of bringing the "C" back into CSS-in-JS.

## Where is it going?

Another challenge that we're still solving: open sourcing all of this. Obviously we want to contribute back to the community, even if noone might actually be able to use what we built (it's of course pretty opinionated towards our products and business requirements), but at the very least allow others to see how we solved some of the common problems in the industry and build their solutions on top of that knowledge, basically exactly like we did.

In general I think working on a project like this was massive for me. Besides the obvious technical skills I picked up the way, my thinking about developer experience, the collaboration between design and development teams as a combined product team, and the way we think about and deal with design systems, has evolved a lot.

😊
