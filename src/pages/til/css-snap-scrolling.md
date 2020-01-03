---
title: CSS Snap Scrolling
description: Better carousels with pure CSS
date: 2019-11-01
tags: css
---

## What is it?

Recently I was building yet another carousel component for one of our landing pages at work, when I came across a new CSS feature I haven't heard about before: [CSS snap scrolling](https://css-tricks.com/practical-css-scroll-snapping/).

The idea is simple. Instead of normal scrolling behaviour, we can define a snappy scrolling behaviour. The browser does the rest for us. No need for complex JS calculations and animations 🎉

## Example and attributes

The most important two basic attributes to enable scroll snapping are:

- `scroll-snap-type`: applied to the container
- `scroll-snap-align`: applied to the children, to be scrolled within the container

```css
.container {
  scroll-snap-type: x mandatory;
}

.child {
  scroll-snap-align: start;
}
```

Be aware that there is a legacy version of the spec that some older browsers use, make sure to check the [CSS tricks article](https://css-tricks.com/practical-css-scroll-snapping/) or the specific browser docs for more details.

Other attributes you might need are:

- `scroll-padding`: padding distance, e.g. if you have fixed elements on top of the scroll container you want/need to account for
- `scroll-snap-stop`: controlling when the snap behaviour should kick in

This TIL is pretty brief, since I found this after I already implemented the slider in React and JS, so I don't have any actual in depth experience regarding implementation. But I'll definitely use it the next time I have to write a slider component 😊

## The most important of all questions: what does browser support look like?

Actually, [not too bad](https://caniuse.com/#search=scroll-snap-type). All major browsers are supported, including IE back to version 1 (using the browser specific `-ms-*` prefix, at least [partially](https://web.archive.org/web/20160616212557/https://dl.dropboxusercontent.com/u/444684/openwebref/CSS/scroll-snap-points/support.html)).

There is a [polyfill](https://www.npmjs.com/package/css-scroll-snap-polyfill) available if you really need it, that covers most of the basic functionality.
