---
title: How to Use Semantic Versioning for Your Apps
type: Blog
date: 2020-04-28
platform: DevTo
url: https://dev.to/julianburr/how-to-use-semantic-versioning-for-your-apps-2dak
heroUrl: https://res.cloudinary.com/practicaldev/image/fetch/s--ynYRXJUK--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/6eb7320q2c5svtr6qki6.png
---

_Disclaimer: this is not supposed to be a definitive guide on how you have to do versioning in your apps, it is more aiming to share the experience and processes we went through at [rexlabs](https://rexlabs.io) and where we might be heading..._

---

## The core idea and requirements

At rexlabs we're primarily building web applications as SaaS products, so the problems and solutions I'll be going through here are very much focused on that type of application.

To give some more context though: in general, we're no strangers to versioning. Like most other development teams we actively use version control for all of our development work. We also created a whole JS ecosystem of utility libraries and React components which we all publish to private npm packages, where they are all versioned using standard semantic versioning (aka [semver](https://semver.org/)). I won't be covering those basics here, so if you don't know what that is, I highly recommend reading up on it.

Coming from all this, we really wanted to add versioning to our main applications as well. But semver doesn't really make much sense in the context of web apps. It's focused on increasing the transparency around the type of changes to a product in between versions, e.g. a breaking change will lead to a new major version, a new feature to a new minor version, and a bugfix to a new patch version. This makes a lot of sense for products that keep all versions of themselves around, where the consumer can pick and choose which version they want to use. If the consumer sees a new major version, they know it might break the way they've been using the product so far, so they know to be extra careful when upgrading and have the chance to avoid upgrading alltogether.

But there is no such thing as "breaking changes" in our web apps ... at least not intentionally 😅. We don't give users any choice what version they're being served, so using the version to identify the type of change since the last release doesn't make much sense. Our apps are not consumed in the same way as e.g. our npm libraries. So why bother with versioning at all in web apps? For us, there were a few reasons for this:

- one of the main objectives was around the ability to track bugs - we use [Bugsnag](https://www.bugsnag.com/), seeing when an issue was first introduced helps a lot tracking the error down quickly
- also, just because you always deploy a specific version doesn't mean all your users are always using that version - we found users of our app would sometimes not refresh the browser tab with our app for several days or weeks 😕
- it also makes our internal QA process easier - being able to associate a fix with a version and note that down in the support ticket means both QA and customer support can easily see whether or not a specific bug is supposed to be fixed in the version they are working with
- and last but not least: release notes - having linear versioning makes it easier for everyone to curate and consume changelogs for the releases we ship

## Why semver

Ok, we identified why we want to keep track of app versions. By why use semver, especially if it looses all meaning in the web app context? Why not simply use incremental integers and call it a day?

First of all, we found it helpful to see what environment we're looking at just by seeing the version number. We usually have multiple environments for each of our applications deployed, i.e. `production` (environment used by the endusers), `beta` (staging environment connected to production database, mostly used for testing and QA) and `alpha` (staging environment with separate throwaway database). Using versions to represent these environments helps identifying what you're looking at and, as mentioned before, identifying where a bug originated. The versioning using the semver version structure could look something like this:

- `production` = major version
- `beta` = minor version
- `alpha` = patch version

Meaning, every time we push to `alpha`, we do a patch bump, every time we push to `beta` we do a minor bump, and so on. This also makes iit very easy to keep track of where the different environments are at, e.g. if `production` is on v20.0.0 and `beta` is on v20.10.0, you know immediately that beta is quite a few changes ahead which haven't made it into production yet.

## Release notes

As I said, we use semver for our internal packages of our FE ecosystem, where we take advantage of a lot of open source tools that deal with versioning and release note automation through [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), such as [`commitlint`](https://github.com/conventional-changelog/commitlint) or [`lerna`](https://github.com/lerna/lerna). But again, these tools were made specifically with library authors in mind, and try to follow true semver versioning. So while we took inspiration from these tools, using them for our web apps without any customisation wasn't really a choice.

We still use conventional commits for apps though. It makes it easier to scan the git logs of a project, and even without using it to determine the next version according to semver, it can still be very useful to group commits for internal changelogs. We just don't tie it to the versioning of the apps.

However, especially when thinking about release notes for our support team or even potentially customer facing, one of the challenges we anticipated was how technical our commit messages usually are. This is usually not a problem for e.g. changelogs of an npm package, since your consumers are also develops with some technical understanding, but for app changelogs with non-tech endusers these seemed unhelpful.

This is where we started our journey, looking into how we wanted to tackle versioning in our apps and how we could automate the process as much as possible.

## Attempt #1: manually

The equivalent to the stone age in our journey to app versioning. Besides some node scripts for bumping versions in the `package.json`, this approach means a lot of manual steps for every release. These included:

- manually running that script before pushing to a deployment branch - we would use the version in the `package.json` to pass this information e.g. to Bugsnag and other services that needed to know the current version of the app
- manually creating release notes by scanning through the git history since the last release (which hopefully had been tagged in git, otherwise the task would become even more tedious)
- then pushing to the deployment branch which would trigger our CI pipeline
- finally, once the CI pipeline was finished, manually sending a Slack message with the release notes, to ensure other teams including customer support and sales were aware of the changes

---

![Flow chart of manual release and versioning process](https://dev-to-uploads.s3.amazonaws.com/i/hndu791299l5yq4t835d.png)

---

**Take aways:**

- 👍 unique versions that worked really well with Bugsnag to keep track of issues in relation to specific releases
- 👍 very readable release notes, easy to digest for non-devs, e.g. the support team or even endusers
- 🤬 very slow process, especially with multiple development environments its basically unfeasible
- 👎 unreliable, very prawn to human error
- 👎 a lot of duplicated effort (describing issues and solutions in commits, PRs and then manually for the release notes again)

This process was tedious to say the least, but I still think it's always good to start here. It might seem unnecessary and painful, but doing a task that you would like to automate manually first usually allows you to identify specifically what it is that you want to automate and what the ideal outcomes should be. Too early abstractions and automations can easily lead to messy solutions that don't actually do what you wanted in the beginning.

## Attempt #2: pre-push git hook

It became very obvious very quickly that the initial approach was not really scalable or in any shape or form developer friendly. To improve that, we wrote a node script, that kept track of releases and release notes. To do so, you would need to run it on the relevant branches before pushing to them. It would then:

- use git to find the commits since the last release and create release notes based on that
- to make the notes more non-tech user friendly and readable, we also used the Github API to find PRs related to the commits and use the PR titles instead of commit messages
- the script would then bump the version for the specific environment in a dedicated `versions.json` in the repo, which would serve as the source of truth e.g. for Bugsnag reporting
- it would then add general release information like the commit range to a `changelog.json`, as well as release notes based on the git/Github information to `changelog/[ENVIRONMENT].md` files
- and finally it would send a Slack message with the generated changelogs to a dedicated channel, again trying to keep other teams in the loop as we did before

To automate the whole process we added a [pre-push hook](https://git-scm.com/docs/githooks) (using [husky](https://github.com/typicode/husky)) to our repos, which then triggered it whenever anyone pushed to the release branches. The release notes and other release information the script created were stored and committed to the repo itself. The idea was that this way you could just jump around in the history and always see the relevant release notes and history relevant to the commit you're on. Also having the readmes in github seemed like a convenient way to consume them (especially with them being tied to the git history, so you could jump back to any older commit and the changelogs would correctly represent the state at the time).

This all sounded good in theory, but it meant every release would create an extra commit, which also gets a bit weird in a pre-push hook, since you can't change what's being pushed on the fly (so you basically need to create a new commit, push everything and then cancel the original push), which made the hook a bit weird and confusing unless you knew about this 😕

Actually storing the release information was also problematic for several reasons:

- a major one was space - they will quickly grow out of proportion
- they also caused merge conflicts on pretty much **every** merge - to get around those, we added a custom merge driver that the node script would install on first run, that would deal with any merge conflicts related to the release files and resolve them sensibly automatically

Without going into any details, you can already tell that the whole system got pretty complex pretty quickly.

---

![Flow chart showing the process with the pre-push hook implementation](https://dev-to-uploads.s3.amazonaws.com/i/llmgwl4161dd49b0yb1q.png)

---

**What we learned:**

- 👍 process is automated, so no more manual digging through the git logs every time you wanted to push to a release branch
- 👍 accurate release notes, that we could post e.g. in Slack to keep everyone aware of changes being pushed to the different environments
- 👎 very technical release notes, PR titles are OK but still not as good as manually curated changelogs
- 👎 still quite tedious process, even with the release automation in place, especially with multiple deployment environments
- 👎 still unreliable to an extend - to be able to do the Github API calls and send the Slack message, the local environment of the developer pushing to the deployment branch needed to be set up with the respective auth tokens, which is really inconvenient and made the process quite brittle
- 👎 the release notes were actually created and sent to Slack on push, not on deployment, which added confusion e.g. for customer support, not knowing when exactly an issue that was reported fixed in the latest version would actually be fixed in the product
- 👎 having the release notes in the repo seemed useful at the start, but the space they take vs the amount of times people actually looked at them there quickly got out of hand, to the point where we actually deleted older logs manually every now and then

## Attempt #3: CI script

The main reason we didn't start here was because we didn't know where to properly store the release information. Creating commits in our CI pipeline to bump versions and add release info seemed like a very bad idea.

Having experienced all the problems the pre-push hook solution caused though, we went back to our CI pipeline again looking other ways we could keep track of releases. The obvious choice was Bugsnag, one of the core reason why we wanted proper versioning in the first place. Turns out Bugsnag offers a [REST API](https://docs.bugsnag.com/api/) that allows you to [read and create releases](https://docs.bugsnag.com/api/build/), including custom meta data on them, so seemingly perfect for what we want to do.

But now that we want to do all "magic" in the CI pipeline, we won't necessarily have access to git anymore to get all the commit information we need. Luckily, the [Github API](https://developer.github.com/v3/) gives you pretty much all you need: [search for commits for a specific range](https://developer.github.com/v3/repos/commits/#compare-two-commits) (i.e. last release to current commit), [create tags](https://developer.github.com/v3/git/tags/) for your releases, [search for PRs for specific commits](https://developer.github.com/v3/search/#search-issues-and-pull-requests) which we already used for the last solution, etc. So essentially we just ended up re-writing our node script to make it able to run in CI and moved the execution of the script into our build step.

---

![Flow chart showing the data flow in the new process](https://dev-to-uploads.s3.amazonaws.com/i/l9dqduhvzdr335vy4bw7.png)

---

**Where we're at right now:**

- 👍 process truly automated, no developers have to worry about their local setup being correct to be able to push to a deployment branch
- 👍 reliable, due to the above, as long as the setup for the CI pipeline is correct, everything will run smoothly
- 👍 no ugly release commits that create unnecessary noise in your git history
- 👍 no release notes in the repo anymore that added extra merge conflict pain
- 👍 the release notes will now be generated when the app is deployed, not pushed to the deployment branch
- 👎 we still haven't done much about the readability of the release notes, still the same as before
- 👎 we're now relying on a third party service (= Bugsnag) for the release information

## The future?

Overall it feels like we're moving in the right direction with out changes to the way we version our apps and the processes around it. I think it makes sense at this stage to start thinking about building our own release service, even if it's super simple in the beginning. It could store all the data related to our release, including even more sophisticated metrics like bundle sizes, test coverage, etc.

I'm personally also keen to open source the tools we build around the processes described above, maybe even make them more generic and therefore useful for others (e.g. by structuring it in a way that allows custom handlers and middleware for each of the performed steps).

But beyond all, this is obviously still very much moving and work in progress. I'm really keen to see how the latest iteration of our process holds up in production and what next steps we can take to further improve it from here 😊
