---
title: Doing stuff once the network is idle
description: The requestIdleCallback API
date: 2019-03-30
tags: js
---

While doing a lot of performance related research lately I stumbled upon this gem.

## The browser API

`requestIdleCallback` is an [experimental Browser API](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) that allows you to define a custom callback method for whenever the network is idle. This can be very useful for thread blocking tasks, that are not immediately necessary (e.g. analytics, loading extra data in the background, etc).

Due to the fact that it's experimental, the [browser support](https://caniuse.com/#search=requestIdleCallback) is somewhat limited (but actually not too bad). But you can always [just fall back to `setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API#Falling_back_to_setTimeout) or use one of the existing shim libraries to do so for you.

The API works as you would expect:

```js
window.requestIdleCallback(() => {
  /* network is idle */
}, options);

// for example
window.requestIdleCallback(fetchBackgroundData, {
  timeout: 10000
  // ^ will force the callback to be executed within the next 10secs
  // you probably don't want to do this, but sometimes it can be necessary
});
```

## Why is this useful

The ability to defer certain tasks until the application is inactive is massiv. It allows you to improve the performance of your app, since you can focus on only the necessary network tasks for the initial load, and then load everything else once the network is idle.

You can read more about when and how to use it in [this article](https://developers.google.com/web/updates/2015/08/using-requestidlecallback). I still have to play around with this API more, but it seems very promissing when it comes to deplaying not so important tasks and improve app performance (especially perceived performance) easily 😊
