# Workflow

> A workflow using **confluent** to mirror local markup files in Confluence

To use **confluent**, create a *confluent project*:

```bash
▲ mkdir -p $HOME/workspace/confluent
▲ cd $HOME/workspace/confluent
▲ git init
```

**confluent** is just a wrapper around an already-familiar tool,
**git**.  By convention, the contents of *master* will be mirrored to
confluent.

The mirroring scheme is configured by the layout of files in your
confluent project.  Top-level directories translate to
Confluence's
[spaces](https://confluence.atlassian.com/doc/spaces-139459.html):
<!-- TODO: link -->

```bash
▲ mkdir ecrosson fizzbuzz
▲ touch ecrosson/Profile.md fizzbuzz/Getting\ Started.rst
▲ tree .
.
├── ecrosson
│   └── Profile.md
└── fizzbuzz
    └── Getting Started.rst

2 directories, 2 files
```

Files inside top-level directories correspond to wiki pages.  Files
will be uploaded to their respective space, and translated from their
current format into a format Confluence understands.

After finalizing edits to the files, prepare to publish on Confluence
by committing to git:

```bash
▲ git add ecrosson; git commit -m "Add profile"
▲ git add fizzbuzz; git commit -m "Add getting-started page"
```

Now we are ready to publish our changes to Confluence.  There are two
available *strategies*:

- `ours`, and

- `friendly`

`ours` will replace each wiki with the contents of *master*, while
`friendly` allows the user to consider changes to the wiki that are
not yet tracked in **confluent**.

```bash
confluence [--friendly]
```

If the `friendly` strategy detects upstream changes, you will be asked
to commit or clean the repository and re-run `confluent --friendly`.
