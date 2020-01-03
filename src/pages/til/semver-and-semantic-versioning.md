---
title: Semver and Semantic Versioning
description: How to version apps and libraries and why
date: 2019-02-16
tags: js, git
---

## What is semver?

It's a [standard for versioning](https://semver.org/). Even if you've never heard of it, you're probably very familiar with the rules, since most software nowadays follows the semver patterns.

It splits your version number into 3 (or 4) individual sections with different meanings and defines rules how to increase the version number depending on the type of changes made since the last version.

```
1.2.3[-rc.0]

│ │ │     │
│ │ |     └───── optional
│ │ └─ patch     prerelease
│ └─ minor
└─ major
```

The different parts are `major`, `minor`, `patch` and optionally `prelease`. According to semver, `patch` includes non-breaking bug fixes, `minor` includes new features (also non-breaking) and `major` includes all breaking changes. `prerelease` is for any changes that are not stable enough for official releases yet (usually for dev / canary builds).

## So why is this important

Having a proper standard and stragety around versioning is important, even more so in the time of OSS. Semver allows for both quick iteration and bug fixes through patch and minor releases, while having safety masures in place for breaking changes. If a library uses semver (correctly), you can always be sure that patch and minor releases will be safe for you to roll out, while major updates should be properly tested.

[npm](https://docs.npmjs.com/misc/semver) for example uses semver when you're defining [ranges](https://devhints.io/semver) in your dependencies with that exact thinking. Say you have the following in your package json:

```json
{
  "dependencies": {
    "awesome-package": "^3.0.0"
  }
}
```

The carrot in front of the package version indicates that you want to allow ranges. This means npm will automatically look for the latest minor version available for the defined major version, assuming following the semver standard they will always be safe no matter which actual minor and patch version you defined at the time, since these releases should never include any breaking changes.

## How to automate versioning in your packages?

Due to all the benefits to the users of your packages, there are a lot of libraries out there to help automate the process of versioning. The following are just some of my personal favorites and by no means meant to be an exhaustive list.

### semver

https://github.com/npm/node-semver

A node library providing helpful util methods around semver versioning, including version incrementing and comparisons, e.g.

```js
const semver = require("semver");
semver.inc("1.0.0", "patch"); // = 1.1.0
semver.inc("1.0.0", "prerelease", "alpha"); // = 1.0.1-alpha.0
```

### semantic-release

https://github.com/semantic-release/semantic-release

A node library to help you automating versioning through scripts / CI. It comes with heaps of plugins to allow you setting up the whole workflow exactly to your needs, incl. automated version bumps determined by your commits (if they follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/)), creating changelogs, creating git and npm releases, etc.

You can also write your own plugins if you need some custom logic.

### commitlint

https://github.com/conventional-changelog/commitlint

Helps you enforcing conventional commit messages, to allow tools like `semantic-release` properly detect the next appropriate version from your git log.

## Versioning in libraries vs. versioning in apps

The last thought I want to add is my personal opinion when it comes to app versioning. All the above makes a lot of sense when dealing with libraries. Users of your library rely on your versioning to know what releases are safe for them to use.

On an web application level this usually doesn't apply. But that doesn't mean that versioning is not still useful and should just be left aside. Depending on your deployment setup, you might have multiple environments. Commonly a "production" and at least one "staging" one, which allows you to test everything before shipping it to real life users. So instead of determining the next version from the commits, at rexlabs we determine the version from the branch / environment we deploy to. Staging could be `patch` version, production could be `major` versions.

"But why" you ask. Versions are very useful to keep track of changes over time. E.g. for metrics, issue reports, etc. Being able to track down when a bug first showed up will make it easier for you to track down where it comes from. You can use the app version for any form of reporting. Also you can still use commits for your changelogs and automate them (for internal use or even for users if your commit messages are meaningful enough) whenever you merge changes into an environment. This is where `sematic-release` plugins can come in handy to define your own logic for these proceses.

Overall I think versioning is a pretty underrated while absolutely crucial part of our day to day work as software and product developers.
