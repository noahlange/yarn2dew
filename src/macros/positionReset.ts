import type { Compiler, State } from '../lib';

function parse(state: State, name: string, toContinue: string) {
  const offset = (state.positionOffset[name] ??= { x: 0, y: 0 });
  return { name, toContinue: toContinue == 'true', ...offset };
}

function positionReset($: Compiler, state: State, name: string, toContinue = 'false') {
  const args = parse(state, name, toContinue);
  if (args.x || args.y) {
    $.writeLine(`positionOffset ${args.name} ${-args.x} ${-args.y} ${args.toContinue}`);
    state.positionOffset[name] = { x: 0, y: 0 };
  }
}

Object.assign(positionReset, {
  ysls: {
    YarnName: '$positionReset',
    Documentation: "Instantly reset an actor' pixel offset to [0,0].",
    Parameters: [{ Name: 'continue', Type: 'boolean', DefaultValue: 'false' }]
  }
});

export { positionReset };
