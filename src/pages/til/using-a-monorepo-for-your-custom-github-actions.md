---
title: Using a monorepo for your custom Github Actions
description: How you can easily serve reusable custom actions from a (private) monorepo
date: 2022-01-09
tags: devops
---

As [mentioned before](../github-actions/), I'm a big fan of Github Actions for CI/CD pipelines. So recently, I played around with ways to create reusable custom actions using a monorepo setup.

## Why?

Github has a [pretty good and straight forward way](https://docs.github.com/en/actions/creating-actions/about-custom-actions) of creating reusable custom actions. Just create a public repo, add a `action.yml` file describing the action (and potentially pointing to any executable for the action itself), done!

However, this had two major shortcomings for me.

Firstly, I wanted to maintain my custom actions in a monorepo. This is 100% personal preference, I just like to have all tooling etc in one place rather than split and potentially copy pasted across countless separate repos. I.e. having common util functions for my JS actions, or the testing setup for all actions in one place means whenever I update and improve it, all actions benefit from that. The way Github detects custom actions doesn't work with monorepos.

On top of that, Github only looks for public repos to detect custom actions. That means when e.g. creating actions for your company where you might not expose them publicly, you can't just create a private repo the same way.

## The "solution"

You can get past both restrictions with a "simple" workaround. It takes advantage of the fact that you can reference custom actions by pointing to a locally checked out directory containing the `action.yml`. So, in order to point to a private custom action and/or to an action in a monorepo, all you need to do is check out that repo in your workflow and then pointing to the local folder with the action in question.

```bash
# Example folder structure in your `github-actions-monorepo` repo
.
├── some-custom-action
│   └── action.yml
└── another-awesome-custom-action
    └── action.yml
```

```yml
# In your `app` repo's workflow yml file

name: Example

on:
  push:
    branches:
      - main

jobs:
  deploy_production:
    runs-on: ubuntu-latest
    steps:
      # Check out the `app` repo
      - uses: actions/checkout@v2

      # Check out the `github-actions-monorepo` repo
      # The github token will allow it to be private as well :)
      - name: Checkout GitHub Actions Repo
        uses: actions/checkout@v2
        with:
          repository: your-username/github-actions-monorepo
          token: ${{ secrets.GITHUB_TOKEN }}
          path: .github/actions/custom-actions

      # Use any of your custom actions
      - name: Some Custom Action
        uses: ./.github/actions/custom-actions/some-custom-action

      # Use a custom action with input parameters
      - name: Another Awesome Custom Action
        uses: ./.github/actions/custom-actions/another-awesome-custom-action
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          foo: "bar"
```

## What about versioning?

The standard way of defining custom actions allows you to easily version them and reference a specific version in your workflow. To do so, all you need to do is add git tags to the custom action repo.

To do the same with the monorepo setup, you can do pretty much the same. Either you just version the monorepo itself (meaning all actions will always be on the same version), or you version each action separately. Using something like [`lerna`](https://lerna.js.org/) allows you to easily do either.

Then, in your app's workflow, you just check out the specific tag of the actions monorepo instead of the latest:

```yml
- name: Checkout GitHub Actions Repo
  uses: actions/checkout@v2
  with:
    repository: your-username/github-actions-monorepo
    ref: v1.0.1
    token: ${{ secrets.GITHUB_TOKEN }}
    path: .github/actions/custom-actions

# or with action specific versioning
- name: Checkout GitHub Actions Repo
  uses: actions/checkout@v2
  with:
    repository: your-username/github-actions-monorepo
    ref: some-custom-action@v1.0.1
    token: ${{ secrets.GITHUB_TOKEN }}
    path: .github/actions/custom-actions
```

The only downside would be that you need to check out multiple refs of the monorepo if you want to use different versions of any custom actions. But imo that's not really a problem 😅
