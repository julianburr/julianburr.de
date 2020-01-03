---
title: Intersection Observer
description: Never measure positions on a page manually again
date: 2018-11-10
tags: js
---

Do you remember the good old days, when we measured the position of elements on the page, so that we could show effects etc. whenever the user scrolled to the measured position. It always felt hacky, and never really right.

## How it used to be

It also came with a lot of overhead. Taken an example from the jQuery days, it could have looked something like this.

```js
const $element = $(".fadeIn");

let position = $element.position();
let height = $element.height();
$(window).resize(() => {
  // When the window resizes, the position and dimensions might change
  position = $element.position();
  height = $element.height();
});

$(window).scroll(() => {
  const scrollTop = window.scrollTop;
  const positionTop = position.top;

  if (scrollTop >= positionTop && scrollTop <= positionTop + height) {
    $element.addClass("visible");
  } else {
    $element.removeClass("visible");
  }
});
```

These event listeners to scroll and resize are not really cheap. For one element this might be fine, but at scale if you have to do a lot of calculation for a lot of elements this can quickly make your website or application very laggy.

## The Intersection Observer API

Modern browsers make this a lot easier and potentially a lot more performant, since they can now optimise the behavior internally. The functionality is exposed via the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) and is (in my opinion) pretty intuitive to use:

```js
const $element = $(".fadeIn");

const observer = new IntersectionObserver(entries => {
  const $el = entries[0];
  if ($el.intersectionRatio <= 0) {
    $el.removeClass("visible");
  } else {
    $el.addClass("visible");
  }
});

// Start observing
observer.observe($element);
```

## What is this useful for?

Heaps of things, from enter animations, lazy loading images (or even components), to preloading resources and routes by adding intersection observers to internal links. The possibilities are basically endless.

## Edit: The obligatory hook

Since nowadays you cannot say something is great without providing a React Hooks code snippet for it, here you go 😉

```js
import React, { useEffect, createRef } from "react";

function Example() {
  const ref = createRef();

  useEffect(() => {
    let observer = new IntersectionObserver(entries => {
      // do something
    });

    // Start observing
    observer.observe(ref.current);

    // Cleanup: stop observing
    return observer.unobserve(ref.current);
  }, [ref.current]);

  return <div ref={ref}>Hello World</div>;
}
```

Obviously you can easily pull this out into a custom hook if you want to.
