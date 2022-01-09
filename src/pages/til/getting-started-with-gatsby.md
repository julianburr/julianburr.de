---
title: Getting started with Gatsby
description: My brief takeaway from setting up this website using GatsbyJS
date: 2019-01-28
tags: js, react, node
---

I decided to have a closer look at [Gatsby](https://www.gatsbyjs.org/), mainly because I heard many good things about it and wanted to have a closer look at the concept and development strategies behind it. But I never really had a good use case for it to start playing around.

So I decided to give my personal website a make-over using Gatsby, and [here we go](https://github.com/julianburr/julianburr.de). You're looking at it right now 😉

## My takeaways

First of all, this is not a tutorial or detailed analysis, this is just a short list of takeaways from what I found and learned setting up my own website.

### Getting set up is super simple

It honestly took me less than an afternoon to [get started](https://www.gatsbyjs.org/docs/quick-start) and the layout for my website set up. That kind of blew my mind. You get everything you need out of the box, with sensible defaults for common use cases. There are also many different starters out there, just have a look at the Gatsby github repos or google for packages from other contributors.

### Plugins for everything'

As I said, Gatsby gives you pretty much everything you need out of the box, usually delivered through plugins. And whenever I ran into something where I thought "man, a plugin for this would be amazing", it turned out someone already did it 😄 In general from my first impression the community behind Gatsby seems awesome and resources are plentyful.

### Great documentation

While still work in progress, [the documentation for Gatsby](https://www.gatsbyjs.org/docs/) is superb. I had no trouble getting started and then digging into the nitty gritty parts of the library. Again the community helps here, being able to copy paste configs from other developers makes exploring and understanding super easy (at least for me, who likes learning by doing).

### Best practise

It kind of blew my mind when I ran [a Lighthouse audit on my Gatsby website](https://github.com/julianburr/gatsby-lighthouse-cli) for the first time. Great scores, and I didn't do anything. The setup you get not only comes with but also encourages best practises 😊

## My favorite plugins

- [`gatsby-transformer-remark`](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/) - for obvious reasons, the content of my website is largely markdown driven, which is super convenient for me when it comes to updating content, and also allows other people to submit PRs on github to fix typos etc. Win-win 🎉
- [`gatsby-plugin-svgr`](https://www.gatsbyjs.org/packages/gatsby-plugin-svgr/) - I love using SVGs as React components, using `svgr` in other projects
- [`gatsby-plugin-styled-components`](https://www.gatsbyjs.org/packages/gatsby-plugin-styled-components/) - personally I'm a fan or `styled-components` (or CSS-in-JS in general), this Plugin helps with the SSR part of it

I'll try to keep this list updated as I find more awesome plugins while building and maintaining my site 😊
