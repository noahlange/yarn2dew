import type { Compiler, State } from '../lib';

const fn = ($: Compiler, state: State, command: string, ...args: string[]) => {
  $.writeLine(`${command} ${args.join(' ')}`.trim());
};

const ysls = {
  Documentation: 'Invoke a built-in command with the given name and args.',
  Parameters: [
    { Name: 'command', Type: 'string' },
    { Name: 'parameters', Type: 'any', IsParamsArray: true }
  ]
};

export default Object.assign(fn, { ysls });
