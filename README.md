# yarn2dew

Compile dialogue files written in [Yarn](https://www.yarnspinner.dev/) to static JSON content that can be imported "natively" as events into Stardew Valley via Content Patcher.

The SDV event format is not the easiest to work with. Yarn is easier to work with for writers _and_ programmers and supports a feature set that would be onerous to implement by hand in SDV. And while some parts of that feature set _does_ require the Yarn runtime, not _all_ of it does.

## Features

- [x] Content Patcher-compatible output
- [x] branching dialogue
- [x] ✨ automagical ✨ localization
- [x] event conditions, game state queries
- [x] commands
  - [x] arbitrary commands (e.g.,`<<move farmer 3 4>>`)
  - [x] literal commands (e.g., `<<$ jump farmer 8>>`)
  - [x] yarn built-ins
    - [x] `jump` (use `$ jump` for SDV's "jump")
    - [x] `wait` (same as `pause`, just in seconds)
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

### Target

Every entry node must have a `Target` field corresponding to ContentPatcher's Target field.

### Output

Include a "filename" key in the top-level node metadata to write events to a specific file.

### Preconditions

Use the `when` command to add runtime constraints on when an event can run.

```yarn
<<when Weather Sun>>

// inline function syntax for game state queries (for autcompletion)
<<when {BuildingsConstructed("Here", "Junimo Hut")}>>
<<when {MineLowestLevelReached(50)}>>

// raw game state queries
<<when GameStateQuery !WEATHER Here Sun>>
```

## Example

```yarn
title: Adventure
position: -227,-211
start: 100,-100
music: Cowboy_OVERWORLD
target: Data/Events/AdventureGuild
---
# start with preconditions
<<when Time 1900 2300>
<<when Friendship Marlon 750>>

# then position data
<<start Marlon 4 11 2>>
<<start farmer 4 15 0>>
<<viewport 4 11>>
<<move farmer 0 -2 0>>

# then content
Marlon: I'm going to send you on an adventure!
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
Marlon regales you with tales of adventure and derring-do, though unfortunately lacking any educational content whatsoever.
<<jump AdventureStart>>
===

title: AdventureStart
position: 63,12
---
Marlon: Then get out there, adventurer! $h
Marlon: Ah, yes—before I forget, here's some spending money.
<<action AddMoney 1>>
<<end>>
===

title: AdventureFail
position: -215,31
---
Marlon: *Hmph.* $a
Marlon: We'll see what Grandpa has to say about this!
<<end>>
===
```

## Tooling

There's a very basic implementation of a watching content patcher. It may maul existing `content.json` files, so you'll _probably_ want to keep those in Git just in case.

```sh
bun run dist    # creates an executable
./yarn2dew      # recursively watches for `yarn` file changes,
                # then updates ./i18n/default.json and ./content.json
```

![Done with Bun](./dun-with-bun.png)¹

¹ this project has not been endorsed by Bun
