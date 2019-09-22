---
title: Introduction to React Suspense
type: Talk
date: 2018-04-24
platform: Meetup
---

## The evolution of data fetching in React

### Local state

This is how everything starts, you need some data in a component, so you trigger the API call in `componentDidMount` and then store it in local state. Also, you need to store a loading state, to be able to identify weather or not the data has been loaded yet. This could look something like this:

```jsx
import React, { PureComponent } from "react";
import { api } from "./api";

class Example extends PureComponent {
  state = {
    loading: true,
    data: null
  };

  componentDidMount() {
    api.get("/example").then(data => {
      this.setState({
        data,
        loading: false
      });
    });

    // In a real world application you'd obviously also deal
    // with error handling, but we'll ignore that for now in
    // favor of simplicity!
  }

  render() {
    const { data, loading } = this.state;
    return (
      <div>
        <h1>Example</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
```

### Redux

This is fine, until you want or need to reuse this data. In that case, Redux seems like an obvious choice, since it makes sharing data across your app really easy.

Unfortunately Redux is not asynchronous, so you have to do some workarounds using `redux-thunk` or similar techniques, but in general there is nothing stopping you from doing it and there is nothing really wrong with it, as it solves the initial problem.

In order to achieve asynchronous actions you basically have one action, that triggers your asynchronous API call and returns a "loading" state. The API promise then triggers another action when it resolves giving the actual data to Redux.

```jsx
import React, { PureComponent } from "react";
import { createStore, combineReducers } from "redux";
import { connect } from "react-redux";

const initialState = {
  loading: false,
  data: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "example/LOAD":
      // We use set timeout here as a workaround, since by default
      // Redux does not let you trigger other actions within a reducer!
      setTimeout(() => {
        api.get("/example").then(data => {
          // Dispatch the "loaded" action with the API data
          store.dispatch({
            type: "example/LOADED",
            payload: data
          });
        });
      }, 0);
      return {
        loading: true,
        data: null
      };

    case "example/LOADED":
      return {
        loading: false,
        data: action.payload
      };

    default:
      return state || initialState;
  }
};

const store = createStore(combineReducers({ example: reducer }));

const App = (
  <Provider store={store}>
    <EnhancedExample />
  </Provider>
);

class Example extends PureComponent {
  componentDidMount() {
    // Now we want to check if the data has been loaded yet!
    const { loading, data, dispatch } = this.props;
    if (!data && !loading) {
      dispatch({
        type: "example/LOAD"
      });
    }
  }

  render() {
    const { loading, data } = this.props;
    return (
      <div>
        <h1>Example</h1>
        {!data || loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const EnhancedExample = connect(state => state.example)(Example);
```

This is great and all, but its immediately obvious that this solution brings A LOT of heavy boilerplate with in around data flows in your app. Remember, this is just the basic setup, this doesn't even touch normalisation, garbage collection, smart ways of dealing with item updates and lists containing these items, etc.

Of course you would abstract all of that boilerplate out with libraries that deal with the logic part, but then still: the libraries have to be quite large to contain all this logic, and the usage of those abstractions will still feel a bit iffy, with a lot of `loading ? <p>Loading…</p> : <p>What you actually want to render</p>` statements and your components being trashed by data handling methods in their lifecycle methods...

### Suspense to the rescue

Just as a disclaimer, I am not saying that "suspense" will solve all of these problems out of the box, but what I do think is that the concept behind it is pretty ingenious while simple enough to grasp for everyone.

It's all about throwing promises in render and how React internally will deal with them, basically suspending the render of this component until the promise is resolved.

And this is how it looks like in practise:

```jsx
import React, { PureComponent } from "react";
import { Placeholder, createFetcher } from "./🚀";
// ^ utils built with React.Timeout and simple-cache-provider, see project source for more details :)

const fetchExample = createFetcher(() => api.get("/example"));

class Example extends PureComponent {
  render() {
    return (
      <div>
        <h1>Example</h1>
        <Placeholder delayMs={1000} fallback={<p>Loading...</p>}>
          <List />
        </Placeholder>
      </div>
    );
  }
}

class List extends PureComponent {
  render() {
    const { cache } = this.props;
    const data = fetchExample();
    // ^ yes, we call `fetchExample` in render!! Forget what you learned and/or have been told over the last couple of years, this is ok 🙃😄
    return (
      <ul>
        {data.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    );
  }
}
```

`fetchExample` will check its cache (e.g. using the `simple-cache-provider`, but you can very easily write your own cache and fetcher 😊), if it finds the data there, awesome, it will use it and render as you want it to. If not, it will throw a promise (yes, I too learned that you can throw those things), which will get caught (by React error boundries I guess?!) and suspense the render of the component until the promise resolves. This is all handled by React internals, so you don't need to worry about it.

The `Placeholder` is a simple component based on the new `React.Timeout` component, that can take a delay, which means it won't render until that time has run out (to avoid loading spinners flashing for 20ms before the content is loaded on fast connections) and then will render the fallback while the actual children are "suspended". This means the placeholder will show whenever anything in the tree below it is still pending on a promise. You can also nest placeholders to deal with multiple data being loaded. Pretty neat, huh?! 😄

### An example for a cache provider implementation

In this repo you can find a very basic and dumb implementation of a suspense cache provider.

```js
export const createFetcher = (method, hash = i => i) => {
  let cache = {};
  return (...args) => {
    if (!cache[hash(...args)]) {
      throw method(...args).then(response => {
        cache[hash(...args)] = response;
      });
    }
    return cache[hash(...args)];
  };
};
```

All the `createFetcher` method does is initializing a cache storage, in this example a plain oject, and then return a function, that we can use in render, which checks the cache if we already have the requested data stored in the cache, and if not _throws_ the promise that we gave it to suspend the render of that component.

That's all it is, that's all suspense is, the ability to throw promises during the render to suspend the components rendering until the promise is resolved 😊
