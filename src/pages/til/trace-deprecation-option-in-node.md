---
title: trace deprecation option in node
description: How to easily find who's causing it
date: 2019-04-09
tags: terminal
---

I recently spent a bit of time trying to upgrade our internal toolkit at rexlabs to the latest versions of webpack, babel, jest and storybook. Naturally, e.g. upgrading webpack from v 2.x to 4.x, a lot of the API changed and a lot of plugins needed (or still need) to change.

As a result of that, I found myself going through heaps of deprecation warnings in the process. Manually disabling and enabling plugins in order to find out which ones were causing the issues, until I stumbled accross a comment on one of the github issues: https://github.com/webpack/loader-utils/issues/75#issuecomment-285637755

## -&#8203;-trace-deprecation

Well, turns out there is a node option to easily show where the deprecation warning is coming from. Wish I'd known that 4 hours earlier 😅

In any way, by simply adding it to the command you get super helpful stack traces with your warnings:

```bash
# e.g. before
myscript build
# ^ throws a bunch of deprecation warnings

node --trace-deprecation myscript build
# ^ still throws the warnings, but now includes stack traces for them
```

You can even activate it within your node script, by setting the following process variable, simply utilising nodes internal [deprecation mechanisms](https://nodejs.org/api/util.html#util_util_deprecate_fn_msg_code):

```js
// in your node script before running whatever is causing the warnings
process.traceDeprecation = true;
```

🤯
