import type { Compiler, State } from '../lib';

function getOffset(state: State, name: string): [number, number] {
  const offset = (state.positionOffset ??= {});
  return [parseInt(offset[`${name}.x`] ?? 0), parseInt(offset[`${name}.y`] ?? 0)];
}

function positionReset($: Compiler, state: State, name: string, toContinue = 'false') {
  const [x, y] = getOffset(state, name);
  if (x || y) $.writeLine(`positionOffset ${name} ${-x} ${-y} ${toContinue}`);
  // update state
  state.positionOffset[`${name}.x`] = '0';
  state.positionOffset[`${name}.y`] = '0';
}

Object.assign(positionReset, {
  ysls: {
    YarnName: '$positionReset',
    Documentation: "Instantly reset an actor' pixel offset to [0,0].",
    Parameters: [{ Name: 'continue', Type: 'boolean', DefaultValue: 'false' }]
  }
});

export { positionReset };
