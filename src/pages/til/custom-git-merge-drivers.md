---
title: Custom git merge drivers
description: How to create one and why
date: 2019-04-06
tags: git
---

Today I learned about [custom merge drivers](https://git-scm.com/docs/gitattributes#_defining_a_custom_merge_driver) in git. They essentially allow you to define your own merge behaviour whenever there are merge conflicts, either globally, or, more likely, for specific files, in combination with gitconfig and gitattributes.

## How does it work?

Let's say you want to define a custom merge strategy for a specific file or set of files, since that is the most common use case. The first thing you do is to register the custom driver. This can be either globally...

```ini
# Add this to ~/.gitconfig
[core]
  attributesfile = ~/.gitattributes
[merge "custom"]
  # ^ you can give your driver whatever name you want
  name = custom merge driver for specific files
  driver = custom-binary %A %O %B %P
```

...or locally per project:

```bash
git config merge.custom.name "custom merge driver for specific files"
git config merge.custom.driver "custom-binary %A %O %B %P"
```

Then, in your `.gitattributes` (either globally or in the root of your project) you can assign the new custom driver to specific files. You can use globs to select a group of files as well.

```ini
special-file.js merge=custom
```

And that's it. Once you commited that to your repo, every time this file will run into a merge conflict, it will execute your defined driver to try to resolve it.

## Why is that useful?

Let's take the use case I had as the example here. I was writing a tool that automates the release process for our apps at rexlabs. This tool automatically bumps versions and generates meaningful changelogs whenever a deverloper pushes into one of the release branches. One of the problems I encountered was, when doing hotfixes in a higher branch, it always results in merge conflicts when merging these back into the lower branches whenever these are already ahead. Example:

Let's say we have a `master` branch, which gets deployed as the production environment, and we have a `beta` branch, which gets deployed as the beta environment (e.g. giving selected users early access to new features to ensure stability before pushing to production). There will be a certain delay between pushing to `beta` and then merging `beta` into `master` (to ensure the mentioned stability). So let's say then that `beta` is a couple of commits ahead and is not ready to be merged into `master` yet, but there is a bug in `master` (and therefore in `beta` as well). To fix it we make a hotfix in `master` and merge it back into `beta`. The changelogs and version files will now conflict, since both branches now added entries to them since the last common base.

## How to write a custom driver?

Since I'm a JS developer I was looking at how to write such a driver in node, but you could use anything that can be run as an executable that you can put into the "driver" config.

With the example above, we could write a little script like this:

```js
#! /usr/bin/env node

const fs = require("fs");
const argv = require("yargs").argv;

// This is the information we pass through in the driver config via
// the placeholders `%A %O %B %P`
// %A = tmp filepath to our version of the conflicted file
// %O = tmp filepath to the base version of the file
// %B = tmp filepath to the other branches version of the file
// %P = placeholder / real file name
// %L = conflict marker size (to be able to still serve according to this setting)
const ours = argv[1];
const base = argv[2];
const theirs = argv[3];
const filename = argv[4];

const baseJson = JSON.parse(fs.readFileSync(base));
const oursJson = JSON.parse(fs.readyFileSync(ours));
const theirsJson = JSON.parse(fs.readyFileSync(theirs));

// We can do whatever we want, in this example we just take the new entries from
// our branch and put the new entries from the other branch on top of them
const mergedJson = {
  entries: [
    ...baseJson.entries,
    ...oursJson.entries.slice(baseJson.entries.length),
    ...theirsJson.entries.slice(baseJson.entries.length)
  ]
};

// To resolve the conflict simply write to the current branch file
fs.writeFileSync(ours, JSON.stringify(mergedJson, null, 2));
```

In the config we could now specify:

```bash
git config merge.custom.driver "node ./path/to/node/script.js %A %O %B %P"
```

```ini
# .gitattributes
changelog.json merge=custom
```

And that's it, really. If your script cannot resolve the merge conflict, you can still write the conflict in the usual manner into the file and exit with an error code different to 0 via e.g.

```js
process.exit(1);
```

Ideally also logging before what the issue was and how to resolve it if possible. Like with so many other things, especially in and around git, this feels like a super powerful tool, that should be used with caution 😅 But it definitly helped me a lot with the release tool, getting rid of these painful and unnecessary merge conflicts on pretty much every hotfix 🎉
