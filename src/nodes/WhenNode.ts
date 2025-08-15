import yarn from '@mnbroatch/bondage/src/parser/nodes.js';
import type { NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';
import { Compiler, Parser, type ParseResult } from '../lib';
import { Node } from './Node';
import { QueryNode } from './QueryNode';

type GenericCommandNode = InstanceType<typeof yarn.GenericCommandNode>;

export class WhenNode extends Node {
  public static parse(parser: Parser, node: GenericCommandNode, nodes: NodeType[]): ParseResult<WhenNode> {
    const [_when, name, ...args] = node.command[0].text.split(' ');
    return {
      next: -1,
      value:
        node.command.length > 1
          ? new WhenNode('GameStateQuery', [QueryNode.parse(parser, node.command[1], []).value.toString()])
          : new WhenNode(name, args)
    };
  }

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
