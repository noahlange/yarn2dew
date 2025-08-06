import { Compiler } from '../lib';
import { Node } from './Node';

export class WhenNode extends Node {
  public readonly type = 'WhenNode';

  public compile($: Compiler) {
    $.addReq(this.condition, this.params.join(' '));
  }

  public constructor(
    public condition: string,
    public params: string[]
  ) {
    super();
  }
}
