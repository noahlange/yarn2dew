import { Compiler } from '../lib';
import { Node } from './Node';

export class StartNode extends Node {
  public readonly type = 'StartNode';

  public compile($: Compiler) {
    $.prepend(`${this.name} ${this.x} ${this.y} ${this.direction} `);
  }

  private validate() {
    if (isNaN(this.x) || isNaN(this.y)) {
      throw new Error('[ValidationError] StartNode coordinates are NaN');
    } else if (isNaN(this.direction)) {
      throw new Error(`[ValidationError] StartNode direction is NaN`);
    } else if (this.direction < 0 || this.direction >= 4) {
      throw new Error(`[ValidationError] StartNode direction is not between 0–3 (inclusive).`);
    }
  }

  constructor(
    public name: string,
    public x: number,
    public y: number,
    public direction: number
  ) {
    super();
    this.validate();
  }
}
