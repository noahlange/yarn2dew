import type { Compiler } from '../lib';
import { Node } from './Node';
import { RootNode } from './RootNode';

export type DocumentMeta = {
  target: string;
  title: string;
  override?: boolean;
  filename?: string;
} & { [key: string]: string | number | boolean };

export class DocumentNode extends Node {
  public compile($: Compiler) {
    this.roots.forEach((node, i) => {
      node.meta.entry = i === 0;
      node.compile($);
    });
  }

  constructor(
    public roots: RootNode[],
    public meta: DocumentMeta
  ) {
    super();
    if (!meta.target) {
      console.log(meta);
      throw new Error('The top-most Yarn node must have a "Target" field.');
    }
  }
}
