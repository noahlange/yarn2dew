import type { Compiler, State } from '../lib';

function beginFade(
  $: Compiler,
  state: State,
  time: string = '0.007',
  toContinue: string = 'false'
) {
  state.beginFade = { time, toContinue };
  $.writeLine(`globalFade ${time} ${toContinue == 'true'}`);
  // if viewport's been set, assume we want the screen to go dark
  if ('viewport' in state) $.writeLine('viewport -100 -100');
}

function endFade($: Compiler, state: State) {
  // reset viewport to its initial value
  const { x = null, y = null } = state.viewport ?? { x: null, y: null };
  if (x !== null && y != null) $.writeLine(`viewport ${x} ${y}`);
  // normal fade-in behavior
  const { time = '0.007', toContinue = 'true' } = state.beginFade;
  $.writeLine(`globalFadeToClear ${time} ${toContinue == 'true'}`);
}

Object.assign(beginFade, {
  ysls: {
    YarnName: '$beginFade',
    Documentation: 'Start a global fade to black and move the camera off-screen.',
    Parameters: [
      { Name: 'time', Type: 'number', DefaultValue: '0.007' },
      { Name: 'continue', Type: 'boolean', DefaultValue: 'false' }
    ]
  }
});
Object.assign(endFade, {
  ysls: {
    YarnName: '$endFade',
    Documentation:
      'Global fade to clear with previous parameters, returning camera to its original position.',
    Parameters: []
  }
});

export { beginFade, endFade };
