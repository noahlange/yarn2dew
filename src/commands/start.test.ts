import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const res = generate(
  `
  title: Entry
  start: 3,3
  target: Data/Events/Saloon
  ---
  <<start Abigail 12 4 1>>
  Hello, world!
  ===
`
);

const content = getContentEntries(res.content);

describe('start', () => {
  test('farmer begins at event start, if unspecified', () => {
    expect(content['Y2D.Entry']).toInclude('farmer 3 3 2');
    expect(content['Y2D.Entry']).toInclude('Abigail 12 4 1');
  });
});
