import type yarn from '@mnbroatch/bondage/src/parser/nodes.js';
import { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';
import { Node } from './Node';
import { Compiler, Parser } from '../lib';

export class JumpNode extends Node {
  public static parse(parser: Parser, node: InstanceType<typeof yarn.JumpCommandNode>, nodes: NodeType[]) {
    return {
      next: nodes.indexOf(node) + 1,
      value: new JumpNode(node.destination)
    };
  }

  public readonly type = 'JumpNode';

  public compile($: Compiler) {
    $.writeLine(`switchEvent ${$.namespace}.${this.destination}`);
  }

  constructor(public destination: string) {
    super();
  }
}
