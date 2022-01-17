---
title: Pocket
description: Building a large scale React Native application
date: 2016-11-01
---

## The Project

https://pocketbyrex.com/

Pocket was one of the first projects at rexlabs I was involved in. The goal was to create a mobile version of the established [CRM](https://www.rexsoftware.com). Since we didn't have any mobile developers at the company, and also because we were moving our Frontend Stack to React at the time, we decided to build the app in React Native from scratch, only utilising the existing REST API.

One of the great things at rexlabs is the size and quality of the design team. This meant, that everything went through a thorough UX and UI process before hitting development.

As part of the frontend team I was involved in early design handovers, in the planning stage regarding bootstrapping and general architechture of the app, as well as the components needed for the given designs.

## Technical Challanges

React Native, at the time, was pretty fresh. Therefore we didn't have nice tooling (like [metro](https://github.com/facebook/metro), [expo](https://expo.io/) and similar libraries nowadays) and a lot of the common problems like proper navigation and cross platform layouts and animations were still in the middle to be solved by the community.

It was also for many of us the first React project, which meant a lot of learning by quick iterations, understanding what does and doesn't work at scale, etc.

The final stack was built around React Native and Redux (in combination with [immutable-js](https://immutable-js.github.io/immutable-js/)), using [code-push](https://microsoft.github.io/code-push/) for non-native updates to avoid the hassle of the app stores whenever possible.

It was an amazing challange and I learned a lot from this project, showing us how to build a large scale application from scratch not only from a technical standpoint, but also from a project management and business perspective.
