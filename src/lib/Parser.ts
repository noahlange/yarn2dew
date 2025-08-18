import bondage, { type Runner } from '@mnbroatch/bondage/src/index.js';
import nodes, { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';
import * as $ from '../nodes';
import { match, P } from 'ts-pattern';

export type ParseResult<T> = { next: number; value: T };

export class Parser {
  public static parse(text: string) {
    return new Parser().parse(text);
  }

  private getLine(node: NodeType) {
    if ('lineNum' in node) {
      return node.lineNum;
    } else {
      return '???';
    }
  }

  private next(node: NodeType, ns: NodeType[]): ParseResult<$.AnyNode> {
    return (
      match(node)
        // text/message nodes
        .with(P.instanceOf(nodes.TextNode), n => $.TextNode.parse(this, n, ns))
        .with(P.instanceOf(nodes.StringLiteralNode), n => $.LiteralNode.parse(this, n, ns))
        .with(P.instanceOf(nodes.NumericLiteralNode), n => $.LiteralNode.parse(this, n, ns))
        .with(P.instanceOf(nodes.BooleanLiteralNode), n => $.LiteralNode.parse(this, n, ns))
        .with(P.instanceOf(nodes.InlineExpressionNode), n => $.LiteralNode.parse(this, n, ns))
        .with(P.instanceOf(nodes.JumpCommandNode), n => $.JumpNode.parse(this, n, ns))
        .with(P.instanceOf(nodes.StopCommandNode), n => $.CommandNode.parse(this, n, ns))
        .with(P.instanceOf(nodes.GenericCommandNode), n => $.CommandNode.parse(this, n, ns))
        .otherwise(node => {
          throw new Error(
            `Unsupported node type ${'type' in node ? node.type : '???'} at line ${this.getLine(node)}`
          );
        })
    );
  }

  public process(ast: NodeType[], addTrailingEnd: boolean = false) {
    const state: ParseResult<$.AnyNode | null> = { next: 0, value: null };
    const nodes: $.AnyNode[] = [];
    while (state.next < ast.length) {
      const res = this.next(ast[state.next], ast);
      if (res.next === state.next) {
        const nextNode = ast[state.next];
        const nodeType = 'type' in nextNode ? nextNode.type : '???';
        throw new Error(`failed to parse node "${nodeType}"`);
      }

      state.next = res.next;
      state.value = res.value;

      if (state.value) nodes.push(state.value);
    }

    if (addTrailingEnd) {
      const addNode = match(nodes.at(-1))
        .with(P.nullish, () => false)
        .with(P.instanceOf($.JumpNode), () => false)
        .when(
          c => c instanceof $.CommandNode && c.name === 'end',
          () => false
        )
        .otherwise(() => true);

      if (addNode) {
        nodes.push(new $.CommandNode('end'));
      }
    }
    return nodes;
  }

  private runner: Runner | null = null;

  public parse(text: string): $.DocumentNode {
    this.runner = new bondage.Runner();
    this.runner.load(text);
    const meta: $.DocumentMeta = {} as $.DocumentMeta;
    return new $.DocumentNode(
      Object.keys(this.runner.yarnNodes).map(key => {
        const { parserNodes, metadata } = this.runner!.getParserNodes(key);
        const processed = this.process(parserNodes.filter(Boolean), true);
        Object.assign(meta, metadata);
        return new $.RootNode(processed, metadata);
      }),
      meta
    );
  }
}
