import type { Compiler } from '../lib';
import { Node } from './Node';
import { RootNode } from './RootNode';

export class DocumentNode extends Node {
  public readonly type = 'DocumentNode';

  public compile($: Compiler) {
    this.roots.forEach((node, i) => {
      node.meta.entry = i === 0;
      node.compile($);
    });
  }

  constructor(
    public roots: RootNode[],
    public meta: Record<string, any>
  ) {
    super();
  }
}
