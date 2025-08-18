import type { Compiler, State } from '../lib';

const fn = ($: Compiler, state: State) => {
  // reset viewport to its initial value
  const { x, y } = state.viewport;
  // normal fade-in behavior
  const { time } = state.beginFade;
  $.writeLine(`globalFadeToClear ${time} true`);
  $.writeLine(`viewport ${x} ${y}`);
};

const ysls = {
  Documentation:
    'Global fade to clear with previous parameters, returning camera to its original position.',
  Parameters: []
};

export default Object.assign(fn, { ysls });
