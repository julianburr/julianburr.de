---
title: Modern CSS Media Queries And Features
description: Some new CSS functionalities you might not know
date: 2019-11-16
tags: css
---

This is a small collection of "new" CSS media queries/features that I recently learned about, that might come in handy in future projects.

## Features

### Dark mode

```css
@media (prefers-color-scheme: dark) {
  /* your dark mode styles */
}
```

Dark mode is still the latest trend in the FE community. An app without dark mode support is almost not worth the download 😉

Usually the mode is controlled by a switch either in the settings or somewhere else in your UI. But did you know you can also take advantage of the user's system preferences? This can be really useful for your initial default mode. Browser support is pretty decent, excluding IE and Edge 😅

Some more resources and interesting reads:

- https://css-tricks.com/dark-modes-with-css/
- https://charlesrt.uk/blog/the-dark-web-rises/
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- https://caniuse.com/#search=prefers-color-scheme

### Dealing with the "iPhone notch"

```css
padding: env(safe-area-inset-top) env(safe-area-inset-right) env(
    safe-area-inset-bottom
  ) env(safe-area-inset-left);
```

The iPhone 10 introduced a set of new challenges to frontend developers. Most famously the notch at the top of the device, rendering any content in the middle of the top of the screen unreadable. Especially for apps that render web content in a web view or if you set `viewport-fit=cover`, it can be handy to know when the viewport is obstructed like that.

The CSS solution: environment constants defined by the browser, as seen above. Again, browser support excludes IE and Edge 🙈

More resources:

- https://css-tricks.com/the-notch-and-css/
- https://caniuse.com/#feat=css-env-function

### Reduced motion preference

```css
@media screen and (prefers-reduced-motion: reduce) {
  /* e.g. disable transitions and animations */
}
```

Similar to "dark mode", you have access to the user's system preferences regarding reduced motion within CSS. This can be really useful and important, especially when you have a lot of transitions and animations going on, that could cause problems to specific users. With this media query, you can easily reduce or completely disable any CSS motions in your UI.

It might be obvious by now, but the browser support is not bad, excluding IE and Edge. This lack of support however should not stop you from taking advantage of these features, since they're all progressive, meaning users with older browsers just get your current version, while you immensely increase the accessibility for all users with browsers that have support 🎉

More resources:

- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- https://css-tricks.com/introduction-reduced-motion-media-query/
- https://caniuse.com/#feat=prefers-reduced-motion

## Why do any of these features matter?

Simple answer, accessibility. Any feature that helps making your website more accessible for all users is a good feature in my opinion 😊
