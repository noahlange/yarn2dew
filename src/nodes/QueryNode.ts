import yarn, { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';
import type { Compiler, Parser, ParseResult } from '../lib';
import { Node } from './Node';
import { match, P } from 'ts-pattern';
import { LiteralNode } from './LiteralNode';
import { toScreamingSnakeCase } from '../utils';

export class QueryNode extends Node {
  public static parse(
    parser: Parser,
    node: NodeType,
    nodes: NodeType[]
  ): ParseResult<QueryNode> {
    let negated = false;
    if (node instanceof yarn.InlineExpressionNode) {
      node = node.expression;
    }
    if (node instanceof yarn.NegatedBooleanExpressionNode) {
      negated = true;
      node = node.expression;
    }

    const value = match(node)
      .with(
        P.instanceOf(yarn.FunctionCallNode),
        n =>
          new QueryNode(
            toScreamingSnakeCase(n.functionName),
            n.args.map(arg => LiteralNode.parse(parser, arg, n.args).value),
            negated
          )
      )
      .otherwise(node => {
        throw new Error(
          `expected function call node in query, got ${'type' in node ? node.type : '???'}`
        );
      });

    return { value, next: nodes.indexOf(node) + 1 };
  }

  public compile($: Compiler) {
    $.write(`${this.negated ? '!' : ''}${this.name} `);
    $.write(this.args.map(arg => arg.compile($)).join(' '));
  }

  public toString() {
    return `${this.negated ? '!' : ''}${this.name} "${this.args.map(a => a.toString()).join(' ')}"`;
  }

  public constructor(
    private name: string,
    private args: LiteralNode[],
    private negated = false
  ) {
    super();
  }
}
