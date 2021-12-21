---
title: Running lighthouse in node
description: How to run lighthouse audits in node
date: 2019-01-30
tags: js, node, perf
---

Similar to other [Dev Tool features](../using-chrome-dev-tools-in-node) with headless Chrome there is a very easy way to use Lighthouse on the website you're currently on, all within node.

As I mentioned in the other TIL, I usually use puppeteer to automate and test. The ability to automatically run and evaluate Lighthouse performance audits is absolutely awesome.

While setting up this website I also experimented with automatic performance reviews for it, using exactly this, Lighthouse in headless Chrome. And it's dead simple.

```js
const lighthouse = require("lighthouse");
const launcher = require("chrome-launcher");

const options = {
  chromeFlags: ["--headless"],
};

launcher
  .launch(options)
  .then((chrome) => {
    const url = "http://my-awesome-website.com";
    return lighthouse(url, options, null);
  })
  .then((results) => {
    // use results.lhr for the JS-consumeable output
    // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
    // ...
  });
```

Specifically with Gatsby I wanted to automate testing my own website during development, which comes with a little bit more (but still surprisingly less than I thought) boilerplate. Essentially we need to build the website, start a node server that serves it on localhost on a specific port, open headless chrome on that port and run the Lighthouse audit on it.

I wrote and published a little CLI tool that lets you do all that within a npm script, also allowing you to actually test your performance against thresholds you can define via additional arguments. You can find more info on that here: https://github.com/julianburr/gatsby-lighthouse-cli

To summarize, performance is important, Lighthouse is amazing to audit your website for performance and best practises and the [lighthouse library](https://github.com/GoogleChrome/lighthouse) allows us to automate this process, making it a no brainer imo for website development 😄
