import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

describe('control flow support', () => {
  const y2sdv = generate(
    'MyTest',
    `title: Main
      location: Saloon
      music: rain
      ---
      <<if !PlayerVisitedLocation("Current Mine")>>
        Abigail: Did you know there's an old abandoned mine up in the mountains? Apparently it's crawling with monsters!
      <<else>>
        Abigail: I heard you went into the old mines up in the mountain!
        Abigail: Did you find anything tasty?
      <<endif>>
      <<if PLAYER_VISITED_LOCATION("Farm")>>
        Oh, that's a farm boy there, if e'er I seen one!
      <<endif>>
      <<if player_visited_location("Whatever")>>
        I'm running out of plausible alternative text casings!
      <<endif>>
      ===
    `
  );

  const content = getContentEntries(y2sdv.content);

  describe('query names', () => {
    test('are converted to SCREAMING_SNAKE_CASE', () => {
      expect(
        Object.values(content)
          .join('/')
          .split('/')
          .filter(cmd => cmd.includes('PLAYER_VISITED_LOCATION'))
      ).toHaveLength(3);
    });
  });

  describe('if-else behavior', () => {});
});
