---
title: Preloading with resource hints
description: How you can optimise performance using them
date: 2019-09-21
tags: html
---

If you're working on web apps or even static websites, one of the common buzz words is "performance optimisations". And for good reason, the performance of your website has a huge impact on the user experience, and can therefore make or break a product's success in the market.

If you've then ever looked into how to improve performance, you might have stumbled across something called "preloading resources". This describes the practise where you hint the browser, which resources will likely be requested next (usually based on educated guesses from your side). This could e.g. be the first item in a list users are likely to click, the next page, etc.

The hints are usually done via header tags, e.g.

```html
<link
  rel="prefetch"
  href="https://timedotcom.files.wordpress.com/2015/07/nicolas-cage1.jpg"
/>
```

This e.g. will tell the browser to load the specified image of Nicholas Cage, even though it's not part of the current page. You'd want to do it if you're certain that the user will eventually go to a page where it's needed, so you can save loading time by already loading it into memory now. Browsers are smart about their prefetch behaviour, only loading the resources once all resources of the current page are loaded and the network is idle.

## Types of resource hints

There are several kinds of resource hints, i.e.:

1. dns-prefetch
1. preconnect
1. prefetch
1. prerender

`dns-prefetch` does what the name suggests, pre-fetching information from the DNS (domain name server) for a specific domain. This can be useful, if you use third party CDN's (or even your own CDN, if you have it on a different domain than your actual website) or other third party services (e.g. for webfonts etc.).

`preconnect` does a similar thing, but also does a TCP handshake and verification of the SSL certificate for HTTPS if available. Again, this can save a few milliseconds on future requests to the specified domain.

`prefetch` is the one used in the example above. It allows you to specify a variety of resource types for the browser to prefetch (images, videos, whole documents, etc.), meaning it will be loaded into memory already and served from there once the user opens a page that has that resource in it, significantly improving that page's loading time.

`prerender` is kind of the same thing, just for whole pages. The browser will pre-render the whole page's DOM (and CSSOM I believe) before the user even opens it, meaning once they do, the load will be pretty much instantly. Browser support for this one is pretty limited for now though.

All of these features should be used with care. To aggressive preloading means you actually waste a lot of network time and resources on loading stuff that the user actually didn't need, defeating the purpose of improving user experience over all. But if you're smart about it and use it correctly, resource hints can be an amazing tool to improve your loading times.

## The actual TIL

So all of this wasn't really new to me, but I recently stumbled across this tweet mentioning the `as` attribute, which I didn't know existed. It essentially helps with the `prefetch` functionality, telling the browser exactly what kind of resource it's prefetching, so it can send the appropriate header information etc. to the server.

https://twitter.com/mario_sommer/status/1172214727113609216

The whole thread started by [David Walsh](https://twitter.com/davidwalshblog) is pretty interesting to be honest.

There's also a really good Smashing Magazine article about resource hints, including the `as` attribute, going in-depth on all the different hint types: https://www.smashingmagazine.com/2019/04/optimization-performance-resource-hints/

Generally I find performance optimisations not only super useful, but also pretty interesting. There are so many things you can do to make your website faster, they might just shave a few milliseconds off each, but combined they can make a huge difference, especially for users with slow network conditions

🏎💨
