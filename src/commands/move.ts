import type { Compiler, State } from '../lib';
import { parseCoordinateArgs } from '../utils';

function fn(
  $: Compiler,
  state: State,
  name: string,
  x: string,
  y: string,
  d: string,
  toContinue: string = 'false'
) {
  try {
    if (toContinue !== 'true' && toContinue !== 'false') {
      throw new Error();
    }
    const args = parseCoordinateArgs(x, y, d);
    const curr = state.position[name];
    const next = { x: curr.x + args.x, y: curr.y + args.y, d: args.d };
    Object.assign(state.position[name], next);
    $.writeLine(`move ${name} ${args.x} ${args.y} ${args.d} ${toContinue}`);
  } catch {
    console.error(
      `Failed to compile move with [ name: ${name}, x: ${x}, y: ${y}, d: ${d}, continue: ${toContinue} ]`
    );
  }
}

const ysls = {
  Documentation:
    "Make a named NPC move by the given tile offset from their current position (along one axis only), and face the given direction when they're done. ",
  Parameters: [
    { Name: 'actor', Type: 'string' },
    { Name: 'x', Type: 'number' },
    { Name: 'y', Type: 'number' },
    { Name: 'd', Type: 'number' },
    { Name: 'continue', Type: 'boolean', DefaultValue: 'false' }
  ]
};

export default Object.assign(fn, { ysls });
