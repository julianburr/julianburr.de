---
title: Debugging Typescript performance issues
description: Using the chrome profiler
date: 2022-07-20
tags: js, node
---

Went down the rabbit hole today, trying to debug a performance regression in one of our projects at work when running `tsc`. The regression was fairly recent, so it was easy enough to track down the commit that caused it, but nothing in that commit looked suspiscious.

Not knowing much about how to debug performance issues with typescript, I went through Google to see what people with similar issues do. This is how I came across the following three CLI options for the `tsc` command.

## Useful CLI options

```bash
tsc --listFiles
```

One common issue when running into performance problems is that the compiler pulls in too many third party type files, which can slow down the processing time dramatically. Even though this wasn't the case for us, it's still a useful helper to keep in mind for the future. If this is showing you a lot of `node_modules` files, you might want to try the `--skipLibCheck` option, which makes `tsc` ignore all library type files for the check phase. You also might have forgotten to exclude `node_modules` in your tsconfig.

```bash
tsc --extendedDiagnostics
```

This one will give you a breakdown how much time is spent in various parts of the command, as well as other useful metrices like number of types etc. It can be very useful for comparisons between commits, when you're debugging regressions. However, be aware that typescript (I assume) does some caching under the hood, so running `tsc` multiple times might give you different results here.

```bash
tsc --generateTrace [filepath]
```

This is the money maker 🚀

This command generates a `trace.json` file, breaking down the whole `tsc` process. You can then simply go to Chrome and enter `chrome://tracing` in the URL bar. Here you can upload the json file to visualise it.

In our case this trace showed us that one (!) type definition was taking almost 4 minutes to run `checkExpression` on. I'm still not sure what exactly caused it, but changing the type completely eliminated that performance problem.
