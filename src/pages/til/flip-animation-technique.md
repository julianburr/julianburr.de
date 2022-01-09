---
title: FLIP animation technique
description: What it is and why it can help with more performance animations
date: 2019-10-12
tags: css, js, perf
---

While playing around with JS animation frameworks recently, I again got reminded of the importance of understanding FLIP animations and how it can help improve animation performance.

## What is the FLIP technique

"FLIP" starts for "First Last Invert Play". It's an animation technique first described [by Paul Lewis](https://aerotwist.com/blog/flip-your-animations/). The goal was to achieve highly performant animations, even when animating attributes that are usually expensive to re-calculate (e.g. positioning, height, width, flexbox, etc).

**First** — Determine the current position/state of the element you want to animate

**Last** — Determine the end position/state you want the element to be in once the animation is finished

**Invert** - From that "last" position, create a transform that inverts the element back into the "first" position and use that transform as your starting point

**Play** - Play the animation using the transition you just determined

## Why does FLIP improve performance

The idea is to avoid animating or transitioning any CSS attributes that are [expensive](https://aerotwist.com/blog/pixels-are-expensive/) to animate. Attributes like `height`, `width`, `top`, `left`, etc are pretty expensive for the browser. While on the flip side, attributes like `transform` and `opacity` are [comparably](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/) cheap.

Using the FLIP method, you can animate e.g. widths and heights while benefiting from these browser internal optimisations.

## Good reads

- https://aerotwist.com/blog/flip-your-animations/
- https://css-tricks.com/animating-layouts-with-the-flip-technique/
- https://css-tricks.com/everything-you-need-to-know-about-flip-animations-in-react/
- https://aerotwist.com/blog/pixels-are-expensive/
- https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
