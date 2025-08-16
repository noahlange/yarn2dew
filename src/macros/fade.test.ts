import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';
import { Config } from '../lib';

const res = generate(
  Config.test,
  `
  title: Entry
  target: Data/Events/Saloon
  ---
  <<viewport 5 6>>
  <<$beginFade>>
  Gus: Well, hellooooooo--
  <<$endFade>>
  ===
`
);

const content = getContentEntries(res.content);

describe('fade', () => {
  test('fades out', () => {
    expect(content['Y2D.Entry']).toInclude('globalFade');
  });

  test('fades in', () => {
    expect(content['Y2D.Entry']).toInclude('globalFadeToClear');
  });

  test('updates viewport', () => {
    expect(content['Y2D.Entry']).toIncludeRepeated('viewport 5 6', 2);
  });
});
