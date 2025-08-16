import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const y2sdv = generate(
  { namespace: 'MyTest' },
  `
    title: Main
    music: rain
    start: -100,-100
    target: Data/Events/Saloon
    ---
    <<start Foobar 1 2 3>>
    Foobar: Hello, world!
    ===
          
    title: Two
    ---
    Hello? World?
    Foobar: "This is an escaped line of dialogue."
    ===
  `
);

describe('compiler', () => {
  const { content, i18n } = y2sdv;

  test('can compile basic content without exploding', () => {
    expect(getContentEntries(content)).toContainAllKeys(['MyTest.Main', 'MyTest.Two']);
  });

  test('automatically creates i18n entries and subs them in text', () => {
    expect(i18n['MyTest.Two.01']).toBe('Hello? World?');
    expect(i18n['MyTest.Two.02']).toBe('"This is an escaped line of dialogue."');
  });
});
