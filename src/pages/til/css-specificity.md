---
title: CSS specificity
description: What it is, how it works and how to take advantage of it in the age of CSS-in-JS
date: 2019-08-06
tags: css
---

CSS specificity is not necessarily something I learned today, but this specific usage of it certainly is.

https://twitter.com/JoshWComeau/status/1158429802526924801

## What is CSS specificity

Let's start from the beginning to give some context. [CSS specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) describes how browsers decide which styles to apply when they have multiple style definitions to pick from. For that, they give [different selectors different weights](https://specifishity.com/), the rules with higher weight will override rules with lower weight.

While this sounds pretty straight forwards, it's an [important lesson to learn](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/) since it builds the foundation of the cascading part of CSS. Very simplified the hierarchie is as follows:

1. element type selector (e.g. `a`, `div`, `body` etc.)
1. class selectors (e.g. `.example`), attributes selectors (e.g. `[type="radio"]`) and pseudo selectors (e.g. `:hover`)
1. id selectors (e.g. `#example`)
1. inline styles
1. `!important` rules

The weights of all selectors for a rule get summed up, so `.classA .classB` has a higher specificity than `.classB`. All of this is important, because this should be the way you control which styles get applied for specific elements in the tree. For rules with the same specificity, the one that was defined last wins.

## Enter CSS-in-JS

To see why this is important, let's take a look at what many people (including me) use today for styling e.g. in React applicactions. CSS-in-JS, e.g. through libraries like [`styled-components`](https://github.com/styled-components/styled-components) or [`emotion`](https://github.com/emotion-js/emotion) makes styling on a component level with frameworks like React super convenient. You can write your styles in JS, and they generates CSS for you and adds the rules to the document. They will create class names on the fly, using hashes to avoid unintended style conflicts. However, that means all rules will end up with the same specificity. This is usually not a problem, since you have control over the order in which the rules will be defined, but it can become an issue when you deal with a white branded component library that defines the base styles and another styling layer in your app that defines the brand styling or specific overrides for the component in special use cases.

CSS-in-JS libraries deal with this in different ways. `emotion` e.g. has a util method, [`cx`](https://emotion.sh/docs/emotion#cx), which is an extended version of the [`classnames`](https://github.com/JedWatson/classnames) library by Jed Watson. It automatically detects emotion styles and instead of just concatinting the given class names, it will create a new class with the styles in the order of the class names passed in, so you don't run into issues with the order the classes are being appended to the document head.

At rexlabs we have our own abstraction for styling, specifically around the functionality of applying brand styles on app level to a component library that is built white branded. And we used to struggle a bit with CSS specificity in the past. Utils like `cx` help, but you can also solve these by knowing how specificity works, e.g. with the trick expained in the tweet above, i.e. by simply repeating the hashed class name if you want to make a rule more important.

I'm not 100% sure if I'm going to need or want to use this knowledge, but understanding the cascade in CSS definitely doesn't hurt 😅
