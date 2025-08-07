import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const y2sdv = generate(
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
  const { content, i18n } = y2sdv;

  test('can compile basic content without exploding', () => {
    expect(getContentEntries(content)).toContainAllKeys(['MyTest.Main', 'MyTest.Two']);
  });

  test('automatically creates i18n entries and subs them in text', () => {
    expect(i18n['MyTest.Two.01']).toBe('Hello, world!');
    expect(i18n['MyTest.Two.02']).toBe('"This is a quotable line of dialogue."');
  });
});
