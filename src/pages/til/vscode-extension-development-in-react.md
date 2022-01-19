---
title: VS Code Extension Development in React
description: Some learnings from my experimental dive into VS Code extensions
date: 2022-01-19
tags: js, react, vscode
---

I got a bit bored last weekend and decided to finally dive into VS Code extension development. I had [an idea for a plugin](https://vscode-bugsnag-stepthrough.vercel.app/) for a while, and since I didn't have anything better to do I gave it a shot.

The following are some of the take aways from that first arguably fairly shallow dive into the topic and some links to resources that helped me — mainly for myself so I can easily find them again 😅

## Setup

It is surprisingly easy to get started. The [official documentation](https://code.visualstudio.com/api/get-started/your-first-extension) is pretty solid, but even more than that the available tooling is great.

```bash
npm install -g yo generator-code

# Bootstrap a new VS Code plugin project
yo code
```

That's it. That's all you need to run to bootstrap a new project 🚀

To be fair, there's not really a lot to it to begin with. Most of the information that VS Code will use is in the package json, so you'll find a few unfamiliar fields there. Other than that, you'll define the main entry point via the `main` field in your package json, which will run as a normal node script.

### Useful package json fields VS Code uses

- `engines.vscode` — this one allows you to specify what version range of VS Code your extension supports
- `icon` — path to the extension icon file
- `preview` — you can add this flag if your extension is still in the preview stage
- `scripts.vscode —prepublish` — this will run every time when you run `vsce publish` before the actual publishing of the extension, e.g. to build your bundle
- `activationEvents` — this is the core piece, where you define what VS Code events will trigger your entry file
- `contributes.*` — a bunch of further VS Code settings that define what your extension registers within VS Code e.g.
  - `viewsContainers.activitybar` — to register a new menu item in the activity bar (the main menu on the left of the editor)
  - `views.{{NAME}}` — registers any custom views, e.g. in the sidebar

The documentation includes [a full list](https://code.visualstudio.com/api/references/extension-manifest) of package json attributes VS Code adds. It's worth noting that it also recognises the standard package json fields (as per npm specs) where sensible, e.g. for `homepage`, `repository`, `issues`, etc.

### Your main entry script

The main entry script is extected to export an `activate` and a `deactivate` function. They are called whenever your extension is, well, activated or deactivated respectively.

In your `activate` function you then just simply do what you want your extension to do, e.g. registering views, commands, etc.

```js
// e.g. if you want to register a command, all you need to do is...

import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let command = vscode.commands.registerCommand("foo.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from foo!");
  });

  context.subscriptions.push(command);
}

export function deactivate() {}
```

It really is pretty straight forward once you dive into it.

## Debugging your extension

This is where I have to give massive kudos to the VS Code team. I've done plugin and extension work for other tools in the past, and this was usually the most frustrating bit.

In VS Code, running your extension locally is as easy as pressing `F5` (your workspace has to be the extension root!) and then selecting "VS Code Extension Development". This will automatically launch a new window with your extension installed.

The original window the allows you to refresh that new window whenever needed (e.g. after making changes to the plugin code).

If you're like me and you're developing a webview for your extension, you can use the full power of the Chrome Devtools within VS Code by pressing `cmd + shift + p` and then running the "Developer: Toggle Developer Tools" command 🎉

## Dealing with user settings

If you just want to store stuff, you can use the VS Code API to store arbitrary (serialisable) data either on a global or on a workspace level, which is really handy.

```js
// Read settings
context.globalState.keys().forEach((key) => {
  console.log({ key: context.globalState.get(key) });
});

// Update settings
context.globalState.update(key, value);

// If you want to store the setting against the current workspace only, simply
// use `context.workspaceState` instead of `context.globalState`
```

## Getting the theme of your webview right

If you want your extension's webview to blend in with the rest of the VS Code UI, you'll want to use the same theme the user current has active. Again, VS Code makes this as easy as possible, by providing a bunch (and I mean A BUNCH!) of CSS variables describing the color values of the current theme that you can and probably should use, instead of hard coding your own colors.

There is an [extensive overview](https://code.visualstudio.com/api/references/theme-color) in the docs, just replace the dot notation with kebab case in your head (e.g. `window.activeBorder` becomes `--vscode-window-activeBorder`). Despite that, I personally found it easier to just inspect via the Devtools and check the available variables there.

A rare criticism here would be that the native parts of the VS Code UI don't seem to be using the CSS variables, so when inspecting these you'll likely just find the final color values 😐

## Publishing your extension

VS Code provides another tool, `vsce` (short for "Visual Studio Code Extensions"), which helps you build and publish extensions from the command line.

```bash
vsce login <username>  # authenticates you to allow publishing
vsce package  # generates a `*.vsix` extension file
vsce publish  # publishes that extension file to the VS Code Marketplace
```

This works really well with Github Actions, to automate the publishing e.g. whenever you push changes to the extension to your main branch or whenever you create a new release/tag in Github. Instead of `vsce login` you'll need to create a [personal access token](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token) and use that instead, e.g.

```bash
VSCE_PAT=<token> vsce publish
```

Your github action could then look something like this:

```yaml
name: Publish Extension

on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: |-
          yarn

      - name: Publish extension to marketplace
        run: |-
          vsce package
          vsce publish
        env:
          VSCE_PAT: ${{ secrets.AZURE_ACCESS_TOKEN }}
```

## Repo of my extension for some example code

The repo for the extension I built can be found here: https://github.com/julianburr/vscode-bugsnag-stepthrough. It's written in Typescript and uses React for the webview. To compile it I used [`esbuild`](https://github.com/evanw/esbuild), mainly because it was easy to set up.

It's actually a monorepo which also contains a basic website showcasing the extension. The actual extension code is, you might have guessed it, in the `/extension` subfolder 😅

## Useful resources

- https://code.visualstudio.com/api/get-started/your-first-extension
- https://code.visualstudio.com/api/references/extension-manifest
- https://dzhavat.github.io/2020/11/12/easy-way-to-debug-a-webview-in-a-vscode-extension.html
- https://code.visualstudio.com/api/references/vscode-api
- https://code.visualstudio.com/api/references/theme-color
- https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- https://github.com/microsoft/vscode-webview-ui-toolkit
