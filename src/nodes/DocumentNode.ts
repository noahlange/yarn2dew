import type { Compiler } from '../lib';
import { Node } from './Node';
import { RootNode } from './RootNode';

export class DocumentNode extends Node {
  compile($: Compiler) {
    this.roots.forEach((node, i) => {
      if (i > 0) node.meta.entry = false;
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
