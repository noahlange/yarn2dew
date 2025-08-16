# yarn2dew

Compile dialogue files written in [Yarn](https://www.yarnspinner.dev/) to static JSON content that can be imported "natively" as events into Stardew Valley via Content Patcher.

The SDV event format is not the easiest to work with. Yarn is easier to work with for writers _and_ programmers and supports a feature set that would be onerous to implement by hand in SDV. And while some parts of that feature set _does_ require the Yarn runtime, not _all_ of it does.

## Features

- [x] Content Patcher-compatible output
- [x] branching dialogue
- [x] ✨ automagical ✨ localization
- [x] event conditions, game state queries
- [x] consecutive dialogue inlining
- [x] commands
  - [x] arbitrary commands (e.g.,`<<move farmer 3 4>>`)
  - [x] literal commands (e.g., `<<$ jump farmer 8>>`)
  - [x] yarn built-ins
    - [x] `jump` (use `$ jump` for SDV's "jump")
    - [x] `wait` (converted to `pause`)
    - [x] `stop` (same as `end`)
  - [x] automatic `end` insertion

### Unsupported

- runtime-y features
  - flow control: `if`, `else`, `elseif`, `detour`, `return`
  - variables: `set`, `declare`, `enum`
  - state: `once`, `endonce`
  - line, node groups
  - saliency, storylets
- some Stardew features
  - whatever the heck forks are

## Notes

### `target`

Every entry node must have a `target` field corresponding to ContentPatcher's Target field.

### `filename`

Include a "filename" key in the top-level node metadata to write events to a specific file.

### Preconditions

Use the `when` command to add runtime constraints on when an event can run.

```yarn
<<when Weather Sun>>

// inline function syntax for game state queries (for autocompletion)
<<when {BuildingsConstructed("Here", "Junimo Hut")}>>
<<when {MineLowestLevelReached(50)}>>

// raw game state queries
<<when GameStateQuery !WEATHER Here Sun>>
```

### Custom Commands & Macros

You can write custom `commands` and `macros`, which expand to encompass multiple commands. These have low-level access to the compiler and a primitive event state. The functional distinction is mostly academic, but a macro allows you to explicitly indicate that something isn't built-in.

These are registered in a `y2d.config.{ts,js}` file at the project root.

```ts
/**
 * custom command, sets viewport state to 5, 5
 * usage: <<viewport 5 5>>
 */
export function viewport($: Compiler, state: State, x: string, y: string) {
  state.viewport = { x, y };
  $.writeLine(`viewport ${x} ${y}`);
}
```

```ts
/**
 * Macro: fade out to black, move the camera offscreen.
 * <<$beginFade>>
 */
export function beginFade($: Compiler, state: State, time: string = '0.007', toContinue: string = 'false') {
  state.beginFade = { time, toContinue };
  $.writeLine(`globalFade ${time} ${toContinue != 'false'}`);
  $.writeLine('viewport -100 -100');
}

/**
 * Move back to original location, fade in from black.
 * <<$endFade>>
 */
export function endFade($: Compiler, state: State) {
  // reset viewport to its initial value
  const { x, y } = state.viewport;
  $.writeLine(`viewport ${x} ${y}`);
  // copy params from the fade out
  const { time = 0.007, toContinue = 'true' } = state.beginFade;
  $.writeLine(`globalFadeToClear ${time} ${toContinue != 'false'}`);
  // unset state
  delete state.beginFade;
}
```

Which allows this:

```yarn
<<$beginFade>>
Foo: This is dialogue.
<<$endFade>>
```

to be emitted as:

```
/globalFade
/viewport -100 100
/speak Foo "This is dialogue."
/viewport 5 5
/globalFadeToClear
```

## Example

```yarn
title: Adventure
position: -227,-211
start: 100,-100
music: Cowboy_OVERWORLD
target: AdventureGuild
---
// preconditions
<<when Time 1900 2300>>
<<when Friendship Marlon 750>>
<<when {MineLowestLevelReached(50)}>>

// positioning data
<<start farmer 4 15 0>>
<<start Marlon 4 11 2>>
<<changeLocation AdventureGuild>>

// content
<<viewport 4 11>>
<<move farmer 0 -2 0>>
Marlon: You're obligated to go on an adventure this {"{{Season}}"}!
Whaddya say?
-> Neat-o!
  Marlon: Have you ever been on an adventure before?
  -> Of course I have!
    <<jump AdventureStart>>
  -> I haven't—do you have any tips or tricks?
    <<jump AdventureTips>>
-> I don't want to go on an adventure!
  <<jump AdventureFail>>
===

title: AdventureTips
position: 59,-233
---
Marlon regales you with tales of adventure and derring-do, bereft of any educational content whatsoever.
<<jump AdventureStart>>
===

title: AdventureStart
position: 63,12
---
// these are inlined and separated with a "#$b#"
Marlon: Then get out there, adventurer! $h
Marlon: Ah, yes—before I forget, here's some spending money.
<<action AddMoney 1>>
<<$ jump farmer>> // "Jump" must use a command literal
<<end>>
===

title: AdventureFail
position: -215,31
---
Marlon: *Hmph.* $a
Marlon: We'll see how your grandpa feels about that!
// <<end>> is inserted automatically
===
```

## Tooling

There's a very basic implementation of a watching content patcher. It may maul existing `content.json` files, so you'll _probably_ want to keep those in Git just in case.

```sh
bun run dist    # creates an executable
./yarn2dew      # recursively watches for `yarn` file changes,
                # then updates ./i18n/default.json and ./content.json
```

### Config

Create a `y2d.config.ts` file in your working directory.

```ts
export default {
  namespace: 'MyMod',
  directory: '/foo/bar/baz',
  macros: {},
  commands: {}
};
```

![Done with Bun](./dun-with-bun.png)¹

¹ this project has not been endorsed by Bun
