# 1. Git Workflows

> Git workflows - an overview of the recommended workflows with Git

<!-- TOC depthFrom:2 -->

- [1. Description](#1-description)
- [2. Separate Changes](#2-separate-changes)
- [3. Managing Branches](#3-managing-branches)
  - [3.1. Graduation](#31-graduation)
  - [3.2. Merging upwards](#32-merging-upwards)
  - [3.3. Topic branches](#33-topic-branches)
  - [3.4. Throw-away integration](#34-throw-away-integration)
  - [3.5. Branch management for a release](#35-branch-management-for-a-release)
  - [3.6. Branch management for 'next' and 'dev' after a feature release](#36-branch-management-for-next-and-dev-after-a-feature-release)
- [4. Distributed Workflows](#4-distributed-workflows)
  - [4.1. Merge workflow](#41-merge-workflow)
  - [4.2. Patch workflow](#42-patch-workflow)

<!-- /TOC -->

## 1. Description

This documentation attempts to write down and motivate some of the workflow 
elements used for `motorcycle.git`.

We formulate a set of 'rules' for quick reference, while the prose tries to 
motivate each of them. Do not always take them literally; you should value good 
reasons for your actions higher than documents such as this one.

## 2. Separate Changes

As a general rule, you should try to split your changes into small logical 
steps and commit each of them. They should be consistent, working independently 
of any later commits, pass the test suite, etc. This makes the review process 
much easier, and the history much more useful for later inspection and 
analysis, for example with [git-blame][1] and [git-bisect][2].

To achieve this, try to split your work into small steps from the very 
beginning. It is always easier to squash a few commits together than to split 
one big commit into several. Don't be afraid of making too small or imperfect 
steps along the way. You can always go back later and edit the commits with 
`git rebase --interactive` before you publish them. You can use 
`git stash save --keep-index` to run the test suite independent of other 
uncommitted changes; see the [EXAMPLES][3] section of [git-stash][4].

## 3. Managing Branches

There are two main tools that can be used to include changes from one branch to 
another: [git-merge][5] and [git-cherry-pick][6].

Merges have many advantages, so we try to solve as many problems as possible 
with merge alone. Cherry-picking is still occasional useful; see 
"Merging upwards" below for an example.

Most importantly, merging works at the branch level, while cherry-picking works 
at the commit level. This means that a merge can carry over changes from 1, 10, 
or 1000 commits with equal ease, which in turn means that the workflow scales 
much better to a large number of contributors (and contributions). Merges are 
also easier to understand because a merge commit is a "promise" that all 
changes from all its parents are now included.

There is a trade-off of course: merges require a more careful branch 
management. The following subsections discuss the important points.

### 3.1. Graduation

As a given feature goes from experimental to stable, it also "graduates" 
between corresponding branches of the software. `motorcycle` uses the following 
'integration branches':

* 'master' tracks commits that should go into the next release;

* 'next' is intented as a testing branch for topics being tested for stability 
  on master

There’s a third official branch that is slightly different:

* 'dev' is an integration branch for things that are not quite ready for 
  inclusion yet (See "Integration Branches" below).

Each of the three branches is usually a direct descendant of the one above it.

Conceptually, the feature enters an unstable branch (usually 'next' or 'dev'), 
and "graduates" to 'master' for the next release once it is considered 
stable enough.

### 3.2. Merging upwards

The "downwards graduation", discussed above, cannot be done by actually merging 
downwards, however, since that would merge 'all' the changes on the unstable 
branch into the stable one. Hence the following:

> #### Rule: Merge upwards
> Always commit your fixes to the oldest branch that require them. Then 
> (periodically) merge the integration branches upwards into each other.

This gives a very controlled flow of fixes. If you notice that you have applied 
a fix to e.g. 'next' that is also required in 'master', you will need to 
cherry-pick it (using [git-cherry-pick][6]) downwards. This will happen a few 
times and is nothing to worry about unless you do it frequently.

### 3.3. Topic branches

Any nontrivial feature will require several patches to implement, and may get 
extra bug fixes or improvements during its lifetime.

Committing everything directly on the integration branches lead to many 
problems: Bad commits cannot be undone, so they must be reverted one by one, 
which creates confusing histories and further error potential when you forget 
to revert part of a group of changes. Working in parallel mixes up the changes, 
creating further confusion.

Use of "topic branches" solves these problems. The name is pretty self 
explanatory, with a caveat that comes from the "merge upwards" rule above:

> #### Topic branches
> Make a side branch for every topic (feature, bugfix, ...). Branch it off at 
> the oldest integration branch that you will eventually want to merge it into.

Many things can be done very naturally:

* To get the feature/bugfix into an integration branch, simply merge it. If the 
  topic has evolved any further in the meantime, merge again. (Note that you do 
  not necessarily have to merge it to the oldest integration branch first. 
  For example, you can first merge a bugfix to 'next', give it some testing 
  time and merge it to 'master' when you know itś stable.)

* If you find you need new features from the branch 'other' to continue working 
  on your topic, merge 'other' to 'topic'. (However, do not do this "just habitually", see below.)

* If you find you branched off the wrong branch and want to move it 
  "back in time", use [git-rebase][7].

Note that the last point clashes with the other two: a topic that has been 
merged elsewhere should not be rebased. See the section on [RECOVERING FROM 
UPSTREAM REBASE][8] in [git-rebase][7].

We should point out that "habitually" (regularly for no real reason) merging 
an integration branch into topics -- and by extension, merging anything 
upstream into anything downstream on a regular basis -- is frowned upon:

> #### Rule: Merge to downstream only at well-defined points
> Do not merge to downstream except with a good reason: upstream API changes 
> affect your branch; your branch no longer merges to upstream cleanly; etc.

Otherwise, the topic that was merged to suddenly contains more than a single 
(well-separated) change. The many resulting small merges will greatly clutter 
up history. Anyone who later investigates the history of a file will have to 
find out whether that merge affected the topic in development. An upstream 
might even inadvertently be merge into a "more stable" branch. And so on.

### 3.4. Throw-away integration

If you followed the last paragraph, you will now have many small topic 
branches, and occasionally wonder how they interact. Perhaps the result of 
merging them doesn't even work? But on the other hand, we want to avoid merging 
them anywhere "stable" because such merges cannot easily be undone.

The solution, of course, is to make a merge that we can undo: merge into a 
throw-away branch.

> #### Rule: Throw-away integration branches
> To test the interaction of several topics, merge them into a throw-away 
> branch. You must never base any work on such a branch!

If you make it (very) clear that this branch is going to be deleted right after 
testing, you can even publish this branch, for example to give testers a chance 
to work with it, or developers a chance to see if their in-progress work will 
be compatible. 'motorcycle.git' has such an official branch called 'dev'.

### 3.5. Branch management for a release

Assuming you are using the merge approach discussed above, when you are 
releasing you project, you will need to do some additional branch management 
work.

A feature release is created from the 'master' branch, since 'master' tracks 
the commits that should go into the next feature release.

Apply a tag to the tip of 'master' indicating the release version.

> #### Recipe: Release tagging
> `git tag -s -m "Motorcycle X.Y" vX.Y master`

You need to push the new tag to the public Git repository (see "Distributed 
Workflows" below). This makes the tag available to others tracking the project. 
The push should also trigger a post-update hook to perform release-related 
items such as building preformatted documentation pages and publish packages.

### 3.6. Branch management for 'next' and 'dev' after a feature release

After a feature release, the integration branch 'next' may optionally be 
rewound and rebuilt from the tip of 'master' using the surviving topics on 
'next'.

> #### Recipe: Rewind and rebuild 'next'
> `git checkout next`
>
> `git reset --hard master`
>
> `git merge ts/topic_in_next1`
>
> `git merge fk/topic_in_next2`
>
> ...

The advantage of doing this is that the history of 'next' will be clean. 
For example, some topics merged into 'next' may have initially looked 
promising, but were later found to be undesirable or premature. In such a case, 
the topic is reverted out of 'next' but the fact remains in the history that it 
was once merged and reverted. By recreating 'next', we give another 
incarnation of such topics a clean slate to retry, an a feature release is a 
good point in history to do so.

If you do this, then you should make a public announcement indicating that 
'next' was rewound and rebuilt.

The same rewind and rebuild process may be followed for 'dev'. A public 
announcement isn't necessary since 'dev' is a throw-away branch, as 
described above.

## 4. Distributed Workflows

After the last section, you should know how to manage topics. In general, you 
will not be the only person working on the project, so you will have to share 
your work.

Roughly speaking, there are two important workflows: merge and patch. 
The important difference is that the merge workflow can propagate full history, 
including merges, while patches cannot. Both workflows can be used in parallel: 
in `motorcycle.git`, only subsystem maintainers use the merge workflow, while 
everyone else sends patches.

Note that the maintainer(s) may impose restrictions, such as "Singed-off-by" 
requirements, that all commits/patches submitted for inclusion must adhere to. 
Consult this project’s documentation for more information.

### 4.1. Merge workflow

The merge workflow works by copying branches between upstream and downstream. 
Upstream can merge contributions into the official history; downstream base 
their work work on the official history.

There are three main tools that can be used for this:

* [git-push][9] copies your branches to a remote repository, usually to the one 
  that can be read by all involved parties;

* [git-fetch][10] that copies remote branches to your repository; and

* [git-pull][11] that does fetch and merge in one go.

Note the last point. Do 'not' use 'git pull' unless you actually want to merge 
the remote branch.

Getting changes out is easy:

> #### Recipe: Push/pull: Publishing branches/topics
> `git push <remote> <branch>` and tell everyone where they can fetch from.

You will still have to tell people by other means, such as mail. (Git provides 
the [git-request-pull][12] to send preformatted pull requests to upstream 
maintainers to simplyfy this task.)

If you just want to get the newest copies of the integration branches, staying 
up to date is easy, too:

> #### Recipe: Push/pull: Staying up to date
> Use `git fetch <remote>` or `git remote update` to stay up to date.

Then simply branch off your branches from the stable remote as 
explained earlier.

If you are a maintainer and would like to merge other people's topic branches 
to the integration branches, they will typically send a request to do so by 
mail. Such a request looks like

```
-------------------------------------
Please pull from
    <url> <branch>
-------------------------------------
```

In that case, 'git pull' can do the fetch and merge in one go, as follows.

> #### Recipe: Push/pull: Merging remote topics
> `git pull <url> <branch>`

Occasionally, the maintainer may get merge conflicts when he tries to pull 
changes from downstream. In this case, he can ask downstream to do the merge 
and resolve the conflicts themselves (perhaps they will know better how to 
resolve them). It is one of the rare cases where downstream 'should' merge from 
upstream.

### 4.2. Patch workflow

If you are a contributor that send changes upstream in the form of e-mails, you 
should use topic branches as usual (see above). Then use [git-format-patch] to 
generate corresponding e-mails (highly recommend over manual formatting them 
because it makes the maintainer's life easier).

> #### Recipe: format-patch/am: Publishing branches/topics
> * `git format-patch -M upstream..topic` to turn them into preformatted
>   patch files
> * `git send-mail --to=<recipient> <patches>`

See the [git-format-patch][13] and [git-send-mail][14] manpages for further 
usage notes.

If the maintainer tells you that your patch no longer applies to the current 
upstream, you will have to rebase you topic (you cannot use a merge because you 
cannot format-patch merges):

> #### Recipe: format-patch/am: Keeping topics up to date
> `git pull --rebase <url> <branch>`

You can then fix the conflicts during the rebase. Presumably you have not 
published your topic other than by mail, so rebasing it is not a problem.

If you receive such a patch series (as a maintainer, or perhaps as a reader of 
the mailing list it was sent to), save the mails to files, create a new topic 
branch and use 'git am' to import the commits:

> #### Recipe: format-patch/am: Importing patches
> `git am < patch`

One feature worth pointing out is the three-way merge, which can help if you 
get conflicts: `git am -3` will use index information contained in patches to 
figure out the merge base. See [git-am][15] fro other options.

[1]: https://git-scm.com/docs/git-blame
[2]: https://git-scm.com/docs/git-bisect
[3]: https://git-scm.com/docs/git-stash#_examples
[4]: https://git-scm.com/docs/git-stash
[5]: https://git-scm.com/docs/git-merge
[6]: https://git-scm.com/docs/git-cherry-pick
[7]: https://git-scm.com/docs/git-rebase
[8]: https://git-scm.com/docs/git-rebase#_recovering_from_upstream_rebase
[9]: https://git-scm.com/docs/git-push
[10]: https://git-scm.com/docs/git-fetch
[11]: https://git-scm.com/docs/git-pull
[12]: https://git-scm.com/docs/git-request-pull
[13]: https://git-scm.com/docs/git-format-patch
[14]: https://git-scm.com/docs/git-send-mail
[15]: https://git-scm.com/docs/git-am