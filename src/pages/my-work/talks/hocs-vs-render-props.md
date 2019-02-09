---
title: HOCs vs Render Props
type: Talk
date: 2018-01-21
medium: meetup
---

## Sharing code

Why do we need HOCs or render props in the first place? To understand this better, it makes sense to take even one more step back into the early days of React, when you could use its `createClass` method to create components.

Like in other programming languages Reacts implementation of the class system included **mixins**, that could be used to share functionality across components or projects. Mixins were just plain objects with the properties I would want to share.

```js
import React from "react";

const CounterMixin = {
  getInitialState() {
    return { count: 0 };
  },

  decrease() {
    this.setState({ count: this.state.count - 1 });
  },

  increase() {
    this.setState({ count: this.state.count + 1 });
  }
};

// NOTE: React dropped `createClass` in v16!
const App = React.createClass({
  mixins: [CounterMixin],

  render() {
    return (
      <div>
        <button onClick={this.decrease}>-</button>
        <span>{this.state.count}</span>
        <button onClick={this.increase}>+</button>
      </div>
    );
  }
});

export default App;
```

This is great, because it means I seperated the logic part that I want to share and can pull it out e.g. into a npm package, so others can use it in their projects. Awesome!

But mixins come with some problems. Namely:

1. Composing multiple mixins can lead to **collisions in the state / props namespace**. If I had another mixin, that would try to use the `count` state, React would throw an error. This becomes really problematic when I don't have access to the mixins code, e.g. if they are pulled in via 3rd party libraries.
2. **The readability of the code suffers.** Without seeing the mixin code, it is not immediately clear where `this.state.count` or `this.increase` come from. This becomes even worse when you have a lot of different mixins on your component.
3. **Composition is static**, which means you define mixins ones for your class in the beginning and that's it. This is sometimes not ideal.

But the biggest problem with mixins came when ES6 classes became a thing and Facebook rightfully said it doesn't make sense to maintain a custom implementation of a class system with ES6 classes being available. So they deprecated `React.createClass` (dropped in v16, you can still use it via the `create-react-class` package tho if you really want to, but it is not maintained!) and told developers to use ES6 classes instead. There was just this tiny little issue: ES6 classes didn't support mixins.

So how should we share our code now?

## Higher Order Components (HOCs)

With the shift to ES6 classes, one of the React Team's developers posted a gist with a suggested solution for the mixin problem: Higher Order Components.

HOCs are basically functions, that take in a component as an argument, and return a component which enhances the original one in some shape or form. E.g.

```js
import React, { Component } from "react";

const withCounter = Component =>
  class extends Component {
    state = { counter: 0 };

    // NOTE: we need to either manually bind methods now or use arrow
    //  functions to ensure `this` is in the right context
    decrement = () => {
      this.setState({ counter: this.state.count - 1 });
    };

    increment = () => {
      this.setState({ counter: this.state.count + 1 });
    };

    render() {
      return (
        <Component
          {...this.props}
          counter={{
            count: this.state.count,
            decrement: this.decrement,
            increment: this.increment
          }}
        />
      );
    }
  };

class App extends Component {
  render() {
    const { count, decrement, increment } = this.props.counter;
    return (
      <div>
        <button onClick={decrease}>-</button>
        <span>{count}</span>
        <button onClick={increase}>+</button>
      </div>
    );
  }
}

export default withCounter(App);
```

Yay, we can share code again! But when you look at this code, you'll quickly see that it also comes with the same problems we discussed with the mixins.

1. It can still be problematic with prop name collisions. Even worse, now React doesn't throw an error anymore, so these bugs will be silent, which can be a pain to debug.
2. It is still not clear where `this.props.counter` actually comes from.
3. Now the composition even happens outside of the component! This makes readability even worse and makes composition still static.

So we solved the mixin problem with ES6 classes, but we still carry around all those other issues. Also we add complexity when it comes to dealing with HOCs. We need to make sure props are properly passed down, refs are passed on as well to the original component, the display name of the higher order component is set properly for debugging purposes and the static values of the original component are hoisted up, so they can be accessed even after wrapping it, just to name a few. This complexity is not always necessary!

## Render Props

So what are render props and how can they solve these problems?

Render props are basically components, that provide a prop that can be given a render method. This function will be fed the enhanced data or functions or whatever you want to pass it. E.g.

```js
import React, { Component } from "react";

class Counter extends Component {
  state = { counter: 0 };

  // NOTE: we need to either manually bind methods now or use arrow
  //  functions to ensure `this` is in the right context
  decrement = () => {
    this.setState({ counter: this.state.count - 1 });
  };

  increment = () => {
    this.setState({ counter: this.state.count + 1 });
  };

  render() {
    // NOTE: you can use any prop you want for this, it doesn't
    //  have to be `children`!
    return this.props.children({
      count: this.state.count,
      decrease: this.decrease,
      increase: this.increase
    });
  }
}

class App extends Component {
  render() {
    <div>
      <Counter>
        {({ count, decrease, increase }) => (
          <div>
            <button onClick={decrease}>-</button>
            <span>{count}</span>
            <button onClick={increase}>+</button>
          </div>
        )}
      </Counter>
    </div>;
  }
}

export default App;
```

When we look at this code we can see that we solved a bunch of issues:

1. There is no potential for collision anymore, since you're not working with props or state, but with variables within the render method. You can call those whatever you want, its up to you not the library anymore.
2. It is very explicit now, where the variables are coming from. Personally I find this code much more readable and maintainable.
3. Composition happens dynamic within the render function. This is helpful if you want to pipe things into other components or want to include render prop components conditionally. Again — this whole thing is not supposed to say that HOCs are always bad, maybe static composition is better for your use case, but it's good to be aware of that when choosing the pattern you use.

## Some drawbacks of render props

People keep pointing out that it is an anti-pattern to have functions as props within render, due to referential equality issues (every time render is called a new function is created). First of all this really just becomes an issue when using `PureComponent`, which does a shallow equal to determine wheather to update or not, which will always return false with render props used like above. However, this rarely becomes an actual issue.

Imo readability and maintainability of code is much more important than premature code optimizations. Yes, if you actually run into performance issues due to unnecessary re-renders caused by this pattern, than you should refactor in (in whatever way you prefer) to solve this. But saying you always have to do that as a default because somtimes it might cause issues doesn't really make much sense to me.

Another limitation of render props and therefore use case for HOCs would be if you need access to the enhanced functionality or data outside of the render function. E.g. you need the `count` in one of the life circle methods. This is not possible with render props. In this case HOCs are a very solid solution to your problem, providing the data on the components props at all times.

## Summary

Render props are just a very powerful alternative pattern to HOCs, but there are use cases for both and you should never limit yourself by saying you have to use exclusively one or the other. There is nothing wrong with using HOCs in some cases and render props in others 😊

## Resources

- https://reactrocket.com/post/turn-your-hocs-into-render-prop-components/
- https://reactjs.org/docs/higher-order-components.html
- https://reactpatterns.com/#higher-order-component
- https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
- https://twitter.com/mjackson/status/885910553432018945
- https://youtu.be/BcVAq3YFiuc
