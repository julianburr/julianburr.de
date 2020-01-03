---
title: How to catch with async await
description: And some other tipps
date: 2019-02-12
tags: js
---

## The Basics

By now most people not only know about async await, but also have a strong opinion about which one to use. I don't want to go into that though, I just want to have a look at how to catch errors when you're using async await. But for that I still want to explain what it is first for anyone who hasn't heard of it and used it yet.

In short: async await is an alternative to Promises to deal with async actions. Instead of chaining, it will pause the execution of your code at the `await` keyword until the underying promise is resolved, so you can simply assign it to a variable.

```js
// Example using promise chaining
function example() {
  fetchData.then(result => {
    console.log(result.id);
  });
}

// Example using async await
async function example() {
  // async keyword allows us to use await
  const result = await fetchData();
  console.log(result.id);
}
```

A lot of people prefer async await, because it gets rid of the chaining and potentially nested code.

## So how to catch?

But how do you catch errors? Well, usually you'd do something like:

```js
// Again using chaining
function example() {
  fetchData
    .then(result => {
      console.log(result.id);
    })
    .catch(e => {
      console.error(e);
    });
}

// What you see mostly for async await
async function example() {
  try {
    const result = await fetchData();
    console.log(result.id);
  } catch (e) {
    console.error(e);
  }
}
```

Good ol' try catch. This will handle everything that throws within the try block, which is usually what you want. But there is also another way you can catch errors: by using `.catch`. Yes, we're still dealing with promises after all.

```js
async function example() {
  const res1 = await someAsyncStuff().catch(e => {
    // Do some stuff for case 1
  });
  // This will always get executed, no matter if `someAsyncStuff` succeeds or fails
  const res2 = await someOtherAsyncStuff(res1);
  const res3 = someSyncStuff(res2);
}
```

The above will catch any errors that are thrown explicitly by `someAsyncStuff`. It does not catch anything else, it also doesn't stop the execution at the failure, so i.e. `someOtherAsyncStuff` would still get called (just with `res` being `undefined` now). While this seems undesireable, for some use cases this can be what you want. Whenever you don't care weather an async task succeeds or fails in the context of you method, you can use a `.catch` to continue the execution.

But what if you do want to stop the execution, but you also want to handle each error individually. Let's say, you want to add an error code to the error object. I know, there are better ways to do so (e.g. within the async methods themselves), but lets pretend the code is very specific to this call site or you don't have access to the source of `someAsyncStuff`. Well, you'd get the "best" of both worlds:

```js
async function example() {
  try {
    const res1 = await someAsyncStuff().catch(e => {
      e.customCode = 1;
      throw e;
    });
    const res2 = await someOtherAsyncStuff(res1);
    const res3 = someSyncStuff(res2);
  } catch (e) {
    // All errors will be caught here, but since we handled and re-threw the error
    // for `someAsyncStuff` we can check here for the custom code
    console.log(e);
  }
}
```

I'm not saying I like this pattern, and as I mentioned there are usually better alternatives to it, but I thought it's still worth mentioning.

## TL;DR: the use cases

### Catch everything no matter from where

```js
async function example() {
  try {
    const res1 = await someAsyncStuff();
    const res2 = await someOtherAsyncStuff(res1);
    const res3 = someSyncStuff(res2);
  } catch (e) {
    console.error(e);
  }
}
```

### Catch everything individually but stop execution on failure

```js
async function example() {
  try {
    const res1 = await someAsyncStuff().catch(e => {
      // ...
      throw e;
    });
    const res2 = await someOtherAsyncStuff(res1).catch(e => {
      // ...
      throw e;
    });
    const res3 = someSyncStuff(res2);
  } catch (e) {
    console.error(e);
  }
}
```

### Continue execution even if any async task fails

```js
async function example() {
  const res1 = await someAsyncStuff().catch(e => {
    /* ... */
  });
  const res2 = await someOtherAsyncStuff(res1).catch(e => {
    /* ... */
  });
  const res3 = someSyncStuff(res2);
}
```
