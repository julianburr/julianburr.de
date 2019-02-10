---
title: Vivid
type: Project
description: Frontend Design System
date: 2019-01-01
job: rexlabs
---

## What it is

Since rexlabs is a product house with multiple different brands, we built a central white branded component library called "Vivid" to server all the different applications we are building. This library, that also included all our architechtural and functional packages (e.g. for styling, routing, data handling, etc.) represents the core of all our work in the Frontend team.

There are many challenges to be faced when building a component library / design system. Some of those were:

### Styling

The components needed to be white branded, so that individual apps could apply their specific brand and styles on them. For this we ended up with an abtraction layer on top of a CSS-in-JS solution.

### Architechture

For developing and publishing the packages we went for a monorepo architechture using Lerna and yarn workspaces. It allows for a good developer experience while managing a large number of individual packages.

We ensured to have proper setup in place for easy bootstrapping of new packages, as well as testing components and packages with Jest. We also built an set of utilities around Cypress for end-to-end testing of our products.

## Technology

- React
- Redux
- Jest
- Cypress
- Webpack
- Babel
- Storybook
- Lerna & yarn workspaces
