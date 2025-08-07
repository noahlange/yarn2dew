import { test, expect } from 'bun:test';
import { getContentEntries } from '../utils';
import { generate } from '../generate';

const y2sdv = generate(
  'MyTest',
  `
    title: Main
    location: Trailer
    ---
    Hello, world!
    ===`
);

const content = getContentEntries(y2sdv.content);

test('message nodes', () => {
  const node = content['MyTest.Main'];
  expect(node).toContain('message "{{i18n:MyTest.Main.01}}"');
  expect(y2sdv.i18n['MyTest.Main.01']).toBe('Hello, world!');
});
