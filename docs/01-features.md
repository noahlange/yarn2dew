# Overview

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

## Commands & Macros

You can write custom `commands` and `macros`, which expand to encompass multiple commands. These have low-level access to the compiler and a primitive event state. The functional distinction is _basically_ nil, but using a macro allows you to explicitly indicate that something isn't built-in.

There are a few macros integrated by default:

| Name             | Signature             | Description                                                    |
| :--------------- | :-------------------- | -------------------------------------------------------------- |
| `$positionReset` | `<actor>`             | Reset's an actor's pixel offset to 0, 0.                       |
| `$beginFade`     | `[time] [toContinue]` | Start a global fade, move the camera off-screen.               |
| `$endFade`       |                       | Fade in with prev. params, return camera to original position. |

New ones can be registered in the `y2d.config.{ts,js}` file at the project root. By assigning a `ysls` property with a value adhering to the Yarn Language Server spec, the macro will be added to the project's YSLS config on boot.

```ts
const helloWorld = Object.assign(
  ($, state, ...args) => $.writeLine(`message "Hello, world!"`),
  {
    ysls: {
      YarnName: '$helloWorld',
      Documentation: 'Display a message reading "Hello, world!"',
      Parameters: []
    }
  }
);

export default {
  // ...
  macros: {
    helloWorld
  }
};
```
