import type { Compiler } from '../lib';
import type { State } from '../types';

const parse = (name: string, direction: string, toContinue: string) => {
  const d = +direction;
  if (isNaN(d) || d > 4 || d < 0) {
    throw new Error(`Invalid direction ${direction}`);
  }
  return { name, direction: d, toContinue: toContinue == 'true' };
};

export const faceDirection = Object.assign(
  (
    $: Compiler,
    state: State,
    name: string,
    direction: string,
    toContinue: string = 'false'
  ) => {
    const args = parse(name, direction, toContinue);
    state.position[name].d = +direction;
    $.writeLine(`faceDirection ${args.name} ${args.direction} ${args.toContinue}`);
  },
  {
    getInitialState: (state: State) => ({ ...state, position: {} }),
    ysls: {
      YarnName: 'faceDirection',
      Parameters: [
        { Name: 'character', Type: 'string' },
        { Name: 'direction', Type: 'number' },
        {
          Name: 'continue',
          Type: 'bool',
          DefaultValue: 'false',
          Documentation: "Pause the event while the NPC's position is being offset."
        }
      ]
    }
  }
);
