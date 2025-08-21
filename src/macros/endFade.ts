import type { Compiler, State } from '../lib';
import { parseCoordinateArgs } from '../utils';

const fn = ($: Compiler, state: State, x: string | null = null, y: string | null = null) => {
  // reset viewport to its initial value
  const args = parseCoordinateArgs(x ?? state.viewport.x, y ?? state.viewport.y, '0');
  // normal fade-in behavior
  const { time } = state.beginFade;
  $.writeLine(`viewport ${args.x} ${args.y}`);
  $.writeLine(`globalFadeToClear ${time} true`);
};

const ysls = {
  Documentation:
    'Global fade to clear with previous parameters, returning camera to its original position.',
  Parameters: []
};

export default Object.assign(fn, { ysls });
