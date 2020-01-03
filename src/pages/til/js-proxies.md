---
title: JS Proxies
description: The most powerful thing you should probably never use
date: 2019-03-22
tags: js
---

## What are JS Proxies

[Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) can be used to hook into fundamental operations on objects. This can be any kind of object, including Arrays and functions. What does that mean?

Simplified: Proxies allow you to add custom behaviour to objects, e.g. when properties get read, written, or other fundamental operations are being executed.

## How to create a Proxy

```js
const customHandler = {
  get: function(obj, key) {
    if (key === "foo") {
      return "bar";
    }
    return obj[key];
  }
};

const obj = { hello: "world" };
const example = new Proxy(obj, customHandler);

// obj.hello = 'world'
// obj.something = undefined
// obj.foo = 'bar'
```

The above shows how easy it is to define custom behavior, i.e. when reading properties from the object. `foo` is not defined on the object itself, but in our custom handler of the proxy we return a value anyway.

## How is that useful

There are a lot of use cases for this, but in my opinion you should be careful to not overuse it, for two main reasons:

For one, proxies are usually pretty hidden to the developer who's actually consuming your objects, so it might not be clear that they are intercepting the usual operations, leading to weird issues and making it harder to debug.

Also, they do have a significant [performance impact](http://thecodebarbarian.com/thoughts-on-es6-proxies-performance). To be clear, I'm not saying "don't use proxies cause they are slow", but I think you should use them sensibly, instead of just using them for ALL objects in your project.

One use case I personally found helpful is to show warnings in dev mode. E.g. at rexlabs we built an abstraction for data handling within our apps, that works with GraphQL like queries to define the fields we want to receive from the API. We now use proxies on the data passed through to the component to warn the developers if they try to access a field that was not requested in the data query.

```js
const dataQuery = query`{
  ${model} {
    id
    name
    friends {
      id
      name
    }
  }
}`;

@withQuery(dataQuery)
class Example extends Component {
  render() {
    return <p>Email: {this.props.model.email}</p>;
    // ^ = console.warn that email is not specified in the query
  }
}
```
