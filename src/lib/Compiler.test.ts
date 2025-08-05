import { describe, test, expect } from 'bun:test';
import { YarnToDew } from './YarnToDew';
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
describe('compiler', () => {
  const { content, i18n } = getContentData(y2sdv);

  test('can compile basic content without exploding', () => {
    expect(content).toContainAllKeys(['MyTest.Main', 'MyTest.Two']);
  });

  test('start tags are inserted in the correct order', () => {
    const node = content['MyTest.Main'];
    expect(node).toStartWith('rain/-100 -100/Foobar 1 2 3');
  });

  test('automatically creates i18n entries and subs them in text', () => {
    expect(i18n['MyTest.Two.01']).toBe('Hello, world!');
    expect(i18n['MyTest.Two.02']).toBe('"This is a quotable line of dialogue."');
  });
});
