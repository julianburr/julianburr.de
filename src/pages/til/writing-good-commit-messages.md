---
title: Writing good commit messages
description: And why it matters
date: 2019-10-03
tags: git, opinion
---

I recently stumbled across a tweet that resonated a lot with me, cause it touches on something I've been trying to bring to my team at rexlabs for a while now: the importance of good commit messages in git.

https://twitter.com/r00k/status/1175100703829909505

Below some of the rules I try to follow and the reasons why.

## Keep the main message short, then use the description for more details

Your commit message should always be structured as a short, one-line summary. If necessary, you can add a more detailed multi-line description body after that to elaborate on the summary and add references to external resources (e.g. JIRA issues) where possible.

```
[summary]

[description body...]
[...can be multi line]

Issues: [external references]
```

Why? For me, mostly, for consistency. Most of these tips here fall into this category. It's less about doing it this specific way, and more about doing it consistent across commits within your team. This will reduce congnitive overhead you don't even know you're dealing with 😅

But even beyond that, the above structure has a couple of benefits. UI tools, incl. github, usually cut off the commit messages, so trying to summarize your commit in a single line helps finding the right commits later on. The longer description and references to external issues will help you understand what's going on and what motivated the changes in a specific commit when looking at it in the future.

## Use imperative statement

Again, this is mostly for consistency.

But also, changes in your commits are always made with an intend. You might have forgotten some edge cases to actually fully fulfill the intend and/or you might have broken other functionality in the process. If commit summaries are phrased as [imperative statements](https://www.k12reader.com/4-sentence-types/), it will be easier when looking back to understand if side effects of the commit were part of the authors intention or not.

## Describe why you made the change, not just what you changed

I always struggled putting this part into words, until I saw the tweet mentioned above. This, in my opinion, is one of the crucial differences between good and bad commit messages.

Especially with small changes, it's very likely easy to see from the diff what changed, but it's almost always impossible to understand why the author changed it. Ever been in the situation where you change something and in your head you just go "I swear I changed that a couple of weeks ago" and you check the git history of that file and see that you and a co-worker have been changing the file forth and back for a while now, trying to fix two completely separate bugs? Or even you and yourself? 😅

This does NOT mean that you shouldn't mention the what at all. As mentioned before, the commit summary is mainly there to be able to find specific commits and changes in a large list of commits. So, in the summary, the what makes a lot of sense. The description body however should always be about the why and the context of the changes.

## Use conventions, e.g. conventional commits, and linters to enforce them

Another rule that mainly exists for consistency. Conventions like [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) make sure that your commit messages all use the same patterns and conventions. This can include prefixes to group commits into different groups/types of commits.

Following conventions can have multiple benefits, besides the mentioned consistency. Specifying the type of commit in the summary can help finding specific commits more quickly. It also can be used to automatically generate changelogs from your commit logs, e.g. using [`semantic-release`](https://github.com/semantic-release/semantic-release) or [`lerna`](https://github.com/lerna/lerna) for monorepos.

And what do we usually do to easily enforce conventions, especially when they are mainly to ensure consistency and compatibility with thrid party libraries: we use linters. Obviously you can do the same for commit messages, thanks to git hooks (in particular the pre-commit hook in this case). Using tools like [`husky`](https://github.com/typicode/husky) for the hook and [`commitlint`](https://github.com/conventional-changelog/commitlint) for the liniting, you can make sure that everyone follows the convention you agreed on 😊

## Reference external issues and sources

As mentioned before, it's important to give context and reasons why the changes in a commit have been made. An easy way to do so is by referencing the external issues (e.g. JIRA or github issues) that lead to the changes.

As additional motivation for this, a lot of UIs integrate with these thrid party apps to create links or even inline tooltips to quickly get additional information simply based on the references made in the commit message.

In any case, more information on why the author made the changes in a specific commit is always a win.

## Don't assume any pre-knowledge or context

This one is pretty obvious, but still often ignored (I am guilty of not always following this rule myself 🙈).

Never assume any pre-knowledge of knowledge of context that you don't mention in your commit message. If there is relevant context, include it in the summary or description body. Other team members or even future you will thank you for that!

## Side note: squash where it makes sense

Not really related to the messages themselves, so just as a side note here. Also, this one is potentially a bit more controversial, so definitely follow the rules of your team. But personally, I think commit squashing (or generally [interactive rebasing](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)) is a very powerful tool, but with power also comes responsibility 😉

I'm not saying "always squash your commits", actually I'm very much against that. Commits are very useful to understand not only the time line in which changes were made (to e.g. identify a specific commit that introduced a bug using [git bisect](https://git-scm.com/docs/git-bisect)), but also a handy form of documentation of things that have been tried. E.g. when trying to fix a bug or improve your apps performance, being able to see what has been tried, even if it was unsuccessful, can be very useful to avoid trying the same things over and over again.

That being said, there are still a lot of commits that are useless, e.g. removing console logs, reverting accidential changes from previous commits, etc.

Why is it important to get rid of these commits? First of all it helps you maintain a meaningful commit history. By squashing meaningless commits you end up with a very useful list of changes in your commit log as a natural consequence. It can also significantly reduce the amount of merge conflicts during [rebases](https://git-scm.com/docs/git-rebase). During a rebase, all your commits are being applied one by one on top of the new base commit. Let's say you made an accidental change to a file and reverted it in the next commit, at the same time there have been changes to that file in the base branch, suddenly you have to resolve two conflicts during your rebase, even though you effectively didn't change anything in that file. This can blow out and make rebasing really painful real quick (he said from experience 😅).

I'm sure there are a lot more important and sensible rules and tips around commit messages, but these are the most meaningful I can think of right now. To sum it up, commit messages matter. As a consequence, we should spend more time properly thinking about them that most of us likely do.
