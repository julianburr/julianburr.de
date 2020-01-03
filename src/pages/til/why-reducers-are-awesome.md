---
title: Why Reducers Are Awesome
description: And how I never noticed it until I did
date: 2018-12-01
tags: js
---

## What are reducers

I got introduces to the term "reducer", like most other developers I know, through Redux. Not that the pattern was new, not even to me, I've used it before. But I wasn't really aware of it or gave it a name.

Reducers are functions that take an initial value and an action, and return a new value based on the action. Reducers should also be pure, meaning there should be no side effects. If the action and the same value are passed in, the same result should always be returned.

Actions are simple objects, usually with an identifier and an optional payload describing the properties of the action.

```js
// Example for a reducer function
const counter = 0;

function counterReducer(value, action) {
  switch (action.name) {
    case "add":
      return value + action.payload;
    case "reduce":
      return value - action.payload;
    default:
      throw new Error("Unknown action!");
  }
}

counterReducer(counter, { name: "add", payload: 2 }); // = 2

const newCounter = counterReducer(counter, { name: "add", payload: 2 });
counterReducer(newCounter, { name: "reduce", payload: 1 }); // = 1
```

## What is so great about that

The fact that reducers are pure means that you can, at any time, recreate a given state, as long as you know the initial state and the actions that have been sent to the reducer. This is how Redux and its time travelling work, this is essentially how [event sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) works. Instead of storing the data itself, you store the initial state and all the actions. This way you can reproduce your database state for any given point in time without any problems, the whole history of your data is stored (with some drawbacks and gotchas of course 😉).

As I said Redux obviously didn't invent the pattern. We only have to take a look at JS and its Array prototype methods to see it pop up. [`Array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) to be more concrete.

Reducer functions are basically functions you could pass into `Array.reduce`, the array being a list of actions. The same actions (with the same initial state) will always return the same outcome.

```js
const initialState = 0;

const actions = [
  { name: "add", payload: 2 },
  { name: "add", payload: 3 },
  { name: "reduce", payload: 1 },
  { name: "add", payload: 3 },
  { name: "reduce", payload: 5 }
];

actions.reduce(counterReducer, initialState); // = 2
```

An obvious (?) benefit of reducers is that it makes your application state predictable. You define allowed actions, and instead of mutating your state willy-nilly, you trigger (or "dispatch") these actions to update the state as defined in the reducers. This makes your application state also much easier to unit test.

Taking that to the next level, you can define so called finite state machines, that not only define actions and reducers for those actions, but also which actions are allowed to happen based on the current state. One of the more popular libraries dealing with this is [`xstate`](https://github.com/davidkpiano/xstate).

```js
// Example from https://github.com/davidkpiano/xstate
import { Machine } from "xstate";

const lightMachine = Machine({
  id: "light",
  initial: "green",
  states: {
    green: {
      on: {
        TIMER: "yellow"
      }
    },
    yellow: {
      on: {
        TIMER: "red"
      }
    },
    red: {
      on: {
        TIMER: "green"
      }
    }
  }
});

const currentState = "green";

const nextState = lightMachine.transition(currentState, "TIMER");
nextState.value; // = yellow
```

In the above example you can see how the state machine limits the way the state can be changed by the actions. Here we define for each current state what the action will reduce to, in a more complex case it would also allow you to specify actions for each individual state. This not only makes your state even more predictable and testable, it also helps visualising it. Like, literally. There are [tools](https://kyleshevlin.com/xstate-visualizer) out there e.g. for `xstate` that take you "machine" and draw a state diagram from it. How cool is that? 😄

To sum it up: even though a lot of us associate reducers with Redux by now, I think it's a generally useful and powerful pattern we should always keep in mind when dealing with states and data flows.
