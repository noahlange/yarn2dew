import type { Compiler } from '../lib';
import type { State } from '../types';

const fn = ($: Compiler, state: State, id: string) => $.declare('music', id);

const ysls = {
  Documentation: 'Set the event music.',
  Parameters: [{ Name: 'id', Type: 'string' }]
};

export default Object.assign(fn, { ysls });
