---
title: Continuous Delivery
description: Ideas and tools to help getting there
date: 2019-12-20
tags: devops, js
---

## The idea

Not really a TIL in the sense that I learned this today, but it's been something I got more insight over the past couple of weeks. Mainly due to the fact that it's something a new co-worker is passionate about, which triggered my interest.

The idea of "continuous delivery" is simple: shortening the release cycle of your product, while also reducing risk.

Sounds magical, right? If such a silver bullet exists, why do any product teams out there still struggle with releases? The answer might be obvious, but still: continuous delivery is the ideal, the goal. However, there is no "one path" to get there. So while we all know what the ideal could look like, it's on the team to figure out what that actually means under the specific circumstances and requirements of their product.

## Good reads and other resources

- https://www.atlassian.com/continuous-delivery/principles
- https://www.thoughtworks.com/continuous-delivery
- http://stories.visualstudio.com/bing-continuous-delivery/

## Some tools that might be useful

Ergo, in the following I won't go into much more detail on continuous delivery itself, and rather list some of the resources and tools I found helpful and interesting so far.

Again, as a disclaimer, I don't have much experience with continuous delivery yet, it is something we're striving for at rexlabs and still have to figure out for ourselves. Also, I'm focusing on tools useful from a frontend perspective ... since I'm, well, a frontend dev 😅

### CI

Continuous delivery is much easier if you already have continuous integration, automating steps and processes e.g. whenever you push to a specific branch. There are a lot of tools and libraries that can help you with this:

- [Github Actions](https://github.com/actions) — Automate processes and actions based on triggers within Github, can we useful if your code already lives there and is public (Github Actions is not free for private repos)
- [Gitlab CI/CD](https://docs.gitlab.com/ee/ci/) — Gitlab has a very got CI/CD pipelines feature, even if your code lives in Github, combined with the repo mirroring you can easily use Gitlab for your continuous integration
- [Travis CI](https://travis-ci.com/plans) — Travis is a free (for public repos) CI tool, usually used for things like running tests whenever changes are pushed to a branch or PR
- [Circle CI](https://circleci.com/) — CI tool, alternative to Travis

### Deployment

- [Surge](https://surge.sh/) — free deployment platform, can be useful if you want to deploy your PRs / branches to be able to manually run tests at certain stages besides all the automation (or if you need a deployed version for any automated processes)
- [Heroku](https://www.heroku.com/) — alternative to Surge

### Testing

- [Jest](https://jestjs.io/) — JS unit testing
- [`@testing-library`](https://testing-library.com/) — a collection of helpful libraries for different platforms/libraries like React, Angular, etc.
- [Cypress](https://www.cypress.io/) — E2E testing framework, providing a great UI and overall developer experience, atm Chrome only, but there is active work on other browsers!
- [Nightmare JS](https://github.com/segmentio/nightmare) — E2E testing framework on top of headless chrome
- [Puppeteer](https://github.com/puppeteer/puppeteer) — general headless chrome framework, in my opinion too low level for E2E testing, but if you need more flexibility, this might be your best candidate

### Linting & Formatting

- [Prettier](https://prettier.io/) — Opinionated code formatter
- [Eslint](https://eslint.org/) — JS (and TS) linter

### Other tools

- [Husky](https://github.com/typicode/husky) — JS library to run scripts as git hooks, helpful to e.g. apply formatters or linters on pre-commit and/or pre-push
