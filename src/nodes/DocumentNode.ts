import type { Compiler, State } from '../lib';
import { Node } from './Node';
import { RootNode } from './RootNode';

export type DocumentMeta = {
  target: string;
  title: string;
  override?: boolean;
  filename?: string;
  entry?: boolean;
} & { [key: string]: string };

export class DocumentNode extends Node {
  public compile($: Compiler, state: State) {
    this.roots.forEach((node, i) => {
      node.meta.entry = i === 0;
      node.compile($, state);
    });
  }

  constructor(
    public roots: RootNode[],
    public meta: DocumentMeta
  ) {
    super();
    if (!meta.target) {
      throw new Error('entry node must have a "target" field.');
    }
  }
}
