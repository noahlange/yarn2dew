import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';
import { Config } from '../lib';

describe('built-in yarn commands', () => {
  const y2sdv = generate(
    Config.test,
    `title: Main
      target: Data/Events/Saloon
      music: rain
      ---
      This is a thing
      <<jump Two>>
      ===
      
      title: Two
      ---
      Foobar: Hello, world!
      Foobar: This is another line of dialogue.
      ===
    `
  );

  const content = getContentEntries(y2sdv.content);
  test('jump targets are correctly emitted', () => {
    expect(content).toContainKey('Y2D.Main');
    expect(content).toContainKey('Y2D.Two');
    expect(content['Y2D.Main']).toContain('switchEvent Y2D.Two');
  });
});
