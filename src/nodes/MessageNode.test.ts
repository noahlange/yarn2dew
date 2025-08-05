import { test, expect } from 'bun:test';
import { YarnToDew } from '../lib';
import { getContentData } from '../utils';

const y2sdv = new YarnToDew(
  'MyTest',
  `
    title: Main
    location: Trailer
    ---
    Hello, world!
    ===`
);

const { content, i18n } = getContentData(y2sdv);

test('message nodes', () => {
  const node = content['MyTest.Main'];
  expect(node).toStartWith('message {{i18n:MyTest.Main.01}}');
  expect(i18n['MyTest.Main.01']).toBe('Hello, world!');
});
