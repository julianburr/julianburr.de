---
title: Using Chrome Dev Tools in Node
description: How to access and use Chrome Dev Tools features
date: 2019-01-17
tags: js, node
---

I love playing with headless Chrome and puppeteer, writing scripts automating processes or testing websites. But did you know you could access the Chrome Dev Tools in your node scripts? No? Me neither 🤯

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Using DevTools from Puppeteer, TLDR;<br><br>// 1. Create DevTools Protocol session <br>const client = await <a href="https://t.co/iQz7MVgqfu">https://t.co/iQz7MVgqfu</a>().createCDPSession();<br><br>// 2. Emit event(s), e.g:<br>await client.send(&#39;Network.enable&#39;);<br><br>For example, this is how I throttled network &amp; CPU 👇 <a href="https://t.co/LjRFnpzMTd">pic.twitter.com/LjRFnpzMTd</a></p>&mdash; Katie Hempenius (@katiehempenius) <a href="https://twitter.com/katiehempenius/status/1085742033262837760?ref_src=twsrc%5Etfw">January 17, 2019</a></blockquote>

It's super simple, all you need to do is:

```js
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Create a client to access dev tools functionality
  const client = await page.target().createCDPSession();

  await client.send("Emulation.setCPUThrottlingRate", {
    rate: 2
  });

  // Do whatever you actually wanted to do!
})();
```

More on the `CDPSession` can be found [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-cdpsession), all available options from the dev tools protocol can be found [here](https://chromedevtools.github.io/devtools-protocol/).

## Why would you want that

As mentioned in the tweet, Dev Tools give you a lot of power to manipulate your website and the environment it is shown in. If you use puppeteer (or other headless Chrome abstractions) for example to test your website, you can use this to test on different network speeds, potentially catching issues for slow networks that you wouldn't find otherwise. But even beyond network speed, the dev tool protocol has so many features, making this a very powerful tool no matter what you want to do.

In general I just find the posibility to get access to the Dev Tool features within node exiting and will definitely play around with it when I get the chance 😊

The puppeteer docs are a good read and full of gems like this: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
