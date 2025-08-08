import yarn, { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';
import { ScopeType, type Compiler, type Parser } from '../lib';
import { Node } from './Node';
import { QueryNode } from './QueryNode';
import type { AnyNode } from '.';
import { match, P } from 'ts-pattern';

type IfNode = InstanceType<typeof yarn.IfNode>;
type ElseIfNode = InstanceType<typeof yarn.IfElseNode>;
type ElseNode = InstanceType<typeof yarn.ElseNode>;

export class ConditionNode extends Node {
  public readonly type = 'condition';

  public static parse(parser: Parser, node: IfNode | ElseIfNode, nodes: NodeType[]) {
    const query = QueryNode.parse(parser, node.expression, [node.expression]).value;
    const statement = parser.process(node.statement as NodeType[]);
    const elseStatement = parser.process(
      match(node)
        .with(P.instanceOf(yarn.IfElseNode), n => n.elseStatement.statement)
        .otherwise(() => []) as NodeType[]
    );

    return {
      value: new ConditionNode(query, statement, elseStatement),
      next: nodes.indexOf(node) + 1
    };
  }

  public compile($: Compiler) {
    this.condition.compile($);
    $.write('#');
    for (const c of this.statement) c.compile($);
    $.write('|');
    for (const node of this.elseStatement) {
      node.compile($);
    }
  }

  public constructor(
    private condition: QueryNode,
    private statement: AnyNode[],
    private elseStatement: AnyNode[]
  ) {
    super();
  }
}
