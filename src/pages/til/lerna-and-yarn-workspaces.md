---
title: Lerna and Yarn Workspaces
description: Working with monorepos
date: 2018-10-20
tags: js
---

With our [component library at rexlabs](../../my-work/projects/vivid/) I have to deal with monorepos on a daily basis. Actually, many of our products are set up as monorepos, allowing us to maintain multiple apps belonging to the same product in one place (source control wise). This also means I have to deal a lot with [Lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/), these are some thoughts and takeaways from that.

At this stage I also want to give a huge shout out to [Lochlan Bunn](https://twitter.com/loklaan), who's been teaching me and the rest of the team all of this when I started at [rexlabs](https://rexlabs.io) 🙌

## What is yarn workspaces?

Yarn comes with a great feature out of the box: workspaces. These are essentially what monorepos are, you have one repo with a lot of sub repos (= workspaces). More concrete these could e.g. all be individual npm packages, but for the sake of maintanance and setup its easier to have them in one github repository.

Popular examples for the use of monorepos (and yarn workspaces) are [React](https://github.com/facebook/react/), [Babel](https://github.com/babel/babel), [Storybook](https://github.com/storybooks/storybook) and a lot of others.

Yarn workspaces helps you with this kind of architechture. Every sub repo has its own package json, but a lot of the dependencies are usually the same, so you get a lot of unnecessary bloat. Through workspaces yarn can manage that, hoisting all shared dependencies up into the root of your repo. It can also identify linkages between your own packages, meaning if one of you sub repos depends on another one of you sub repos in the same monorepo, yarn will symlink these for you, making development inside the monorepo a hell of a lot easier.

So what do you need to do to use workspaces? Not much!

```yaml
// package.json in the root of your project
{
  "private": true,
  "name": "mono-repo-example",
  "workspaces": ["workspace-a", "workspace-b"]
}
```

In a more realistic example, you'll probably have a subfolder for all your packages in the monorepo, so you'd do something like this:

```yaml
// package.json in the root of your project
{
  "private": true,
  "name": "mono-repo-example",
  "workspaces": ["packages/*"]
}
```

And that's it, really. As far as workspaces are concerned, at least.

## So how does Lerna fit into this?

First of all, Lerna used to be the go to tool before yarn workspaces became a thing, dealing with exactly the same issue yarn does now (e.g. dependency linking and hoisting). However, unlike some people think, Lerna is not obsolete now that this can be handled much easier with workspaces.

Lerna still comes in handy whenever you actually want to do something with your packages. Be it publishing them, running test or any other arbitrary scripts over them. You name it. Lerna actually ties in really well **with** yarn workspaces, making the setup as simple as this:

```yaml
// lerna.json
{
  "packages": ["packages/*"],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

```yaml
// package.json in the root of your project
{
  "private": true,
  "name": "mono-repo-example",
  "workspaces": ["packages/*"],
  "scripts": {
    "test": "lerna run test --stream", // runs "test" script in all packages
    "publish-all": "lerna publish" // starts publish flow for all changed packages
  }
}
```

Really recommend reading the documentation in the github repo for more details 😊
