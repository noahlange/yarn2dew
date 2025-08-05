import { describe, test, expect } from 'bun:test';
import { YarnToDew } from '../lib';
import { getContentData } from '../utils';

describe('built-in yarn commands', () => {
  const y2sdv = new YarnToDew(
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

  const { content } = getContentData(y2sdv);
  test('jump targets are correctly emitted', () => {
    expect(content).toContainKey('MyTest.Main');
    expect(content).toContainKey('MyTest.Two');
    expect(content['MyTest.Main']).toContain('switchEvent MyTest.Two');
  });
});
