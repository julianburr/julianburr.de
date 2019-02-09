---
title: Hitch
type: Project
description: Built from scratch
date: 2017-04-01
job: rexlabs
---

## What it is

Hitch is a software application to manage client referrals. Businesses can refer their clients to other service providers and Hitch will help them keep track of the referrals, the conents of the clients and all fees and transactions involved in the process.

https://hitchapp.io/

## What did I do

As part of the Frontend team I was involved in the planning for the new application from scratch. Since this was our first full React app at rexlabs, this included a lot of architechtural decisions, as well as decisions how to incorporate [Vivid](../vivid/) into the development process.

The application stack:

- React
- Redux
- Webpack
- Babel
- Storybook

We the built the application, starting development in Vivid and then composing screens with the fresh components within the Hitch project. As one of the lessons learned from [Pocket](../pocket/), I created a concept for and implemented an abstraction layer for Redux to deal with API data flows at scale, coming from out RESTful API.

Hitch is a collection of multiple FE applications. To deal with this more easily, e.g. allowing us to share setup and code across them, we set the project up as a mono repo, using [Lerna and yarn workspaces](../../../til/lerna-and-yarn-workspaces/).

In 2018 I also lead the re-design of the application, given new designs based on first customer feedback as well as rearchitecting large parts of the app, taking what we learned from the initial development as well as from [Spoke](../spoke/) into account.
