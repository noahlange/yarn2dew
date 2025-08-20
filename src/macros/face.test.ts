import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

/**
 * [ ] [ ] [H] [ ] [ ]
 * [ ] [ ] [ ] [ ] [ ]
 * [R] [ ] [F] [ ] [E]
 * [ ] [ ] [ ] [ ] [ ]
 * [ ] [ ] [L] [ ] [ ]
 */

const res = generate(
  `
  title: Entry
  start: 3,3
  target: Data/Events/Saloon
  ---
  <<start farmer 2 2 0>>
  <<start Robin 0 2 3>>
  <<start Emily 4 2 1>>
  <<start Harvey 2 0 0>>
  <<start Leah 2 4 2>>

  <<$face farmer Robin>>
  <<$face farmer Emily>>
  <<$face farmer Harvey>>
  <<$face farmer Leah>>

  <<$face Robin farmer>>
  <<$face Emily farmer>>
  <<$face Harvey farmer>>
  <<$face Leah farmer>>
  ===
`
);

const content = getContentEntries(res.content);

describe('$face', () => {
  const cmds = content['Y2D.Entry'].split('/');
  test('farmer faces NPCs correctly', () => {
    expect(cmds.slice(3, 7)).toStrictEqual([
      'faceDirection farmer 3',
      'faceDirection farmer 1',
      'faceDirection farmer 0',
      'faceDirection farmer 2'
    ]);
  });

  test('NPCs correctly face farmer', () => {
    expect(cmds.slice(7, 11)).toStrictEqual([
      'faceDirection Robin 1',
      'faceDirection Emily 3',
      'faceDirection Harvey 2',
      'faceDirection Leah 0'
    ]);
  });
});
