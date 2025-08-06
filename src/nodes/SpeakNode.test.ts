import { test, expect, describe } from 'bun:test';
import { getContentData } from '../utils';
import { YarnToDew } from '../lib';

const y2sdv = new YarnToDew(
  'MyTest',
  `
    title: Main
    location: Trailer
    ---
Bar: Hello, world!
Bar: {"i18n:123456"}
    ===`
);

const { content, i18n } = getContentData(y2sdv);
const node = content['MyTest.Main'];

describe('SpeakNode', () => {
  test("plaintext is i18n'd", () => {
    expect(node).not.toContain('speak Bar "Hello, world!"');
  });

  test("i18n'd text is untouched", () => {
    expect(node).toContain('speak Bar {{i18n:123456}}');
  });

  test("i18'd text is quoted", () => {
    expect(i18n['MyTest.Main.01']).toBe('"Hello, world!"');
  });
});
