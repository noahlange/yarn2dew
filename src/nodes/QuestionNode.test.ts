import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { Config } from '../lib';

const header = `
title: Adventure
target: Data/Events/Trailer
start: 5, 5
`;

const message = `
Marlon: You're obligated to go on an adventure this {"{{Season}}"}!
Whaddya say?
-> Neat-o!
-> I haven't—do you have any tips or tricks?
-> I don't want to go on an adventure!
`;

const speak = `
title: Test
target: Data/Events/Trailer
---
<<start Lewis 4 0 0>>
<<start Pierre 6 0 0>>
<<start farmer 5 0 0>>
Pierre: The quantum fluctuations are intensifying. We need to jump now.
Lewis: But the calculations aren't complete. We could end up anywhere.
Pierre: The wormhole is collapsing. It's now or never.
Lewis: Fine. Initiate jump sequence.
Pierre: Something's wrong. We're being pulled backward...
Lewis: That's impossible. Unless...
Pierre: We're arriving before we left. We've become our own rescue mission.
-> Let's alter our trajectory and break this temporal loop!
    Pierre: Risky, Captain. We'd be writing ourselves out of existence.
    -> Damnit, Navigator! Nothing can stop me existing!
        Pierre: *sigh* Very well, Captain.
    -> By gods! You're right!
        Pierre: But it's only solution, I fear.
-> We must complete the cycle. Our past selves depend on it.
    Pierre: Then we're doomed to repeat this moment... forever.
    -> If we're doomed, at least we'll be remembered as heroes.
        Pierre: .. if anyone remembers us at all
    -> Forever... forever... forever...
        Pierre: Sir?
    -> We must do it!
        Pierre: As always, sir, you're right.
Lewis: Annnnnywayyy!
===
`;

describe('QuestionNode', () => {
  test("messages before questions don't cause explosions", () => {
    expect(() => generate(`${header}---${message}===`)).not.toThrow();
  });

  // test("speak before questions don't cause explosions", () => {
  //   expect(() => generate(`${header}---${speak}===`)).not.toThrow();
  // });

  const config = Config.test;
  config.data.namespace = 'NL.Y2D';
});
