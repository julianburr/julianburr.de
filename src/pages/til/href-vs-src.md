---
title: href vs. src
description: The differences and inconsistence in use
date: 2019-08-07
tags: html
---

I've always been struggling to remember a lot of the HTML attributes for various tags, but probably the one I get most frequently wrong is `<link src="styles.css" />`. Or was is `<link href="styles.css" />`? 😉

When I saw [this post](https://t.co/5uaERhEhwG?amp=1) on dev.to, I realised I never really thought about if there was a system or pattern behind it, explaining the usage of `href` vs `src`.

But it turns out there is at least some logic behind it.

https://twitter.com/BrendanEich/status/1151317825908166656

To sum it up, both are references to resources, but the `src` attribute is used for resources that are automatically loaded, while the `href` attribute is used for resources that are dynamically loaded through a trigger, e.g. a user click in case of the anchor tag.

But, I know what you think. The `link` tag "statically" references a resource but uses the `href` attribute, so what's up with that? That's where the inconsistency comes in 😅

https://twitter.com/wiumlie/status/1151458530567831553

So, considering all I'm not sure how useful this little piece of knowledge will be, but it generally always helps me to understand the reasoning behind why certain things are the way they are 🤓
