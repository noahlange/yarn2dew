# yarn2dew

Compile dialogue files written in [Yarn](https://www.yarnspinner.dev/) to static JSON content that can be imported "natively" as events into Stardew Valley via Content Patcher.

The SDV event format is not the easiest to work with. Yarn is easier to work with for writers _and_ programmers and supports a feature set that would be onerous to implement by hand in SDV. And while some parts of that feature set _does_ require the Yarn runtime, not _all_ of it does.

## Features

- [x] Content Patcher-compatible output
- [x] Yarn language service config generation
- [x] branching dialogue
- [x] ✨ automagical ✨ localization
- [x] event conditions, game state queries
- [x] consecutive dialogue inlining
- [x] macros
- [x] custom commands
- [x] arbitrary commands (e.g.,`<<move farmer 3 4>>`)
- [x] literal commands (e.g., `<<$ jump farmer 8>>`)
- [x] yarn built-ins
  - [x] `jump` (use `$ jump` for SDV's "jump")
  - [x] `wait` (converted to `pause`)
  - [x] `stop` (same as `end`)
- [x] automatic `end` insertion

### Unsupported

- flow control: `if`, `else`, `elseif`, `detour`, `return`
- variables: `set`, `declare`, `enum`
- state: `once`, `endonce`
- line + node groups
- saliency, storylets

![Done with Bun](./dun-with-bun.png)¹

¹ this project has not been endorsed by Bun.
