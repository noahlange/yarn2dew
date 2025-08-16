import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries, trim } from '../utils';

const y2sdv = generate(
  { namespace: 'Test' },
  trim(`
    title: One
    target: Data/Events/Saloon
    ---
    <<when {PlayerVisitedLocation("Current Mine")}>>
    Foo: Bar!
    ===

    title: Two
    target: Data/Events/Saloon
    ---
    <<when {PLAYER_VISITED_LOCATION("Current Mine")}>>
    Foo: Baz!
    ===

    title: Three
    target: Data/Events/Saloon
    ---
    <<when {playerVisitedLocation("Current Mine")}>>
    Foo: Bat!
    ===
  `)
);

const content = getContentEntries(y2sdv.content);

describe('query names', () => {
  test('are converted to SCREAMING_SNAKE_CASE', () => {
    expect(
      Object.keys(content)
        .join('/')
        .split('/')
        .filter(cmd => cmd.includes('PLAYER_VISITED_LOCATION'))
    ).toHaveLength(3);
  });
});
