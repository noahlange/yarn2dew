import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const y2sdv = generate(
  `
    title: Main
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
    for (const node of ['Y2D.Two', 'Y2D.Four']) {
      const commands = c[node]?.split('/');
      expect(commands.at(-1)).toBe('end');
    }
  });

  test('...not for every node', () => {
    for (const node of ['Y2D.Main', 'Y2D.Three']) {
      const commands = c[node]?.split('/');
      expect(commands.at(-1)).not.toBe('end');
    }
  });
});
