import type { Compiler, State } from '../lib';
import { parseCoordinateArgs } from '../utils';

function fn(
  $: Compiler,
  state: State,
  name: string,
  x: string,
  y: string,
  toContinue: string = 'false'
) {
  const args = parseCoordinateArgs(x, y, '0', toContinue);
  Object.assign(state.position[name], { x: args.x, y: args.y });
  $.writeLine(`warp ${name} ${args.x} ${args.y} ${toContinue}`);
}

const ysls = {
  Documentation:
    "Make a named NPC move by the given tile offset from their current position (along one axis only), and face the given direction when they're done. ",
  Parameters: [
    { Name: 'actor', Type: 'string' },
    { Name: 'x', Type: 'number' },
    { Name: 'y', Type: 'number' },
    { Name: 'continue', Type: 'bool', DefaultValue: 'false' }
  ]
};

export default Object.assign(fn, { ysls });
