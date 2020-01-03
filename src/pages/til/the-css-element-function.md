---
title: The CSS "element" function
description: And how to use it
date: 2019-02-06
tags: css
---

I can't believe this is a thing, it blew my mind when I found this today in my twitter feed:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Using the Little-Known CSS element() Function to Create a Minimap Navigator <a href="https://t.co/XQc5a3Smhk">https://t.co/XQc5a3Smhk</a> <a href="https://t.co/U23Er74p3c">pic.twitter.com/U23Er74p3c</a></p>&mdash; CSS-Tricks (@css) <a href="https://twitter.com/css/status/1092861635440578560?ref_src=twsrc%5Etfw">February 5, 2019</a></blockquote>

The short take of this awesome article is that there is a CSS method called `element()`, that allows you to take a "snapshot" of a specific DOM element (given via CSS selector) and lets you use that snapshot afterwards e.g. as a background image. One obvious use case would be for creating a minimap like panel with a preview of the whole document, as it's common in most modern IDEs.

```html
<!-- HTML of the element you want to use e.g. as background -->
<div id="ele">
  <p>Hello World!</p>
</div>
<div id="eleImg"></div>
```

```css
/* CSS using the element function */
#eleImg {
  background: -moz-element(#ele) no-repeat center / contain;
}
```

Really recommend reading the article linked in the tweet 😊

Only downside (as usual with awesome CSS stuff): browser support is pretty bad, essentially just Firefox at this stage: https://caniuse.com/#feat=css-element-function
