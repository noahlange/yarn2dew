# yarn2dew

Compile dialogue files written in [Yarn](https://www.yarnspinner.dev/) to static JSON content that can be imported "natively" into Stardew Valley via Content Patcher.

The [SDV event format](https://stardewvalleywiki.com/Modding:Event_data) is not particularly easy to work with, but Yarn is easy to work with for writers _and_ programmers! It's worth noting that this only supports a subset of Yarn's overall feature set; there are serious complications around flow control, managing variables, state, function calls, &c., at runtime.

## Features

- [x] Content Patcher-compatible output
- [x] Yarn language service config generation
- [x] branching dialogue
- [x] ✨ automagical ✨ localization
- [x] event conditions, game state queries
- [x] consecutive dialogue inlining
- [x] compile-time state
- [x] macros + custom commands
- [x] arbitrary commands (e.g.,`<<move farmer 3 4>>`)
- [x] literal commands (e.g., `<<$ jump farmer 8>>`)
- [x] yarn built-ins
  - [x] `jump` (use `$ jump` for SDV's "jump")
  - [x] `wait` (converted to `pause`)
  - [x] `stop` (alias for `end`)
- [x] automatic `end` insertion

### Unsupported

- flow control: `if`, `else`, `elseif`, `detour`, `return`
- variables: `set`, `declare`, `enum`
- runtime state: `once`, `endonce`
- line + node groups
- saliency, storylets

![Done with Bun](./dun-with-bun.png)¹

¹ this project has not been endorsed by Bun.
