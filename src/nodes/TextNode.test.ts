import { test, expect, describe } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const y2sdv = generate(
  `
    title: Main
    target: Data/Events/Trailer
    ---
    Bar: Hello, world! {"#$b#"} This is text!
    Bar: This is {"{{WEATHER}}"} text!
    Goodbye, cruel world!
    Bar: {"i18n:123456"}
    ===
  `
);

const content = getContentEntries(y2sdv.content);
const node = content['Y2D.Main'];

describe('TextNode', () => {
  test("plaintext is i18n'd", () => {
    expect(node).toContain('{{i18n:Y2D.Main.02');
  });

  test("i18n'd text is untouched", () => {
    expect(node).toContain('speak Bar "{{i18n:123456}}"');
  });

  test('inline string literals are emitted verbatim', () => {
    expect(y2sdv.i18n['Y2D.Main.01']).toInclude('#$b#');
  });

  test('consecutive lines of dialogue are inlined', () => {
    expect(node).toIncludeRepeated('speak Bar', 2);
  });

  test('substitution tokens are emitted verbatim', () => {
    expect(y2sdv.i18n['Y2D.Main.01']).toEndWith('This is {{WEATHER}} text!');
  });
});

test('message nodes', () => {
  expect(node).toContain('message "{{i18n:Y2D.Main.02}}"');
  expect(y2sdv.i18n['Y2D.Main.02']).toStartWith('Goodbye, cruel world!');
});
