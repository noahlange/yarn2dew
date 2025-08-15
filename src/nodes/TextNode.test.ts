import { test, expect, describe } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const y2sdv = generate(
  'MyTest',
  `
    title: Main
    target: Data/Events/Trailer
    ---
    Bar: Hello, world! {"#$b#"} This is text!
    Bar: This is more text!
    Goodbye, cruel world!
    Bar: {"i18n:123456"}
    ===`
);

const content = getContentEntries(y2sdv.content);
const node = content['MyTest.Main'];

console.log(y2sdv.i18n);

describe('TextNode', () => {
  test('inline string literals are emitted verbatim', () => {
    expect(y2sdv.i18n['MyTest.Main.01']).toBe('Hello, world! #$b# This is text!');
  });

  test("plaintext is i18n'd", () => {
    expect(node).not.toContain('speak Bar "This is more text!"');
  });

  test("i18n'd text is untouched", () => {
    expect(node).toContain('speak Bar "{{i18n:123456}}"');
  });
});

test('message nodes', () => {
  expect(node).toContain('message "{{i18n:MyTest.Main.03}}"');
  expect(y2sdv.i18n['MyTest.Main.03']).toBe('Goodbye, cruel world!');
});
