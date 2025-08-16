import { match, P } from 'ts-pattern';
import type { Parser, Compiler, ParseResult } from '../lib';
import { Node } from './Node';
import yarn, { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';

export class LiteralNode extends Node {
  public static parse(parser: Parser, node: NodeType, nodes: NodeType[]): ParseResult<LiteralNode> {
    let index = nodes.indexOf(node);
    return match(node)
      .with(P.instanceOf(yarn.InlineExpressionNode), node => {
        return LiteralNode.parse(parser, node.expression as NodeType, []);
      })
      .with(P.instanceOf(yarn.StringLiteralNode), node => ({
        next: index + 1,
        value: new LiteralNode(node.stringLiteral.toString())
      }))
      .with(P.instanceOf(yarn.BooleanLiteralNode), node => ({
        next: index + 1,
        value: new LiteralNode(node.booleanLiteral.toString())
      }))
      .with(P.instanceOf(yarn.NumericLiteralNode), node => ({
        next: index + 1,
        value: new LiteralNode(node.numericLiteral.toString())
      }))
      .otherwise(() => {
        throw new Error('exploded');
      });
  }

  public toString() {
    return this.value.toString();
  }

  public compile($: Compiler) {
    $.write(this.value);
  }

  constructor(public value: string) {
    super();
  }
}
