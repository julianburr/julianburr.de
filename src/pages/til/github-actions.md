---
title: Github Actions
description: My first attempt playing around with them
date: 2021-03-15
tags: devops
---

At rexlabs, but also in my personal projects, I've now been using Github Actions as the go to CI/CD tool for a while. Here's a quick summary of why 😊

This is not an intro in how to write Github Actions, [the official docs](https://docs.github.com/en/actions) are doing a pretty good job in helping with that.

## What is CI/CD and why you probably should care about it

I [wrote about CD before](../continous-delivery/), but in a very basic attempt to explain it: "Continous Integration" and "Continuous Delivery" are principles that aim for automation of certain processes. While CI is more focused on service integration (e.g. automatically running tests, linting, typechecks, etc. in a pipeline), CD is more focused on the actual deployment of your application (e.g. to a staging or to your production environment).

Personally I think CI/CD is a very important step to not only simplify your release process, but also to improve confidence of your team members (especially in larger teams) and with it the stability of your application. E.g. if you have a solid E2E testing suit for your application, and your CD is set up in a way that the suit automatically runs on every PR before it gets merged, your developers (and everyone else in the product team for that matter) will have more confidence that their change didn't break anything when merging it into your main branch. If your CD is then set up to automatically deploy to production whenever a PR is merged into the main branch, you also reduce not only the cognitive overhead in the team having to do the release manually, but also eliminate any potential for human error in that process. It's a win-win 😍

## Tools that help with CI/CD

There are plenty of tools and services that help setup and run CI/CD pipelines. I'm only going to list the ones that I've actively worked with here.

**[CircleCI](https://circleci.com/), [Travis](https://travis-ci.org/)** - both of these are more on the CI side of things, allowing you to easily e.g. run tests and linting on every commit in your PRs. The service then sends a status back to Github, which can then e.g. prevent the PR from being merged if any of your checks failed. This is super helpful for immediate feedback whether a PR is ready to be merged before a code review has been done.

**[Buddy](https://buddy.works/), [GitLab](https://docs.gitlab.com/ee/ci/), [Github Actions](https://github.com/features/actions)** - these are all full CI/CD services, aiming for fully automated workflows across various triggers, be it PR commits, git tags or commits to the main branch, etc. The flexibility of choosing your triggers and then defining whatever workflow you want to trigger makes it easy to create the "continuous deployment" pipeline that suits your ways of working, your product, and most importantly your maturity in regards to CI/CD the best. In other words, it allows you to gradually start automating parts of your process while keeping other manual, and then to improve on that over time.

## Why I like Github Actions

Compared to in my example [Buddy](https://buddy.works/) and [GitLab](https://docs.gitlab.com/ee/ci/), there are a few things I like about Github Actions that make me prefer it (by quiet a lot) over these services.

**Simplicity**

This is 100% my personal opinion, so please take it with a grain of salt and try the different tools and services out for yourself. It will really depend on your use cases and what you are most comfortable with. For me, the way workflows are defined in Github Actions through individual YAML files, feels a lot more intuitive and simpler than it was in other services. This is mainly I think because of the large range of predefined actions available, so you don't need to do everything from scratch yourself.

In the same way, writing reusable custom actions for your special use cases also feels extremely intuitive and straight forward.

In combination, workflows, environments, secrets and deployments work seemlessly together, making the setup simple, especially for basic use cases where you might not even need all of this. The UI is also on the simple side, showing everything you need without overcomplicating things.

**Easy dependency chains**

This is not really special to Github Actions, other tools like GitLab have this ability as well, but still this was a make or break for me personally. The ability to chain multiple actions in a workflow and make these dependencies conditional is very important the more sophisticated your CD gets. E.g., you want to run your tests first, and only if those pass, you want to run the deployment action. In Github Actions, this is very easy and intuitive to set up.

**Choose your OS**

In Github, it is easy to choose the OS you need for your action. Usually Linux will be sufficient, however sometimes you need a specific OS to do what you want to do.

For example, when I was playing with Electron for some of my side projects, I wanted to set up automated releases via CD. To do this for MacOS apps, you need to sign them, which requires you to run MacOS. In Github Actions you can simply choose MacOS as the OS for that specific action and everything works as expected.

Only thing to be aware of is that there are different limits (e.g. free minutes, concurrent jobs, etc) for different OS.

**Speed**

This was a big one and probably in the early stages the main decision maker for me. Compared to Buddy and GitLab, Github was SO MUCH faster. Not only because it was closer to the source code (both Buddy and GitLab usually took few minutes to sync any changes made to the Github repos, so the trigger of the pipelines was always a bit deplayed), but also I assume because of the computing power made available by Github to the workflows. Whatever it was, our CD runtimes at rexlabs went down pretty dramatically when we switched to Github Actions 🏎

## Any downsides?

Not many for me tbh. However, there is one big one that I want to point out. Github (at least at the time of writing) doesn't allow you to re-run specific actions in your workflow. Instead, you can only re-run the whole workflow with all its actions.

This is fine if you just want to re-run a failed workflow, but i.e. in GitLab we used to use the re-run functionality to deal with rollbacks very easily. Whenever we had a bad deployment (e.g. a critical bug that we somehow missed), we could always just re-run the "deployment" step in the GitLab pipeline to roll back to whatever past commit we wanted, without having to re-run the test, build, etc steps. This meant rollbacks were taking a couple of minutes tops.

In Github Actions, you cannot do that out of the box. Which means, having to run the whole workflow which could sometimes take up to 20 minutes, lead to much longer rollback times in case of emergencies.

We temporarily worked around that by always triggering the past workflow when we triggered a new production deployment (since the deployment action in the workflow had a manual confirmation step), but that was less then ideal.

I know that the problem here actually lies more in the way we did rollbacks (you shouldn't really rely on your CD platform to do them, in our case we should have set up a separate action that would roll back using kubernetes functionality instead), but imo it was a question of convenice that we lost switching from GitLab to Github Actions.
