import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const y2sdv = generate(
  `
    title: Main
    target: Data/Events/Saloon
    ---
    <<start Foobar 1 2 3>>
    Foobar: Hello, world!
    ===
          
    title: Two
    ---
    Hello, world!
    Foobar: This is a quotable line of dialogue.
    ===
  `
);

describe('Root nodes', () => {
  const content = getContentEntries(y2sdv.content);
  test('entry nodes have initial tags are inserted in the correct order', () => {
    const node = content['Y2D.Main'];
    expect(node).toStartWith('continue/0 0/Foobar 1 2 3');
  });
  test('non-entry nodes start with a pause', () => {
    const node = content['Y2D.Two'];
    expect(node).toStartWith('pause 1');
  });
});
