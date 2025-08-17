# Overview

- [x] Content Patcher-compatible output
- [x] Yarn language service config generation
- [x] ✨ automagical ✨ localization support
- [x] branching dialogue
- [x] event conditions, game state queries
- [x] consecutive dialogue inlining
- [x] [custom commands](/docs/04-compiler.md)
- [x] arbitrary commands (e.g.,`<<move farmer 3 4>>`)
- [x] literal commands (e.g., `<<$ jump farmer 8>>`)
- [x] yarn built-ins
  - [x] `jump` (use `$ jump` for SDV's "jump")
  - [x] `wait` (converted to `pause`)
  - [x] `stop` (same as `end`)
- [x] automatic `end` insertion

## Event conditions

Use the `when` command to add runtime constraints on when an event can run.

```yarn
<<when Weather Sun>>

// inline function syntax for game state queries (for autocompletion)
<<when {BuildingsConstructed("Here", "Junimo Hut")}>>
<<when {MineLowestLevelReached(50)}>>

// raw game state queries
<<when GameStateQuery !WEATHER Here Sun>>
```

## Metadata

All nodes have a single required field (`title`). Entry nodes (the first node in a Yarn file) have different requirements and some different options than the rest.

Most important for the entry node is a `target` field corresponding to ContentPatcher's `Target` (e.g., `Events/Data/Saloon`). All other fields are technically optional, though some (e.g., `filename`, `music`) are more optional than others (e.g., `start`).

| Field    |   Type    | Req. | Entry-only | Description                                    |
| :------- | :-------: | :--: | :--------: | ---------------------------------------------- |
| title    | `string`  |  ✓   |     ✗      | Node title.                                    |
| target   | `string`  |  ✓   |     ✓      | `Target` of content patch                      |
| start    | `int,int` |  ✗   |     ✓      | Starting camera position (default: `0,0`)      |
| music    | `string`  |  ✗   |     ✓      | Starting event music (default: `continue`).    |
| filename | `string`  |  ✗   |     ✓      | JSON output filename (default: `Content.json`) |

- valid options for `music` include `continue`, `null` and [track IDs listed here](https://stardewvalleywiki.com/Modding:Audio#Track_list)
