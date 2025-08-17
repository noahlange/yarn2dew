# Example

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

## Example 2

A totally literal conversion of [Event 35](https://stardewvalleywiki.com/Modding:Event_data#Raw_data). Even though it increases the total length of the content, the presence of comments and line breaks makes it considerably more readable.

```yarn
---
title: 35
music: 50s
start: -1000,-1000
===
<<when f Penny 1000>>
<<when p Penny>>

<<start farmer -30 30 0>>
<<start Penny 12 7 0>>
<<start Pam -100 100 0>>

<<skippable>>
<<specificTemporarySprite pennyMess>>
<<viewport 12 7 true>>
<<wait 1>>

Penny: Ughh... It's so dirty in here.$s
<<warp farmer 12 9>>
<<playSound doorClose>>
<<wait 0.5>>
<<faceDirection Penny 2>>
<<wait 0.5>>
<<emote Penny 16>>
<<wait 0.3>>

Penny: @! Um... Sorry that it's such a mess. I was about to clean up. $u
<<wait 0.5>>
<<move farmer 0 -1 0>>
<<wait 0.6>>
<<emote Penny 32>>
<<wait 0.3>>

Penny: You'll help me? You really mean it? $h
<<wait 0.5>>
<<faceDirection Penny 1>>
<<faceDirection farmer 1>>

Penny: Okay, you can get started over there. I'll clean the kitchen.
<<move farmer 2 0 1>>
<<move farmer 0 -2 1>>
<<move farmer 1 0 1>>
<<move Penny -1 0 0>>
<<animate Penny false true 100 24 25>>
<<animate farmer false true 100 35>>
<<wait 0.2>>
<<playSound dwop>>
<<removeSprite 16 6>>
<<wait 0.2>>
<<move Penny -1 0 0>>
<<animate Penny false true 100 24 25>>
<<stopAnimation farmer>>
<<faceDirection farmer 0>>
<<wait 1.2>>
<<stopAnimation Penny>>
<<removeSprite 10 5>>
<<playSound dwop>>
<<move Penny -1 0 0>>
<<animate Penny false true 100 24 25>>
<<wait 0.9>>
<<animate farmer false true 100 41>>
<<wait 0.3>>
<<playSound dwop>>
<<removeSprite 15 5>>
<<stopAnimation farmer>>
<<wait 1.4>>
<<stopAnimation Penny>>
<<move Penny 1 0 0>>
<<wait 0.8>>

// Pam arrives...
<<warp Pam 12 9>>
<<playSound doorClose>>
<<stopMusic>>
<<move Pam 0 -1 0>>
<<faceDirection Penny 2>>
<<faceDirection farmer 3>>
<<faceDirection Pam 1>>
<<wait 0.5>>
<<faceDirection Pam 3>>

Pam: Whaddya think you're doing?!$u
<<faceDirection Pam 1>>
<<faceDirection Pam 3>>
<<faceDirection Pam 0>>

Pam: "Stop it! I had everything just the way I like it!$u
<<move Penny 2 0 2>>
<<wait 0.5>>
<<emote Penny 28>>
<<wait 0.5>>

Penny: Mom, the house is a total mess. @ and I were just trying to tidy things up a bit.
Penny: *sniff* *sniff*... Were you at the saloon just now? You smell like beer...$s
<<wait 0.3>>
<<move Pam -1 0 3>>
<<emote Pam 12>>
<<wait 0.4>>

Pam: It's none of your damn business where I go!$4
<<wait 0.5>>

Penny: It IS my business! I don't want you destroying yourself!$a
Penny: Don't you realize your choices have an effect on me? Stop being so selfish!$a
<<faceDirection Pam 0>>
<<shake Pam 5000>>
<<wait 0.6>>

Pam: Selfish? I put a roof over your head and clothes on your back and you call me selfish!? You ungrateful little... $u
<<wait 0.5>>
<<emote farmer 28>>
<<wait 0.5>>
<<faceDirection Pam 1>>
<<faceDirection Penny 1>>
<<move farmer -2 0 2>>
<<move farmer 0 2 3>>
<<wait 0.5>>

Pam: You'd better go. I'm sorry you had to see this, kid. $4
<<wait 0.5>>
<<move farmer -1 0 2>>
<<move farmer 0 1 2>>
<<wait 0.5>>
<<faceDirection farmer 0>>
<<faceDirection Penny 2>>
<<wait 0.7>>
<<faceDirection farmer 2>>
<<wait 0.5>>
<<warp farmer -40 -40>>
<<playSound doorClose>>
<<wait 0.5>>
<<move Pam 0 -1 1>>
<<wait 0.3>>
<<faceDirection Penny 3>>

Pam: {"He's a nice young man...^She's a nice young lady..."}
Pam: But I don't want you tellin' others to clean up my house! It's embarrassing! You understand? $4
<<wait 0.3>>
<<faceDirection Penny 2>>
<<wait 0.6>>
<<showFrame Penny 23>>
<<wait 0.7>>

Penny: ...Yes, mother.$s
<<wait 1>>
<<mail PennyCleanTrailer>>
<<end warpOut>>
```
