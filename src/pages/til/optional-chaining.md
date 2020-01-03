---
title: Optional chaining
description: And complimentary nullish coalescing
date: 2019-09-11
tags: js
---

If you'd ask me which [lodash](https://lodash.com/docs/4.17.15) method I use most frequently, I'd probably say [`_.get`](https://lodash.com/docs/4.17.15#get). It's super convenient for reading nested objects safely, while also defining fallback values if the requested value doesn't exist. For everyone who never used `_.get`, here's how it works:

```js
const foo = {
  bar: "foobar"
};

console.log(_.get(foo, "bar")); // = foobar

console.log(foo.hello.world); // throws exception, cannot read `world` of undefined
console.log(_.get(foo, "hello.world")); // = undefined

console.log(_.get(foo, "hello.world", "Some fallback")); // = some fallback
```

The fallback **only** gets applied if the requested value is undefined, so other falsy values will not unintentionally be overriden.

```js
const foo = {
  bar: null
};

console.log(_.get(foo, "bar", "Some fallback")); // = null
```

## What is optional chaining

Optional chaining is a [proposed](https://github.com/tc39/proposal-optional-chaining) API to deal with this problem natively in JS, instead of through libraries like lodash. It's been around for a while, but seemed to be pretty stale for most of it. So what changed? Well, it finally hit "stage 3". For those unfamiliar with the [TC39 process](https://tc39.es/process-document/), all proposals have to go through multiple stages on their way to become part of the JS standards. Stage 3 is generally considered an important step on that way, meaning the proposal is unlikely to change significantly after it hits this stage. Many developers, us at rexlabs included, use this stage to determine whether or not it is safe to use the proposed APIs (e.g. through babel plugins).

## How does it work

So now that optional chaining hit stage 3, it is fairly safe to start using the new syntax. Since there is no browser support yet, you'll want to use the [babel plugin](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining) as mentioned before. Here's how optional chaining works:

```js
// Instead of
console.log(_.get(foo, "hello.world"));

// You can do
console.log(foo?.hello?.world);
```

This will not throw an exception, even if `foo` or `foo.hello` are undefined. It also works with methods:

```js
const foo = {
  bar: "foobar"
};

console.log(foo?.hello?.world?.()); // = undefined
```

## So how can I define proper fallbacks

This was one of the problems that probably caused this proposal to take so long to hit stage 3.

```js
const x = foo?.hello?.world || "Some fallback";
```

The above would apply the fallback for any falsy value, not only if `foo.hello.world` is undefined. So to properly replicate lodash's behaviour you'd need to do something like this:

```js
let x = foo?.hello?.world;
x = x === undefined ? "Some fallback" : x;
```

Looks pretty verbose and inconvenient. This is where the second proposal comes in: the [nullish coalescing operator](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator). Quite a mouth full, but in combination with optional chaining an amazing feature. It allows you do define fallbacks like so:

```js
const x = foo?.hello?.world ?? "Some fallback";
```

So, compared to lodash, with these two proposals we don't need `_.get` anymore:

```js
const foo = {
  bar: "foobar"
};

console.log(foo?.bar); // = foobar

console.log(foo.hello.world); // throws exception, cannot read `world` of undefined
console.log(foo?.hello?.world); // = undefined

console.log(foo?.hello?.world ?? "Some fallback"); // = some fallback
```

🎉
