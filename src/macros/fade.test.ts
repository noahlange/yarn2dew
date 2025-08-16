import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const res = generate(
  { namespace: 'Test' },
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
    expect(content['Test.Entry']).toInclude('globalFade');
  });

  test('fades in', () => {
    expect(content['Test.Entry']).toInclude('globalFadeToClear');
  });

  test('updates viewport', () => {
    expect(content['Test.Entry']).toIncludeRepeated('viewport 5 6', 2);
  });
});
