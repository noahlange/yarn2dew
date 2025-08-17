import type { Compiler, State } from '../lib';

const parse = (state: State, name: string, toContinue: string) => {
  const offset = (state.positionOffset[name] ??= { x: 0, y: 0 });
  return { name, toContinue: toContinue == 'true', ...offset };
};

const fn = ($: Compiler, state: State, name: string, toContinue = 'false') => {
  const args = parse(state, name, toContinue);
  if (args.x || args.y) {
    $.writeLine(`positionOffset ${args.name} ${-args.x} ${-args.y} ${args.toContinue}`);
    state.positionOffset[name] = { x: 0, y: 0 };
  }
};

const ysls = {
  Documentation: "Instantly reset an actor' pixel offset to [0,0].",
  Parameters: [
    { Name: 'actor', Type: 'string' },
    { Name: 'continue', Type: 'boolean', DefaultValue: 'false' }
  ]
};

export default Object.assign(fn, { ysls });
