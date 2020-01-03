---
title: Warnings and errors with React component stack trace
description: Just use the framework
date: 2019-03-23
tags: js, react
---

This is gonna be a quick one, I just learned about it and thought it was a shame I didn't know it existed before 😅

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">⚛️ Library authors have often requested a way to log warnings that include the React &quot;component stack&quot;. PR 15170 adds two new top-level APIs to for this: react.warn() and react.error()<br><br>👇 Attached screenshots show example usage (and console output).<a href="https://t.co/0IQV3qcEus">https://t.co/0IQV3qcEus</a> <a href="https://t.co/VB9khdApcN">pic.twitter.com/VB9khdApcN</a></p>&mdash; Brian Vaughn (@brian_d_vaughn) <a href="https://twitter.com/brian_d_vaughn/status/1108788282966433792?ref_src=twsrc%5Etfw">March 21, 2019</a></blockquote>

If you want to show error messages or warning with a React components stack trace, instead of the usual JS execution stack trace, simply use the provided methods from the react library.

```js
import { warn, Component } from "react";

class Example extends Component {
  render() {
    warn("Some warning!");
    return <p>Warning logged!</p>;
  }
}
```

That's it! Nothing especially mind blowing and probably a lot of people already know, but I didn't and it definitely comes in handy when trying to improve DX of your tools and libraries around React.
