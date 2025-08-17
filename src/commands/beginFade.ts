import type { Compiler, State } from '../lib';

const parse = (state: State, time: string, toContinue: string) => {
  return {
    x: state.viewport.x,
    y: state.viewport.y,
    time: parseFloat(time),
    toContinue: toContinue == 'true'
  };
};

const ysls = {
  Documentation: 'Start a global fade to black and move the camera off-screen.',
  Parameters: [
    { Name: 'time', Type: 'number', DefaultValue: '0.007' },
    { Name: 'continue', Type: 'boolean', DefaultValue: 'false' }
  ]
};

const getInitialState = (state: State) => ({
  ...state,
  viewport: state.viewport ?? { x: 0, y: 0 },
  beginFade: { time: 0, toContinue: false }
});

const fn = (
  $: Compiler,
  state: State,
  time: string = '0.007',
  toContinue: string = 'false'
) => {
  const args = parse(state, time, toContinue);
  $.writeLine(`globalFade ${args.time} ${args.toContinue}`);
  $.writeLine('viewport -100 -100');
};

export default Object.assign(fn, { getInitialState, ysls });
