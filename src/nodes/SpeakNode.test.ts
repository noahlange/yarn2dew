import { test, expect } from 'bun:test';
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

const { content } = getContentData(y2sdv);
const node = content['MyTest.Main'];

test("plaintext is i18n'd", () => {
  expect(node).not.toContain('speak Bar "Hello, world!"');
});

test("i18n'd text is untouched", () => {
  expect(node).toContain('speak Bar {{i18n:123456}}');
});
