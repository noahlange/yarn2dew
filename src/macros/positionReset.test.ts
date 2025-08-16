import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';
import { getContentEntries } from '../utils';

const res = generate(
  `
  title: Entry
  target: Data/Events/Saloon
  ---
  <<start Bob 0 0 0>>
  <<positionOffset Bob 5 0>>
  <<positionOffset Bob 0 -5>>
  <<positionOffset Bob -10 -5>>
  <<$positionReset Bob>>
  ===
`
);

const content = getContentEntries(res.content);

describe('positionReset', () => {
  const event = content['Y2D.Entry'];
  test('resets position', () => {
    expect(event).toInclude('positionOffset Bob 5 0');
    expect(event).toInclude('positionOffset Bob 0 -5');
    expect(event).toInclude('positionOffset Bob -10 -5');
    expect(event).toInclude('positionOffset Bob 5 10');
  });
});
