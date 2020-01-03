---
title: Ignore chromium when installing dependencies
description: How to make npm install faster
date: 2019-06-12
tags: js, npm
---

This was one of those AHA moments for me. For quite a while I've been struggling with the performance of `npm install` (or yarn), because one of my dependencies had `puppeteer` as a dependency, which would always pull in chromium which takes ages to download. With my shitty internet connection at home, this could mean waiting 5-10 minutes every time I installed fresh dependencies.

## PUPPETEER_SKIP_CHROMIUM_DOWNLOAD to the rescue

Trough sheer coincidence while looking around for answers to a completely separate issue, I stumbled across some comment mentioning this environment variable. And it does exactly what it says, if set to true this will skip the chromium download when installing puppeteer as dependency.

```bash
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn
```

Not only is that super helpful on a slow internet connection, for us it was also great to speed up our deployments. The specific problem for us at rexlabs was that our internat toolkit that we use to develop and build JS libraries and apps had an old version of storybook as a dependency, which pulled in puppeteer. So on every deployment in the docker container when installing the app dependencies it would also download chromium for no reason. Using this environment variable improved deployment times by up to 7 minutes 🤯

One of those things I just wish I would have known earlier 😅
