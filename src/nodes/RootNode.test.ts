import { describe, test, expect } from 'bun:test';
import { YarnToDew } from '../lib';
import { getContentData } from '../utils';

const y2sdv = new YarnToDew(
  'MyTest',
  `
    title: Main
    location: Saloon
    music: rain
    start: -100,-100
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
  const { content } = getContentData(y2sdv);
  test('entry nodes have initial tags are inserted in the correct order', () => {
    const node = content['MyTest.Main'];
    expect(node).toStartWith('rain/-100 -100/Foobar 1 2 3');
  });
  test('non-entry nodes start with a pause', () => {
    const node = content['MyTest.Two'];
    expect(node).toStartWith('pause 1');
  });
});
