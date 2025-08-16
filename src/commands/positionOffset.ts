import type { Compiler, State } from '../lib';

function updateOffsetState(state: State, name: string, dx: number, dy: number) {
  const offsets = (state.positionOffset ??= {});
  const x = parseInt(offsets[`${name}.x`] ?? 0) + dx;
  const y = parseInt(offsets[`${name}.y`] ?? 0) + dy;
  Object.assign(state.positionOffset, {
    [`${name}.x`]: x.toString(),
    [`${name}.y`]: y.toString()
  });
}

function positionOffset(
  $: Compiler,
  state: State,
  name: string,
  dx: string = '0',
  dy: string = '0',
  toContinue: string = 'false'
) {
  const [x, y] = [parseInt(dx), parseInt(dy)];
  if (isNaN(x) || isNaN(y)) {
    throw new Error('dx and dy must be integer values.');
  } else {
    const toContinueVal = toContinue === 'true';
    updateOffsetState(state, name, x, y);
    $.writeLine(`positionOffset ${name} ${dx} ${dy} ${toContinueVal}`);
  }
}

Object.assign(positionOffset, {
  ysls: {
    YarnName: 'positionOffset',
    Documentation: 'Instantly offset the position of the named actor by [x, y] pixels.',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      {
        Name: 'continue',
        Type: 'boolean',
        DefaultValue: 'false',
        Documentation: "Continue playing the event while the NPC's position is being offset."
      }
    ]
  }
});

export { positionOffset };
