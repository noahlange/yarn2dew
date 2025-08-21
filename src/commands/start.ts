import type { Compiler, State } from '../lib';
import { parseCoordinateArgs } from '../utils';

function fn($: Compiler, state: State, name: string, x: string, y: string, d: string) {
  const args = parseCoordinateArgs(x, y, d);
  const pos = Object.assign((state.position[name] ??= args), args);
  $.declare(`start ${name}`, `${name} ${pos.x} ${pos.y} ${pos.d}`);
}

const ysls = {
  Documentation: 'Sets the start position and direction for a character.',
  Parameters: [
    { Name: 'Character', Type: 'string' },
    { Name: 'x', Type: 'number' },
    { Name: 'y', Type: 'number' },
    { Name: 'direction', Type: 'number' }
  ]
};

function getInitialState(state: State) {
  return { ...state, position: {} };
}

export default Object.assign(fn, { getInitialState, ysls });
