import type { Compiler } from '../lib';
import type { State } from '../types';

function parse(x: string = '0', y: string = '0', toContinue: string = 'false') {
  const [xVal, yVal] = [+x, +y];
  if (isNaN(xVal) || isNaN(yVal)) {
    throw new Error('dx and dy must be integer values.');
  }
  return { x: xVal, y: yVal, toContinue: toContinue == 'true' };
}

function updateOffsetState(state: State, name: string, dx: number, dy: number) {
  const { x, y } = (state.positionOffset ??= {})[name] ?? { x: 0, y: 0 };
  Object.assign(state.positionOffset, { [name]: { x: x + dx, y: y + dy } });
}

function getInitialState(state: State) {
  return { ...state, positionOffset: {} };
}

function fn(
  $: Compiler,
  state: State,
  name: string,
  dx: string,
  dy: string,
  toContinue: string
) {
  const args = parse(dx, dy, toContinue);
  updateOffsetState(state, name, args.x, args.y);
  $.writeLine(`positionOffset ${name} ${args.x} ${args.y} ${args.toContinue}`);
}

const ysls = {
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
};

export default Object.assign(fn, { getInitialState, ysls });
