import bondage, { type Runner } from '@mnbroatch/bondage/src/index.js';
import { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';
import * as $ from '../nodes';
import { match } from 'ts-pattern';

export type ParseResult<T> = { next: number; value: T };

export class Parser {
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
        .with({ type: 'TextNode' }, n => $.TextNode.parse(this, n, ns))
        .with({ type: 'InlineExpressionNode' }, n => $.LiteralNode.parse(this, n, ns))
        .with({ type: 'JumpCommandNode' }, n => $.JumpNode.parse(this, n, ns))
        .with({ type: 'StopCommandNode' }, n => $.CommandNode.parse(this, n, ns))
        .with({ type: 'GenericCommandNode' }, n => $.CommandNode.parse(this, n, ns))
        .otherwise(node => {
          throw new Error(`Unsupported node type ${node.type} at line ${this.getLine(node)}`);
        })
    );
  }

  public process(ast: NodeType[]) {
    let { next, value }: ParseResult<$.AnyNode | null> = {
      next: 0,
      value: null
    };
    const nodes: $.AnyNode[] = [];
    while (next < ast.length) {
      const res = this.next(ast[next], ast);
      if (res.next === next) {
        throw new Error(`failed to parse node "${ast[next].type}"`);
      }
      next = res.next;
      value = res.value;
      if (value) nodes.push(value);
    }
    return nodes;
  }

  private runner: Runner | null = null;

  public parse(text: string): $.DocumentNode {
    this.runner = new bondage.Runner();
    this.runner.load(text);
    let meta = {};
    return new $.DocumentNode(
      Object.keys(this.runner.yarnNodes).map(key => {
        const { parserNodes, metadata } = this.runner!.getParserNodes(key);
        const processed = this.process(parserNodes.filter(Boolean));
        Object.assign(meta, metadata);
        return new $.RootNode(processed, metadata);
      }),
      meta
    );
  }
}
