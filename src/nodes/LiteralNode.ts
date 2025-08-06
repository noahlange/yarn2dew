import { match } from 'ts-pattern';
import type { Parser, Compiler, ParseResult } from '../lib';
import { Node } from './Node';
import { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';

export class LiteralNode extends Node {
  public static parse(parser: Parser, node: NodeType, nodes: NodeType[]): ParseResult<LiteralNode> {
    let index = nodes.indexOf(node);
    return match(node)
      .with({ type: 'InlineExpressionNode' }, node => LiteralNode.parse(parser, node.expression as NodeType, []))
      .with({ type: 'StringLiteralNode' }, node => ({
        next: index + 1,
        value: new LiteralNode(node.stringLiteral.toString())
      }))
      .with({ type: 'BooleanLiteralNode' }, node => ({
        next: index + 1,
        value: new LiteralNode(node.booleanLiteral.toString())
      }))
      .with({ type: 'NumericLiteralNode' }, node => ({
        next: index + 1,
        value: new LiteralNode(node.numericLiteral.toString())
      }))
      .otherwise(() => {
        throw new Error('exploded');
      });
  }

  public readonly type = 'LiteralNode';

  public compile($: Compiler) {
    $.write(this.value);
  }

  constructor(public value: string) {
    super();
  }
}
