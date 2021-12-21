---
title: Warnings and errors with React component stack trace
description: Just use the framework
date: 2019-03-23
tags: js, react
---

This is gonna be a quick one, I just learned about it and thought it was a shame I didn't know it existed before 😅

https://twitter.com/brian_d_vaughn/status/1108788282966433792

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
