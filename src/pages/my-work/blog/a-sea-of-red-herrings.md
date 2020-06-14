---
title: A Sea of Red Herring
type: Blog
date: 2020-01-08
platform: DevTo
url: https://dev.to/julianburr/a-sea-of-red-herring-7ei
heroUrl: https://drive.google.com/uc?export=download&id=1b3Vew6GU3llL3bzCzFssg036RO6QRjwZ
---

The importance of the yarn lock file, a good understanding of PureComponent and why its worth updating legacy code.

---

## Some context - what happened?

This is a story from my work at [rexlabs](https://www.rexlabs.io/), showing how easy it is to be mislead when debugging issues and to fall into rabbit holes. Let's start with the backstory to give some context.

We have our own JS toolkit at rexlabs, very similar to [`react-scripts`](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) but tailored specifically to our needs and coding conventions we decided on in the frontend team. It allows us to easily develop, build and test packages, components and apps without having to worry about the setup under the hood. We just rewrote large parts of that toolkit, to bring it back up to speed with the latest developments in the ecosystem (e.g. upgrade all dependencies like babel, webpack, jest and storybook). This rewrite touched a lot of the core functionality, so we decided to make it a new major version.

To test the toolkit and to make sure it didn't only work, but was also as backwards compatible as possible, we used this new version in one of our packages of our component library. For that we chose the simplest package possible, a `Box` component. And while at it, why not clean the code up a bit?

Everything seemed to work great. So, as the next step, we tried upgrading the toolkit in one of our apps. And again, no problems. Everything seemed to work perfectly as intended. Amazing! 🎉

At the same time, we were experimenting with Typescript. Our toolkit seemed like the obvious place to start, allowing us to introduce the setup through this central library. We created a release candidate containing the changes necessary to enable TS in our app, and again upgraded the toolkit.

And again, everything seemed to work fine. Except for one bug. Our select components seemed to be broken, not saving the text input value (for searchable selects) correctly. What?

## Red herring #1: It must be the TS changes, right?

It's obvious. The TS changes introduced the issue, so they must be causing it, right? Well, usually things are not that simple. Yet, since it seemed so obvious, we spent quite a bit of time looking at the problem from this perspective.

After too many hours of debugging and pulling our hair out, we finally took a step back. There was just nothing in the TS changes that would explain this weird bug. So, what if it wasn't related.

To verify whether or not the TS changes were the cause, we simply downgraded our toolkit again. And … the problem still persisted!? 🤔

Ok, so was it related to the changes we made before when rewriting parts of the toolkit, and we just didn't catch the problem earlier? Again, we downgraded the toolkit even further, and … still no luck! The problem was still there.

Even more confusing: when creating a fresh branch off master, and simply upgrading the toolkit again, we weren't able to replicate the issue.

Wtf!? Whenever you find yourself in such a situation with a lot of seemingly contradictory evidence, it's almost certain that you found it: the infamous red herring 😅

## Red herring #2: Maybe its a completely unrelated change we did to select?

Ok, so it wasn't related to the toolkit. So it must be the select component itself, right?

But we didn't change the component or its version in the `package.json`. Nevertheless, since we were out of ideas, we shifted our focus to debugging the package of the select component, to at the very least understand what the core of the issue actually was.

In isolation (e.g. in storybook within our component library), the component worked as intended. The value for the text field within the select component is managed via context at the very top level of the component. This is to allow the select to be composed by whatever parts and components you want, without loosing any of the core functionality. Since it is one of our older components, it's still using the [legacy context API](https://reactjs.org/docs/legacy-context.html).

While still unable to explain why the issue suddenly popped up in that one feature branch of our app, we were at least able to see that the context was the core of the problem. The onChange event triggered the context to update but the text input didn't receive the new context. But how could that be? Select didn't depend on any other components that could have changed.

Again, it just seemed like another red herring 🤔

## Starting to look through the red herrings: What dependencies did actually change?

Something must have changed. Something that didn't change when we tried to create a fresh test branch. And what's the easiest way to check what changed? The `yarn.lock` file!

This is something we should have looked at way earlier. Turns out, in the first test branch we deleted the yarn.lock in an attempt to re-install dependencies in a fresh state. Something, we do quite often to be honest. Usually to fix weird npm issues, or simply because of merge conflicts in the yarn.lock. Instead of manually resolving those, it's much easier to just delete it, reinstall dependencies and use that newly generated version.

However this strategy comes with a trade-off. Every dependency, that is defined as a range in the `package.json`, will look for the latest available version matching that range, meaning dependencies will potentially upgrade.

And that's what happened here. When we removed the lock file and reinstalled dependencies, A _lot_ of them changed to a newer version. But the select wasn't one of them. So was that really the root of everything?

Simple test to verify this: we changed to the second test branch that didn't have the problem, deleted the lock file and reinstalled the dependencies. And rest assure, now the issue was also present in that second branch. This is a good sign. Everything that proofs a theory and adds sense to the situation is a step closer to get out of the sea of red herrings.

However, we still didn't have any idea of which of these dependencies was causing the problem. A quick look through the packages didn't reveal any obvious candidate either. So we just bit the bullet and locked down one dependency at a time to its old version. This, ladies and gentlemen, is what desperation looks like. Welcome to the fun festival that is frontend engineering. 😅

## The light at the end of the tunnel: Looking at the Box component

Ok, this could have taken ages. But "luckily" we fairly quickly stepped on the one dependency that was the cause of the problem, the source of all evil. The Box component. In hindsight we probably should have thought about it, since it was one of the other changes that we did, but after all the changes we did were so trivial, how could they cause the problem.

Taking a closer look at the changes made it clear pretty quickly. For that, another piece of context though: at rexlabs we decided a while ago to use [`React.PureComponent`](https://reactjs.org/docs/react-api.html#reactpurecomponent) over [`React.Component`](https://reactjs.org/docs/react-api.html#reactcomponent) by default, mainly to reduce confusion especially for new devs when to use which. That obviously wasn't one of our best decisions, but that's not the point of this article. However, this very likely caused me, when cleaning up the Box component, to change it from using Component to use PureComponent instead.

Now, if you remember from earlier, there are two facts about the select component that make this change problematic.

First of all, it uses legacy context, which [famously has problems with PureComponent](https://medium.com/@gobindathakur/problems-with-previous-react-context-api-317b247d78d4), since its method to check whether or not the component needs to re-render doesn't take context changes into consideration. But that would only be a problem if there is a pure component in between the context provider and the consumer.

That's where the second fact comes in: the select as a whole can be composed by any components you want. And in our app, we used the Box component to allow for more complex design requirements as part of the select values.

There we have it, changing Box to a pure component meant that the input rendered within the Box didn't have access to context changes anymore, which meant changes to the input value in the context didn't get passed down anymore. It's so obvious, once you know it 🙈

## Lessons learned

### The yarn lock file has an important purpose, so be aware of it

The lock file is there for a reason. It locks down dependencies to certain versions. As mentioned before, deleting this file means all dependencies will change to the latest version that still matches the ranges defined in your `package.json`.

Lesson learned: be aware of this, and always double check the lock file after deleting it and reinstalling dependencies, if you really have to do so.

### Understand the difference between Component and PureComponent

I was aware of the issues with pure components and legacy context, and yet I didn't think of it when looking at the issue. The main take away from that is: always be aware of what changes you are making to your code, components and libraries and what impacts these changes might have in a larger context.

Also, if you weren't aware of the issues with legacy context, well, now you are. So take this into account when considering upgrading your code to the "new" context API.

### Try to keep your libraries up to date

This ties into the next lesson. It is definitely worth keeping your code up to date. If we had updated Select to use the new context API, none of this would have happened. I guess we still learned a lot of valuable lessons from this, but one of them is to try to keep iterating over your libraries and components when sensible and possible.

### If you struggle with a problem, take a step back

This is not groundbreaking, but a lesson I keep learning over and over again, not only in regards to JS debugging, but as a general lesson in life. If you struggle with something and can't seem to find a way out of it, it's always worth taking a deep breath and a step back, looking at the problem from a different perspective. Red herrings are everywhere. And it's just too easy to get lost in them.
