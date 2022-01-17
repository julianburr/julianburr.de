---
title: Spoke
description: Greenfield React project bootstrapped in no time
date: 2018-02-01
---

## The Project

https://spokeapp.io/

The premise was pretty standard. A new greenfield app, part of our transition at rexlabs away from the focus around this [one core product](https://www.rexsoftware.com) and more towards becoming a [product house](https://www.rexlabs.io/), building companies and brands. Spoke was one of those new brands.

A standard SasS application, focused on real estate advertisement through channels like Google, Facebook and Instagram, integrating with our main CRM, making advertisement for real estate agencies as simple as humanly possible.

## So what was so great about it?

This was the first product we started with [Vivid](../vivid), our FE component library / design system (that also includes solutions to common problems like routing, API data handling, etc.) being fully available. While we built it up and kept developing it through the development of earlier apps (e.g. [Hitch](https://hitchapp.io/)), this time we were able to utilise the full potential of our centralised design system straight away. And it was amazing.

More than anything else, this was a great experience because it validated all the work we put into this system as a team over the period of 1.5+ years.

Within just a few weeks we got the frontend for the app bootstrapped, the backend as far as it existed at this stage hooked up and functional and were already at the stage where we were fine tuning the app, responding to design feedback and first iterations of the user experience as a whole.

As with Vivid, the app's tech stack settled on the latest React, some Redux, a CSS-in-JS abstraction layer built on top of [glamor](https://github.com/threepointone/glamor).

## But there were also some technical challenges

Some interesting challenges we had were around the ad previews for the different platforms. Due to insufficient or very unperformant APIs, we decided to mock the previews with our own React components. Building these was fun in itself, but the actually interesting part came in when we started tackling Google's banner ads.

Since the BE would need to generate them anyway to send single images to Google, we wanted to align them as much as possible with the FE mock version, while still being able to provide live previews in the edit screens without too much network overhead.

The solution: sharing the mock components between frontend and backend, accessing them on the FE with dynamic data from the edit form, while hydrating them on the server with the final data from the database and automatically generating the image from the mounted React components using [puppeteer](https://github.com/GoogleChrome/puppeteer).
