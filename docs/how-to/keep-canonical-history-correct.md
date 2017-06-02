# How to Keep Authoritative Canonical History Correct With Git Pull

Sometimes a new project integrator will end up with project history that 
appears to be "backwards" from what other project developers expect. This
how-to presents a suggested integration workflow for maintaining a central 
repository.

Suppose that the central repository has this history:

```
--> o --> o --> A
```

which ends at commit `A`. Then you clone it and work on your own commits, which 
leads you to have this history in _your_ directory:

```
--> o --> o --> A --> B --> C
```

Imagine your coworker did the same and built on top of `A` in _his_ repository 
in the meantime and then pushed it to the central repository:

```
--> o --> o --> A --> X --> Y --> Z
```

Now, if you git push at this point, because your history that leads to `C` 
lacks `X`, `Y`, and `Z`, it will fail. You need to somehow make the tip of your 
history a descendant of `Z`.

One suggested way to solve this problem is "fetch and then merge", a.k.a. 
`git pull`. When you fetch, you branch will have a history like this:

```
--> o --> o --> A --> B --> C
                 \
                  \--> X --> Y --> Z
```

Once you run merge after that, while still on _your_ branch, i.e., `C`, you 
will create a merge `M` and make the history look like this:

```
--> o --> o --> A ---> B ---> C ---> M
                 \                  /
                  \--> X --> Y --> Z
```

`M` is a descendant of `Z`, so you can push to update the central repository. 
Such a merge `M` does not lose any commit in both histories, so in that sense, 
it may not be wrong, but when people want to talk about "the authoritative 
canonical history that is shared among the project participants", i.e., 
"the trunk", they often view it as "commits you see by the first-parent chain", 
and use this command to view it:

```sh
$ git log --first-parent
```

For all other people who observed the central repository after your coworker 
pushed `Z` but before you pushed `M`, the commit on the trunk used to be: 
`o-o-A-X-Y-Z`. Because you made `M` while you were on `C`, `M`'s first parent 
is `C`. By pushing `M` to advance the central repository, you made `X-Y-Z` a 
side branch, not on the trunk.

You would rather want to have a history of this shape:

```
--> o --> o --> A --> X --> Y --> Z --> M'
                 \                     /
                  \--> B -----------> C
```

Then in the first-parent chain it is clear that the project first did `X` and 
then `Y` and then `Z` and merged a change that consists of two commits `B` and 
`C` that achieves a single goal. You may have worked on fixing the bug #12345 
with these two patches, and the merge `M'` with swapped parents can say in its 
log message: 'Merge fix/bug-12345'. Having a way to tell `git pull` to create a 
merge but record the parents in reverse order may be a way to do so.

Note the mention to "achieve a single goal" above, because it is important. 
"Swapping the merge order" only covers a special case where the project doesn't 
care too much about having unrelated things done in a single merge, but cares a 
lot about the first-parent chain.

There are multiple schools of thought about "trunk" management.

1. Some projects want to keep a completely linear history without any merges. 
   Obviously, swapping merge order would not match their taste. You need to 
   flatten your history on top of the updated upstream to result in a history 
   of this shape instead:

   ```
   --> o --> A --> X --> Y --> Z --> B --> C
   ```

   ... with `git pull --rebase` or something.

2. Some projects tolerate merges in their history, but do not worry too much 
   about the first-parent order, and allow fast-forward merges. To them, 
   swapping the merge order does not hurt, but it is unnecessary.

3. Some projects want each commit on the "trunk" to do one single thing. 
   The output of `git log --first-parent` in such a project should show either 
   a merge of a side branch that completes a single theme, or a single commit 
   that completes a single theme by itself. If your two commits `B` and `C` (or 
   they may even be two groups of commits) were solving two independent issues, 
   then the merge `M'`, we made in the earlier example by swapping the merge 
   order, is still not up to the project standard. It merges two unrelated 
   efforts, `B` and `C`, at the same time.

For projects in the last category (motorcycle being one of them), individual 
developers would want to prepare a history more like this:

```
                  /--> C0 --> C1 --> C2    topic-c
                 /
--> o --> o --> A                          master
                 \
                  \--> B0 --> B1 --> B2    topic-b
```

That is, keeping separate topics on separate branches, perhaps like so:

```sh
$ git clone
$ git checkout -b topic-b master
# ... work to create B0, B1 and B2 to complete one theme
$ git checkout -b topic-c master
# ... same for the theme of topic-c
```

... and then:

```sh
$ git checkout master
$ git pull --ff-only
```

... would grap `X`, `Y` and `Z` from the upstream and advance your 
'master' branch:

```
                  /--> C0 --> C1 --> C2    topic-c
                 /
--> o --> o --> A --> X --> Y --> Z        master
                 \
                  \--> B0 --> B1 --> B2    topic-b
```

Then you would merge these two branches separately:

```sh
$ git merge topic-b
$ git merge topic-c
```

... to result in:

```
                  /--> C0 --> C1 --------> C2
                 /                           \
--> o --> o --> A --> X --> Y --> Z --> M --> N
                 \                     /
                  \--> B0 --> B1 --> B2
```

... and push it back to the central repository.

It is very much possible that while you are merging 'topic-b' and 'topic-c', 
somebody again advanced the history in the central repository to put `W` on top 
of `Z`, and make your git push fail.

In such a case, you would rewind to discard `M` and `N`, update the tip of your 
'master' again and redo the two merges:

```sh
$ git reset --hard origin/master
$ git pull --ff-only
$ git merge topic-b
$ git merge topic-c
```

This procedure will result in a history that looks like this:

```
                  /--> C0 --> C1 --------------> C2
                 /                                 \
--> o --> o --> A --> X --> Y --> Z --> W --> M --> N
                 \                           /
                  \--> B0 --> B1 --------> B2
```