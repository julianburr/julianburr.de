---
title: Rex CRM React Migration
description: Introducing React to large legacy app
date: 2019-01-01
---

## The Project

https://www.rexsoftware.com

Rex is our core and first product built at rexlabs. It's a legacy app, with a pretty standard and reasonably up-to-date PHP Rest API, but with a frontend that is long overdue to be modernised. Built in vanilla Javascript, jQuery and [KnockoutJS](https://knockoutjs.com/), with a build pipeline written in gulp and PHP, as well as being server side rendered, there is a lot to improve. Almost too much.

The goal of this project was (and still is) to start migrating the application over to our new, modern React/Redux frontend stack, built with webpack and babel. This would also mean, Rex could benefit from [Vivid](../vivid), the central component library we built for our greenfield apps.

## The concept

Obviously, with the scale and the large user count actively using and relying on the application, rewriting it from scratch was not an option. So instead, we worked out ways how we could gradually introduce the new tech stack, ideally naturally getting rid of legacy code over time while allowing us to build new features with React.

The solution: a combination of introducing React both from the inside as well as the outside of the classic application.

From the inside via custom Knockout bindings, allowing us to replace individual UI parts within the classic Knockout templates with new React components. From the outside by wrapping the whole classic application with a fresh React app. To do so, we moved the classic application into an iframe, also allowing us to build a new menu and other stuff in the new Shell app, introducing a SPA user experience.

I know, iframe, what the hell, right?

While it sounds klunky and everything but inovative, it makes a lot of sense when thinking about it in detail. The frame gives us full control over the classic application, with a minimal requirement of rewriting any of the classic code. It also means we can, whenever we do want/can affort to rewrite whole screens, simply hoist them up into the Shell application and get rid of the legacy code for that particular screen. One at a time.

## Technical challenges

Heaps. During this project I learned more about memory leaks in JS and performance debugging than ever before. You can get a glimps of that when scrolling through the [TIL](../../../til) section of this website 😅

It was also, again, a really valuable lesson for me personally in regards to business thinking, project management and team leadership, that I picked up from this project.
