---
title: Why CSS Variables are Awesome
description: And interesting use cases I learned about
date: 2019-01-07
tags: css, js
---

## What they are

By now most people have heard of them, but in case you haven't: [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) are a CSS core feature in answer to all these pre-processors that took over in the last couple of years 😉 They allow you to define variables within your CSS and to use them in your style rules.

```css
:root {
  --theme-base-color: red;
}

a {
  color: var(--theme-base-color);
}
```

Now, if this is on a library level, you could pull in the above definitions into your project (e.g. via a `styles.min.css`) and change the base color of the theme by simply overwriting the variable on your style sheets:

```css
:root {
  --theme-base-color: blue;
}
```

Neat, isn't it. But as nice as this is, there are even more powerful use cases for CSS variables that make me excited about them.

## Dynamic styles

One of the major arguments against CSS-in-JS (besides all the misconceptions people have when it comes to this) is the concern around dynamic styles, where the libraries often still have to fall back to inline styles. More specifically, say you have a React component that takes a `color` prop that defines the text color for the component instance. In order to apply the color, you'd have to apply it inline.

CSS variables don't remove the need for that, but it makes it a lot nicer to do, since you can still define the color in your CSS file, that you obviously pull out into a static file at build time, and all you apply via inline styles is the override of the css variable.

Popoular libraries like [Linaria](https://linaria.now.sh/) do exactly this for you, you don't even have to think about it.

```js
import { styled } from "linaria/react";

const Box = styled.div`
  color: ${props => props.color};
`;
```

This will create a class in the css file that gets extracted during build...

```css
.hashy-class {
  color: var(--hashy-variable);
}
```

...and will apply inline styles to the component like so:

```js
<Box color="green">...</Box>
// = <div style="--hashy-variable: green">...</div>
```

## Performant styles via JS

Not everything can be described with pure CSS. Animation often rely on some form of JS input, for example when they are relying on user input information. Let's say we want a button that shows a circle where the mouse is on hover. This used to be expensive, having to mutate the CSS (and therefor triggering re-paints of the whole DOM) on the fly. Now, we can simply set CSS variables from within JS land, altering the CSS values.

```css
button:before {
  content: " ";
  background: red;
  opacity: 0;
  transform: scale(0.5);
  transition: transform 0.2s, opacity 0.2s;
  position: absolute;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  margin: -15px 0 0 -15px;
  top: var(--position-top);
  left: var(--position-left);
}

button:before:hover {
  opacity: 1;
  transform: scale(1);
}
```

```js
$button.addEventListener("mousemove", event => {
  const top = event.layerY + "px";
  event.target.style.setProperty("--position-top", top);

  const left = event.layerX + "px";
  event.target.style.setProperty("--position-left", left);
});
```

See this [pen](https://codepen.io/anon/pen/exVPaB) for an example, for a much better and more comprehensive live demo of what such a button could look like, check out this awesome [codepen](https://codepen.io/rauldronca/pen/WMayrP) by [Dronca Raul](https://codepen.io/rauldronca).

## Inline hover and media queries

Inline styles are bad, because you can't use things like `:hover` and other pseudo selectors, right? Well, yeah, but CSS variables help you get around that. Again, this ties into the way CSS-in-JS libraries allow dynamic styles from props.

```css
button {
  background: var(--background-idle);
}

button:hover {
  background: var(--background-hover);
}
```

```html
<button style="--background-idle: yellow; --background-hover: green;">
  This is a stupid example
</button>
```

In the same way you can apply values for media query rules etc, all inline.

## Shadow DOM

The [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) deserves its own little write up, but it's worth a mention in this context as well. One benefit of the Shadow DOM is that you can isolate styling to specific elements of the DOM tree. This is great, but what if you want or need to have control over it from outside of the shadow root?

Well, you guessed it. CSS variables are the answer. Defined on the element containing the Shadow DOM, you can override the variable values and thereby change the rule values to your needs. This obviously requires library authors to expose the values in question through variables, but this is actually good in my opinion, since it gives these libraries very granular control over what they want people to be able to change and what they don't.

Ionic wrote up a very good article about this and how they use CSS variables for their web components: https://www.joshmorony.com/shadow-dom-usage-in-ionic-web-components/
