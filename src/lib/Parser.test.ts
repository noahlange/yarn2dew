import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const y2sdv = generate(
  'MyTest',
  `
    title: Main
    music: rain
    start: -100,-100
    target: Data/Events/Saloon
    ---
    Foobar: Hello, world!
    <<jump Two>>
    ===

    title: Two
    ---
    Foobar: This is a quotable line of dialogue.
    ===

    title: Three
    ---
    What in the world?!
    <<jump Four>>
    ===

    title: Four
    ---
    Foobar: This is another quotable line of dialogue.
    ===
  `
);

describe('automatic end insertion', () => {
  const c = getContentEntries(y2sdv.content);

  test('...inserts trailing <<end>>s for terminating nodes', () => {
    for (const node of ['MyTest.Two', 'MyTest.Four']) {
      const commands = c[node]?.split('/');
      expect(commands.at(-1)).toBe('end');
    }
  });

  test('...not for every node', () => {
    for (const node of ['MyTest.Main', 'MyTest.Three']) {
      const commands = c[node]?.split('/');
      expect(commands.at(-1)).not.toBe('end');
    }
  });
});
