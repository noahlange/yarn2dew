import type { Compiler, State } from '../lib';
import { Node } from './Node';

export class MacroNode extends Node {
  public compile($: Compiler, state: State) {
    if (this.name in $.config.macros) {
      $.config.macros[this.name]($, state, ...this.args);
    } else {
      throw new Error('No matching macro found in y2d.config');
    }
  }

  public constructor(
    private name: string,
    private args: string[] = []
  ) {
    super();
  }
}
