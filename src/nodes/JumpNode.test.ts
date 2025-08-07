import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

describe('built-in yarn commands', () => {
  const y2sdv = generate(
    'MyTest',
    `title: Main
      location: Saloon
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
    expect(content).toContainKey('MyTest.Main');
    expect(content).toContainKey('MyTest.Two');
    expect(content['MyTest.Main']).toContain('switchEvent MyTest.Two');
  });
});
