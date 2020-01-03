---
title: How to use css selectors on JS objects
description: And how it works under the hood
date: 2019-02-25
tags: js, node
---

A co-worker shared this crazy codepen today: [https://codepen.io/tomhodgins/pen/ErqeXm](https://codepen.io/tomhodgins/pen/ErqeXm). In it, it shows the usage of css selectors on Javascript objects 🤯

The example:

```js
import cssMatch from "https://tomhodgins.github.io/espath/css-match.js";

const data = [1, 2, 3, 4, 5];

cssMatch(data, ":nth-of-type(odd)"); // = [1, 3, 5]
cssMatch(data, ":nth-of-type(even)"); // = [2, 4]
```

But how does it work? It uses the [espath](https://github.com/tomhodgins/espath) library, more specifically [the css match method of that library](https://github.com/tomhodgins/espath#bonus-round-css-selectors) under the hood.

espath turns the object into micoxml and then into DOM nodes, which then can be queries via XPath or, as we see above, CSS selectors. Pretty neat 😊
