# How to Rebase from an Internal Branch

In this scenario, we have a bunch of commits in 'dev' that are ahead 
of 'master', and we want to add some documentation bypassing our usual habit of 
placing things in 'dev' first. Assume that the commit ancestry graph at the 
beginning looks like this:

```
                         *'dev' head
master --> #1 --> #2 --> #3
```

So we start from 'master', make a bunch of edits, and commits:

```sh
$ git checkout master
$ cd docs; nano motorcycle.md
$ cd ..; git add docs/*.md
$ git commit -s
```

After the commit, the ancestry graph would look like this:

```
                         *'dev' head
master^ --> #1 --> #2 --> #3
      \
       \---> master
```

The old 'master' is now 'master^' (the first parent of the 'master'). The new 
'master' commit holds our documentation updates.

Now we have to deal with the 'dev' branch. [git-rebase][1] was written with the 
explicit purpose of helping to maintain branches like 'dev'. We "could" merge 
'master' to 'dev' and keep going, but if we eventually want to cherry-pick and 
merge some, but not necessarily all changes, back to the 'master' branch, it 
often makes later operations for us easier if we rebase (i.e., carry forward 
our changes) 'dev' rather than merge. So we run 'git rebase':

```
$ git checkout dev
$ git rebase master dev
```

This picks all the commits since the current branch (not that we are now on the 
'dev' branch) forked from the 'master' branch, and forward port these changes.

```
master^ --> #1 --> #2 --> #3
      \                               *'dev' head
       \---> master --> #1 --> #2 --> #3
```

The diff between `master^` and `#1` is applied to `master` and committed to 
create `#1` commit with the commit information (log, author and date) taken 
from commit `#1`. On top of that, `#2` and `#3` commits are made similarly out 
of `#2` and `#3` commits.

Old `#3` is not recorded in any of the `.git/refs/heads/` file anymore, thus, 
after doing this, we will have a dangling commit if we did `git fsck --cache`, 
which is normal. After testing 'dev', we can run `git prune` to get rid of 
those original three commits.

Let’s go back to the earlier picture, with different labels.

As an individual developer, you cloned upstream repository and made a couple of 
commits on top of it.

```
                           *your 'master' head
upstream --> #1 --> #2 --> #3
```

Perhaps you want changes `#2` and `#3` incorporated in the upstream, while you 
feel that `#1` may need further improvements, thus you prepare `#2` and `#3` 
for e-mail submission:

```
$ git format-patch master^^ master
```

This creates two files: '0001-XXXX.patch' and '0002-XXXX.patch'. Send them out 
"To:" the project maintainer and "Cc:" the mailing list. You "should" use 
[git-send-email][2] for this.

You wait and find out that upstream picked up your changes, along with 
other changes.

```
 where                     *your 'master' head
upstream --> #1 --> #2 --> #3
  used   \
 to be    \--> #A --> #2' --> #3' --> #B --> #C
                                             *upstream head
```

The two commits `#2'` and `#3'`, in the above picture, record the same changes 
your e-mail submission for `#2` and `#3` contained, but probably with the new 
sign-off line added by the upstream maintainer and definitely with different 
committer and ancestry information, they are different objects from `#2` and 
`#3` commits.

You fetch the upstream, but not merge:

```
$ git fetch upstream
```

This leaves the updated upstream head in `.git/FETCH_HEAD` but does not touch 
your `.git/HEAD` or `.git/refs/heads/master`. Now you run `git rebase`: 

```
$ git rebase FETCH_HEAD master
```

Earlier, we said that rebase applies all the commits from your branch top of 
the upstream head. Well, that's not exactly true. `git rebase` is a bit smarter 
than that and notices that `#2` and `#3` need not be applied, so it only 
applies `#1`. The commit ancestry graph becomes like this:

```
 where                     *your 'master' head
upstream --> #1 --> #2 --> #3
  used   \                     your new 'master' head*
 to be    \--> #A --> #2' --> #3' --> #B --> #C --> #1'
                                             *upstream
                                              head
```

Again, `git prune` would discard the disused commits `#1`-`#3` and you continue 
on starting from the new 'master' head, which is the `#1'` commit.

[1]: https://git-scm.com/docs/git-rebase
[2]: https://git-scm.com/docs/git-send-email