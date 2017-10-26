<h1 align='center'>Motorcycle.ts</h1>

<div align='center'>
  <img src='https://github.com/motorcyclets/motorcycle/raw/master/.assets/logo.png' width='128' />
</div>

<div align='center'>
  <strong>A statically-typed, functional and reactive framework for modern browsers</strong>
</div>

<div align='center'>

[![ComVer](https://img.shields.io/badge/ComVer-compliant-brightgreen.svg)](https://github.com/staltz/comver)
[![Join the chat at https://gitter.im/motorcyclets/motorcycle](https://badges.gitter.im/motorcyclets/motorcycle.svg)](https://gitter.im/motorcyclets/motorcycle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/motorcyclets/motorcycle.svg?branch=master)](https://travis-ci.org/motorcyclets/motorcycle)

</div>

## Packages

- [@motorcycle/types](./packages/types) -- A shared-kernel of types for Motorcycle
- [@motorcycle/stream](./packages/stream) -- Functional and reactive event streams for Motorcycle.ts
- [@motorcycle/run](./packages/run) -- A statically-typed, functional and reactive framework for modern browsers
- [@motorcycle/test](./packages/test) -- Testing functions for Motorcycle.ts
- [@motorcycle/dom](./packages/dom) -- Declarative, functional, reactive abstractions for the DOM
- [@motorcycle/mostly-dom](./packages/mostly-dom) -- Motorcycle.ts adapter for [mostly-dom](https://github.com/TylorS167/mostly-dom)

## Examples

- [Counter](./examples/counter)
- [Traffic Light](./examples/traffic-light)
- [Sokoban](./examples/sokoban) -- A type of transport puzzle, in which the player pushes boxes or crates around in a warehouse, trying to get them to storage locations.
- [Drag-n-Drop](./examples/drag-n-drop) -- A simple drag-n-drop reorderable list.

## Developing

### Requirements

* Latest stable version of [Node](https://github.com/creationix/nvm)
* Latest stable version of [Yarn](https://yarnpkg.com)

### For generating changelog (for those with NPM publishing rights)

* [Ruby >= v2.1.0](https://www.ruby-lang.org/en/downloads/)
* [Github Personal Access Token](https://github.com/settings/tokens)
  - Save the access token you generated for later usage

In your terminal, run the following:

NOTE: `sudo` may be required for all of the following terminal commands.

```sh
# If you're on a Debian-based Linux Distribution, install rake
gem install rake

# Install Github Changelog Generator
gem install github_changelog_generator
```

In your `.bash_profile`, `.zshrc` or equivalent shell configuration file, add the 
following:

```sh
export CHANGELOG_GITHUB_TOKEN=$GITHUB_PERSONAL_ACCESS_TOKEN_GENERATED_ABOVE
```

In a new terminal, you will now be able to successfully run `yarn changelog`
to generate an up-to-date `CHANGELOG.md`.
