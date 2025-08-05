# yarn2dew

Compile dialogue files written in [Yarn](https://www.yarnspinner.dev/) to static JSON content that can be imported "natively" as events into Stardew Valley via Content Patcher.

## what in the name of yoba

The SDV event format is not the easiest to work with, especially for non-programmers. Yarn is easier to work with for writers _and_ programmers and supports a feature set that would be onerous to implement by hand in SDV.

While some parts of that feature set does require the Yarn runtime, not _all_ of it does.

## so why would you make this

### support…?

- [x] Content Patcher-compatible output
- [x] branching dialogue trees
- [x] ✨ automagical ✨ localization
- [x] event conditions
- [x] arbitrary commands w/ parameters
  - [x] `jump`
  - [x] `wait` (same as `pause`, just in seconds)
  - [x] `stop` (same as `end`)

### …but _not_…?

- runtimey Yarn features
  - advanced flow control: `detour`, `return`
  - variables: `set`, `declare`, `enum`
  - state: `once`, `endonce`
  - line, node groups
  - saliency, storylets
- some Stardew features
  - whatever the heck forks are

### …but eventually?

- [ ] flow-through prompts w/ reactions
- [ ] basic flow control: `<<if>>`, `<<else>>`, `<<elseif>>`
  - [ ] game state queries
- [ ] automatic `<<end>>` insert
- [ ] shims for Yarn built-in functions
  - [ ] `random`

## how do you even

Dump this in a `.yarn` file.

```yarn
title: Adventure
position: -227,-211
start: 100,-100
music: Cowboy_OVERWORLD
location: AdventureGuild
---
# start with preconditions
<<when Time 1900 2300>
<<when Friendship Marlon 750>>

# then start position data
<<changeLocation AdventureGuild>>
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
<<end>>
===

title: AdventureFail
position: -215,31
---
Marlon: *Hmph.* $a
Marlon: We'll see how Grandpa feels about that!w
<<end>>
===
```

![Done with Bun](./dun-with-bun.png)¹

¹ this project has not been endorsed by Bun
