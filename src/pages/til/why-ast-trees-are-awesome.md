---
title: Why AST Trees are Awesome
description: How they work and what you can do with them
date: 2018-11-01
tags: js, css, html
---

`AST` stands for [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree), and describes a universal data format to represent any kind of tree structure. In frontend development it is commonly used to describe e.g. Javascript code. Parsers like `babel` uses AST trees to traverse the code, in order to read and potentially modify it in a very declaritive way, before parsing it back into JS code.

- https://github.com/babel/babylon
- https://www.npmjs.com/package/babel-traverse
- https://www.npmjs.com/package/babel-generator

But there are many other common structures that can be represented as AST trees, making it easier for us to write tools that automate reading and / or modifying to them, e.g.

- HTML ([htmlparser2](https://github.com/fb55/htmlparser2))
- CSS ([cssom](https://github.com/NV/CSSOM))
- GraphQL ([graphql-js](https://github.com/graphql/graphql-js))
- JSON ([json-to-ast](https://github.com/vtrushin/json-to-ast))
- Markdown ([remark](https://remark.js.org/))
- and many more

In my opinion the best tool out there to start exploring and actually working with AST trees is [AST Explorer](https://astexplorer.net/), go and check it out. Soon you'll be writing your first babel or eslint plugins, it's pretty addictive 😉

A good read on the topic: https://www.sitepoint.com/understanding-asts-building-babel-plugin/
