import type yarn from '@mnbroatch/bondage/src/parser/nodes.js';
import { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';

import { match } from 'ts-pattern';
import { WhenNode } from './WhenNode';
import { StartNode } from './StartNode';
import { Node } from './Node';
import { Compiler, Parser } from '../lib';

type GenericCommandNode = InstanceType<typeof yarn.GenericCommandNode | typeof yarn.StopCommandNode>;

export class CommandNode extends Node {
  public static parse(parser: Parser, node: GenericCommandNode, nodes: NodeType[]) {
    const index = nodes.indexOf(node);
    const [name, ...args] = match(node)
      .with({ type: 'StopCommandNode' }, () => ['stop'])
      .otherwise(({ command }) => command[0].text.split(' '));

    return {
      value: match(name)
        .with('wait', () => {
          const [wait, seconds] = args;
          const num = +seconds;
          const ms = isNaN(num) ? '1000' : (num * 1000).toString();
          return new CommandNode('pause', [ms]);
        })
        .with('when', () => {
          const [condition, ...rest] = args;
          return new WhenNode(condition, rest);
        })
        .with('start', () => {
          const [, x, y, d] = args.map(Number);
          return new StartNode(args[0], x, y, d);
        })
        .otherwise(() => new CommandNode(name, args)),
      next: index + 1
    };
  }

  public compile($: Compiler) {
    $.writeLine(`${this.name.trim()} ${this.args.join(' ')}`.trim());
  }

  constructor(
    public name: string,
    public args: string[] = []
  ) {
    super();
  }
}
