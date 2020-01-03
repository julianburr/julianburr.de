---
title: Pre-render React applications with webpack
description: SSR without service side rendering
date: 2019-05-10
tags: react
---

Today I spent some time working on out internal JS toolkit we use at rexlabs. It helps us bootstrap, develop and build JS modules, React components and React applications in a quick manner, similar to [`create-react-app`](https://github.com/facebook/create-react-app/tree/master/packages/create-react-app) (with [`react-scripts`](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts)). While we usually build CRUD applications that are hidden behind authentication, where server side rendering would be benefitial but isn't a major concern, we also build landing pages for these applications in React. We currently don't have any architechture for actual server side rendering set up, so I was playing around with alternatives.

The one that I wanted to look into for a while now and that still seems to be most promising to me: pre-rendering. The idea is very similar to SSR, however you pre-render the app at build time, not on request on the server. This removes the necessity for any server set up, and is ideal for the use case we have at rexlabs (landing pages, usually single pages).

Pre-rendering is e.g. what [`gatsby`](https://www.gatsbyjs.org/) does as well, with a node runtime at build time that pre-renders all routes of your website or application. However, for our use case, I was more interested in a solution that would fit into our existing stack and tooling. So I looked at webpack plugins and loaders and was positively surprised.

More specifically: the webpack loader I looked at was the [`prerender-loader`](https://github.com/GoogleChromeLabs/prerender-loader) by the Google Chrome team. And it just worked, no changes to the app setup and code needed, other than adding the loader to the webpack config. Magic 🎉

Except for one thing: styles. At rexlabs we built our theming system on top of [`glamor`](https://github.com/threepointone/glamor), a popular CSS in JS library. I'm still looking into why, I suspect it's either because the DOM at build time does not behave the same as in the browser at run time, so the styles cannot be inserted as expected, or it's because `requestAnimationFrame` is not defined in the node environment for the pre-render. This would break things, because in the glamor fork we work with at rexlabs we use `requestAnimationFrame` to insert the style rules. I'll post an update and more specific code examples once I solved the problem.

🙃
